import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Users, MapPin, Heart, TrendingUp, Search } from "lucide-react";

export function TiktokAudienceAnalyzer() {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">ပရိသတ်လေ့လာစိစစ်ချက်</h2>
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
            <CardTitle className="text-sm font-medium">စုစုပေါင်းပရိသတ်</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24.5K</div>
            <p className="text-xs text-muted-foreground">
              +12.3% ယခင်လထက်
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">တည်နေရာများ</CardTitle>
            <MapPin className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">15</div>
            <p className="text-xs text-muted-foreground">
              အဓိကမြို့ကြီးများ
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">ထိတွေ့မှုနှုန်း</CardTitle>
            <Heart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8.2%</div>
            <p className="text-xs text-muted-foreground">
              +2.1% ယခင်လထက်
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">သော့ချက်စကားလုံးများ</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">32</div>
            <p className="text-xs text-muted-foreground">
              ထိပ်တန်းစကားလုံးများ
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="demographics" className="space-y-4">
        <TabsList>
          <TabsTrigger value="demographics">လူဦးရေဆိုင်ရာ</TabsTrigger>
          <TabsTrigger value="locations">တည်နေရာများ</TabsTrigger>
          <TabsTrigger value="interests">စိတ်ဝင်စားမှုများ</TabsTrigger>
          <TabsTrigger value="keywords">သော့ချက်စကားလုံးများ</TabsTrigger>
        </TabsList>

        <TabsContent value="demographics">
          <Card>
            <CardHeader>
              <CardTitle>လူဦးရေဆိုင်ရာအချက်အလက်များ</CardTitle>
              <CardDescription>
                သင့်ပရိသတ်များ၏ အသက်၊ ကျား/မ နှင့် အခြားအချက်အလက်များ
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-4">
                  <h4 className="font-semibold">အသက်အပိုင်းအခြား</h4>
                  <div className="h-[200px] bg-muted rounded-md" />
                </div>
                <div className="space-y-4">
                  <h4 className="font-semibold">ကျား/မ အချိုး</h4>
                  <div className="h-[200px] bg-muted rounded-md" />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="locations">
          <Card>
            <CardHeader>
              <CardTitle>တည်နေရာအချက်အလက်များ</CardTitle>
              <CardDescription>
                သင့်ပရိသတ်များ၏ တည်နေရာဖြန့်ကျက်မှု
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px] bg-muted rounded-md" />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="interests">
          <Card>
            <CardHeader>
              <CardTitle>စိတ်ဝင်စားမှုများ</CardTitle>
              <CardDescription>
                သင့်ပရိသတ်များ၏ စိတ်ဝင်စားမှုအမျိုးအစားများ
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px] bg-muted rounded-md" />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="keywords">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>သော့ချက်စကားလုံးများ</CardTitle>
                  <CardDescription>
                    သင့်ပရိသတ်များ အသုံးများသော စကားလုံးများ
                  </CardDescription>
                </div>
                <div className="flex gap-2">
                  <Input
                    placeholder="စကားလုံးရှာရန်..."
                    className="w-[200px]"
                  />
                  <Button size="icon">
                    <Search className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="h-[400px] bg-muted rounded-md" />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
