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
    title: "Home",
  },
  {
    icon: <IconUser></IconUser>,
    url: "/users",
    title: "All users",
  },
  {
    icon: <IconUser></IconUser>,
    url: "/my-profile",
    title: "My profile",
  },
  {
    icon: <IconUser></IconUser>,
    url: "/tags",
    title: "Tags",
  },
  {
    icon: <IconUser></IconUser>,
    url: "/liked",
    title: "Liked posts",
  },
  {
    icon: <IconUser></IconUser>,
    url: "/saved",
    title: "Saved posts",
  },
];
const widgetFilter = [
  {
    icon: "/icons/icon-star.svg",
    title: "Newest and Recent",
    desc: "Find the latest update",
  },
  {
    icon: "/icons/icon-popular.svg",
    title: "Popular of the day",
    desc: "Shots featured today by curators",
  },
  {
    icon: "/icons/icon-follow.svg",
    title: "Following",
    desc: "Explore from your favorite person",
  },
];

export { navLinks, widgetFilter };
