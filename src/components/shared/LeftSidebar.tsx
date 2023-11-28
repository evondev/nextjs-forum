"use client";
import { navLinks } from "@/constants";
import { useAuth } from "@clerk/nextjs";
import Link from "next/link";
import ActiveLink from "./active-link/ActiveLink";

function LeftSidebar() {
  const { isSignedIn } = useAuth();
  return (
    <div className="flex flex-col gap-10 dark:bg-dark3 p-5 bg-white  left-0 max-lg:hidden h-[calc(100vh-80px)] sticky top-20">
      <div className="flex flex-col gap-3">
        {navLinks.map((link) => (
          <ActiveLink
            key={link.url}
            href={link.url}
            className="flex items-center gap-5 p-3 rounded-lg text-base"
          >
            {link.icon}
            <span>{link.title}</span>
          </ActiveLink>
        ))}
      </div>
      <div>
        <h3 className="uppercase font-semibold text-sm mb-3">Popular topics</h3>
        <div className="flex flex-col gap-3">
          {/* {topicLinks.map((link) => (
            <ActiveLink
              key={link.url}
              href={link.url}
              className="flex items-center gap-5 p-3 rounded-lg text-base"
            >
              <div className="w-10 h-10 rounded-full flex items-center justify-center bg-gray-100"></div>
              <span>{link.title}</span>
            </ActiveLink>
          ))} */}
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
