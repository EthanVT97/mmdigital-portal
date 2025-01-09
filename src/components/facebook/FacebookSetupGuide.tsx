import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { ExternalLink, CheckCircle2 } from "lucide-react";

export function FacebookSetupGuide() {
  const openLink = (url: string) => {
    window.open(url, '_blank');
  };

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold">Facebook Marketing Setup Guide</h2>
        <p className="text-muted-foreground">
          Follow these steps to start using Facebook Marketing
        </p>
      </div>

      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="step1">
          <AccordionTrigger>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-green-500" />
              <span>Step 1: Create Facebook Business Page</span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="space-y-4">
            <ol className="list-decimal pl-6 space-y-2">
              <li>Facebook မှာ login ဝင်ပါ</li>
              <li>Menu မှ "Pages" ကို ရွေးပါ</li>
              <li>"Create New Page" ကို နှိပ်ပါ</li>
              <li>Page name နှင့် category ရွေးပါ</li>
              <li>Profile/Cover photos ထည့်ပါ</li>
            </ol>
            <Button 
              variant="outline" 
              className="w-full"
              onClick={() => openLink('https://www.facebook.com/pages/create')}
            >
              Create Facebook Page
              <ExternalLink className="ml-2 h-4 w-4" />
            </Button>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="step2">
          <AccordionTrigger>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-green-500" />
              <span>Step 2: Set Up Business Manager</span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="space-y-4">
            <ol className="list-decimal pl-6 space-y-2">
              <li>Business.facebook.com သို့သွားပါ</li>
              <li>"Create Account" ကိုနှိပ်ပါ</li>
              <li>Business information ဖြည့်ပါ</li>
              <li>Facebook Page ကို add လုပ်ပါ</li>
              <li>Team members ထည့်ပါ (optional)</li>
            </ol>
            <Button 
              variant="outline" 
              className="w-full"
              onClick={() => openLink('https://business.facebook.com/overview')}
            >
              Go to Business Manager
              <ExternalLink className="ml-2 h-4 w-4" />
            </Button>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="step3">
          <AccordionTrigger>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-green-500" />
              <span>Step 3: Connect Your Page</span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="space-y-4">
            <ol className="list-decimal pl-6 space-y-2">
              <li>"Connect Facebook Page" button ကိုနှိပ်ပါ</li>
              <li>သင့် Facebook Page ကို ရွေးပါ</li>
              <li>Permission များကို allow လုပ်ပေးပါ</li>
            </ol>
            <div className="bg-muted p-4 rounded-md">
              <h4 className="font-medium mb-2">Required Permissions:</h4>
              <ul className="list-disc pl-6 space-y-1">
                <li>Pages read engagement</li>
                <li>Pages manage posts</li>
                <li>Pages manage metadata</li>
                <li>Pages show list</li>
                <li>Pages manage instant articles</li>
                <li>Pages messaging</li>
                <li>Pages manage ads</li>
              </ul>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="step4">
          <AccordionTrigger>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-green-500" />
              <span>Step 4: Content Guidelines</span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="space-y-4">
            <div className="space-y-4">
              <div>
                <h4 className="font-medium mb-2">Post Requirements:</h4>
                <ul className="list-disc pl-6 space-y-1">
                  <li>High quality images (1200x630px recommended)</li>
                  <li>Clear, engaging captions</li>
                  <li>Relevant hashtags</li>
                  <li>Call-to-action</li>
                </ul>
              </div>

              <div>
                <h4 className="font-medium mb-2">Content Tips:</h4>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Engage with your audience</li>
                  <li>Post consistently</li>
                  <li>Use Facebook Insights</li>
                  <li>Mix content types (photos, videos, links)</li>
                </ul>
              </div>
            </div>
            <Button 
              variant="outline" 
              className="w-full"
              onClick={() => openLink('https://www.facebook.com/business/learn')}
            >
              View Content Creation Guide
              <ExternalLink className="ml-2 h-4 w-4" />
            </Button>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="step5">
          <AccordionTrigger>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-green-500" />
              <span>Step 5: Start Marketing</span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="space-y-4">
            <div className="space-y-4">
              <div>
                <h4 className="font-medium mb-2">Available Features:</h4>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Post scheduling</li>
                  <li>Audience insights</li>
                  <li>Ad management</li>
                  <li>Message management</li>
                </ul>
              </div>

              <div>
                <h4 className="font-medium mb-2">Best Practices:</h4>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Regular posting schedule</li>
                  <li>Engage with comments</li>
                  <li>Monitor insights</li>
                  <li>Test different content types</li>
                </ul>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      <div className="bg-muted p-4 rounded-md mt-6">
        <h3 className="font-medium mb-2">Need Help?</h3>
        <p className="text-sm text-muted-foreground mb-4">
          If you need assistance or have questions, please contact our support team.
        </p>
        <Button variant="outline" className="w-full" onClick={() => openLink('mailto:support@example.com')}>
          Contact Support
          <ExternalLink className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
