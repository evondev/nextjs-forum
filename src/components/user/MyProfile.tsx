"use client";
import { updateUser } from "@/lib/actions/user.action";
import { updateProfileSchema } from "@/lib/validations";
import { GlobeAltIcon } from "@heroicons/react/24/outline";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { z } from "zod";
import IconFacebook from "../icons/IconFacebook";
import SocialIcon from "../shared/SocialIcon";
import { Button } from "../ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
interface MyProfileProps {
  mongoUser: any;
  postCount: Promise<number | undefined>;
}
const MyProfile = ({ mongoUser, postCount }: MyProfileProps) => {
  const userProfile = JSON.parse(mongoUser);
  const form = useForm<z.infer<typeof updateProfileSchema>>({
    resolver: zodResolver(updateProfileSchema),
    defaultValues: {
      name: userProfile.name,
      bio: userProfile.bio,
      website: userProfile.website,
      socials: {
        facebook: userProfile?.socials?.facebook,
      },
    },
  });
  const pathname = usePathname();
  if (!userProfile) return null;
  async function onSubmit(values: z.infer<typeof updateProfileSchema>) {
    await updateUser({
      clerkId: userProfile.clerkId,
      updateData: {
        name: values.name,
        bio: values.bio,
        website: values.website,
        socials: {
          facebook: values.socials.facebook,
        },
      },
      path: pathname,
    });
    toast.success("Profile updated successfully");
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
        <div className="py-5">
          <div className="h-60 rounded-lg relative">
            <Image
              src="/images/banner.png"
              alt=""
              fill
              className="w-full h-full object-cover rounded-lg"
            />
          </div>
          <div className="flex items-center justify-between px-10">
            <div className="flex items-center gap-5">
              <Image
                src={userProfile?.avatar}
                alt=""
                width={160}
                height={160}
                className="w-[160px] h-[160px] object-cover rounded-full -translate-y-1/2 border-4 border-white"
              />
              <div className="flex-1">
                <h3 className="font-semibold text-xl">
                  {userProfile.name} (@{userProfile.username})
                </h3>
                <h4 className="text-sm text-secondary-color-3 mb-2">
                  {userProfile.bio}
                </h4>
                <div className="flex items-center gap-3  text-secondary-color-3 text-sm">
                  <div className="flex items-center justify-center gap-1">
                    <SocialIcon
                      url={userProfile?.socials?.facebook}
                      icon={<GlobeAltIcon className="w-6 h-6" />}
                      className="text-blue-400"
                    ></SocialIcon>
                    <SocialIcon
                      url={userProfile?.website}
                      icon={<IconFacebook />}
                      className="text-blue-600"
                    ></SocialIcon>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-lg bg-gray-100 flex items-center gap-2">
                <div className="w-10 h-10 flex items-center justify-center bg-gray-200 rounded-lg">
                  👋
                </div>
                <div>
                  <h4 className="text-secondary-color-3">Followers</h4>
                  <h5>{userProfile.followers.length}</h5>
                </div>
              </div>
              <div className="p-2 rounded-lg bg-gray-100 flex items-center gap-2">
                <div className="w-10 h-10 flex items-center justify-center bg-gray-200 rounded-lg">
                  👋
                </div>
                <div>
                  <h4 className="text-secondary-color-3">Following</h4>
                  <h5>{userProfile.following.length}</h5>
                </div>
              </div>
              <div className="p-2 rounded-lg bg-gray-100 flex items-center gap-2">
                <div className="w-10 h-10 flex items-center justify-center bg-gray-200 rounded-lg">
                  👋
                </div>
                <div>
                  <h4 className="text-secondary-color-3">Questions</h4>
                  <h5>{postCount}</h5>
                </div>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-end gap-5">
            <Button
              type="reset"
              variant="ghost"
              className="text-gray-600 px-10 bg-gray-200 w-28"
            >
              Cancel
            </Button>
            <Button type="submit" className="text-white px-10 w-28">
              Save
            </Button>
          </div>
          <div className="mt-10 grid grid-cols-2 gap-10">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Fullname</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter your name"
                      className="bg-white no-focus"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-red-400" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="bio"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Bio</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter your bio"
                      className="bg-white no-focus"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="website"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Website</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter your website URL"
                      className="bg-white no-focus"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="socials.facebook"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Facebook</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter your Facebook URL"
                      className="bg-white no-focus"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />
          </div>
        </div>
      </form>
    </Form>
  );
};

export default MyProfile;
