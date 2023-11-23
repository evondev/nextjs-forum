import IconHome from "@/components/icons/IconHome";
import IconTag from "@/components/icons/IconTag";
import IconUser from "@/components/icons/IconUser";

const navLinks: {
  icon: React.ReactNode;
  url: string;
  title: string;
}[] = [
  {
    icon: <IconHome></IconHome>,
    url: "/",
    title: "Home",
  },
  {
    icon: <IconUser></IconUser>,
    url: "/users",
    title: "All users",
  },
  // {
  //   icon: <IconUser></IconUser>,
  //   url: "/my-profile",
  //   title: "My profile",
  // },
  {
    icon: <IconTag></IconTag>,
    url: "/tags",
    title: "Tags",
  },
  // {
  //   icon: <IconUser></IconUser>,
  //   url: "/liked",
  //   title: "Liked posts",
  // },
  // {
  //   icon: <IconUser></IconUser>,
  //   url: "/saved",
  //   title: "Saved posts",
  // },
];
const homePageFilters = [
  {
    name: "Newest",
    value: "newest",
  },
  {
    name: "Popular",
    value: "popular",
  },
  {
    name: "Following",
    value: "following",
  },
];

export { homePageFilters, navLinks };
