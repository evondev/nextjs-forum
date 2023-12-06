import { CubeIcon, HomeIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Layout = async ({ children }: { children: React.ReactNode }) => {
  // const {userId: clerkId} = auth();
  // let mongoUser;
  // if (clerkId) {
  //   mongoUser = await getUserById({userId: clerkId});
  // }
  return (
    <div className="grid grid-cols-[300px_1fr] gap-5">
      <div className="bg-white dark:bg-dark3 h-screen p-5">
        <Link href="/">
          <Image
            src="/images/logo.png"
            alt="Hipnode"
            width={146}
            height={38}
          ></Image>
        </Link>
        <div className="mt-10 flex flex-col gap-3">
          <Link
            href="/dashboard"
            className="p-3 rounded-full flex items-center gap-3 hover:bg-secondary hover:bg-opacity-10 hover:text-secondary font-medium"
          >
            <HomeIcon className="w-5 h-5"></HomeIcon>
            <span>Dashboard</span>
          </Link>
          <Link
            href="/manage/topics"
            className="p-3 rounded-full flex items-center gap-3 hover:bg-secondary hover:bg-opacity-10 hover:text-secondary font-medium"
          >
            <CubeIcon className="w-5 h-5"></CubeIcon>
            <span>All Topics</span>
          </Link>
        </div>
      </div>
      <div className="p-5">{children}</div>
    </div>
  );
};

export default Layout;
