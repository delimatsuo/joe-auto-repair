import { useState, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import {
  Upload, 
  Mic, 
  MicOff, 
  Camera, 
  FileImage, 
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

  const analyzeWithAI = async () => {
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
      // Convert uploaded files to base64 for sending to edge function
      const fileData = await Promise.all(
        uploadedImages.map(async (file) => {
          const base64 = await new Promise<string>((resolve) => {
            const reader = new FileReader();
            reader.onload = () => {
              const result = reader.result as string;
              // Remove data URL prefix (e.g., "data:image/jpeg;base64,")
              resolve(result.split(',')[1]);
            };
            reader.readAsDataURL(file);
          });
          
          return {
            name: file.name,
            type: file.type,
            size: file.size,
            data: base64
          };
        })
      );

      // For now, we'll just use the text description
      // Audio transcription would need to be implemented separately with Gemini or another service
      let audioText = '';
      if (recordedAudio) {
        audioText = 'Audio recording provided (transcription not yet implemented)';
      }

      const { data, error } = await supabase.functions.invoke('ai-diagnosis', {
        body: {
          description: textDescription,
          customerName,
          customerPhone,
          audioText,
          files: fileData
        }
      });

      if (error) {
        throw new Error(error.message || 'Failed to analyze');
      }

      if (!data.success) {
        throw new Error(data.error || 'Failed to analyze');
      }

      setDiagnosisResult(data.data);

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