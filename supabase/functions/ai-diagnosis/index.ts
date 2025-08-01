import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { description, customerName, customerPhone, vehicleYear, vehicleMake, vehicleModel, files } = await req.json()

    console.log('Received request:', { 
      description, 
      customerName, 
      customerPhone, 
      vehicleYear,
      vehicleMake,
      vehicleModel,
      filesCount: files?.length || 0 
    });

    // Get the Gemini API key from Supabase secrets
    const geminiApiKey = Deno.env.get('GEMINI_API_KEY')
    
    if (!geminiApiKey) {
      throw new Error('Gemini API key not configured')
    }

    // Build the prompt with all available information
    let fullPrompt = `Customer: ${customerName} (${customerPhone})\n\n`;
    
    // Add vehicle information if provided
    const vehicleInfo = vehicleYear && vehicleMake && vehicleModel 
      ? `${vehicleYear} ${vehicleMake} ${vehicleModel}`
      : null;
    
    if (vehicleInfo) {
      fullPrompt += `Vehicle: ${vehicleInfo}\n\n`;
      fullPrompt += `IMPORTANT: Please consider common issues, recalls, and known problems specific to this vehicle model (${vehicleInfo}) when analyzing the symptoms.\n\n`;
    }
    
    fullPrompt += `Problem Description: ${description || 'No description provided'}\n\n`;

    if (files && files.length > 0) {
      fullPrompt += `Visual Media: ${files.length} file(s) uploaded (${files.map(f => `${f.name} - ${f.type}`).join(', ')})\n\n`;
      fullPrompt += `Please analyze the uploaded images/videos carefully for visual clues about the automotive issue.\n\n`;
    }

    fullPrompt += `Please provide a detailed analysis based on ALL available information including visual evidence from uploaded media.`;

    // Prepare the content array for Gemini with vision support
    const contents = [
      {
        role: "user",
        parts: [
          {
            text: fullPrompt
          }
        ]
      }
    ];

    // Add uploaded files to the request if any exist
    if (files && files.length > 0) {
      for (const file of files) {
        if (file.type.startsWith('image/')) {
          console.log(`Adding image file: ${file.name}`);
          contents[0].parts.push({
            inlineData: {
              mimeType: file.type,
              data: file.data
            }
          });
        } else if (file.type.startsWith('video/')) {
          console.log(`Processing video file: ${file.name} (${file.type}) - ${file.size} bytes`);
          
          // Normalize MIME type for .mov files (common issue found in forums)
          let normalizedMimeType = file.type;
          if (file.type === 'video/quicktime') {
            normalizedMimeType = 'video/mov';
            console.log('Normalized video/quicktime to video/mov');
          }
          
          // For files larger than 10MB, use Files API (more reliable than inline)
          if (file.size > 10 * 1024 * 1024) {
            console.log('Large video file detected, using Files API...');
            
            try {
              // Step 1: Convert base64 to binary
              const binaryData = Uint8Array.from(atob(file.data), c => c.charCodeAt(0));
              
              // Step 2: Start resumable upload
              const uploadResponse = await fetch(`https://generativelanguage.googleapis.com/upload/v1beta/files?key=${geminiApiKey}`, {
                method: 'POST',
                headers: {
                  'X-Goog-Upload-Protocol': 'resumable',
                  'X-Goog-Upload-Command': 'start',
                  'X-Goog-Upload-Header-Content-Length': binaryData.length.toString(),
                  'X-Goog-Upload-Header-Content-Type': normalizedMimeType,
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  file: { display_name: file.name }
                })
              });

              if (!uploadResponse.ok) {
                throw new Error(`Upload start failed: ${uploadResponse.status} ${await uploadResponse.text()}`);
              }

              const uploadUrl = uploadResponse.headers.get('x-goog-upload-url');
              if (!uploadUrl) {
                throw new Error('No upload URL received from Gemini API');
              }

              // Step 3: Upload file data
              const fileUploadResponse = await fetch(uploadUrl, {
                method: 'POST',
                headers: {
                  'Content-Length': binaryData.length.toString(),
                  'X-Goog-Upload-Offset': '0',
                  'X-Goog-Upload-Command': 'upload, finalize',
                },
                body: binaryData
              });

              if (!fileUploadResponse.ok) {
                throw new Error(`File upload failed: ${fileUploadResponse.status} ${await fileUploadResponse.text()}`);
              }

              const fileInfo = await fileUploadResponse.json();
              console.log('File uploaded, waiting for processing...', fileInfo.file.name);

              // Step 4: Wait for processing to complete (CRITICAL STEP MOST DEVELOPERS MISS)
              let uploadedFile = fileInfo.file;
              let retries = 0;
              const maxRetries = 30; // Wait up to 30 seconds
              
              while (uploadedFile.state === 'PROCESSING' && retries < maxRetries) {
                console.log(`File still processing... (attempt ${retries + 1})`);
                await new Promise(resolve => setTimeout(resolve, 1000));
                
                const statusResponse = await fetch(`https://generativelanguage.googleapis.com/v1beta/files/${uploadedFile.name}?key=${geminiApiKey}`);
                if (statusResponse.ok) {
                  const statusData = await statusResponse.json();
                  uploadedFile = statusData;
                } else {
                  console.error('Failed to check file status:', statusResponse.status);
                  break;
                }
                retries++;
              }

              if (uploadedFile.state === 'ACTIVE') {
                console.log('File processing complete, adding to request');
                contents[0].parts.push({
                  fileData: {
                    mimeType: normalizedMimeType,
                    fileUri: uploadedFile.uri
                  }
                });
              } else {
                throw new Error(`File processing failed or timed out. Final state: ${uploadedFile.state}`);
              }

            } catch (uploadError) {
              console.error('Video upload via Files API failed:', uploadError);
              // Fallback: add description note
              const videoSizeMB = Math.round(file.size / 1024 / 1024 * 10) / 10;
              contents[0].parts[0].text += `\n\nNote: A video file (${file.name}, ${videoSizeMB}MB) was uploaded but could not be processed due to API limitations. Error: ${uploadError.message}. Please describe what you observed in the video.\n`;
            }
          } else {
            // Smaller files can use inline data, but with normalized MIME type
            console.log('Small video file, using inline data with normalized MIME type');
            contents[0].parts.push({
              inlineData: {
                mimeType: normalizedMimeType,
                data: file.data
              }
            });
          }
        }
      }
    }

    const systemPrompt = `You are an expert automotive diagnostic assistant for Joe's Auto Repair in Rochdale, MA. 

CRITICAL RULES:
- NEVER provide pricing, quotes, or cost estimates
- NEVER recommend specific brands or products
- Always emphasize this is preliminary analysis only
- Always recommend professional inspection by Joe
- Focus on educational information only
- Be helpful but conservative in your analysis
- When images/videos are provided, analyze them carefully for visual clues
- For videos, consider any sounds, movements, or visual symptoms shown
- Reference specific visual details you observe in uploaded media
- VEHICLE-SPECIFIC ANALYSIS: If vehicle year, make, and model are provided, ALWAYS reference known common issues, recalls, technical service bulletins, and typical problems for that specific vehicle. Use this information to provide more targeted analysis.
- Cross-reference symptoms with documented issues for the specific vehicle model when available

Provide your response in this exact JSON format:
{
  "analysis": "Detailed explanation of potential issues based on description and visual evidence",
  "recommendations": ["recommendation 1", "recommendation 2", "recommendation 3"],
  "urgency": "low|medium|high",
  "disclaimer": "Important safety and professional consultation notice"
}`;

    // Call Gemini API with multimodal support (vision + audio)
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-pro:generateContent?key=${geminiApiKey}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        system_instruction: {
          parts: [{ text: systemPrompt }]
        },
        contents: contents,
        generationConfig: {
          temperature: 0.3,
          topK: 32,
          topP: 1,
          maxOutputTokens: 4096,
        },
      }),
    })

    if (!response.ok) {
      const errorDetails = await response.text()
      console.error(`Gemini API error ${response.status}:`, errorDetails)
      throw new Error(`Gemini API error: ${response.status} - ${errorDetails}`)
    }

    const result = await response.json()
    console.log('Gemini response:', JSON.stringify(result, null, 2));

    if (!result.candidates || result.candidates.length === 0) {
      throw new Error('No response candidates from Gemini API');
    }

    const analysisText = result.candidates[0].content.parts[0].text
    console.log('Raw response text:', analysisText);

    // Try to parse as JSON, fallback if it fails
    let diagnosis
    try {
      // Look for JSON in the response - handle both markdown code blocks and plain JSON
      const jsonMatch = analysisText.match(/```json\s*([\s\S]*?)\s*```/) || analysisText.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        const jsonStr = jsonMatch[1] || jsonMatch[0];
        diagnosis = JSON.parse(jsonStr);
      } else {
        // If no JSON found, try parsing the entire response
        diagnosis = JSON.parse(analysisText);
      }
    } catch (parseError) {
      console.error('Failed to parse Gemini response as JSON:', parseError);
      diagnosis = {
        analysis: analysisText || "Unable to analyze the issue with the provided information.",
        recommendations: ["Contact Joe for professional diagnosis"],
        urgency: 'medium',
        disclaimer: "This is an AI-generated preliminary assessment. Always consult with Joe for professional diagnosis and service."
      }
    }

    return new Response(
      JSON.stringify({ success: true, data: diagnosis }),
      { 
        headers: { 
          ...corsHeaders,
          'Content-Type': 'application/json' 
        }
      }
    )

  } catch (error) {
    console.error('Error in AI diagnosis:', error)
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: error.message || 'Failed to analyze the issue' 
      }),
      { 
        status: 500,
        headers: { 
          ...corsHeaders,
          'Content-Type': 'application/json' 
        }
      }
    )
  }
})