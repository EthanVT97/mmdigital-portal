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

const formSchema = z.object({
  campaignName: z.string().min(3, {
    message: "Campaign name must be at least 3 characters.",
  }),
  videoTitle: z.string().min(1, {
    message: "Video title is required.",
  }),
  videoDescription: z.string().min(1, {
    message: "Video description is required.",
  }),
  hashtags: z.array(z.string()).min(1, {
    message: "Add at least one hashtag.",
  }),
  trendingAudio: z.boolean(),
  duetEnabled: z.boolean(),
  stitchEnabled: z.boolean(),
  postSchedule: z.array(z.object({
    time: z.string(),
    days: z.array(z.string()),
  })).min(1, {
    message: "Add at least one posting schedule.",
  }),
  targetAudience: z.object({
    interests: z.array(z.string()).min(1),
    ageRange: z.object({
      min: z.number().min(13),
      max: z.number().max(65),
    }),
  }),
  crossPost: z.object({
    facebook: z.boolean(),
    instagram: z.boolean(),
    youtube: z.boolean(),
  }),
  autoResponder: z.boolean(),
  autoResponderMessage: z.string().optional(),
});

export function TikTokCampaignForm() {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      campaignName: "",
      videoTitle: "",
      videoDescription: "",
      hashtags: [],
      trendingAudio: true,
      duetEnabled: true,
      stitchEnabled: true,
      postSchedule: [{ time: "12:00", days: ["MON", "WED", "FRI"] }],
      targetAudience: {
        interests: [],
        ageRange: { min: 13, max: 65 },
      },
      crossPost: {
        facebook: false,
        instagram: false,
        youtube: false,
      },
      autoResponder: false,
      autoResponderMessage: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setIsLoading(true);
      // TODO: Implement API call
      console.log(values);
      
      toast({
        title: "Campaign Created",
        description: "Your TikTok campaign has been created successfully.",
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
    <div className="space-y-8">
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

          <div className="p-6 border rounded-lg space-y-4">
            <h3 className="text-lg font-semibold">Video Upload</h3>
            <div className="border-2 border-dashed rounded-lg p-8 text-center cursor-pointer hover:border-primary">
              <Upload className="mx-auto h-8 w-8 mb-2 text-gray-400" />
              <div className="text-sm text-gray-600">
                Click to upload or drag and drop your TikTok video
              </div>
              <div className="mt-2 text-xs text-gray-500">
                MP4 or MOV up to 3 minutes
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
                  <Input placeholder="Enter video title" {...field} />
                </FormControl>
                <FormDescription>
                  Make it catchy and engaging
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
                  Include relevant keywords and calls-to-action
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="hashtags"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Hashtags</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter hashtags (comma separated)"
                    onChange={(e) => {
                      const tags = e.target.value.split(",").map(tag => tag.trim());
                      field.onChange(tags);
                    }}
                  />
                </FormControl>
                <FormDescription>
                  Add trending and relevant hashtags
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="space-y-4">
            <FormField
              control={form.control}
              name="trendingAudio"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">Use Trending Audio</FormLabel>
                    <FormDescription>
                      Automatically find and use trending audio
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
              name="duetEnabled"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">Allow Duets</FormLabel>
                    <FormDescription>
                      Let others create duets with your video
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
              name="stitchEnabled"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">Allow Stitch</FormLabel>
                    <FormDescription>
                      Let others stitch your video into theirs
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

          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Cross-Posting</h3>
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="crossPost.facebook"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between">
                    <div className="space-y-0.5">
                      <FormLabel className="text-base">Facebook</FormLabel>
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
                name="crossPost.instagram"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between">
                    <div className="space-y-0.5">
                      <FormLabel className="text-base">Instagram Reels</FormLabel>
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
                name="crossPost.youtube"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between">
                    <div className="space-y-0.5">
                      <FormLabel className="text-base">YouTube Shorts</FormLabel>
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

          <FormField
            control={form.control}
            name="autoResponder"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                <div className="space-y-0.5">
                  <FormLabel className="text-base">Auto Responder</FormLabel>
                  <FormDescription>
                    Automatically respond to comments
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

          {form.watch("autoResponder") && (
            <FormField
              control={form.control}
              name="autoResponderMessage"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Auto Response Message</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Enter auto response message"
                      className="h-32"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    This message will be sent automatically in response to comments
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Creating Campaign..." : "Create Campaign"}
          </Button>
        </form>
      </Form>
    </div>
  );
}
