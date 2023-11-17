import { ModeToggle } from "@/components/ModeToggle";
import IconMesssage from "@/components/icons/IconMesssage";
import IconNoti from "@/components/icons/IconNoti";
import { UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";

export const NavBar = () => {
  return (
    <div className="bg-white py-5 px-10 flex items-center justify-between dark:bg-dark3">
      <Link href="/">
        <Image
          src="/images/logo.png"
          alt="Hipnode"
          width={146}
          height={38}
        ></Image>
      </Link>

      <div className="py-2 px-5 bg-secondary-color-6 w-full max-w-[440px] flex items-center justify-between gap-10 h-10 rounded-lg dark:bg-dark4 dark:text-white">
        <input
          type="text"
          placeholder="Type here to search..."
          className="bg-transparent outline-none text-sm w-full"
        />
        <svg
          width={21}
          height={21}
          viewBox="0 0 21 21"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx={10} cy={9} r={8} stroke="#858EAD" strokeWidth={2} />
          <path
            d="M15.5 15.5L19.5 19.5"
            stroke="#858EAD"
            strokeWidth={2}
            strokeLinecap="round"
          />
        </svg>
      </div>
      <div className="flex items-center gap-6">
        <div className="w-10 h-10 rouned-lg flex items-center justify-center dark:bg-dark4 dark:text-white bg-secondary-color-6 text-secondary-color-4 rounded-lg">
          <IconMesssage />
        </div>
        <div className="w-10 h-10 flex items-center justify-center dark:bg-dark4 dark:text-white bg-secondary-color-6 text-secondary-color-4 rounded-lg">
          <IconNoti />
        </div>
        <div className="w-10 h-10 rouned-lg flex items-center justify-center rounded-lg">
          <UserButton></UserButton>
        </div>
        <ModeToggle></ModeToggle>
      </div>
    </div>
  );
};
