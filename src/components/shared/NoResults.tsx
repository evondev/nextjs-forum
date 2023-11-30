import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";
interface NoResultsProps {
  title: string;
  description: string;
  link: string;
  linkTitle: string;
}
const NoResults = ({ title, description, link, linkTitle }: NoResultsProps) => {
  return (
    <div className="flex items-center justify-center flex-col text-center gap-2">
      <Image
        alt=""
        src="/images/no-data.png"
        width={800}
        height={400}
        className="max-w-[200px] mx-auto"
      />
      <h2 className="font-bold text-xl mb">{title}</h2>
      <p className="text-sm max-w-md mb-5">{description}</p>
      <Link href={link}>
        <Button className="text-white font-semibold">{linkTitle}</Button>
      </Link>
    </div>
  );
};

export default NoResults;
