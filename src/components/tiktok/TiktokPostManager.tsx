import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Upload, Video, Music, Clock, Send } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

export function TiktokPostManager() {
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [caption, setCaption] = useState("");
  const [sound, setSound] = useState("");
  const [scheduledTime, setScheduledTime] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleVideoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.type.startsWith("video/")) {
        setVideoFile(file);
        setError("");
      } else {
        setError("ဗီဒီယိုဖိုင်သာ ရွေးချယ်ပါ");
      }
    }
  };

  const handlePost = async () => {
    if (!videoFile) {
      setError("ဗီဒီယိုဖိုင် ရွေးချယ်ပေးပါ");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      // API call to upload and post video
      await new Promise((resolve) => setTimeout(resolve, 1000));
      // Reset form
      setVideoFile(null);
      setCaption("");
      setSound("");
      setScheduledTime("");
    } catch (err) {
      setError("ပို့စ်တင်ရာတွင် အမှားတစ်ခု ဖြစ်ပွားခဲ့သည်");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>TikTok ပို့စ်အသစ်တင်ရန်</CardTitle>
          <CardDescription>
            သင့် TikTok အကောင့်သို့ ဗီဒီယိုတင်ရန်
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <div className="space-y-2">
            <Label>ဗီဒီယို</Label>
            <div className="flex items-center gap-4">
              <Button
                variant="outline"
                className="w-full h-32 flex flex-col items-center justify-center border-dashed"
                onClick={() => document.getElementById("video-upload")?.click()}
              >
                {videoFile ? (
                  <>
                    <Video className="h-8 w-8 mb-2" />
                    {videoFile.name}
                  </>
                ) : (
                  <>
                    <Upload className="h-8 w-8 mb-2" />
                    ဗီဒီယိုရွေးရန် နှိပ်ပါ
                  </>
                )}
              </Button>
              <input
                id="video-upload"
                type="file"
                accept="video/*"
                className="hidden"
                onChange={handleVideoUpload}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label>စာသား</Label>
            <Textarea
              placeholder="ပို့စ်စာသား ရေးပါ"
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label>သီချင်း</Label>
            <div className="flex gap-2">
              <Input
                placeholder="သီချင်းအမည် ရှာပါ"
                value={sound}
                onChange={(e) => setSound(e.target.value)}
              />
              <Button variant="outline" size="icon">
                <Music className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="space-y-2">
            <Label>ပို့စ်တင်မည့်အချိန်</Label>
            <div className="flex gap-2">
              <Select
                value={scheduledTime}
                onValueChange={setScheduledTime}
              >
                <SelectTrigger>
                  <SelectValue placeholder="အချိန်ရွေးပါ" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="now">ယခုတင်မည်</SelectItem>
                  <SelectItem value="later">နောက်မှတင်မည်</SelectItem>
                </SelectContent>
              </Select>
              {scheduledTime === "later" && (
                <Input
                  type="datetime-local"
                  className="flex-1"
                />
              )}
            </div>
          </div>

          <div className="flex justify-end gap-2">
            <Button variant="outline">
              မူကြမ်းသိမ်းမည်
            </Button>
            <Button onClick={handlePost} disabled={isLoading}>
              {isLoading ? (
                "တင်နေသည်..."
              ) : (
                <>
                  <Send className="h-4 w-4 mr-2" />
                  ပို့စ်တင်မည်
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>ပို့စ်များ</CardTitle>
          <CardDescription>
            သင်တင်ထားသော ပို့စ်များ
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Post list will be added here */}
            <div className="text-center text-muted-foreground py-8">
              ပို့စ်များ မရှိသေးပါ
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
