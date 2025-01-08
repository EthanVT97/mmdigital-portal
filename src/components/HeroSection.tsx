import { Button } from "@/components/ui/button";
import { Facebook, MessageCircle, Search } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const HeroSection = () => {
  const navigate = useNavigate();

  return (
    <div className="relative bg-gradient-to-b from-primary to-secondary py-20 text-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Amplify Your Digital Presence
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-gray-200">
            Manage all your social media advertising campaigns in one place
          </p>
          <Button 
            size="lg" 
            variant="secondary" 
            className="bg-white text-primary hover:bg-gray-100"
            onClick={() => navigate('/dashboard')}
          >
            Get Started
          </Button>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 mt-16">
          <div className="bg-white/10 backdrop-blur-lg rounded-lg p-6 hover:transform hover:scale-105 transition-all">
            <div className="bg-platform-facebook p-3 rounded-full w-fit mb-4">
              <Facebook className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Facebook Ads</h3>
            <p className="text-gray-200">Reach billions of potential customers through targeted Facebook advertising</p>
          </div>
          
          <div className="bg-white/10 backdrop-blur-lg rounded-lg p-6 hover:transform hover:scale-105 transition-all">
            <div className="bg-platform-telegram p-3 rounded-full w-fit mb-4">
              <MessageCircle className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Telegram Ads</h3>
            <p className="text-gray-200">Engage with active users through Telegram's growing advertising platform</p>
          </div>
          
          <div className="bg-white/10 backdrop-blur-lg rounded-lg p-6 hover:transform hover:scale-105 transition-all">
            <div className="bg-platform-google p-3 rounded-full w-fit mb-4">
              <Search className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Google Ads</h3>
            <p className="text-gray-200">Maximize visibility with Google's powerful advertising network</p>
          </div>
        </div>
      </div>
    </div>
  );
};