import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  BarChart,
  MousePointerClick,
  Eye,
  TrendingUp,
  Calendar,
  Users,
  PieChart,
  Plus,
} from "lucide-react";
import { GoogleAudienceAnalyzer } from "./GoogleAudienceAnalyzer";
import { GoogleNotifications } from "./GoogleNotifications";

export function GoogleDashboard() {
  return (
    <div className="space-y-4">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">ကြည့်ရှုမှုများ</CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">45.2K</div>
            <p className="text-xs text-muted-foreground">
              +20.1% ယခင်လထက်
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">နှိပ်မှုများ</CardTitle>
            <MousePointerClick className="h-4 w-4 text-muted-foreground" />
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
            <CardTitle className="text-sm font-medium">နှိပ်မှုရာခိုင်နှုန်း</CardTitle>
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
            <CardTitle className="text-sm font-medium">စုစုပေါင်းကုန်ကျငွေ</CardTitle>
            <BarChart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$1,234</div>
            <p className="text-xs text-muted-foreground">
              +15.2% ယခင်လထက်
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">အနှစ်ချုပ်</TabsTrigger>
          <TabsTrigger value="campaigns">ကြော်ငြာများ</TabsTrigger>
          <TabsTrigger value="keywords">သော့ချက်စကားလုံးများ</TabsTrigger>
          <TabsTrigger value="schedule">အချိန်ဇယား</TabsTrigger>
          <TabsTrigger value="analytics">စိစစ်လေ့လာချက်</TabsTrigger>
          <TabsTrigger value="audience">ပရိသတ်</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle>စွမ်းဆောင်ရည်အနှစ်ချုပ်</CardTitle>
              </CardHeader>
              <CardContent className="pl-2">
                {/* Chart component here */}
                <div className="h-[200px] bg-muted rounded-md" />
              </CardContent>
            </Card>

            <Card className="col-span-3">
              <CardHeader>
                <CardTitle>တက်ကြွသော ကြော်ငြာများ</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-8">
                  {/* Active campaigns list */}
                  <Button className="w-full" variant="outline">
                    <Plus className="mr-2 h-4 w-4" /> ကြော်ငြာအသစ်ထည့်ရန်
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle>အသုံးများသော သော့ချက်စကားလုံးများ</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* Keywords list */}
                </div>
              </CardContent>
            </Card>

            <Card className="col-span-3">
              <CardHeader>
                <CardTitle>အကြံပြုချက်များ</CardTitle>
              </CardHeader>
              <CardContent>
                <GoogleNotifications />
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="campaigns" className="space-y-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0">
              <CardTitle>ကြော်ငြာများ</CardTitle>
              <Button>
                <Plus className="mr-2 h-4 w-4" /> ကြော်ငြာအသစ်ထည့်ရန်
              </Button>
            </CardHeader>
            <CardContent>
              {/* Campaigns management interface */}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="keywords" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>သော့ချက်စကားလုံးများ စီမံခန့်ခွဲခြင်း</CardTitle>
            </CardHeader>
            <CardContent>
              {/* Keywords management interface */}
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

        <TabsContent value="audience" className="space-y-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0">
              <CardTitle>ပရိသတ် လေ့လာစိစစ်ချက်</CardTitle>
              <Button>
                <Users className="mr-2 h-4 w-4" /> ပရိသတ်အသစ်ထည့်ရန်
              </Button>
            </CardHeader>
            <CardContent>
              <GoogleAudienceAnalyzer />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
