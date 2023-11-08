import Image from "next/image";
import Link from "next/link";

export const NavBar = () => {
  return (
    <div className="bg-white py-5 px-10 flex items-center justify-between">
      <Link href="/">
        <Image
          src="/images/logo.png"
          alt="Hipnode"
          width={146}
          height={38}
        ></Image>
      </Link>
    </div>
  );
};
