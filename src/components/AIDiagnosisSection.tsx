import { useState, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { 
  Upload, 
  Mic, 
  MicOff, 
  Camera, 
  FileImage, 
  Send,
  Brain,
  AlertTriangle,
  Phone,
  Loader2
} from "lucide-react";

interface DiagnosisResult {
  analysis: string;
  recommendations: string[];
  urgency: 'low' | 'medium' | 'high';
  disclaimer: string;
}

export const AIDiagnosisSection = () => {
  const { toast } = useToast();
  const [apiKey, setApiKey] = useState(localStorage.getItem('openai_api_key') || '');
  const [isRecording, setIsRecording] = useState(false);
  const [recordedAudio, setRecordedAudio] = useState<Blob | null>(null);
  const [uploadedImages, setUploadedImages] = useState<File[]>([]);
  const [textDescription, setTextDescription] = useState('');
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [diagnosisResult, setDiagnosisResult] = useState<DiagnosisResult | null>(null);
  
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const saveApiKey = () => {
    if (!apiKey.trim()) {
      toast({
        title: "Error",
        description: "Please enter your OpenAI API key",
        variant: "destructive",
      });
      return;
    }
    localStorage.setItem('openai_api_key', apiKey);
    toast({
      title: "Success",
      description: "API key saved successfully",
    });
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);
      audioChunksRef.current = [];

      mediaRecorderRef.current.ondataavailable = (event) => {
        audioChunksRef.current.push(event.data);
      };

      mediaRecorderRef.current.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
        setRecordedAudio(audioBlob);
      };

      mediaRecorderRef.current.start();
      setIsRecording(true);
    } catch (error) {
      toast({
        title: "Error",
        description: "Could not access microphone",
        variant: "destructive",
      });
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      mediaRecorderRef.current.stream.getTracks().forEach(track => track.stop());
      setIsRecording(false);
    }
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    const imageFiles = files.filter(file => file.type.startsWith('image/') || file.type.startsWith('video/'));
    setUploadedImages(prev => [...prev, ...imageFiles]);
  };

  const removeImage = (index: number) => {
    setUploadedImages(prev => prev.filter((_, i) => i !== index));
  };

  const convertAudioToText = async (audioBlob: Blob): Promise<string> => {
    try {
      const formData = new FormData();
      formData.append('file', audioBlob, 'audio.wav');
      formData.append('model', 'whisper-1');

      const response = await fetch('https://api.openai.com/v1/audio/transcriptions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to transcribe audio');
      }

      const result = await response.json();
      return result.text;
    } catch (error) {
      console.error('Error transcribing audio:', error);
      return 'Audio transcription failed';
    }
  };

  const analyzeWithAI = async () => {
    if (!apiKey.trim()) {
      toast({
        title: "Error",
        description: "Please enter and save your OpenAI API key first",
        variant: "destructive",
      });
      return;
    }

    if (!textDescription.trim() && !recordedAudio && uploadedImages.length === 0) {
      toast({
        title: "Error",
        description: "Please provide at least a description, audio, or images",
        variant: "destructive",
      });
      return;
    }

    setIsAnalyzing(true);

    try {
      let fullDescription = textDescription;

      // Add audio transcription if available
      if (recordedAudio) {
        const audioText = await convertAudioToText(recordedAudio);
        fullDescription += `\n\nAudio Description: ${audioText}`;
      }

      // Prepare messages for the API
      const messages = [
        {
          role: 'system',
          content: `You are an expert automotive diagnostic assistant for Joe's Auto Repair in Rochdale, MA. 

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
        },
        {
          role: 'user',
          content: `Please analyze this automotive issue:

Customer Description: ${fullDescription}

Customer Name: ${customerName}
Customer Phone: ${customerPhone}

${uploadedImages.length > 0 ? `Images provided: ${uploadedImages.length} files` : 'No images provided'}`
        }
      ];

      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'gpt-4.1-2025-04-14',
          messages,
          max_tokens: 1000,
          temperature: 0.7,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to get AI analysis');
      }

      const result = await response.json();
      const analysisText = result.choices[0].message.content;
      
      try {
        const diagnosis = JSON.parse(analysisText);
        setDiagnosisResult(diagnosis);
      } catch (parseError) {
        // Fallback if JSON parsing fails
        setDiagnosisResult({
          analysis: analysisText,
          recommendations: ["Contact Joe for professional diagnosis"],
          urgency: 'medium',
          disclaimer: "This is an AI-generated preliminary assessment. Always consult with Joe for professional diagnosis and service."
        });
      }

    } catch (error) {
      console.error('Error analyzing with AI:', error);
      toast({
        title: "Error",
        description: "Failed to analyze the issue. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  const sendToJoe = () => {
    const message = `Hi Joe! AI Analysis from ${customerName} (${customerPhone}):

Problem: ${textDescription}

AI Assessment: ${diagnosisResult?.analysis}

Recommended Actions: ${diagnosisResult?.recommendations.join(', ')}

Urgency Level: ${diagnosisResult?.urgency}

Please contact me to discuss further.`;

    const encodedMessage = encodeURIComponent(message);
    window.open(`sms:+15085550123?&body=${encodedMessage}`, '_self');
  };

  return (
    <section id="ai-diagnosis" className="py-20 bg-gradient-to-b from-background to-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-warning/10 border border-warning/20 rounded-full px-4 py-2 mb-4">
            <Brain className="w-4 h-4 text-warning" />
            <span className="text-warning font-semibold text-sm">AI-Powered Diagnosis</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Get Instant Car Problem Analysis
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Upload photos, record your description, and get AI-powered insights into your car problems. 
            Then easily share the results with Joe for professional service.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <Card className="shadow-depth">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Brain className="h-6 w-6 text-primary" />
                AI Car Diagnosis Tool
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* API Key Input */}
              <div className="space-y-2">
                <label className="text-sm font-medium">OpenAI API Key (Required)</label>
                <div className="flex gap-2">
                  <Input
                    type="password"
                    value={apiKey}
                    onChange={(e) => setApiKey(e.target.value)}
                    placeholder="Enter your OpenAI API key"
                    className="flex-1"
                  />
                  <Button onClick={saveApiKey} variant="outline">
                    Save
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground">
                  Get your API key from{' '}
                  <a href="https://platform.openai.com/api-keys" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                    OpenAI Platform
                  </a>
                </p>
              </div>

              {/* Customer Information */}
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Your Name</label>
                  <Input
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="Enter your name"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Phone Number</label>
                  <Input
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    placeholder="(555) 123-4567"
                  />
                </div>
              </div>

              {/* Problem Description */}
              <div>
                <label className="text-sm font-medium mb-2 block">Describe the Problem</label>
                <Textarea
                  value={textDescription}
                  onChange={(e) => setTextDescription(e.target.value)}
                  placeholder="Describe what's happening with your car: sounds, symptoms, when it occurs, etc."
                  rows={4}
                />
              </div>

              {/* Audio Recording */}
              <div className="space-y-4">
                <label className="text-sm font-medium">Record Audio Description</label>
                <div className="flex items-center gap-4">
                  <Button
                    onClick={isRecording ? stopRecording : startRecording}
                    variant={isRecording ? "destructive" : "outline"}
                    className="flex items-center gap-2"
                  >
                    {isRecording ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                    {isRecording ? 'Stop Recording' : 'Start Recording'}
                  </Button>
                  {recordedAudio && (
                    <span className="text-sm text-success">✓ Audio recorded</span>
                  )}
                </div>
              </div>

              {/* Image/Video Upload */}
              <div className="space-y-4">
                <label className="text-sm font-medium">Upload Photos or Videos</label>
                <div className="border-2 border-dashed border-muted-foreground/20 rounded-lg p-6 text-center">
                  <input
                    ref={fileInputRef}
                    type="file"
                    multiple
                    accept="image/*,video/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                  <Button
                    onClick={() => fileInputRef.current?.click()}
                    variant="outline"
                    className="mb-4"
                  >
                    <Upload className="w-4 h-4 mr-2" />
                    Upload Files
                  </Button>
                  <p className="text-sm text-muted-foreground">
                    Upload photos or videos of the problem area, engine, dashboard, etc.
                  </p>
                </div>

                {uploadedImages.length > 0 && (
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {uploadedImages.map((file, index) => (
                      <div key={index} className="relative">
                        <div className="aspect-square bg-muted rounded-lg flex items-center justify-center">
                          {file.type.startsWith('image/') ? (
                            <FileImage className="w-8 h-8 text-muted-foreground" />
                          ) : (
                            <Camera className="w-8 h-8 text-muted-foreground" />
                          )}
                        </div>
                        <button
                          onClick={() => removeImage(index)}
                          className="absolute -top-2 -right-2 bg-destructive text-white rounded-full w-6 h-6 flex items-center justify-center text-xs"
                        >
                          ×
                        </button>
                        <p className="text-xs text-center mt-1 truncate">{file.name}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Analyze Button */}
              <Button
                onClick={analyzeWithAI}
                disabled={isAnalyzing}
                className="w-full bg-primary hover:bg-primary-hover"
                size="lg"
              >
                {isAnalyzing ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Analyzing with AI...
                  </>
                ) : (
                  <>
                    <Brain className="w-4 h-4 mr-2" />
                    Get AI Analysis
                  </>
                )}
              </Button>

              {/* Results */}
              {diagnosisResult && (
                <Card className="bg-muted/50">
                  <CardContent className="pt-6">
                    <div className="space-y-4">
                      <div className="flex items-center gap-2 mb-4">
                        <AlertTriangle className={`w-5 h-5 ${
                          diagnosisResult.urgency === 'high' ? 'text-destructive' :
                          diagnosisResult.urgency === 'medium' ? 'text-warning' :
                          'text-success'
                        }`} />
                        <span className="font-semibold">
                          AI Analysis Results (Urgency: {diagnosisResult.urgency})
                        </span>
                      </div>

                      <div>
                        <h4 className="font-semibold mb-2">Analysis:</h4>
                        <p className="text-muted-foreground">{diagnosisResult.analysis}</p>
                      </div>

                      <div>
                        <h4 className="font-semibold mb-2">Recommendations:</h4>
                        <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                          {diagnosisResult.recommendations.map((rec, index) => (
                            <li key={index}>{rec}</li>
                          ))}
                        </ul>
                      </div>

                      <div className="bg-warning/10 border border-warning/20 rounded-lg p-4">
                        <p className="text-sm text-warning-foreground">
                          <strong>⚠️ Important:</strong> {diagnosisResult.disclaimer}
                        </p>
                      </div>

                      <div className="flex gap-4 pt-4">
                        <Button
                          onClick={sendToJoe}
                          className="flex-1"
                          variant="default"
                        >
                          <Phone className="w-4 h-4 mr-2" />
                          Send to Joe
                        </Button>
                        <Button
                          onClick={() => window.open('tel:+15085550123', '_self')}
                          variant="outline"
                          className="flex-1"
                        >
                          Call Joe Now
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};