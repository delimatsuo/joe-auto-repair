import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

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
    const { description, customerName, customerPhone, audioText, imageCount } = await req.json()

    // Get the Gemini API key from Supabase secrets
    const geminiApiKey = Deno.env.get('GEMINI_API_KEY')
    
    if (!geminiApiKey) {
      throw new Error('Gemini API key not configured')
    }

    // Prepare the prompt for Gemini
    const systemPrompt = `You are an expert automotive diagnostic assistant for Joe's Auto Repair in Rochdale, MA. 

CRITICAL RULES:
- NEVER provide pricing, quotes, or cost estimates
- NEVER recommend specific brands or products
- Always emphasize this is preliminary analysis only
- Always recommend professional inspection by Joe
- Focus on educational information only
- Be helpful but conservative in your analysis

Provide your response in this exact JSON format:
{
  "analysis": "Brief explanation of potential issues based on the description/images",
  "recommendations": ["recommendation 1", "recommendation 2", "recommendation 3"],
  "urgency": "low|medium|high",
  "disclaimer": "Important safety and professional consultation notice"
}`

    const userPrompt = `Please analyze this automotive issue:

Customer Description: ${description}
${audioText ? `\nAudio Description: ${audioText}` : ''}

Customer Name: ${customerName}
Customer Phone: ${customerPhone}

${imageCount > 0 ? `Images provided: ${imageCount} files` : 'No images provided'}`

    // Call Gemini API
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent?key=${geminiApiKey}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: `${systemPrompt}\n\n${userPrompt}`
          }]
        }],
        generationConfig: {
          temperature: 0.7,
          topP: 0.8,
          topK: 40,
          maxOutputTokens: 1000,
        }
      })
    })

    if (!response.ok) {
      throw new Error(`Gemini API error: ${response.status}`)
    }

    const result = await response.json()
    const analysisText = result.candidates[0].content.parts[0].text

    // Try to parse as JSON, fallback if it fails
    let diagnosis
    try {
      diagnosis = JSON.parse(analysisText)
    } catch (parseError) {
      diagnosis = {
        analysis: analysisText,
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