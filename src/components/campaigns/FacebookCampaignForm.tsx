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
import { cn } from "@/lib/utils";
import { format, addDays } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";

const formSchema = z.object({
  campaignName: z.string().min(3, {
    message: "Campaign name must be at least 3 characters.",
  }),
  targetAudience: z.object({
    interests: z.array(z.string()).min(1, {
      message: "Select at least one interest.",
    }),
    ageRange: z.object({
      min: z.number().min(13),
      max: z.number().max(65),
    }),
    locations: z.array(z.string()).min(1, {
      message: "Select at least one location.",
    }),
    languages: z.array(z.string()).min(1, {
      message: "Select at least one language.",
    }),
    demographics: z.object({
      education: z.array(z.string()).min(1, {
        message: "Select at least one education level.",
      }),
      occupation: z.array(z.string()).min(1, {
        message: "Select at least one occupation.",
      }),
      relationship: z.array(z.string()).min(1, {
        message: "Select at least one relationship status.",
      }),
    }),
  }),
  content: z.object({
    postType: z.enum(["text", "image", "video", "link", "carousel", "story", "reel"], {
      required_error: "Please select a post type.",
    }),
    postText: z.string().min(1, {
      message: "Post text is required.",
    }),
    media: z.array(z.any()).optional(),
    callToAction: z.string().optional(),
    linkPreview: z.object({
      title: z.string(),
      description: z.string(),
      image: z.string(),
    }).optional(),
  }),
  targeting: z.object({
    groups: z.array(z.string()).min(1, {
      message: "Select at least one Facebook group.",
    }),
    pages: z.array(z.string()).min(1, {
      message: "Select at least one Facebook page.",
    }),
    events: z.array(z.string()).min(1, {
      message: "Select at least one Facebook event.",
    }),
  }),
  scheduling: z.object({
    frequency: z.enum(["once", "daily", "weekly", "custom"], {
      required_error: "Please select a posting frequency.",
    }),
    startDate: z.date({
      required_error: "Start date is required.",
    }),
    endDate: z.date().optional(),
    times: z.array(z.string()),
    timezone: z.string(),
    autoRepost: z.boolean(),
  }),
  engagement: z.object({
    autoReply: z.boolean(),
    replyMessage: z.string().optional(),
    autoLike: z.boolean(),
    autoShare: z.boolean(),
    autoInvite: z.boolean(),
  }),
  crossPosting: z.object({
    instagram: z.boolean(),
    messenger: z.boolean(),
    whatsapp: z.boolean(),
  }),
  analytics: z.object({
    trackLinks: z.boolean(),
    pixelTracking: z.boolean(),
    conversionTracking: z.boolean(),
  }),
});

export function FacebookCampaignForm() {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [postType, setPostType] = useState<"link" | "video" | "image" | "text" | "carousel" | "story" | "reel">("text");
  const [frequency, setFrequency] = useState<"custom" | "once" | "daily" | "weekly">("once");

  const defaultValues = {
    campaignName: "",
    targetAudience: {
      interests: [],
      ageRange: { min: 18, max: 65 },
      locations: [],
      languages: [],
      demographics: {
        education: [],
        occupation: [],
        relationship: [],
      },
    },
    content: {
      postType: "text" as const,
      postText: "",
      media: [],
      callToAction: "",
      linkPreview: {
        title: "",
        description: "",
        image: "",
      },
    },
    targeting: {
      groups: [],
      pages: [],
      events: [],
    },
    scheduling: {
      frequency: "once" as const,
      startDate: new Date(),
      endDate: addDays(new Date(), 7),
      times: [],
      timezone: "",
      autoRepost: false,
    },
    engagement: {
      autoReply: false,
      replyMessage: "",
      autoLike: false,
      autoShare: false,
      autoInvite: false,
    },
    crossPosting: {
      instagram: false,
      messenger: false,
      whatsapp: false,
    },
    analytics: {
      trackLinks: false,
      pixelTracking: false,
      conversionTracking: false,
    },
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setIsLoading(true);
      // TODO: Implement API call to create campaign
      console.log(values);
      
      toast({
        title: "Campaign Created",
        description: "Your Facebook campaign has been created successfully.",
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
              <FormDescription>
                Give your campaign a unique and descriptive name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="targetAudience"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Target Audience</FormLabel>
              <FormControl>
                <div className="space-y-4">
                  <Input type="hidden" {...field} value={JSON.stringify(field.value)} />
                  <div className="grid gap-4 md:grid-cols-2">
                    {/* Demographics */}
                    <Card>
                      <CardHeader>
                        <CardTitle>Demographics</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div>
                            <Label>Education</Label>
                            <Select
                              onValueChange={(value) => {
                                const newValue = { ...field.value };
                                if (!newValue.demographics) newValue.demographics = {};
                                newValue.demographics.education = [value];
                                field.onChange(newValue);
                              }}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Select education level" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="high_school">High School</SelectItem>
                                <SelectItem value="college">College</SelectItem>
                                <SelectItem value="graduate">Graduate</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="content.postType"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Post Type</FormLabel>
              <Select
                value={postType}
                onValueChange={(value: "link" | "video" | "image" | "text" | "carousel" | "story" | "reel") => setPostType(value)}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select post type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="text">Text Only</SelectItem>
                  <SelectItem value="image">Image with Text</SelectItem>
                  <SelectItem value="video">Video with Text</SelectItem>
                  <SelectItem value="link">Link Share</SelectItem>
                  <SelectItem value="carousel">Carousel</SelectItem>
                  <SelectItem value="story">Story</SelectItem>
                  <SelectItem value="reel">Reel</SelectItem>
                </SelectContent>
              </Select>
              <FormDescription>
                Choose how you want your content to appear
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="content.postText"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Post Text</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Enter your post text"
                  className="h-32"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Write compelling post text that will engage your audience.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="targeting.groups"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Target Facebook Groups</FormLabel>
              <Select
                onValueChange={(value) => {
                  const newValue = [...field.value];
                  newValue.push(value);
                  field.onChange(newValue);
                }}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select groups to post to" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="group1">Myanmar Buy & Sell</SelectItem>
                  <SelectItem value="group2">Yangon Market</SelectItem>
                  <SelectItem value="group3">Myanmar Online Shopping</SelectItem>
                  <SelectItem value="group4">Myanmar Business Network</SelectItem>
                </SelectContent>
              </Select>
              <FormDescription>
                Select Facebook groups where your content will be posted
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="scheduling.frequency"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Posting Frequency</FormLabel>
              <Select
                value={frequency}
                onValueChange={(value: "custom" | "once" | "daily" | "weekly") => setFrequency(value)}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select posting frequency" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="once">Once</SelectItem>
                  <SelectItem value="daily">Daily</SelectItem>
                  <SelectItem value="weekly">Weekly</SelectItem>
                  <SelectItem value="custom">Custom Schedule</SelectItem>
                </SelectContent>
              </Select>
              <FormDescription>
                How often should we post your content
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="scheduling.startDate"
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
            name="scheduling.endDate"
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

        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? "Creating Campaign..." : "Create Campaign"}
        </Button>
      </form>
    </Form>
  );
}
