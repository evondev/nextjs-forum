"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { twMerge } from "tailwind-merge";

function ActiveLink({
  children,
  href,
  className,
  ...props
}: {
  children: React.ReactNode;
  href: string;
  className?: string;
}) {
  const pathname = usePathname();
  const activeClassName =
    pathname === href
      ? "bg-primary font-medium text-white"
      : "hover:bg-gray-100 dark:hover:bg-dark4 dark:text-white";
  return (
    <Link
      href={href}
      className={twMerge(className, activeClassName)}
      {...props}
    >
      {children}
    </Link>
  );
}

export default ActiveLink;
