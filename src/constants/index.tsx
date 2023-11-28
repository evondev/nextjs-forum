import IconHome from "@/components/icons/IconHome";
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
  // {
  //   icon: <IconTag></IconTag>,
  //   url: "/topics",
  //   title: "All Topics",
  // },
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
const topicLinks: {
  icon: React.ReactNode;
  url: string;
  title: string;
}[] = [
  {
    icon: <IconHome></IconHome>,
    url: "/gaming",
    title: "Gaming",
  },
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

export { homePageFilters, navLinks, topicLinks };
