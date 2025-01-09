import { Button } from "@/components/ui/button";
import { Facebook, MessageCircle, Search, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const HeroSection = () => {
  const navigate = useNavigate();

  return (
    <div className="relative bg-gradient-to-br from-[#1A365D] to-[#2B6CB0] py-20 text-white overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -right-1/4 -top-1/4 w-1/2 h-1/2 bg-[#1877F2]/10 rounded-full blur-3xl" />
        <div className="absolute -left-1/4 -bottom-1/4 w-1/2 h-1/2 bg-[#0088cc]/10 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            သင့်စီးပွားရေးအတွက် <br />
            <span className="text-blue-300">ဒီဂျစ်တယ်မာကတ်တင်း</span> ဖြေရှင်းချက်များ
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-gray-200">
            ဆိုရှယ်မီဒီယာ ကြော်ငြာအားလုံးကို နေရာတစ်ခုတည်းမှ စီမံခန့်ခွဲပါ
          </p>
          <div className="flex gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-white text-[#1A365D] hover:bg-gray-100 group"
              onClick={() => navigate('/dashboard')}
            >
              စတင်အသုံးပြုရန် 
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-white text-white hover:bg-white/10"
              onClick={() => navigate('/advertisements')}
            >
              ကြော်ငြာများကြည့်ရန်
            </Button>
          </div>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 mt-16">
          <div className="bg-white/10 backdrop-blur-lg rounded-lg p-6 hover:transform hover:scale-105 transition-all border border-white/20">
            <div className="bg-[#1877F2] p-3 rounded-full w-fit mb-4">
              <Facebook className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Facebook ကြော်ငြာများ</h3>
            <p className="text-gray-300">
              သင့်ပရိသတ်နှင့် တိုက်ရိုက်ချိတ်ဆက်ပြီး လုပ်ငန်းအမှတ်တံဆိပ် တည်ဆောက်ပါ
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-lg rounded-lg p-6 hover:transform hover:scale-105 transition-all border border-white/20">
            <div className="bg-[#0088cc] p-3 rounded-full w-fit mb-4">
              <MessageCircle className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Telegram Channel များ</h3>
            <p className="text-gray-300">
              သင့်ထုတ်ကုန်များကို Telegram Channel များမှတစ်ဆင့် ဈေးကွက်ရှာဖွေပါ
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-lg rounded-lg p-6 hover:transform hover:scale-105 transition-all border border-white/20">
            <div className="bg-[#EA4335] p-3 rounded-full w-fit mb-4">
              <Search className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Google ကြော်ငြာများ</h3>
            <p className="text-gray-300">
              Google ရှာဖွေမှုများတွင် ထိပ်ဆုံးမှ ပေါ်လာစေရန် ကြော်ငြာပါ
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};