import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ExternalLink } from "lucide-react";

export function TelegramSetupGuide() {
  return (
    <Card>
      <CardContent className="pt-6">
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="step1">
            <AccordionTrigger>၁။ Telegram Bot တည်ဆောက်ခြင်း</AccordionTrigger>
            <AccordionContent>
              <div className="space-y-4">
                <p>Telegram Bot တည်ဆောက်ရန် အောက်ပါအဆင့်များကို လုပ်ဆောင်ပါ:</p>
                <ol className="list-decimal list-inside space-y-2">
                  <li>BotFather (@BotFather) နှင့် စကားပြောပါ</li>
                  <li>/newbot command ကိုသုံးပါ</li>
                  <li>Bot အမည်နှင့် username ထည့်သွင်းပါ</li>
                  <li>Bot token ကို သိမ်းထားပါ</li>
                  <li>Bot settings များကို သတ်မှတ်ပါ</li>
                </ol>
                <Button variant="outline" asChild>
                  <a
                    href="https://t.me/botfather"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center"
                  >
                    BotFather သို့သွားရန်
                    <ExternalLink className="ml-2 h-4 w-4" />
                  </a>
                </Button>
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="step2">
            <AccordionTrigger>၂။ Channel/Group တည်ဆောက်ခြင်း</AccordionTrigger>
            <AccordionContent>
              <div className="space-y-4">
                <p>သင့် Channel သို့မဟုတ် Group တည်ဆောက်ရန်:</p>
                <ol className="list-decimal list-inside space-y-2">
                  <li>Telegram app ဖွင့်ပါ</li>
                  <li>New Channel/Group ကိုရွေးပါ</li>
                  <li>Channel/Group အမည်ထည့်ပါ</li>
                  <li>အများသုံးနိုင်/ကိုယ်ပိုင်သုံး ရွေးချယ်ပါ</li>
                  <li>Channel/Group link ကို သတ်မှတ်ပါ</li>
                </ol>
                <div className="bg-muted p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">အကြံပြုချက်များ:</h4>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    <li>Channel အမည်တွင် သင့်လုပ်ငန်းအမည် ပါဝင်သင့်သည်</li>
                    <li>Channel description ကို ရှင်းလင်းစွာရေးပါ</li>
                    <li>Channel link ကို မှတ်သားရလွယ်အောင် သတ်မှတ်ပါ</li>
                  </ul>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="step3">
            <AccordionTrigger>၃။ Bot ကို Admin အဖြစ်ထည့်သွင်းခြင်း</AccordionTrigger>
            <AccordionContent>
              <div className="space-y-4">
                <p>Bot ကို Channel/Group တွင် Admin အဖြစ်ထည့်သွင်းရန်:</p>
                <ol className="list-decimal list-inside space-y-2">
                  <li>Channel/Group settings သို့သွားပါ</li>
                  <li>Administrators ကိုရွေးပါ</li>
                  <li>Add Administrator ကိုနှိပ်ပါ</li>
                  <li>Bot username ကိုရှာပြီး ထည့်သွင်းပါ</li>
                  <li>Bot permissions များကို သတ်မှတ်ပါ</li>
                </ol>
                <div className="bg-muted p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">Bot permissions များ:</h4>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    <li>Post messages</li>
                    <li>Edit messages</li>
                    <li>Delete messages</li>
                    <li>Add members</li>
                    <li>Pin messages</li>
                  </ul>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="step4">
            <AccordionTrigger>၄။ ကြော်ငြာတင်ခြင်း</AccordionTrigger>
            <AccordionContent>
              <div className="space-y-4">
                <p>ထိရောက်သော ကြော်ငြာတင်ရန် အကြံပြုချက်များ:</p>
                <ul className="list-disc list-inside space-y-2">
                  <li>ကြော်ငြာစာသားကို ဆွဲဆောင်မှုရှိအောင် ရေးပါ</li>
                  <li>အရည်အသွေးကောင်းသော ပုံ/ဗီဒီယိုများ သုံးပါ</li>
                  <li>Hashtags များကို သင့်လျော်စွာ ထည့်သွင်းပါ</li>
                  <li>ကြော်ငြာတင်ချိန်ကို အကောင်းဆုံးအချိန်တွင် သတ်မှတ်ပါ</li>
                  <li>ကြော်ငြာတင်ကြိမ်နှုန်းကို မျှတအောင်ထားပါ</li>
                </ul>
                <div className="bg-muted p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">အကောင်းဆုံး အချိန်များ:</h4>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    <li>နံနက် ၉:၀၀ - ၁၁:၀၀</li>
                    <li>နေ့လည် ၂:၀၀ - ၄:၀၀</li>
                    <li>ညနေ ၇:၀၀ - ၉:၀၀</li>
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
