import { ModeToggle } from "@/components/ModeToggle";
import { Button } from "@/components/ui/button";
import { UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import GlobalSearch from "../search/GlobalSearch";

export const NavBar = () => {
  return (
    <div className="bg-white py-5 px-10 flex items-center justify-between dark:bg-dark3 sticky top-0 z-50">
      <Link href="/">
        <Image
          src="/images/logo.png"
          alt="Hipnode"
          width={146}
          height={38}
        ></Image>
      </Link>

      <GlobalSearch></GlobalSearch>
      <div className="flex items-center gap-6">
        <div className="w-10 h-10 rouned-lg flex items-center justify-center rounded-lg">
          <UserButton></UserButton>
        </div>
        <ModeToggle></ModeToggle>
        <Link href="/create-post">
          <Button className="text-white">Start a discussion</Button>
        </Link>
      </div>
    </div>
  );
};
