import IconCube from "@/components/icons/IconCube";
import IconHome from "@/components/icons/IconHome";
import IconProfile from "@/components/icons/IconProfile";
import IconUser from "@/components/icons/IconUser";

const navLinks: {
  icon: React.ReactNode;
  url: string;
  title: string;
}[] = [
  {
    icon: <IconHome></IconHome>,
    url: "/",
    title: "All Discussions",
  },
  {
    icon: <IconUser></IconUser>,
    url: "/users",
    title: "Members",
  },
  {
    icon: <IconCube></IconCube>,
    url: "/topics",
    title: "All Topics",
  },
  {
    icon: <IconProfile></IconProfile>,
    url: "/profile",
    title: "My Profile",
  },
  // {
  //   icon: <IconTag></IconTag>,
  //   url: "/tags",
  //   title: "Tags",
  // },
  // {
  //   icon: <IconHeart></IconHeart>,
  //   url: "/liked",
  //   title: "Liked posts",
  // },
  // {
  //   icon: <IconBookmark></IconBookmark>,
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
