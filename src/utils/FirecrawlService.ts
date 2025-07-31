import FirecrawlApp from '@mendable/firecrawl-js';

interface ErrorResponse {
  success: false;
  error: string;
}

interface ScrapeResponse {
  success: true;
  data: {
    markdown: string;
    html: string;
    metadata: any;
  };
}

type FirecrawlResponse = ScrapeResponse | ErrorResponse;

export class FirecrawlService {
  private static API_KEY_STORAGE_KEY = 'firecrawl_api_key';
  private static firecrawlApp: FirecrawlApp | null = null;

  static saveApiKey(apiKey: string): void {
    localStorage.setItem(this.API_KEY_STORAGE_KEY, apiKey);
    this.firecrawlApp = new FirecrawlApp({ apiKey });
    console.log('API key saved successfully');
  }

  static getApiKey(): string | null {
    return localStorage.getItem(this.API_KEY_STORAGE_KEY);
  }

  static async testApiKey(apiKey: string): Promise<boolean> {
    try {
      console.log('Testing API key with Firecrawl API');
      this.firecrawlApp = new FirecrawlApp({ apiKey });
      // A simple test scrape to verify the API key
      const testResponse = await this.firecrawlApp.scrapeUrl('https://example.com');
      return testResponse.success;
    } catch (error) {
      console.error('Error testing API key:', error);
      return false;
    }
  }

  static async scrapeGoogleReviews(googleReviewsUrl: string): Promise<{ success: boolean; error?: string; data?: any }> {
    const apiKey = this.getApiKey();
    if (!apiKey) {
      return { success: false, error: 'API key not found' };
    }

    try {
      console.log('Making scrape request to Firecrawl API for Google Reviews');
      if (!this.firecrawlApp) {
        this.firecrawlApp = new FirecrawlApp({ apiKey });
      }

      const scrapeResponse = await this.firecrawlApp.scrapeUrl(googleReviewsUrl, {
        formats: ['markdown', 'html'],
        includeTags: ['div', 'span', 'p'],
        excludeTags: ['script', 'style']
      }) as FirecrawlResponse;

      if (!scrapeResponse.success) {
        console.error('Scrape failed:', (scrapeResponse as ErrorResponse).error);
        return { 
          success: false, 
          error: (scrapeResponse as ErrorResponse).error || 'Failed to scrape Google Reviews' 
        };
      }

      console.log('Scrape successful');
      return { 
        success: true,
        data: scrapeResponse.data 
      };
    } catch (error) {
      console.error('Error during scrape:', error);
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Failed to connect to Firecrawl API' 
      };
    }
  }

  static parseGoogleReviews(scrapedData: any): Array<{name: string, rating: number, text: string, date?: string}> {
    try {
      const markdown = scrapedData.markdown || '';
      const reviews: Array<{name: string, rating: number, text: string, date?: string}> = [];
      
      // Simple regex patterns to extract review data from markdown
      const reviewPattern = /(\w+\s+\w+).*?(\d+)\s*stars?.*?\n(.*?)(?=\n\w+\s+\w+|\n##|\n$)/gi;
      let match;
      
      while ((match = reviewPattern.exec(markdown)) !== null && reviews.length < 10) {
        const [, name, rating, text] = match;
        if (text && text.trim().length > 20) {
          reviews.push({
            name: name.trim(),
            rating: parseInt(rating) || 5,
            text: text.trim().replace(/\n/g, ' ').substring(0, 200) + (text.length > 200 ? '...' : ''),
          });
        }
      }
      
      return reviews;
    } catch (error) {
      console.error('Error parsing reviews:', error);
      return [];
    }
  }
}