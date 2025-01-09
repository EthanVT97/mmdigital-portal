import { useEffect, useState, useCallback } from "react";
import { useSupabaseClient, useSession } from "@supabase/auth-helpers-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useToast } from "@/components/ui/use-toast";
import { Loader2, Camera } from "lucide-react";

const AVATAR_BUCKET_NAME = 'avatars';
const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2MB

export function Profile() {
  const navigate = useNavigate();
  const supabase = useSupabaseClient();
  const session = useSession();
  const { toast } = useToast();
  
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [userData, setUserData] = useState({
    full_name: "",
    email: "",
    avatar_url: "",
    phone: "",
    company: "",
  });

  // Redirect if not authenticated
  useEffect(() => {
    if (!session) {
      navigate('/login');
      toast({
        variant: "destructive",
        title: "Authentication required",
        description: "Please log in to view your profile",
      });
    }
  }, [session, navigate, toast]);

  const getUserProfile = useCallback(async () => {
    if (!session?.user) return;
    
    try {
      setLoading(true);
      const { data: { user }, error: userError } = await supabase.auth.getUser();
      
      if (userError) throw userError;

      if (user) {
        // Get the avatar URL if it exists
        let avatarUrl = user.user_metadata?.avatar_url || "";
        
        // If we have an avatar path but not a full URL, get the public URL
        if (avatarUrl && !avatarUrl.startsWith('http')) {
          const { data: { publicUrl } } = supabase.storage
            .from(AVATAR_BUCKET_NAME)
            .getPublicUrl(avatarUrl);
          avatarUrl = publicUrl;
        }

        setUserData({
          full_name: user.user_metadata?.full_name || "",
          email: user.email || "",
          avatar_url: avatarUrl,
          phone: user.user_metadata?.phone || "",
          company: user.user_metadata?.company || "",
        });
      }
    } catch (error) {
      console.error("Error loading user data:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Could not load user profile. Please try refreshing the page.",
      });
    } finally {
      setLoading(false);
    }
  }, [session?.user, supabase, toast]);

  useEffect(() => {
    getUserProfile();
  }, [getUserProfile]);

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!session?.user) return;

    try {
      setLoading(true);
      const { error } = await supabase.auth.updateUser({
        data: {
          full_name: userData.full_name,
          avatar_url: userData.avatar_url,
          phone: userData.phone,
          company: userData.company,
          updated_at: new Date().toISOString(),
        },
      });

      if (error) throw error;

      toast({
        title: "Success",
        description: "Profile updated successfully",
      });
      
      // Refresh user data after update
      getUserProfile();
    } catch (error: any) {
      console.error("Error updating profile:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message || "Could not update profile. Please try again.",
      });
    } finally {
      setLoading(false);
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
    if (!session?.user) return;

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
      if (userData.avatar_url) {
        try {
          const oldFileName = userData.avatar_url.split('/').pop();
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

      setUserData({ ...userData, avatar_url: publicUrl });

      toast({
        title: "Success",
        description: "Avatar updated successfully",
      });
    } catch (error: any) {
      console.error("Error uploading avatar:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message || "Could not upload avatar. Please try again.",
      });
    } finally {
      setUploading(false);
    }
  };

  if (!session) {
    return null; // Don't render anything if not authenticated
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
            <form onSubmit={handleUpdateProfile}>
              <div className="space-y-6">
                {/* Avatar Upload */}
                <div className="flex flex-col items-center space-y-4">
                  <div className="relative">
                    <Avatar className="h-24 w-24 ring-2 ring-gray-700">
                      <AvatarImage src={userData.avatar_url} alt={userData.full_name} />
                      <AvatarFallback className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white text-xl">
                        {userData.full_name.charAt(0) || 'U'}
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

                {/* Full Name */}
                <div className="space-y-2">
                  <Label htmlFor="full_name" className="text-gray-200">
                    Full Name
                  </Label>
                  <Input
                    id="full_name"
                    type="text"
                    value={userData.full_name}
                    onChange={(e) => setUserData({ ...userData, full_name: e.target.value })}
                    className="bg-gray-700 border-gray-600 text-gray-100 focus:ring-cyan-500"
                    placeholder="Enter your full name"
                  />
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-gray-200">
                    Email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={userData.email}
                    disabled
                    className="bg-gray-700 border-gray-600 text-gray-400"
                  />
                </div>

                {/* Phone */}
                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-gray-200">
                    Phone Number
                  </Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={userData.phone}
                    onChange={(e) => setUserData({ ...userData, phone: e.target.value })}
                    className="bg-gray-700 border-gray-600 text-gray-100 focus:ring-cyan-500"
                    placeholder="Enter your phone number"
                  />
                </div>

                {/* Company */}
                <div className="space-y-2">
                  <Label htmlFor="company" className="text-gray-200">
                    Company
                  </Label>
                  <Input
                    id="company"
                    type="text"
                    value={userData.company}
                    onChange={(e) => setUserData({ ...userData, company: e.target.value })}
                    className="bg-gray-700 border-gray-600 text-gray-100 focus:ring-cyan-500"
                    placeholder="Enter your company name"
                  />
                </div>
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
              disabled={loading}
              className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white"
            >
              {loading ? (
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

export default Profile;
