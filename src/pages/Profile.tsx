import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { createBrowserClient } from '@supabase/ssr';
import { useSession } from '@/App';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useToast } from "@/components/ui/use-toast";
import { Loader2, Camera } from "lucide-react";
import { toast } from 'sonner';

const AVATAR_BUCKET_NAME = 'avatars';
const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2MB

interface Profile {
  id: string;
  name: string;
  email: string;
  avatar_url?: string;
  phone?: string;
  company?: string;
}

export default function Profile() {
  const navigate = useNavigate();
  const { session } = useSession();
  const { toast: notify } = useToast();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [uploading, setUploading] = useState(false);

  const supabase = createBrowserClient(
    import.meta.env.VITE_SUPABASE_URL,
    import.meta.env.VITE_SUPABASE_ANON_KEY
  );

  useEffect(() => {
    if (!session?.user?.id) return;

    const fetchProfile = async () => {
      try {
        const { data, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', session.user.id)
          .single();

        if (error) throw error;
        setProfile(data);
      } catch (error: any) {
        notify({
          variant: "destructive",
          title: "Error",
          description: error.message,
        });
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [session, notify]);

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!profile || !session?.user?.id) return;

    setUpdating(true);
    try {
      const { error } = await supabase
        .from('profiles')
        .update({
          name: profile.name,
          email: profile.email,
          phone: profile.phone,
          company: profile.company,
        })
        .eq('id', session.user.id);

      if (error) throw error;
      notify({
        title: "Success",
        description: "Profile updated successfully",
      });
    } catch (error: any) {
      notify({
        variant: "destructive",
        title: "Error",
        description: error.message,
      });
    } finally {
      setUpdating(false);
    }
  };

  const validateFile = (file: File) => {
    // Check file size
    if (file.size > MAX_FILE_SIZE) {
      throw new Error("File size must be less than 2MB");
    }

    // Check file type
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
    if (!allowedTypes.includes(file.type)) {
      throw new Error("File type must be JPEG, PNG, or GIF");
    }
  };

  const handleAvatarUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!session?.user?.id) return;

    try {
      setUploading(true);
      if (!event.target.files || event.target.files.length === 0) {
        throw new Error("You must select an image to upload.");
      }

      const file = event.target.files[0];
      validateFile(file);

      // Create a unique file name
      const fileExt = file.name.split(".").pop()?.toLowerCase() || 'jpg';
      const fileName = `${session.user.id}-${Date.now()}.${fileExt}`;

      // Delete old avatar if exists
      if (profile?.avatar_url) {
        try {
          const oldFileName = profile.avatar_url.split('/').pop();
          if (oldFileName) {
            await supabase.storage
              .from(AVATAR_BUCKET_NAME)
              .remove([oldFileName]);
          }
        } catch (error) {
          console.error("Error removing old avatar:", error);
        }
      }

      // Upload new avatar
      const { error: uploadError, data } = await supabase.storage
        .from(AVATAR_BUCKET_NAME)
        .upload(fileName, file, { 
          upsert: true,
          cacheControl: '3600',
          contentType: file.type,
        });

      if (uploadError) throw uploadError;

      // Get the public URL
      const { data: { publicUrl } } = supabase.storage
        .from(AVATAR_BUCKET_NAME)
        .getPublicUrl(fileName);

      // Update user metadata with new avatar URL
      const { error: updateError } = await supabase.auth.updateUser({
        data: { 
          avatar_url: fileName,
          updated_at: new Date().toISOString(),
        },
      });

      if (updateError) throw updateError;

      setProfile({ ...profile, avatar_url: publicUrl });

      notify({
        title: "Success",
        description: "Avatar updated successfully",
      });
    } catch (error: any) {
      notify({
        variant: "destructive",
        title: "Error",
        description: error.message,
      });
    } finally {
      setUploading(false);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!profile) {
    return <div>No profile found</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <Card className="border-none bg-gray-800/50 backdrop-blur shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl text-gray-100">Profile Settings</CardTitle>
            <CardDescription className="text-gray-400">
              Update your personal information and profile picture
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleUpdateProfile} className="space-y-6">
              <div className="flex flex-col items-center space-y-4">
                <div className="relative">
                  <Avatar className="h-24 w-24 ring-2 ring-gray-700">
                    <AvatarImage src={profile.avatar_url} alt={profile.name} />
                    <AvatarFallback className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white text-xl">
                      {profile.name.charAt(0) || 'U'}
                    </AvatarFallback>
                  </Avatar>
                  <Label
                    htmlFor="avatar"
                    className="absolute bottom-0 right-0 p-1 rounded-full bg-gray-700 hover:bg-gray-600 cursor-pointer"
                  >
                    {uploading ? (
                      <Loader2 className="h-4 w-4 text-gray-200 animate-spin" />
                    ) : (
                      <Camera className="h-4 w-4 text-gray-200" />
                    )}
                  </Label>
                  <Input
                    id="avatar"
                    type="file"
                    accept="image/png,image/jpeg,image/gif"
                    className="hidden"
                    onChange={handleAvatarUpload}
                    disabled={uploading}
                  />
                </div>
                <p className="text-sm text-gray-400">
                  Allowed: JPEG, PNG, GIF (max 2MB)
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="name" className="text-gray-200">
                  Full Name
                </Label>
                <Input
                  id="name"
                  type="text"
                  value={profile.name}
                  onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                  className="bg-gray-700 border-gray-600 text-gray-100 focus:ring-cyan-500"
                  placeholder="Enter your full name"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-gray-200">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={profile.email}
                  onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                  className="bg-gray-700 border-gray-600 text-gray-100 focus:ring-cyan-500"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone" className="text-gray-200">
                  Phone Number
                </Label>
                <Input
                  id="phone"
                  type="tel"
                  value={profile.phone}
                  onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                  className="bg-gray-700 border-gray-600 text-gray-100 focus:ring-cyan-500"
                  placeholder="Enter your phone number"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="company" className="text-gray-200">
                  Company
                </Label>
                <Input
                  id="company"
                  type="text"
                  value={profile.company}
                  onChange={(e) => setProfile({ ...profile, company: e.target.value })}
                  className="bg-gray-700 border-gray-600 text-gray-100 focus:ring-cyan-500"
                  placeholder="Enter your company name"
                />
              </div>
            </form>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button
              variant="outline"
              onClick={() => navigate(-1)}
              className="bg-gray-700 border-gray-600 text-gray-200 hover:bg-gray-600"
            >
              Cancel
            </Button>
            <Button
              onClick={handleUpdateProfile}
              disabled={updating}
              className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white"
            >
              {updating ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                "Save Changes"
              )}
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
