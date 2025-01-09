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
import { addDays } from "date-fns";
import { CalendarIcon, Upload } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { Card } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";

const formSchema = z.object({
  campaignName: z.string().min(3, {
    message: "Campaign name must be at least 3 characters.",
  }),
  content: z.object({
    messageType: z.enum(["text", "photo", "video", "document", "poll", "quiz"], {
      required_error: "Please select a message type.",
    }),
    text: z.string().min(1, {
      message: "Message text is required.",
    }),
    media: z.array(z.any()).optional(),
    buttons: z.array(z.object({
      text: z.string(),
      url: z.string().url(),
    })).optional(),
    formatting: z.object({
      parseMode: z.enum(["Markdown", "HTML"]),
      disablePreview: z.boolean(),
      silent: z.boolean(),
    }),
  }),
  targeting: z.object({
    groups: z.array(z.string()).min(1, {
      message: "Select at least one target group.",
    }),
    channels: z.array(z.string()),
    supergroups: z.array(z.string()),
  }),
  scheduling: z.object({
    frequency: z.enum(["once", "hourly", "daily", "weekly", "custom"], {
      required_error: "Please select posting frequency.",
    }),
    startDate: z.date(),
    endDate: z.date().optional(),
    times: z.array(z.string()),
    timezone: z.string(),
    randomizeTime: z.boolean(),
  }),
  messageOptions: z.object({
    pinMessage: z.boolean(),
    deleteAfter: z.number().optional(),
    forwardOptions: z.object({
      enabled: z.boolean(),
      targetGroups: z.array(z.string()),
      delay: z.number(),
    }),
  }),
  interaction: z.object({
    replyToComments: z.boolean(),
    replyMessage: z.string().optional(),
    deleteComments: z.object({
      enabled: z.boolean(),
      keywords: z.array(z.string()),
    }),
    banUsers: z.object({
      enabled: z.boolean(),
      criteria: z.array(z.string()),
    }),
  }),
  analytics: z.object({
    trackViews: z.boolean(),
    trackClicks: z.boolean(),
    trackForwards: z.boolean(),
    customParameters: z.record(z.string()),
  }),
  crossPosting: z.object({
    whatsapp: z.boolean(),
    facebook: z.boolean(),
    twitter: z.boolean(),
  }),
});

export function TelegramCampaignForm() {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [previewTab, setPreviewTab] = useState("light");
  const [frequency, setFrequency] = useState<"custom" | "once" | "daily" | "weekly" | "hourly">("once");

  const defaultValues = {
    campaignName: "",
    content: {
      messageType: "text" as const,
      text: "",
      media: [] as any[],
      buttons: [] as Array<{ text: string; url: string }>,
      formatting: {
        parseMode: "Markdown" as const,
        disablePreview: false,
        silent: false,
      },
    },
    targeting: {
      groups: [] as string[],
      channels: [] as string[],
      supergroups: [] as string[],
    },
    scheduling: {
      frequency: "once" as const,
      startDate: new Date(),
      endDate: addDays(new Date(), 7),
      times: [] as string[],
      timezone: "",
      randomizeTime: false,
    },
    messageOptions: {
      pinMessage: false,
      deleteAfter: undefined as number | undefined,
      forwardOptions: {
        enabled: false,
        targetGroups: [] as string[],
        delay: 0,
      },
    },
    interaction: {
      replyToComments: false,
      replyMessage: "",
      deleteComments: {
        enabled: false,
        keywords: [] as string[],
      },
      banUsers: {
        enabled: false,
        criteria: [] as string[],
      },
    },
    analytics: {
      trackViews: false,
      trackClicks: false,
      trackForwards: false,
      customParameters: {} as Record<string, string>,
    },
    crossPosting: {
      whatsapp: false,
      facebook: false,
      twitter: false,
    },
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  const watchMessage = {
    text: form.watch("content.text"),
  };

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setIsLoading(true);
      // TODO: Implement API call
      console.log(values);
      
      toast({
        title: "Campaign Created",
        description: "Your Telegram campaign has been created successfully.",
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
            name="content.messageType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Message Type</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select message type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="text">Text Only</SelectItem>
                    <SelectItem value="photo">Photo with Text</SelectItem>
                    <SelectItem value="video">Video with Text</SelectItem>
                    <SelectItem value="document">Document with Text</SelectItem>
                    <SelectItem value="poll">Poll with Text</SelectItem>
                    <SelectItem value="quiz">Quiz with Text</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="content.text"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Message Text</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Enter your message text"
                    className="h-32"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Supports Telegram markdown formatting
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
                <FormLabel>Target Telegram Groups</FormLabel>
                <Select
                  value={field.value[0] || ""}
                  onValueChange={(value) => field.onChange([...field.value, value])}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select groups to post to" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="group1">Myanmar Shopping Group</SelectItem>
                    <SelectItem value="group2">Yangon Buy & Sell</SelectItem>
                    <SelectItem value="group3">Myanmar Market Place</SelectItem>
                    <SelectItem value="group4">Myanmar Business Network</SelectItem>
                    <SelectItem value="group5">Myanmar Online Shop</SelectItem>
                  </SelectContent>
                </Select>
                <FormDescription>
                  Select Telegram groups where your message will be posted
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
                  onValueChange={(value: "custom" | "once" | "daily" | "weekly" | "hourly") => setFrequency(value)}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select posting frequency" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="once">Once</SelectItem>
                    <SelectItem value="hourly">Every Hour</SelectItem>
                    <SelectItem value="daily">Daily</SelectItem>
                    <SelectItem value="weekly">Weekly</SelectItem>
                    <SelectItem value="custom">Custom Schedule</SelectItem>
                  </SelectContent>
                </Select>
                <FormDescription>
                  How often should we post your message
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="space-y-4">
            <FormField
              control={form.control}
              name="messageOptions.pinMessage"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">Pin Message</FormLabel>
                    <FormDescription>
                      Pin this message in the group
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="messageOptions.deleteAfter"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Delete After (Hours)</FormLabel>
                  <FormControl>
                    <Input 
                      type="number" 
                      placeholder="Enter hours (optional)" 
                      {...field} 
                      onChange={(e) => field.onChange(e.target.value ? parseInt(e.target.value) : undefined)}
                    />
                  </FormControl>
                  <FormDescription>
                    Message will be automatically deleted after specified hours
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="interaction.replyToComments"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">Reply to Comments</FormLabel>
                    <FormDescription>
                      Automatically reply to comments
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="analytics.trackViews"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">Track Views</FormLabel>
                    <FormDescription>
                      Track views for this message
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Creating Campaign..." : "Create Campaign"}
          </Button>
        </form>
      </Form>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Message Preview</h3>
        <Tabs value={previewTab} onValueChange={setPreviewTab}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="light">Light</TabsTrigger>
            <TabsTrigger value="dark">Dark</TabsTrigger>
          </TabsList>
          <TabsContent value="light">
            <Card className={cn(
              "p-4 max-w-[380px] font-[system-ui]",
              "bg-white text-black"
            )}>
              <div className="space-y-3">
                <div className="text-sm whitespace-pre-wrap">
                  {watchMessage.text}
                </div>
              </div>
            </Card>
          </TabsContent>
          <TabsContent value="dark">
            <Card className={cn(
              "p-4 max-w-[380px] font-[system-ui]",
              "bg-[#212121] text-white"
            )}>
              <div className="space-y-3">
                <div className="text-sm whitespace-pre-wrap">
                  {watchMessage.text}
                </div>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
