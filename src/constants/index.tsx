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
export { navLinks };
