import { Users, TrendingUp, Award, Building2 } from "lucide-react";

export const StatsSection = () => {
  const stats = [
    {
      icon: <Users className="w-8 h-8 text-[#1877F2]" />,
      value: "၁၀,၀၀၀+",
      label: "အသုံးပြုသူများ",
    },
    {
      icon: <TrendingUp className="w-8 h-8 text-[#0088cc]" />,
      value: "၅၀၀+",
      label: "အောင်မြင်သော ကမ်ပိန်းများ",
    },
    {
      icon: <Award className="w-8 h-8 text-[#EA4335]" />,
      value: "၉၈%",
      label: "ဖောက်သည် စိတ်ကျေနပ်မှု",
    },
    {
      icon: <Building2 className="w-8 h-8 text-[#1A365D]" />,
      value: "၁၀၀+",
      label: "မိတ်ဖက်ကုမ္ပဏီများ",
    },
  ];

  return (
    <div className="bg-[#1A365D] text-white py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            ကျွန်ုပ်တို့၏ အောင်မြတ်မှုများ
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Digital Marketing လောကတွင် ယုံကြည်စိတ်ချရသော မိတ်ဖက်ကောင်းတစ်ဦး ဖြစ်ပါသည်
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div 
              key={index} 
              className="text-center p-6 rounded-xl bg-white/5 backdrop-blur-lg border border-white/10 hover:bg-white/10 transition-colors"
            >
              <div className="inline-block mb-4 p-3 rounded-full bg-white/10">
                {stat.icon}
              </div>
              <div className="text-3xl md:text-4xl font-bold mb-2">{stat.value}</div>
              <div className="text-gray-300">{stat.label}</div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <blockquote className="text-2xl italic text-gray-300 max-w-3xl mx-auto">
            "Digital Marketing သည် ယနေ့ခေတ် စီးပွားရေးအောင်မြင်မှု၏ အဓိက သော့ချက် ဖြစ်ပါသည်"
          </blockquote>
          <div className="mt-4 text-gray-400">
            - ဦးအောင်မြင့် | CEO, Digital Myanmar
          </div>
        </div>
      </div>
    </div>
  );
};