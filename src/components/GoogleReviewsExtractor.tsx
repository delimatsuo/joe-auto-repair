import { useState } from 'react';
import { useToast } from "@/hooks/use-toast"; 
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FirecrawlService } from '@/utils/FirecrawlService';
import { Star, ExternalLink } from 'lucide-react';

interface Review {
  name: string;
  rating: number;
  text: string;
  date?: string;
}

interface GoogleReviewsExtractorProps {
  onReviewsExtracted: (reviews: Review[]) => void;
}

export const GoogleReviewsExtractor = ({ onReviewsExtracted }: GoogleReviewsExtractorProps) => {
  const { toast } = useToast();
  const [apiKey, setApiKey] = useState(FirecrawlService.getApiKey() || '');
  const [googleUrl, setGoogleUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [reviews, setReviews] = useState<Review[]>([]);

  const handleSaveApiKey = () => {
    if (!apiKey.trim()) {
      toast({
        title: "Error",
        description: "Please enter your Firecrawl API key",
        variant: "destructive",
      });
      return;
    }
    
    FirecrawlService.saveApiKey(apiKey);
    toast({
      title: "Success",
      description: "API key saved successfully",
    });
  };

  const handleExtractReviews = async () => {
    if (!apiKey.trim()) {
      toast({
        title: "Error",
        description: "Please enter and save your Firecrawl API key first",
        variant: "destructive",
      });
      return;
    }

    if (!googleUrl.trim()) {
      toast({
        title: "Error",
        description: "Please enter the Google Reviews URL",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    
    try {
      const result = await FirecrawlService.scrapeGoogleReviews(googleUrl);
      
      if (result.success && result.data) {
        const extractedReviews = FirecrawlService.parseGoogleReviews(result.data);
        
        if (extractedReviews.length > 0) {
          setReviews(extractedReviews);
          onReviewsExtracted(extractedReviews);
          toast({
            title: "Success",
            description: `Extracted ${extractedReviews.length} reviews successfully`,
          });
        } else {
          toast({
            title: "No Reviews Found",
            description: "Could not extract reviews from the provided URL. Try a different Google Reviews link.",
            variant: "destructive",
          });
        }
      } else {
        toast({
          title: "Error",
          description: result.error || "Failed to extract reviews",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error('Error extracting reviews:', error);
      toast({
        title: "Error",
        description: "Failed to extract reviews",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <ExternalLink className="h-5 w-5" />
          Google Reviews Extractor
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div>
            <label htmlFor="apiKey" className="block text-sm font-medium mb-2">
              Firecrawl API Key
            </label>
            <div className="flex gap-2">
              <Input
                id="apiKey"
                type="password"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                placeholder="Enter your Firecrawl API key"
                className="flex-1"
              />
              <Button onClick={handleSaveApiKey} variant="outline">
                Save
              </Button>
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Get your API key from{' '}
              <a 
                href="https://firecrawl.dev" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                firecrawl.dev
              </a>
            </p>
          </div>

          <div>
            <label htmlFor="googleUrl" className="block text-sm font-medium mb-2">
              Google Reviews URL
            </label>
            <Input
              id="googleUrl"
              type="url"
              value={googleUrl}
              onChange={(e) => setGoogleUrl(e.target.value)}
              placeholder="https://www.google.com/maps/place/..."
            />
            <p className="text-xs text-muted-foreground mt-1">
              Paste the Google Maps URL for Joe's Auto Repair
            </p>
          </div>

          <Button 
            onClick={handleExtractReviews} 
            disabled={isLoading}
            className="w-full"
          >
            {isLoading ? "Extracting Reviews..." : "Extract Reviews"}
          </Button>
        </div>

        {reviews.length > 0 && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Extracted Reviews:</h3>
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {reviews.map((review, index) => (
                <div key={index} className="p-3 border rounded-lg bg-muted/50">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="font-medium">{review.name}</span>
                    <div className="flex">
                      {[...Array(review.rating)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 text-warning fill-current" />
                      ))}
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">{review.text}</p>
                </div>
              ))}
            </div>
            <p className="text-xs text-muted-foreground">
              These reviews will be used to update your testimonials section.
              <br />
              Source: Google Reviews
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};