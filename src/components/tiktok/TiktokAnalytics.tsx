import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Eye,
  Heart,
  Share2,
  MessageCircle,
  TrendingUp,
  Users,
} from "lucide-react";

export function TiktokAnalytics() {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">TikTok စိစစ်လေ့လာချက်များ</h2>
        <Select defaultValue="7days">
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="အချိန်ကာလရွေးပါ" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="7days">၇ ရက်</SelectItem>
            <SelectItem value="30days">၃၀ ရက်</SelectItem>
            <SelectItem value="90days">၉၀ ရက်</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">ကြည့်ရှုမှုများ</CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2.4M</div>
            <p className="text-xs text-muted-foreground">
              +20.1% ယခင်ကာလထက်
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">နှစ်သက်မှုများ</CardTitle>
            <Heart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">145.2K</div>
            <p className="text-xs text-muted-foreground">
              +15.2% ယခင်ကာလထက်
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">မျှဝေမှုများ</CardTitle>
            <Share2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">32.1K</div>
            <p className="text-xs text-muted-foreground">
              +12.5% ယခင်ကာလထက်
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">မှတ်ချက်များ</CardTitle>
            <MessageCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8.2K</div>
            <p className="text-xs text-muted-foreground">
              +8.4% ယခင်ကာလထက်
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">အနှစ်ချုပ်</TabsTrigger>
          <TabsTrigger value="audience">ပရိသတ်</TabsTrigger>
          <TabsTrigger value="content">အကြောင်းအရာများ</TabsTrigger>
          <TabsTrigger value="engagement">ထိတွေ့ဆက်ဆံမှု</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle>ကြည့်ရှုမှုအပြောင်းအလဲ</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[200px] bg-muted rounded-md" />
              </CardContent>
            </Card>

            <Card className="col-span-3">
              <CardHeader>
                <CardTitle>ထိပ်တန်းဗီဒီယိုများ</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* Top videos list */}
                  <div className="text-center text-muted-foreground py-8">
                    ဗီဒီယိုများ မရှိသေးပါ
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="audience">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle>ပရိသတ်ဒေတာ</CardTitle>
                <CardDescription>
                  သင့်ပရိသတ်များ၏ လူဦးရေဆိုင်ရာအချက်အလက်များ
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] bg-muted rounded-md" />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>တည်နေရာများ</CardTitle>
                <CardDescription>
                  သင့်ပရိသတ်များ၏ တည်နေရာအချက်အလက်များ
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] bg-muted rounded-md" />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>စိတ်ဝင်စားမှုများ</CardTitle>
                <CardDescription>
                  သင့်ပရိသတ်များ၏ စိတ်ဝင်စားမှုများ
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] bg-muted rounded-md" />
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="content">
          <Card>
            <CardHeader>
              <CardTitle>အကြောင်းအရာစိစစ်လေ့လာချက်</CardTitle>
              <CardDescription>
                သင့်ဗီဒီယိုများ၏ စွမ်းဆောင်ရည်အချက်အလက်များ
              </CardDescription>
            </CardHeader>
            <CardContent>
              {/* Content performance metrics */}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="engagement">
          <Card>
            <CardHeader>
              <CardTitle>ထိတွေ့ဆက်ဆံမှုအချက်အလက်များ</CardTitle>
              <CardDescription>
                သင့်ပရိသတ်များနှင့် ထိတွေ့ဆက်ဆံမှုအသေးစိတ်
              </CardDescription>
            </CardHeader>
            <CardContent>
              {/* Engagement metrics */}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
