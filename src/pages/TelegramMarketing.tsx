import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Send } from "lucide-react";
import { useState } from "react";
import { TelegramLoginModal } from "@/components/telegram/TelegramLoginModal";
import { TelegramDashboard } from "@/components/telegram/TelegramDashboard";
import { TelegramSetupGuide } from "@/components/telegram/TelegramSetupGuide";
import { TelegramFreeMarketingGuide } from "@/components/telegram/TelegramFreeMarketingGuide";

export default function TelegramMarketing() {
  const [isConnected, setIsConnected] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSetupGuide, setShowSetupGuide] = useState(true);
  const [showFreeGuide, setShowFreeGuide] = useState(false);

  const handleConnect = async () => {
    setShowLoginModal(true);
  };

  const handleLoginSuccess = () => {
    setIsConnected(true);
    setShowSetupGuide(false);
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Telegram Marketing</h1>
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={() => setShowFreeGuide(!showFreeGuide)}
          >
            <Send className="h-4 w-4 mr-2" />
            အခမဲ့ကြော်ငြာနည်းများ
          </Button>
          <Button
            variant="outline"
            onClick={() => setShowSetupGuide(!showSetupGuide)}
          >
            <Send className="h-4 w-4 mr-2" />
            လမ်းညွှန်
          </Button>
          <Button
            variant={isConnected ? "secondary" : "default"}
            onClick={handleConnect}
          >
            {isConnected ? "Telegram နှင့် ချိတ်ဆက်ထားသည်" : "Telegram နှင့် ချိတ်ဆက်ရန်"}
          </Button>
        </div>
      </div>

      {showFreeGuide && <TelegramFreeMarketingGuide />}

      {showSetupGuide && (
        <Card>
          <CardContent className="pt-6">
            <TelegramSetupGuide />
          </CardContent>
        </Card>
      )}

      <TelegramLoginModal
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        onSuccess={handleLoginSuccess}
      />

      {isConnected ? (
        <TelegramDashboard />
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col items-center space-y-2">
                <Send className="h-8 w-8 text-muted-foreground" />
                <h3 className="text-xl font-semibold">အဆင့် ၁</h3>
                <p className="text-sm text-center text-muted-foreground">
                  Telegram Bot တည်ဆောက်ပါ
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col items-center space-y-2">
                <Send className="h-8 w-8 text-muted-foreground" />
                <h3 className="text-xl font-semibold">အဆင့် ၂</h3>
                <p className="text-sm text-center text-muted-foreground">
                  Channel/Group တည်ဆောက်ပါ
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col items-center space-y-2">
                <Send className="h-8 w-8 text-muted-foreground" />
                <h3 className="text-xl font-semibold">အဆင့် ၃</h3>
                <p className="text-sm text-center text-muted-foreground">
                  Bot ကို Admin အဖြစ်ထည့်ပါ
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col items-center space-y-2">
                <Send className="h-8 w-8 text-muted-foreground" />
                <h3 className="text-xl font-semibold">အဆင့် ၄</h3>
                <p className="text-sm text-center text-muted-foreground">
                  ပထမဆုံး ကြော်ငြာတင်ပါ
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
