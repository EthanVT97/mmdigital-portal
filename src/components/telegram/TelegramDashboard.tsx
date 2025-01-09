import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  BarChart,
  Users,
  MessageCircle,
  TrendingUp,
  Calendar,
  Plus,
  Send,
} from "lucide-react";

export function TelegramDashboard() {
  return (
    <div className="space-y-4">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">အဖွဲ့ဝင်အရေအတွက်</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12.5K</div>
            <p className="text-xs text-muted-foreground">
              +20.1% ယခင်လထက်
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">ပို့စ်အရေအတွက်</CardTitle>
            <MessageCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2,350</div>
            <p className="text-xs text-muted-foreground">
              +10.5% ယခင်လထက်
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">တုံ့ပြန်မှုနှုန်း</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5.2%</div>
            <p className="text-xs text-muted-foreground">
              +2.4% ယခင်လထက်
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">ဝင်ရောက်ကြည့်ရှုမှု</CardTitle>
            <BarChart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">45.2K</div>
            <p className="text-xs text-muted-foreground">
              +15.2% ယခင်လထက်
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">အနှစ်ချုပ်</TabsTrigger>
          <TabsTrigger value="channels">ချန်နယ်များ</TabsTrigger>
          <TabsTrigger value="posts">ပို့စ်များ</TabsTrigger>
          <TabsTrigger value="schedule">အချိန်ဇယား</TabsTrigger>
          <TabsTrigger value="analytics">စိစစ်လေ့လာချက်</TabsTrigger>
          <TabsTrigger value="members">အဖွဲ့ဝင်များ</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle>စွမ်းဆောင်ရည်အနှစ်ချုပ်</CardTitle>
              </CardHeader>
              <CardContent className="pl-2">
                <div className="h-[200px] bg-muted rounded-md" />
              </CardContent>
            </Card>

            <Card className="col-span-3">
              <CardHeader>
                <CardTitle>လတ်တလော ပို့စ်များ</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-8">
                  {/* Recent posts list */}
                  <Button className="w-full" variant="outline">
                    <Plus className="mr-2 h-4 w-4" /> ပို့စ်အသစ်တင်ရန်
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="channels" className="space-y-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0">
              <CardTitle>ချန်နယ်များ</CardTitle>
              <Button>
                <Plus className="mr-2 h-4 w-4" /> ချန်နယ်အသစ်ထည့်ရန်
              </Button>
            </CardHeader>
            <CardContent>
              {/* Channels management interface */}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="posts" className="space-y-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0">
              <CardTitle>ပို့စ်များ</CardTitle>
              <Button>
                <Send className="mr-2 h-4 w-4" /> ပို့စ်အသစ်တင်ရန်
              </Button>
            </CardHeader>
            <CardContent>
              {/* Posts management interface */}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="schedule" className="space-y-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0">
              <CardTitle>အချိန်ဇယား</CardTitle>
              <Button>
                <Calendar className="mr-2 h-4 w-4" /> အချိန်ဇယားသတ်မှတ်ရန်
              </Button>
            </CardHeader>
            <CardContent>
              {/* Schedule management interface */}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>အသေးစိတ် စိစစ်လေ့လာချက်</CardTitle>
            </CardHeader>
            <CardContent>
              {/* Analytics interface */}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="members" className="space-y-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0">
              <CardTitle>အဖွဲ့ဝင်များ</CardTitle>
              <Button>
                <Users className="mr-2 h-4 w-4" /> အဖွဲ့ဝင်အသစ်ထည့်ရန်
              </Button>
            </CardHeader>
            <CardContent>
              {/* Members management interface */}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
