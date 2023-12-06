"use client";
import { navLinks } from "@/constants";
import { CreateTopicParams } from "@/lib/actions/shared.types";
import { useAuth } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import ActiveLink from "./active-link/ActiveLink";

function LeftSidebar({ topics }: { topics: CreateTopicParams[] }) {
  const { isSignedIn } = useAuth();
  const pathname = usePathname();
  return (
    <div className="flex flex-col gap-10 dark:bg-dark3 p-5 bg-white  left-0 max-lg:hidden h-[calc(100vh-80px)] sticky top-20">
      <div className="flex flex-col gap-3">
        {navLinks.map((link) => (
          <ActiveLink
            key={link.url}
            href={link.url}
            className="flex items-center gap-3 p-3 rounded-full text-base font-medium"
            isActive={link?.isActive?.(pathname)}
          >
            {link.icon}
            <span>{link.title}</span>
          </ActiveLink>
        ))}
      </div>
      <div>
        <h3 className="uppercase font-semibold text-sm mb-3">Popular topics</h3>
        <div className="flex flex-col gap-3">
          {topics &&
            topics.map((link) => (
              <ActiveLink
                key={link.name}
                href={`/topic/${link._id}`}
                className="flex items-center gap-3 p-3 rounded-full text-base font-medium"
              >
                <div className="w-5 h-5 rounded-full bg-gray-100 flex items-center justify-center">
                  <Image
                    width={20}
                    height={20}
                    src={link.icon || ""}
                    alt="icon"
                    className="w-3 h-3"
                  />
                </div>
                <span>{link.name}</span>
              </ActiveLink>
            ))}
        </div>
      </div>
      {!isSignedIn && (
        <div className="mt-auto grid grid-cols-2 gap-5">
          <Link
            href="/sign-in"
            className="p-3 rounded-lg flex items-center justify-center text-dark4 dark:text-white font-semibold"
          >
            SignIn
          </Link>
          <Link
            href="/sign-up"
            className="p-3 rounded-lg flex items-center justify-center text-white bg-primary font-semibold"
          >
            SignUp
          </Link>
        </div>
      )}
    </div>
  );
}

export default LeftSidebar;
