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
import { Switch } from "@/components/ui/switch";
import { Upload } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const formSchema = z.object({
  campaignName: z.string().min(3, {
    message: "Campaign name must be at least 3 characters.",
  }),
  videoType: z.string({
    required_error: "Please select a video type.",
  }),
  videoTitle: z.string().min(1, {
    message: "Video title is required.",
  }).max(100, {
    message: "Video title must be less than 100 characters.",
  }),
  videoDescription: z.string().min(1, {
    message: "Video description is required.",
  }),
  tags: z.array(z.string()).min(1, {
    message: "Add at least one tag.",
  }),
  playlist: z.string().optional(),
  endScreen: z.object({
    enabled: z.boolean(),
    duration: z.number().min(5).max(20).optional(),
    elements: z.array(z.string()).optional(),
  }),
  cards: z.array(z.object({
    time: z.number(),
    title: z.string(),
    url: z.string().url(),
  })).optional(),
  thumbnail: z.object({
    custom: z.boolean(),
    file: z.any().optional(),
  }),
  schedule: z.object({
    isScheduled: z.boolean(),
    publishDate: z.date().optional(),
    notifySubscribers: z.boolean(),
  }),
  visibility: z.string(),
  comments: z.object({
    enabled: z.boolean(),
    holdForReview: z.boolean(),
    autoResponse: z.string().optional(),
  }),
  seoOptimization: z.object({
    keywords: z.array(z.string()),
    category: z.string(),
    language: z.string(),
    location: z.string().optional(),
  }),
});

export function YouTubeCampaignForm() {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [previewTab, setPreviewTab] = useState("desktop");

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      campaignName: "",
      videoType: "shorts",
      videoTitle: "",
      videoDescription: "",
      tags: [],
      playlist: "",
      endScreen: {
        enabled: true,
        duration: 10,
        elements: [],
      },
      cards: [],
      thumbnail: {
        custom: false,
      },
      schedule: {
        isScheduled: false,
        notifySubscribers: true,
      },
      visibility: "public",
      comments: {
        enabled: true,
        holdForReview: false,
      },
      seoOptimization: {
        keywords: [],
        category: "Entertainment",
        language: "my",
      },
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setIsLoading(true);
      // TODO: Implement API call
      console.log(values);
      
      toast({
        title: "Campaign Created",
        description: "Your YouTube campaign has been created successfully.",
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
            name="videoType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Video Type</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select video type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="shorts">YouTube Shorts</SelectItem>
                    <SelectItem value="regular">Regular Video</SelectItem>
                    <SelectItem value="live">Live Stream</SelectItem>
                  </SelectContent>
                </Select>
                <FormDescription>
                  Choose your video format
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="p-6 border rounded-lg space-y-4">
            <h3 className="text-lg font-semibold">Video Upload</h3>
            <div className="border-2 border-dashed rounded-lg p-8 text-center cursor-pointer hover:border-primary">
              <Upload className="mx-auto h-8 w-8 mb-2 text-gray-400" />
              <div className="text-sm text-gray-600">
                Click to upload or drag and drop your video
              </div>
              <div className="mt-2 text-xs text-gray-500">
                MP4, MOV, or AVI format
              </div>
            </div>
          </div>

          <FormField
            control={form.control}
            name="videoTitle"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Video Title</FormLabel>
                <FormControl>
                  <Input placeholder="Enter video title" {...field} maxLength={100} />
                </FormControl>
                <FormDescription>
                  {field.value?.length || 0}/100 characters
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="videoDescription"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Video Description</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Enter video description"
                    className="h-32"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Include keywords, links, and timestamps
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="tags"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tags</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter tags (comma separated)"
                    onChange={(e) => {
                      const tags = e.target.value.split(",").map(tag => tag.trim());
                      field.onChange(tags);
                    }}
                  />
                </FormControl>
                <FormDescription>
                  Add relevant tags to improve visibility
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">SEO Optimization</h3>
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="seoOptimization.keywords"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Keywords</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter keywords (comma separated)"
                        onChange={(e) => {
                          const keywords = e.target.value.split(",").map(k => k.trim());
                          field.onChange(keywords);
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="seoOptimization.category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Entertainment">Entertainment</SelectItem>
                        <SelectItem value="Education">Education</SelectItem>
                        <SelectItem value="HowTo">How-to & Style</SelectItem>
                        <SelectItem value="Tech">Science & Technology</SelectItem>
                        <SelectItem value="Gaming">Gaming</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="seoOptimization.language"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Language</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select language" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="my">Myanmar (Burmese)</SelectItem>
                        <SelectItem value="en">English</SelectItem>
                        <SelectItem value="th">Thai</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Engagement Settings</h3>
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="comments.enabled"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between">
                    <div className="space-y-0.5">
                      <FormLabel className="text-base">Enable Comments</FormLabel>
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

              {form.watch("comments.enabled") && (
                <>
                  <FormField
                    control={form.control}
                    name="comments.holdForReview"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between">
                        <div className="space-y-0.5">
                          <FormLabel className="text-base">Hold Comments for Review</FormLabel>
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
                    name="comments.autoResponse"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Auto Response</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Enter auto response for comments"
                            className="h-32"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>
                          Automatically respond to comments
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </>
              )}
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Publishing Settings</h3>
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="visibility"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Visibility</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select visibility" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="public">Public</SelectItem>
                        <SelectItem value="unlisted">Unlisted</SelectItem>
                        <SelectItem value="private">Private</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="schedule.isScheduled"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between">
                    <div className="space-y-0.5">
                      <FormLabel className="text-base">Schedule Upload</FormLabel>
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
                name="schedule.notifySubscribers"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between">
                    <div className="space-y-0.5">
                      <FormLabel className="text-base">Notify Subscribers</FormLabel>
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
          </Card>

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Creating Campaign..." : "Create Campaign"}
          </Button>
        </form>
      </Form>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Preview</h3>
        <Tabs value={previewTab} onValueChange={setPreviewTab}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="desktop">Desktop</TabsTrigger>
            <TabsTrigger value="mobile">Mobile</TabsTrigger>
          </TabsList>
          <TabsContent value="desktop">
            <Card className="p-4">
              <div className="aspect-video bg-gray-100 mb-4 rounded-lg"></div>
              <div className="space-y-2">
                <h3 className="text-xl font-semibold">
                  {form.watch("videoTitle") || "Video Title"}
                </h3>
                <p className="text-sm text-gray-600 whitespace-pre-wrap">
                  {form.watch("videoDescription") || "Video Description"}
                </p>
                <div className="flex flex-wrap gap-2 mt-2">
                  {form.watch("tags")?.map((tag, index) => (
                    <span
                      key={index}
                      className="text-xs bg-gray-100 px-2 py-1 rounded-full"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            </Card>
          </TabsContent>
          <TabsContent value="mobile">
            <Card className="p-4 max-w-[375px]">
              <div className="aspect-[9/16] bg-gray-100 mb-4 rounded-lg"></div>
              <div className="space-y-2">
                <h3 className="text-lg font-semibold">
                  {form.watch("videoTitle") || "Video Title"}
                </h3>
                <p className="text-xs text-gray-600 whitespace-pre-wrap">
                  {form.watch("videoDescription") || "Video Description"}
                </p>
                <div className="flex flex-wrap gap-2 mt-2">
                  {form.watch("tags")?.map((tag, index) => (
                    <span
                      key={index}
                      className="text-xs bg-gray-100 px-2 py-1 rounded-full"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
