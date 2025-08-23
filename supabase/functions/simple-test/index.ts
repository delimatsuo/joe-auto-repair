import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log('=== ENVIRONMENT DEBUG ===');
    
    // Get all environment variables
    const allEnv = Deno.env.toObject();
    const allKeys = Object.keys(allEnv);
    
    console.log('Total environment variables:', allKeys.length);
    console.log('All keys:', allKeys);
    
    // Check specifically for GEMINI_API_KEY
    const geminiKey = Deno.env.get('GEMINI_API_KEY');
    console.log('GEMINI_API_KEY exists:', !!geminiKey);
    console.log('GEMINI_API_KEY length:', geminiKey?.length || 0);
    console.log('GEMINI_API_KEY value (first 10 chars):', geminiKey?.substring(0, 10) || 'null');
    
    // Check for any keys containing 'GEMINI' or 'API'
    const relevantKeys = allKeys.filter(key => 
      key.toLowerCase().includes('gemini') || 
      key.toLowerCase().includes('api')
    );
    console.log('Keys containing GEMINI or API:', relevantKeys);
    
    // Log all values for relevant keys (first 10 chars only for security)
    relevantKeys.forEach(key => {
      const value = allEnv[key];
      console.log(`${key}: ${value?.substring(0, 10) || 'empty'}... (length: ${value?.length || 0})`);
    });
    
    return new Response(JSON.stringify({ 
      success: true,
      totalKeys: allKeys.length,
      relevantKeys,
      geminiKeyExists: !!geminiKey,
      geminiKeyLength: geminiKey?.length || 0
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error in simple-test function:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});