import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Plus, Search, Settings, Edit, Trash } from "lucide-react";
import { useState } from "react";

export function GoogleCampaignManager() {
  const [selectedCampaign, setSelectedCampaign] = useState<string | null>(null);

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">ကြော်ငြာလှုပ်ရှားမှုများ</h2>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          ကြော်ငြာလှုပ်ရှားမှုအသစ်
        </Button>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>ကြော်ငြာလှုပ်ရှားမှုများ စီမံခန့်ခွဲရန်</CardTitle>
              <CardDescription>
                သင့် Google Ads ကြော်ငြာလှုပ်ရှားမှုများကို စီမံခန့်ခွဲပါ
              </CardDescription>
            </div>
            <div className="flex gap-2">
              <Input
                placeholder="ရှာဖွေရန်..."
                className="w-[200px]"
              />
              <Button size="icon" variant="outline">
                <Search className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex gap-4">
              <div className="w-[200px] space-y-2">
                <Label>ကြော်ငြာအမျိုးအစား</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="အမျိုးအစားရွေးပါ" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="search">ရှာဖွေမှုကြော်ငြာ</SelectItem>
                    <SelectItem value="display">ပြသမှုကြော်ငြာ</SelectItem>
                    <SelectItem value="video">ဗီဒီယိုကြော်ငြာ</SelectItem>
                    <SelectItem value="shopping">ဈေးဝယ်ကြော်ငြာ</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="w-[200px] space-y-2">
                <Label>အခြေအနေ</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="အခြေအနေရွေးပါ" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">လက်ရှိဖြစ်သည်</SelectItem>
                    <SelectItem value="paused">ခဏရပ်ထားသည်</SelectItem>
                    <SelectItem value="ended">ပြီးဆုံးသွားသည်</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>အမည်</TableHead>
                  <TableHead>အမျိုးအစား</TableHead>
                  <TableHead>ဘတ်ဂျက်</TableHead>
                  <TableHead>အခြေအနေ</TableHead>
                  <TableHead>ကြည့်ရှုမှု</TableHead>
                  <TableHead>ကလစ်နှိပ်မှု</TableHead>
                  <TableHead>CTR</TableHead>
                  <TableHead>လုပ်ဆောင်ချက်</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>နွေရာသီအရောင်း</TableCell>
                  <TableCell>ရှာဖွေမှုကြော်ငြာ</TableCell>
                  <TableCell>500,000 MMK</TableCell>
                  <TableCell>လက်ရှိဖြစ်သည်</TableCell>
                  <TableCell>12,450</TableCell>
                  <TableCell>524</TableCell>
                  <TableCell>4.21%</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button size="icon" variant="outline">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button size="icon" variant="outline">
                        <Settings className="h-4 w-4" />
                      </Button>
                      <Button size="icon" variant="outline">
                        <Trash className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
                {/* Add more rows here */}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>ကြော်ငြာအုပ်စုများ</CardTitle>
            <CardDescription>
              သင့်ကြော်ငြာလှုပ်ရှားမှုအတွင်းရှိ ကြော်ငြာအုပ်စုများ
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] bg-muted rounded-md" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>သော့ချက်စကားလုံးများ</CardTitle>
            <CardDescription>
              သင့်ကြော်ငြာလှုပ်ရှားမှုအတွက် သော့ချက်စကားလုံးများ
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] bg-muted rounded-md" />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
