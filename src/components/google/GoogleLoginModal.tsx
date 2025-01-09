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

interface GoogleLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export function GoogleLoginModal({ isOpen, onClose, onSuccess }: GoogleLoginModalProps) {
  const [clientId, setClientId] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleConnect = async () => {
    if (!clientId || !clientSecret) {
      setError("Client ID နှင့် Client Secret ကို ဖြည့်သွင်းပေးပါ");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      // API call to connect Google account
      await new Promise((resolve) => setTimeout(resolve, 1000));
      onSuccess();
      onClose();
    } catch (err) {
      setError("Google အကောင့်ချိတ်ဆက်ရာတွင် အမှားတစ်ခု ဖြစ်ပွားခဲ့သည်");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Google အကောင့်ချိတ်ဆက်ရန်</DialogTitle>
          <DialogDescription>
            သင့် Google Ads အကောင့်နှင့် ချိတ်ဆက်ရန် Client ID နှင့် Client Secret လိုအပ်ပါသည်
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
            <Label htmlFor="clientId">Client ID</Label>
            <Input
              id="clientId"
              value={clientId}
              onChange={(e) => setClientId(e.target.value)}
              placeholder="သင့် Google Client ID ထည့်သွင်းပါ"
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="clientSecret">Client Secret</Label>
            <Input
              id="clientSecret"
              type="password"
              value={clientSecret}
              onChange={(e) => setClientSecret(e.target.value)}
              placeholder="သင့် Google Client Secret ထည့်သွင်းပါ"
            />
          </div>

          <div className="bg-muted p-4 rounded-lg space-y-2">
            <p className="text-sm font-medium">Client ID နှင့် Client Secret ရယူရန်:</p>
            <ol className="list-decimal list-inside text-sm space-y-1">
              <li>Google Cloud Console သို့သွားပါ</li>
              <li>Project တစ်ခု တည်ဆောက်ပါ</li>
              <li>OAuth 2.0 client IDs တည်ဆောက်ပါ</li>
              <li>Credentials တွင် Client ID နှင့် Secret ကို ကူးယူပါ</li>
            </ol>
            <Button variant="outline" size="sm" asChild className="mt-2">
              <a
                href="https://console.cloud.google.com/apis/credentials"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center"
              >
                Cloud Console သို့သွားရန်
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
