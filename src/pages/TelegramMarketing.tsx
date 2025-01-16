import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Send, Bot, Users, Shield, MessageSquare, AlertCircle } from "lucide-react";
import { useState, useEffect, useCallback } from "react";
import { TelegramLoginModal } from "@/components/telegram/TelegramLoginModal";
import { TelegramDashboard } from "@/components/telegram/TelegramDashboard";
import { TelegramSetupGuide } from "@/components/telegram/TelegramSetupGuide";
import { TelegramFreeMarketingGuide } from "@/components/telegram/TelegramFreeMarketingGuide";
import { useToast } from "@/components/ui/use-toast";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface TelegramStats {
  subscribers: number;
  messages: number;
  engagement: number;
}

export default function TelegramMarketing() {
  const [isConnected, setIsConnected] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSetupGuide, setShowSetupGuide] = useState(true);
  const [showFreeGuide, setShowFreeGuide] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [stats, setStats] = useState<TelegramStats | null>(null);
  const { toast } = useToast();

  const fetchTelegramStats = useCallback(async () => {
    try {
      // Implement actual API call here
      const response = await fetch("/api/telegram/stats");
      const data = await response.json();
      setStats(data);
    } catch (error) {
      console.error("Failed to fetch stats:", error);
      toast({
        title: "Error",
        description: "Failed to fetch Telegram statistics",
        variant: "destructive",
      });
    }
  }, [toast]);

  useEffect(() => {
    // Check for existing Telegram connection
    const checkConnection = async () => {
      try {
        const token = localStorage.getItem("telegram_token");
        if (token) {
          setIsConnected(true);
          await fetchTelegramStats();
        }
      } catch (error) {
        console.error("Connection check failed:", error);
      }
    };

    checkConnection();
  }, [fetchTelegramStats]);

  const handleConnect = async () => {
    setIsLoading(true);
    try {
      setShowLoginModal(true);
    } catch (error) {
      toast({
        title: "Connection Error",
        description: "Telegram နှင့် ချိတ်ဆက်ရာတွင် အမှားရှိနေပါသည်",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleLoginSuccess = async () => {
    setIsConnected(true);
    setShowSetupGuide(false);
    toast({
      title: "Connected",
      description: "Telegram နှင့် အောင်မြင်စွာ ချိတ်ဆက်ပြီးပါပြီ",
    });
    await fetchTelegramStats();
  };

  const handleDisconnect = async () => {
    try {
      localStorage.removeItem("telegram_token");
      setIsConnected(false);
      setStats(null);
      toast({
        title: "Disconnected",
        description: "Telegram ချိတ်ဆက်မှု ရပ်ဆိုင်းပြီးပါပြီ",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to disconnect from Telegram",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Telegram Marketing</h1>
          {stats && (
            <p className="text-sm text-muted-foreground mt-2">
              စုစုပေါင်း Member: {stats.subscribers} | Messages: {stats.messages} |
              Engagement: {stats.engagement}%
            </p>
          )}
        </div>
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
          {isConnected ? (
            <Button variant="destructive" onClick={handleDisconnect}>
              Telegram မှ ဖြုတ်ရန်
            </Button>
          ) : (
            <Button
              variant="default"
              onClick={handleConnect}
              disabled={isLoading}
            >
              {isLoading ? "ချိတ်ဆက်နေသည်..." : "Telegram နှင့် ချိတ်ဆက်ရန်"}
            </Button>
          )}
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
        <>
          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              Telegram Marketing စတင်ရန် အောက်ပါအဆင့်များကို လုပ်ဆောင်ပါ
            </AlertDescription>
          </Alert>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardContent className="pt-6">
                <div className="flex flex-col items-center space-y-2">
                  <Bot className="h-8 w-8 text-muted-foreground" />
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
                  <Users className="h-8 w-8 text-muted-foreground" />
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
                  <Shield className="h-8 w-8 text-muted-foreground" />
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
                  <MessageSquare className="h-8 w-8 text-muted-foreground" />
                  <h3 className="text-xl font-semibold">အဆင့် ၄</h3>
                  <p className="text-sm text-center text-muted-foreground">
                    ပထမဆုံး ကြော်ငြာတင်ပါ
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </>
      )}
    </div>
  );
}
