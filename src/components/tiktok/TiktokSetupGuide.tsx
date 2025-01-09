import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { ExternalLink, CheckCircle2 } from "lucide-react";

export function TiktokSetupGuide() {
  const openLink = (url: string) => {
    window.open(url, '_blank');
  };

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold">TikTok Marketing Setup Guide</h2>
        <p className="text-muted-foreground">
          Follow these steps to start using TikTok Marketing
        </p>
      </div>

      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="step1">
          <AccordionTrigger>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-green-500" />
              <span>Step 1: Create TikTok Account</span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="space-y-4">
            <ol className="list-decimal pl-6 space-y-2">
              <li>Download TikTok app သို့မဟုတ် website မှတစ်ဆင့် account ဖွင့်ပါ</li>
              <li>Email နှင့် phone number verify လုပ်ပါ</li>
              <li>Profile information ဖြည့်ပါ</li>
            </ol>
            <Button 
              variant="outline" 
              className="w-full"
              onClick={() => openLink('https://www.tiktok.com/signup')}
            >
              Create TikTok Account
              <ExternalLink className="ml-2 h-4 w-4" />
            </Button>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="step2">
          <AccordionTrigger>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-green-500" />
              <span>Step 2: Switch to Business Account</span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="space-y-4">
            <ol className="list-decimal pl-6 space-y-2">
              <li>TikTok app ထဲမှာ Profile သို့သွားပါ</li>
              <li>Menu ထဲမှ Settings and Privacy ကိုနှိပ်ပါ</li>
              <li>Account မှာ "Switch to Business Account" ကိုရွေးပါ</li>
              <li>Business category ရွေးပါ</li>
              <li>Business information ဖြည့်ပါ</li>
            </ol>
            <Button 
              variant="outline" 
              className="w-full"
              onClick={() => openLink('https://www.tiktok.com/business/en')}
            >
              Go to TikTok Business Center
              <ExternalLink className="ml-2 h-4 w-4" />
            </Button>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="step3">
          <AccordionTrigger>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-green-500" />
              <span>Step 3: Connect Your Account</span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="space-y-4">
            <ol className="list-decimal pl-6 space-y-2">
              <li>"Connect TikTok Account" button ကိုနှိပ်ပါ</li>
              <li>TikTok username ထည့်ပါ (@ symbol ပါရပါမယ်)</li>
              <li>Password ထည့်ပါ</li>
              <li>Permission များကို allow လုပ်ပေးပါ</li>
            </ol>
            <div className="bg-muted p-4 rounded-md">
              <h4 className="font-medium mb-2">Required Permissions:</h4>
              <ul className="list-disc pl-6 space-y-1">
                <li>Basic information access</li>
                <li>Video management</li>
                <li>Analytics access</li>
                <li>Content publishing</li>
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
                <h4 className="font-medium mb-2">Video Requirements:</h4>
                <ul className="list-disc pl-6 space-y-1">
                  <li>HD quality video (1080p recommended)</li>
                  <li>Vertical format (9:16 ratio)</li>
                  <li>15-60 seconds duration</li>
                  <li>File size: 100MB အထိ</li>
                </ul>
              </div>

              <div>
                <h4 className="font-medium mb-2">Content Tips:</h4>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Copyright-free music သို့မဟုတ် licensed music သုံးပါ</li>
                  <li>Trending hashtags သုံးပါ</li>
                  <li>Clear captions ရေးပါ</li>
                  <li>Regular posting schedule ထားပါ</li>
                </ul>
              </div>
            </div>
            <Button 
              variant="outline" 
              className="w-full"
              onClick={() => openLink('https://www.tiktok.com/creators/creator-portal/')}
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
                  <li>Content upload and scheduling</li>
                  <li>Analytics tracking</li>
                  <li>Audience insights</li>
                  <li>Campaign management</li>
                </ul>
              </div>

              <div>
                <h4 className="font-medium mb-2">Best Practices:</h4>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Audience engagement လုပ်ပါ</li>
                  <li>Analytics ကို မှန်မှန်စစ်ဆေးပါ</li>
                  <li>A/B testing လုပ်ပါ</li>
                  <li>Content quality ကို အမြဲထိန်းသိမ်းပါ</li>
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
