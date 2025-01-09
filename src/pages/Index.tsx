import { HeroSection } from "@/components/HeroSection";
import { ServicesSection } from "@/components/ServicesSection";
import { StatsSection } from "@/components/StatsSection";
import { PricingSection } from "@/components/PricingSection";
import { ContactSection } from "@/components/ContactSection";
import { Navigation } from "@/components/Navigation";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useSession } from "@supabase/auth-helpers-react";
import {
  Facebook,
  Youtube,
  MessagesSquare,
  ArrowRight,
  BarChart2,
  Target,
  Zap,
  Users,
} from "lucide-react";

// Custom TikTok icon since it's not in lucide-react
const TikTok = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M16.83 5.5a4.78 4.78 0 0 0 3.4 1.5v3.5a7.82 7.82 0 0 1-3.4-.77v4.72A5.5 5.5 0 1 1 11.33 9v3.5a2 2 0 1 0 2.5 1.95V4h3v1.5Z" />
  </svg>
);

const Index = () => {
  const navigate = useNavigate();
  const session = useSession();

  const platforms = [
    {
      name: "Facebook",
      icon: Facebook,
      color: "bg-blue-500",
      route: "/campaigns/facebook",
      description: "Reach billions of users with targeted Facebook ads",
    },
    {
      name: "YouTube",
      icon: Youtube,
      color: "bg-red-500",
      route: "/campaigns/youtube",
      description: "Create engaging video campaigns on YouTube",
    },
    {
      name: "TikTok",
      icon: TikTok,
      color: "bg-pink-500",
      route: "/campaigns/tiktok",
      description: "Go viral with TikTok's creative ad platform",
    },
    {
      name: "Telegram",
      icon: MessagesSquare,
      color: "bg-blue-400",
      route: "/campaigns/telegram",
      description: "Reach engaged audiences through Telegram channels",
    },
  ];

  const features = [
    {
      title: "Advanced Analytics",
      description: "Track your campaign performance in real-time with detailed metrics",
      icon: BarChart2,
    },
    {
      title: "Targeted Campaigns",
      description: "Reach your ideal audience with precision targeting",
      icon: Target,
    },
    {
      title: "Quick Setup",
      description: "Launch your campaigns in minutes with our streamlined process",
      icon: Zap,
    },
    {
      title: "Audience Insights",
      description: "Understand your audience better with detailed demographics",
      icon: Users,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Navigation />
      <div className="container mx-auto px-4 py-20">
        <div className="text-center">
          <h1 className="text-5xl font-bold text-white mb-6">
            မြန်မာနိုင်ငံ၏ ထိပ်တန်း Digital Marketing Platform
          </h1>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            သင့်ရဲ့ Digital Marketing လုပ်ငန်းများကို Platform တစ်ခုတည်းမှာ စီမံခန့်ခွဲနိုင်ပါပြီ။
          </p>
          <Button
            onClick={() => navigate(session ? '/dashboard' : '/register')}
            className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white px-8 py-6 rounded-lg text-lg"
          >
            {session ? 'Go to Dashboard' : 'Get Started'} <ArrowRight className="ml-2" />
          </Button>
        </div>
      </div>

      {/* Platforms Section */}
      <div className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-white text-center mb-12">
          Supported Platforms
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {platforms.map((platform) => (
            <Card
              key={platform.name}
              className="bg-gray-800/50 border-none hover:bg-gray-700/50 transition-all cursor-pointer"
              onClick={() => navigate(platform.route)}
            >
              <CardContent className="p-6">
                <div className={`${platform.color} w-12 h-12 rounded-lg flex items-center justify-center mb-4`}>
                  <platform.icon className="text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">
                  {platform.name}
                </h3>
                <p className="text-gray-400">
                  {platform.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Features Section */}
      <div className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-white text-center mb-12">
          Why Choose MMDIGITAL
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature) => (
            <Card
              key={feature.title}
              className="bg-gray-800/50 border-none"
            >
              <CardContent className="p-6">
                <div className="bg-gradient-to-r from-cyan-500 to-blue-500 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                  <feature.icon className="text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-400">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Pricing Section */}
      <PricingSection />

      {/* CTA Section */}
      <div className="container mx-auto px-4 py-20">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-white mb-6">
            Ready to Grow Your Business with MMDIGITAL?
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Join thousands of businesses that trust MMDIGITAL with their digital marketing campaigns.
          </p>
          <Button
            onClick={() => navigate(session ? '/dashboard' : '/register')}
            className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white px-8 py-6 rounded-lg text-lg"
          >
            {session ? 'Launch Your Campaign' : 'Start Free Trial'} <ArrowRight className="ml-2" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Index;