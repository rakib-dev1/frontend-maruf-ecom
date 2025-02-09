import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import d404 from "@/assets/svg/404.svg";
const NotFound = async () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background text-foreground p-4">
      <Image priority src={d404} alt="page not found" />

      <Button asChild>
        <Link href="/">Go Home</Link>
      </Button>
    </div>
  );
};
export default NotFound;
