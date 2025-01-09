import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Users,
  Heart,
  MapPin,
  Search,
  BarChart,
  TrendingUp,
  Download,
} from "lucide-react";

export function GoogleAudienceAnalyzer() {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">ပရိသတ် လေ့လာစိစစ်ချက်</h2>
        <Button variant="outline">
          <Download className="mr-2 h-4 w-4" /> အစီရင်ခံစာ ဒေါင်းလုဒ်လုပ်ရန်
        </Button>
      </div>

      <Tabs defaultValue="demographics" className="space-y-4">
        <TabsList>
          <TabsTrigger value="demographics">လူဦးရေဆိုင်ရာ</TabsTrigger>
          <TabsTrigger value="interests">စိတ်ဝင်စားမှုများ</TabsTrigger>
          <TabsTrigger value="locations">တည်နေရာများ</TabsTrigger>
          <TabsTrigger value="keywords">သော့ချက်စကားလုံးများ</TabsTrigger>
        </TabsList>

        <TabsContent value="demographics" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>အသက်အပိုင်းအခြား</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[200px] bg-muted rounded-md" />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>ကျား/မ ခွဲခြားချက်</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[200px] bg-muted rounded-md" />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>ဝင်ငွေအဆင့်</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[200px] bg-muted rounded-md" />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>ပညာရေးအဆင့်</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[200px] bg-muted rounded-md" />
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="interests" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>ထိပ်တန်း စိတ်ဝင်စားမှုများ</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Heart className="h-4 w-4 text-muted-foreground" />
                    <span>နည်းပညာ</span>
                  </div>
                  <div className="text-muted-foreground">45%</div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Heart className="h-4 w-4 text-muted-foreground" />
                    <span>အားကစား</span>
                  </div>
                  <div className="text-muted-foreground">35%</div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Heart className="h-4 w-4 text-muted-foreground" />
                    <span>ဖက်ရှင်</span>
                  </div>
                  <div className="text-muted-foreground">30%</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="locations" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>ထိပ်တန်း တည်နေရာများ</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span>ရန်ကုန်</span>
                  </div>
                  <div className="text-muted-foreground">40%</div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span>မန္တလေး</span>
                  </div>
                  <div className="text-muted-foreground">25%</div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span>နေပြည်တော်</span>
                  </div>
                  <div className="text-muted-foreground">15%</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>မြေပုံပေါ်တွင် ပြသခြင်း</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] bg-muted rounded-md" />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="keywords" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>အကြံပြု သော့ချက်စကားလုံးများ</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Search className="h-4 w-4 text-muted-foreground" />
                    <span>သော့ချက်စကားလုံး ၁</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <BarChart className="h-4 w-4 text-muted-foreground" />
                    <span>ရှာဖွေမှု ၅၀၀+</span>
                    <TrendingUp className="h-4 w-4 text-green-500" />
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Search className="h-4 w-4 text-muted-foreground" />
                    <span>သော့ချက်စကားလုံး ၂</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <BarChart className="h-4 w-4 text-muted-foreground" />
                    <span>ရှာဖွေမှု ၃၀၀+</span>
                    <TrendingUp className="h-4 w-4 text-green-500" />
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Search className="h-4 w-4 text-muted-foreground" />
                    <span>သော့ချက်စကားလုံး ၃</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <BarChart className="h-4 w-4 text-muted-foreground" />
                    <span>ရှာဖွေမှု ၂၀၀+</span>
                    <TrendingUp className="h-4 w-4 text-green-500" />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
