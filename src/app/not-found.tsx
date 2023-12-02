import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="w-full h-screen flex flex-col items-center justify-center text-center">
      <h1 className="text-[100px] font-bold text-primary leading-none">404</h1>
      <p className="mb-10 max-w-md">
        Look like you are lost. It is seems that the page you are looking for
        does not exist.
      </p>
      <Link href="/">
        <Button variant="default" className="text-white font-semibold">
          Return Home
        </Button>
      </Link>
    </div>
  );
}
