import IconCalendar from "@/components/icons/IconCalendar";
import IconGroup from "@/components/icons/IconGroup";
import IconHome from "@/components/icons/IconHome";
import IconInterview from "@/components/icons/IconInterview";
import IconPodcast from "@/components/icons/IconPodcast";

const navLinks: {
  icon: React.ReactNode;
  url: string;
}[] = [
  {
    icon: <IconHome></IconHome>,
    url: "/",
  },
  {
    icon: <IconCalendar />,
    url: "/meetups",
  },
  {
    icon: <IconGroup />,
    url: "/groups",
  },
  {
    icon: <IconPodcast />,
    url: "/podcasts",
  },
  {
    icon: <IconInterview />,
    url: "/interviews",
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
