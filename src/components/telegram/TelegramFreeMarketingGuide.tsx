import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export function TelegramFreeMarketingGuide() {
  return (
    <Card>
      <CardContent className="pt-6">
        <div className="mb-6">
          <h2 className="text-2xl font-bold mb-2">Telegram အခမဲ့ကြော်ငြာနည်းလမ်းများ</h2>
          <p className="text-muted-foreground">
            Telegram တွင် ငွေကုန်ကြေးကျများစွာမရှိဘဲ ထိရောက်စွာ ကြော်ငြာနိုင်သည့် နည်းလမ်းများ
          </p>
        </div>

        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="strategy1">
            <AccordionTrigger>
              <div className="flex items-center gap-2">
                <span>၁။ Group များတွင် ကြော်ငြာတင်ခြင်း</span>
                <Badge variant="secondary">အခမဲ့</Badge>
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <div className="space-y-4">
                <p>သင့်လုပ်ငန်းနှင့် သက်ဆိုင်သော Group များတွင် ကြော်ငြာတင်နည်း:</p>
                <ol className="list-decimal list-inside space-y-2">
                  <li>သင့်လုပ်ငန်းနှင့် သက်ဆိုင်သော Group များကို ရှာဖွေပါ</li>
                  <li>Group စည်းမျဉ်းများကို သေချာဖတ်ပါ</li>
                  <li>Group Admin များနှင့် ဆက်သွယ်ပါ</li>
                  <li>Group တွင် တန်ဖိုးရှိသော အကြောင်းအရာများ မျှဝေပါ</li>
                  <li>သင့်လုပ်ငန်းအကြောင်း တိုက်ရိုက်မကြော်ငြာဘဲ သွယ်ဝိုက်၍ မိတ်ဆက်ပါ</li>
                </ol>
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="strategy2">
            <AccordionTrigger>
              <div className="flex items-center gap-2">
                <span>၂။ Channel များနှင့် ပူးပေါင်းခြင်း</span>
                <Badge variant="secondary">အခမဲ့</Badge>
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <div className="space-y-4">
                <p>အခြား Channel များနှင့် အပြန်အလှန် ကြော်ငြာဖလှယ်နည်း:</p>
                <ol className="list-decimal list-inside space-y-2">
                  <li>သင့်လုပ်ငန်းနှင့် ဆက်စပ်သော Channel များကို ရှာဖွေပါ</li>
                  <li>Channel ပိုင်ရှင်များနှင့် ဆက်သွယ်ပါ</li>
                  <li>အပြန်အလှန် ကြော်ငြာဖလှယ်ရန် အဆိုပြုပါ</li>
                  <li>နှစ်ဖက်စလုံးအတွက် အကျိုးရှိမည့် အစီအစဉ်ကို ရေးဆွဲပါ</li>
                  <li>ပူးပေါင်းဆောင်ရွက်မှုကို စတင်ပါ</li>
                </ol>
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="strategy3">
            <AccordionTrigger>
              <div className="flex items-center gap-2">
                <span>၃။ တန်ဖိုးရှိသော အကြောင်းအရာများ ဖန်တီးခြင်း</span>
                <Badge variant="secondary">အခမဲ့</Badge>
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <div className="space-y-4">
                <p>စိတ်ဝင်စားဖွယ် အကြောင်းအရာများ ဖန်တီးနည်း:</p>
                <ol className="list-decimal list-inside space-y-2">
                  <li>သင့်လုပ်ငန်းနယ်ပယ်မှ အသုံးဝင်သော အချက်အလက်များ မျှဝေပါ</li>
                  <li>Tutorial နှင့် How-to guide များ ရေးသားပါ</li>
                  <li>လုပ်ငန်းနယ်ပယ်မှ နောက်ဆုံးရ သတင်းများ မျှဝေပါ</li>
                  <li>ဗီဒီယိုနှင့် ရုပ်ပုံများ ထည့်သွင်းပါ</li>
                  <li>ပရိသတ်များနှင့် အပြန်အလှန် ဆက်သွယ်ပါ</li>
                </ol>
                <div className="bg-muted p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">အကြောင်းအရာ အမျိုးအစားများ:</h4>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    <li>နည်းပညာ အကြံပေးချက်များ</li>
                    <li>Case study များ</li>
                    <li>FAQ များ</li>
                    <li>Industry insights များ</li>
                    <li>Success stories များ</li>
                  </ul>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="strategy4">
            <AccordionTrigger>
              <div className="flex items-center gap-2">
                <span>၄။ Bot အသုံးပြု၍ ဝန်ဆောင်မှုပေးခြင်း</span>
                <Badge variant="secondary">အခမဲ့</Badge>
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <div className="space-y-4">
                <p>Bot ဖြင့် အလိုအလျောက် ဝန်ဆောင်မှုပေးနည်း:</p>
                <ol className="list-decimal list-inside space-y-2">
                  <li>ဝန်ဆောင်မှုပေးမည့် Bot တစ်ခု တည်ဆောက်ပါ</li>
                  <li>အသုံးဝင်သော command များ ထည့်သွင်းပါ</li>
                  <li>FAQ များကို အလိုအလျောက် ဖြေကြားနိုင်အောင် သတ်မှတ်ပါ</li>
                  <li>ဝယ်ယူသူများအတွက် အကူအညီပေးနိုင်သော feature များ ထည့်သွင်းပါ</li>
                  <li>24/7 ဝန်ဆောင်မှုပေးနိုင်အောင် စီစဉ်ပါ</li>
                </ol>
                <div className="bg-muted p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">Bot commands များ:</h4>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    <li>/start - Bot မိတ်ဆက်</li>
                    <li>/help - အကူအညီတောင်းခံရန်</li>
                    <li>/products - ပစ္စည်းစာရင်းကြည့်ရန်</li>
                    <li>/price - စျေးနှုန်းများကြည့်ရန်</li>
                    <li>/contact - ဆက်သွယ်ရန်</li>
                  </ul>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="strategy5">
            <AccordionTrigger>
              <div className="flex items-center gap-2">
                <span>၅။ Viral Marketing နည်းဗျူဟာများ</span>
                <Badge variant="secondary">အခမဲ့</Badge>
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <div className="space-y-4">
                <p>လူမှုကွန်ရက်တွင် viral ဖြစ်စေရန် နည်းလမ်းများ:</p>
                <ol className="list-decimal list-inside space-y-2">
                  <li>ဆွဲဆောင်မှုရှိသော ပုံများနှင့် ဗီဒီယိုများ ဖန်တီးပါ</li>
                  <li>Challenge များ ပြုလုပ်ပါ</li>
                  <li>ပရိသတ်များပါဝင်နိုင်သော ပွဲများ စီစဉ်ပါ</li>
                  <li>Hashtag campaign များ ပြုလုပ်ပါ</li>
                  <li>ဆုလက်ဆောင်များ ပေးအပ်ပါ</li>
                </ol>
                <div className="bg-muted p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">Viral ဖြစ်စေရန် အချက်များ:</h4>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    <li>ရိုးရှင်းပြီး မှတ်မိလွယ်အောင် ဖန်တီးပါ</li>
                    <li>စိတ်ခံစားမှုကို လှုံ့ဆော်ပါ</li>
                    <li>Share လုပ်လိုစိတ် ဖြစ်စေပါ</li>
                    <li>အချိန်နှင့် တပြေးညီဖြစ်စေပါ</li>
                    <li>ပရိသတ်များ ပါဝင်နိုင်အောင် ဖန်တီးပါ</li>
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
