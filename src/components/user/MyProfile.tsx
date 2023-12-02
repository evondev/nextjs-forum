"use client";
import { updateUser } from "@/lib/actions/user.action";
import { updateProfileSchema } from "@/lib/validations";
import { UploadButton } from "@/utils/uploadthing";
import {
  ArrowUpTrayIcon,
  GlobeAltIcon,
  PencilIcon,
} from "@heroicons/react/24/outline";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useForm, useWatch } from "react-hook-form";
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
import UserMeta from "./UserMeta";
interface MyProfileProps {
  mongoUser: any;
  postCount: Promise<number | undefined>;
}
const MyProfile = ({ mongoUser, postCount }: MyProfileProps) => {
  const userProfile = JSON.parse(mongoUser);
  const form = useForm<z.infer<typeof updateProfileSchema>>({
    resolver: zodResolver(updateProfileSchema),
    defaultValues: {
      avatar: userProfile.avatar,
      name: userProfile.name,
      bio: userProfile.bio,
      website: userProfile.website,
      socials: {
        facebook: userProfile?.socials?.facebook,
      },
    },
  });
  const pathname = usePathname();
  const avatar = useWatch({
    control: form.control,
    name: "avatar",
  });
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
        avatar: values.avatar,
      },
      path: pathname,
    });
    toast.success("Profile updated successfully");
  }
  const userMetaList = [
    {
      icon: "👋",
      count: userProfile?.followers.length,
      title: "Followers",
    },
    {
      icon: "👉",
      count: userProfile?.following.length,
      title: "Following",
    },
    {
      icon: "👇",
      count: postCount,
      title: "Posts",
    },
  ];
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
          <div className="flex flex-wrap max-md:flex-col items-center justify-between px-10">
            <div className="flex items-center gap-5">
              <div className="flex-shrink-0">
                <FormField
                  control={form.control}
                  name="avatar"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <>
                          <div className="relative -translate-y-1/2 group flex-shrink-0">
                            <UploadButton
                              content={{
                                button({ ready }) {
                                  if (ready) {
                                    return (
                                      <ArrowUpTrayIcon className="w-5 h-5 stroke-white"></ArrowUpTrayIcon>
                                    );
                                  }
                                  return <PencilIcon></PencilIcon>;
                                },
                              }}
                              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 ut-allowed-content:hidden ut-button:text-opacity-0 ut-button:w-10 ut-button:h-10 ut-button:rounded-full ut-button:opacity-0 group-hover:ut-button:opacity-100"
                              endpoint="imageUploader"
                              onClientUploadComplete={(res) => {
                                toast.success("Upload Completed");
                                form.setValue("avatar", res[0]?.url);
                              }}
                              onUploadError={(error: Error) => {
                                toast.error(`ERROR! ${error.message}`);
                              }}
                            />
                            <Image
                              src={avatar || userProfile.avatar}
                              alt=""
                              width={160}
                              height={160}
                              className="w-[160px] h-[160px] object-cover rounded-full border-4 border-white flex-shrink-0"
                            />
                          </div>
                        </>
                      </FormControl>
                      <FormMessage className="text-red-400" />
                    </FormItem>
                  )}
                />
              </div>

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
            <div className="flex items-center gap-2 ml-auto">
              {userMetaList.map((meta) => (
                <UserMeta
                  key={meta.icon}
                  icon={meta.icon}
                  count={meta.count}
                  title={meta.title}
                ></UserMeta>
              ))}
            </div>
          </div>
          <div className="flex items-center justify-end gap-5 max-lg:mt-10">
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
          <div className="mt-10 grid lg:grid-cols-2 gap-10">
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
