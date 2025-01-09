import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle, ExternalLink } from "lucide-react";

interface TelegramLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export function TelegramLoginModal({
  isOpen,
  onClose,
  onSuccess,
}: TelegramLoginModalProps) {
  const [botToken, setBotToken] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleConnect = async () => {
    if (!botToken) {
      setError("Bot Token ကို ဖြည့်သွင်းပေးပါ");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      // API call to connect Telegram bot
      await new Promise((resolve) => setTimeout(resolve, 1000));
      onSuccess();
      onClose();
    } catch (err) {
      setError("Telegram Bot ချိတ်ဆက်ရာတွင် အမှားတစ်ခု ဖြစ်ပွားခဲ့သည်");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Telegram Bot ချိတ်ဆက်ရန်</DialogTitle>
          <DialogDescription>
            သင့် Telegram Bot နှင့် ချိတ်ဆက်ရန် Bot Token လိုအပ်ပါသည်
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <div className="grid gap-2">
            <Label htmlFor="botToken">Bot Token</Label>
            <Input
              id="botToken"
              value={botToken}
              onChange={(e) => setBotToken(e.target.value)}
              placeholder="သင့် Bot Token ထည့်သွင်းပါ"
            />
          </div>

          <div className="bg-muted p-4 rounded-lg space-y-2">
            <p className="text-sm font-medium">Bot Token ရယူရန်:</p>
            <ol className="list-decimal list-inside text-sm space-y-1">
              <li>BotFather (@BotFather) နှင့် စကားပြောပါ</li>
              <li>/newbot command ကိုသုံးပါ</li>
              <li>Bot အမည်နှင့် username ထည့်သွင်းပါ</li>
              <li>Bot token ကို ကူးယူပါ</li>
            </ol>
            <Button variant="outline" size="sm" asChild className="mt-2">
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
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            ပယ်ဖျက်မည်
          </Button>
          <Button onClick={handleConnect} disabled={isLoading}>
            {isLoading ? "ချိတ်ဆက်နေသည်..." : "ချိတ်ဆက်မည်"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
