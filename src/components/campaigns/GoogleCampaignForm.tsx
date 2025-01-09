import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { Card } from "@/components/ui/card";
import { Upload } from "@/components/ui/upload";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

const formSchema = z.object({
  campaignName: z.string().min(3, {
    message: "Campaign name must be at least 3 characters.",
  }),
  businessInfo: z.object({
    name: z.string().min(1, {
      message: "Business name is required.",
    }),
    description: z.string().min(1, {
      message: "Business description is required.",
    }),
    address: z.string().min(1, {
      message: "Business address is required.",
    }),
    phone: z.string().min(1, {
      message: "Business phone is required.",
    }),
    website: z.string().url().optional(),
    email: z.string().email(),
    hours: z.array(z.object({
      day: z.string(),
      open: z.string(),
      close: z.string(),
      closed: z.boolean(),
    })),
    categories: z.array(z.string()).min(1, {
      message: "Select at least one business category.",
    }),
    attributes: z.object({
      services: z.array(z.string()),
      amenities: z.array(z.string()),
      highlights: z.array(z.string()),
      paymentMethods: z.array(z.string()),
    }),
  }),
  media: z.object({
    logo: z.any(),
    coverPhoto: z.any(),
    photos: z.array(z.any()).min(3, {
      message: "Add at least three business photos.",
    }),
    videos: z.array(z.any()),
    virtualTour: z.string().url().optional(),
  }),
  seo: z.object({
    keywords: z.array(z.string()),
    description: z.string(),
    searchTerms: z.array(z.string()),
    localKeywords: z.array(z.string()),
  }),
  posts: z.array(z.object({
    title: z.string(),
    content: z.string(),
    media: z.array(z.any()),
    callToAction: z.string(),
    schedule: z.date(),
  })),
  qAndA: z.array(z.object({
    question: z.string(),
    answer: z.string(),
  })),
  reviews: z.object({
    autoReply: z.boolean(),
    replyTemplates: z.array(z.string()),
    notificationEmail: z.string().email(),
  }),
  analytics: z.object({
    trackWebsite: z.boolean(),
    trackCalls: z.boolean(),
    trackDirections: z.boolean(),
    competitorInsights: z.boolean(),
  }),
  verification: z.object({
    method: z.enum(["postcard", "phone", "email"]),
    status: z.enum(["pending", "verified"]),
  }),
  campaignType: z.string({
    required_error: "Please select a campaign type.",
  }),
  startDate: z.date({
    required_error: "Start date is required.",
  }),
  endDate: z.date({
    required_error: "End date is required.",
  }),
  keywords: z.string().min(1, {
    message: "Keywords are required.",
  }),
  negativeKeywords: z.string().optional(),
  location: z.string().min(1, {
    message: "Location is required.",
  }),
});

