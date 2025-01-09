import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ExternalLink } from "lucide-react";

export function GoogleSetupGuide() {
  return (
    <Card>
      <CardContent className="pt-6">
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="step1">
            <AccordionTrigger>၁။ Google Ads အကောင့်ဖွင့်ခြင်း</AccordionTrigger>
            <AccordionContent>
              <div className="space-y-4">
                <p>Google Ads အကောင့်ဖွင့်ရန် အောက်ပါအဆင့်များကို လုပ်ဆောင်ပါ:</p>
                <ol className="list-decimal list-inside space-y-2">
                  <li>ads.google.com သို့သွားပါ</li>
                  <li>&quot;Start Now&quot; ကိုနှိပ်ပါ</li>
                  <li>သင့်ကြော်ငြာ ရည်ရွယ်ချက်ကို ရွေးချယ်ပါ</li>
                  <li>စီးပွားရေးလုပ်ငန်း အချက်အလက်များကို ဖြည့်သွင်းပါ</li>
                  <li>ငွေပေးချေမှုဆိုင်ရာ အချက်အလက်များကို ထည့်သွင်းပါ</li>
                </ol>
                <Button variant="outline" asChild>
                  <a
                    href="https://ads.google.com/start"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center"
                  >
                    Google Ads သို့သွားရန်
                    <ExternalLink className="ml-2 h-4 w-4" />
                  </a>
                </Button>
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="step2">
            <AccordionTrigger>၂။ Google Analytics ချိတ်ဆက်ခြင်း</AccordionTrigger>
            <AccordionContent>
              <div className="space-y-4">
                <p>သင့်ကြော်ငြာ စွမ်းဆောင်ရည်ကို စောင့်ကြည့်ရန် Google Analytics ချိတ်ဆက်ပါ:</p>
                <ol className="list-decimal list-inside space-y-2">
                  <li>analytics.google.com သို့သွားပါ</li>
                  <li>&quot;Start measuring&quot; ကိုနှိပ်ပါ</li>
                  <li>Property အသစ်တည်ဆောက်ပါ</li>
                  <li>Tracking code ကို သင့် website တွင်ထည့်သွင်းပါ</li>
                  <li>Google Ads နှင့် ချိတ်ဆက်ပါ</li>
                </ol>
                <Button variant="outline" asChild>
                  <a
                    href="https://analytics.google.com/analytics"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center"
                  >
                    Analytics ချိတ်ဆက်ရန်
                    <ExternalLink className="ml-2 h-4 w-4" />
                  </a>
                </Button>
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="step3">
            <AccordionTrigger>၃။ ပထမဆုံး ကြော်ငြာတည်ဆောက်ခြင်း</AccordionTrigger>
            <AccordionContent>
              <div className="space-y-4">
                <p>ထိရောက်သော ကြော်ငြာတည်ဆောက်ရန် အဆင့်များ:</p>
                <ol className="list-decimal list-inside space-y-2">
                  <li>ကြော်ငြာအမျိုးအစား ရွေးချယ်ပါ (Search, Display, Video)</li>
                  <li>ပစ်မှတ်ထားသော ပရိသတ်ကို သတ်မှတ်ပါ</li>
                  <li>ဆွဲဆောင်မှုရှိသော ကြော်ငြာစာသားရေးပါ</li>
                  <li>ဘတ်ဂျက်နှင့် ဈေးနှုန်းမဟာဗျူဟာ သတ်မှတ်ပါ</li>
                  <li>Conversion tracking ထည့်သွင်းပါ</li>
                </ol>
                <div className="bg-muted p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">အကြံပြုချက်များ:</h4>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    <li>စမ်းသပ်ရန်နှင့် optimize လုပ်ရန် ဘတ်ဂျက်အနည်းငယ်ဖြင့် စတင်ပါ</li>
                    <li>ရှာဖွေမှုများသော keywords များကို အသုံးပြုပါ</li>
                    <li>စွမ်းဆောင်ရည်စစ်ဆေးရန် ကြော်ငြာအမျိုးမျိုး တည်ဆောက်ပါ</li>
                    <li>ကုန်ကျစရိတ်လျှော့ချရန် quality score ကို စောင့်ကြည့်ပါ</li>
                  </ul>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="step4">
            <AccordionTrigger>၄။ ကြော်ငြာများကို optimize လုပ်ခြင်း</AccordionTrigger>
            <AccordionContent>
              <div className="space-y-4">
                <p>ကြော်ငြာ optimize လုပ်ရန် အကောင်းဆုံးနည်းလမ်းများ:</p>
                <ul className="list-disc list-inside space-y-2">
                  <li>Search terms report ကို ပုံမှန်စစ်ဆေးပါ</li>
                  <li>စွမ်းဆောင်ရည်ပေါ်မူတည်၍ ဈေးနှုန်းညှိပါ</li>
                  <li>ကြော်ငြာစာသားနှင့် extensions အမျိုးမျိုး စမ်းသပ်ပါ</li>
                  <li>Quality score ကို စောင့်ကြည့်ပြီး တိုးတက်အောင်လုပ်ပါ</li>
                  <li>ပရိသတ်အချက်အလက်များကို လေ့လာ၍ targeting ပြင်ဆင်ပါ</li>
                </ul>
                <div className="bg-muted p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">အဓိက စောင့်ကြည့်ရမည့် အချက်များ:</h4>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    <li>Click-through rate (CTR)</li>
                    <li>Conversion rate</li>
                    <li>ကြော်ငြာတစ်ခုချင်းစီ၏ ကုန်ကျစရိတ်</li>
                    <li>ကြော်ငြာအသုံးစရိတ်အပေါ် ပြန်ရချက် (ROAS)</li>
                  </ul>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </CardContent>
    </Card>
  );
}
