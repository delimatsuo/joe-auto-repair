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
    const geminiApiKey = Deno.env.get('GEMINI_API_KEY')
    
    console.log('Environment variables check:')
    console.log('- SUPABASE_URL exists:', !!Deno.env.get('SUPABASE_URL'))
    console.log('- GEMINI_API_KEY exists:', !!geminiApiKey)
    console.log('- GEMINI_API_KEY length:', geminiApiKey?.length || 0)
    console.log('- GEMINI_API_KEY first 10 chars:', geminiApiKey?.substring(0, 10) || 'null')
    console.log('- Available env keys:', Object.keys(Deno.env.toObject()).filter(key => 
      key.includes('GEMINI') || key.includes('API') || key === 'SUPABASE_URL'
    ))
    
    if (!geminiApiKey || geminiApiKey.trim() === '') {
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: `GEMINI_API_KEY ${!geminiApiKey ? 'not found' : 'is empty'} in environment`,
          keyLength: geminiApiKey?.length || 0,
          availableKeys: Object.keys(Deno.env.toObject()).filter(key => 
            key.includes('GEMINI') || key.includes('API')
          )
        }),
        { 
          status: 500,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      )
    }

    console.log('Testing Gemini API with key:', geminiApiKey.substring(0, 10) + '...')

    // Simple test request to validate the API key
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${geminiApiKey}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [
          {
            role: "user",
            parts: [
              {
                text: "Hello, just testing the API connection. Please respond with 'API working'"
              }
            ]
          }
        ],
        generationConfig: {
          temperature: 0.1,
          maxOutputTokens: 50,
        },
      }),
    })

    console.log('Response status:', response.status)
    console.log('Response headers:', Object.fromEntries(response.headers.entries()))

    if (!response.ok) {
      const errorText = await response.text()
      console.error(`Gemini API error: ${response.status} - ${errorText}`)
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: `API Error ${response.status}: ${errorText}`,
          status: response.status
        }),
        { 
          status: 200,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      )
    }

    const result = await response.json()
    console.log('Gemini response:', JSON.stringify(result, null, 2))

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'API key is working!',
        response: result.candidates?.[0]?.content?.parts?.[0]?.text || 'No response text'
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    )

  } catch (error) {
    console.error('Error testing Gemini API:', error)
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: error.message || 'Failed to test API' 
      }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    )
  }
})