export function GoogleCampaignForm() {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [previewTab, setPreviewTab] = useState("desktop");
  const [verificationMethod, setVerificationMethod] = useState<"email" | "phone" | "postcard">("email");
  const [verificationStatus, setVerificationStatus] = useState<"pending" | "verified">("pending");

  const defaultValues = {
    campaignName: "",
    businessInfo: {
      name: "",
      description: "",
      address: "",
      phone: "",
      website: "",
      email: "",
      hours: [] as Array<{
        day: string;
        open: string;
        close: string;
        closed: boolean;
      }>,
      categories: [] as string[],
      attributes: {
        services: [] as string[],
        amenities: [] as string[],
        highlights: [] as string[],
        paymentMethods: [] as string[],
      },
    },
    media: {
      logo: null,
      coverPhoto: null,
      photos: [] as string[],
      videos: [] as string[],
      virtualTour: "",
    },
    seo: {
      keywords: [] as string[],
      description: "",
      searchTerms: [] as string[],
      localKeywords: [] as string[],
    },
    posts: [] as any[],
    qAndA: [] as any[],
    reviews: {
      autoReply: false,
      replyTemplates: [] as string[],
      notificationEmail: "",
    },
    analytics: {
      trackWebsite: false,
      trackCalls: false,
      trackDirections: false,
      competitorInsights: false,
    },
    verification: {
      method: verificationMethod,
      status: verificationStatus,
    },
    campaignType: "",
    startDate: new Date(),
    endDate: new Date(),
    keywords: "",
    negativeKeywords: "",
    location: "",
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  const watchHeadlines = {
    businessName: form.watch("businessInfo.name"),
    businessDescription: form.watch("businessInfo.description"),
    businessAddress: form.watch("businessInfo.address"),
    businessPhone: form.watch("businessInfo.phone"),
    businessHours: form.watch("businessInfo.hours"),
    businessCategories: form.watch("businessInfo.categories"),
    businessPhotos: form.watch("media.photos"),
    businessWebsite: form.watch("businessInfo.website"),
  };

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setIsLoading(true);
      // TODO: Implement API call
      console.log(values);
      
      toast({
        title: "Campaign Created",
        description: "Your Google Ads campaign has been created successfully.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create campaign. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="grid md:grid-cols-2 gap-8">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="campaignName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Campaign Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter campaign name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="campaignType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Campaign Type</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select campaign type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="search">Search</SelectItem>
                    <SelectItem value="display">Display</SelectItem>
                    <SelectItem value="shopping">Shopping</SelectItem>
                    <SelectItem value="video">Video</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="startDate"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Start Date</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-full pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) =>
                          date < new Date() || date < new Date("1900-01-01")
                        }
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="endDate"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>End Date</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-full pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) =>
                          date < new Date() || date < new Date("1900-01-01")
                        }
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="keywords"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Keywords</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Enter keywords (one per line)"
                    className="h-32"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Enter each keyword or phrase on a new line.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="negativeKeywords"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Negative Keywords</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Enter negative keywords (one per line)"
                    className="h-32"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Enter keywords you don't want your ads to show for.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="businessInfo.name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Business Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your business name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="businessInfo.description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Business Description</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Describe your business"
                    className="h-32"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Write a detailed description of your business for Google My Business
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="businessInfo.address"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Business Address</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your business address" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="businessInfo.phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Business Phone</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your business phone" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="businessInfo.hours"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Business Hours</FormLabel>
                <FormControl>
                  <div className="space-y-4">
                    {daysOfWeek.map((day) => (
                      <div key={day} className="flex items-center gap-4">
                        <Label className="w-24">{day}</Label>
                        <Input
                          type="time"
                          placeholder="Open"
                          className="w-32"
                          onChange={(e) => {
                            const newHours = [...field.value];
                            const dayIndex = daysOfWeek.indexOf(day);
                            newHours[dayIndex] = {
                              ...newHours[dayIndex],
                              day,
                              open: e.target.value,
                            };
                            field.onChange(newHours);
                          }}
                        />
                        <span>to</span>
                        <Input
                          type="time"
                          placeholder="Close"
                          className="w-32"
                          onChange={(e) => {
                            const newHours = [...field.value];
                            const dayIndex = daysOfWeek.indexOf(day);
                            newHours[dayIndex] = {
                              ...newHours[dayIndex],
                              close: e.target.value,
                            };
                            field.onChange(newHours);
                          }}
                        />
                        <Checkbox
                          onCheckedChange={(checked: boolean) => {
                            const newHours = [...field.value];
                            const dayIndex = daysOfWeek.indexOf(day);
                            newHours[dayIndex] = {
                              ...newHours[dayIndex],
                              closed: checked,
                            };
                            field.onChange(newHours);
                          }}
                        />
                        <Label>Closed</Label>
                      </div>
                    ))}
                  </div>
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="businessInfo.categories"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Business Categories</FormLabel>
                <FormControl>
                  <Select
                    value={field.value[0] || ""}
                    onValueChange={(value) => {
                      const newValue = [...(field.value || [])];
                      newValue.push(value);
                      field.onChange(newValue);
                    }}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select business categories" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="restaurant">Restaurant</SelectItem>
                      <SelectItem value="retail">Retail</SelectItem>
                      <SelectItem value="service">Service</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormDescription>
                  Select categories that best describe your business
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="media.photos"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Business Photos</FormLabel>
                <FormControl>
                  <Upload
                    onUpload={(files) => {
                      // Handle file upload
                      console.log(files);
                    }}
                    className="w-full"
                    accept={{
                      'image/*': ['.png', '.jpg', '.jpeg', '.gif'],
                      'application/pdf': ['.pdf']
                    }}
                  />
                </FormControl>
                <FormDescription>
                  Add photos of your business, products, or services
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="businessInfo.website"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Business Website (Optional)</FormLabel>
                <FormControl>
                  <Input placeholder="https://example.com" {...field} />
                </FormControl>
                <FormDescription>
                  Add your business website if you have one
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="verification.method"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Verification Method</FormLabel>
                <Select
                  value={verificationMethod}
                  onValueChange={(value: "email" | "phone" | "postcard") => setVerificationMethod(value)}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select verification method" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="email">Email</SelectItem>
                    <SelectItem value="phone">Phone</SelectItem>
                    <SelectItem value="postcard">Postcard</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="verification.status"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Verification Status</FormLabel>
                <Select
                  value={verificationStatus}
                  onValueChange={(value: "pending" | "verified") => {
                    setVerificationStatus(value);
                    field.onChange(value);
                  }}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select verification status" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="verified">Verified</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Creating Campaign..." : "Create Campaign"}
          </Button>
        </form>
      </Form>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Ad Preview</h3>
        <Tabs value={previewTab} onValueChange={setPreviewTab}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="desktop">Desktop</TabsTrigger>
            <TabsTrigger value="mobile">Mobile</TabsTrigger>
          </TabsList>
          <TabsContent value="desktop">
            <Card className="p-4">
              <div className="space-y-2">
                <div className="text-sm text-green-600">Ad • {watchHeadlines.businessWebsite}</div>
                <div className="space-y-1">
                  <h3 className="text-xl text-blue-600 hover:underline cursor-pointer">
                    {watchHeadlines.businessName}
                  </h3>
                </div>
                <p className="text-sm text-gray-600">
                  {watchHeadlines.businessDescription}
                </p>
              </div>
            </Card>
          </TabsContent>
          <TabsContent value="mobile">
            <Card className="p-4 max-w-[375px]">
              <div className="space-y-2">
                <div className="text-xs text-green-600">Ad • {watchHeadlines.businessWebsite}</div>
                <div className="space-y-1">
                  <h3 className="text-lg text-blue-600 hover:underline cursor-pointer">
                    {watchHeadlines.businessName}
                  </h3>
                </div>
                <p className="text-xs text-gray-600">
                  {watchHeadlines.businessDescription}
                </p>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
