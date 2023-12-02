import IconCube from "@/components/icons/IconCube";
import IconHeart from "@/components/icons/IconHeart";
import IconHome from "@/components/icons/IconHome";
import IconProfile from "@/components/icons/IconProfile";
import IconUser from "@/components/icons/IconUser";

const navLinks: {
  icon: React.ReactNode;
  url: string;
  title: string;
  isActive?: (pathname: string) => boolean;
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
    url: "/my-profile",
    title: "My Profile",
  },
  {
    icon: <IconHeart className="w-6 h-6"></IconHeart>,
    url: "/liked",
    title: "Liked Posts",
  },
];
const homePageFilters = [
  {
    name: "Latest",
    value: "latest",
  },
  {
    name: "Popular",
    value: "popular",
  },
];
const editorOptions = (field: any, theme: any) => ({
  initialValue: "<p>This is the initial content of the editor.</p>",
  onBlur: field.onBlur,
  onEditorChange: (content: any) => field.onChange(content),
  init: {
    skin: theme === "dark" ? "oxide-dark" : "oxide",
    height: 350,
    menubar: false,
    plugins: [
      "advlist",
      "autolink",
      "lists",
      "link",
      "image",
      "charmap",
      "preview",
      "anchor",
      "searchreplace",
      "visualblocks",
      "codesample",
      "fullscreen",
      "insertdatetime",
      "media",
      "table",
      "heading",
    ],
    toolbar:
      "undo redo | " +
      "codesample | bold italic forecolor | alignleft aligncenter |" +
      "alignright alignjustify | bullist numlist |" +
      "image |" +
      "h1 h2 h3 h4 h5 h6 | preview | fullscreen |" +
      "link",
    content_style: `
                           body { font-family: DM sans, Inter,Helvetica,Arial,sans-serif; font-size:14px; } img { max-width: 100%; height: auto; display: block; margin: 0 auto; }`,
  },
});

export { editorOptions, homePageFilters, navLinks };
