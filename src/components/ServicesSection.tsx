import { Button } from "@/components/ui/button";
import { 
  BarChart3, 
  Target, 
  Users, 
  MessageSquare, 
  TrendingUp, 
  Settings 
} from "lucide-react";

export const ServicesSection = () => {
  const services = [
    {
      icon: <Target className="w-8 h-8 text-[#1877F2]" />,
      title: "ပစ်မှတ်ထား ကြော်ငြာခြင်း",
      description: "သင့်လုပ်ငန်းနှင့် သင့်လျော်သော ဖောက်သည်များထံ တိကျစွာ ရောက်ရှိအောင် ကြော်ငြာပါ",
    },
    {
      icon: <BarChart3 className="w-8 h-8 text-[#0088cc]" />,
      title: "အချက်အလက် စိစစ်လေ့လာခြင်း",
      description: "သင့်ကြော်ငြာ၏ စွမ်းဆောင်ရည်ကို အသေးစိတ် လေ့လာဆန်းစစ်ပါ",
    },
    {
      icon: <Users className="w-8 h-8 text-[#EA4335]" />,
      title: "ပရိသတ် စီမံခန့်ခွဲခြင်း",
      description: "သင့်ပရိသတ်များကို segment များခွဲခြားပြီး သီးခြားကြော်ငြာများ ပြုလုပ်ပါ",
    },
    {
      icon: <MessageSquare className="w-8 h-8 text-[#1877F2]" />,
      title: "အလိုအလျောက် တုံ့ပြန်မှု",
      description: "ဖောက်သည်များ၏ မှတ်ချက်များကို အလိုအလျောက် တုံ့ပြန်ပေးသော စနစ်",
    },
    {
      icon: <TrendingUp className="w-8 h-8 text-[#0088cc]" />,
      title: "ROI တိုးမြှင့်ခြင်း",
      description: "ကြော်ငြာအသုံးစရိတ်နှင့် အကျိုးအမြတ်ကို ထိရောက်စွာ စီမံခန့်ခွဲပါ",
    },
    {
      icon: <Settings className="w-8 h-8 text-[#EA4335]" />,
      title: "အဆင့်မြင့် လုပ်ဆောင်ချက်များ",
      description: "A/B testing နှင့် အခြား အဆင့်မြင့် marketing နည်းပညာများ",
    },
  ];

  return (
    <div className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4 text-[#1A365D]">
            ကျွန်ုပ်တို့၏ ဝန်ဆောင်မှုများ
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            သင့်လုပ်ငန်း တိုးတက်စေရန် လိုအပ်သော Digital Marketing ဝန်ဆောင်မှုများ အားလုံး
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div 
              key={index}
              className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <div className="mb-4">{service.icon}</div>
              <h3 className="text-xl font-semibold mb-2 text-[#1A365D]">
                {service.title}
              </h3>
              <p className="text-gray-600">{service.description}</p>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button 
            size="lg"
            className="bg-[#1A365D] hover:bg-[#2B6CB0] text-white"
          >
            ဝန်ဆောင်မှုများအားလုံး ကြည့်ရှုရန်
          </Button>
        </div>
      </div>
    </div>
  );
};