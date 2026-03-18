import Link from "next/link";
import { newsDetails } from "../data";
import AnimatedHeading from "../../common/AnimateHeading";
import Image from "next/image";
import MoreDetails from "./MoreDetails";

const Main = () => {
  return ( 
    <section>
      <div className="container">
        <div className="flex items-center justify-between mb-30">
          <AnimatedHeading text={newsDetails[0].title} className="mb-5 lg:mb-[30px]" />
          <div className="flex flex-col gap-5">
            <Link href="/" className="border border-border hover:border-primary w-15 h-15 flex items-center justify-center group transition-all linar duration-200">
              <Image src="/assets/icons/share-icon-primary.svg" alt="share post" width={23} height={23} className="w-[23px] h-[23px] brightness-0 group-hover:brightness-100 transition-all linar duration-200" />
            </Link>
            <Link href="/" className="border border-border hover:border-primary w-15 h-15 flex items-center justify-center group transition-all linar duration-200">
              <Image src="/assets/icons/copy-icon-primary.svg" alt="copy post" width={23} height={23} className="w-[23px] h-[23px] brightness-0 group-hover:brightness-100 transition-all linar duration-200" />
            </Link>
          </div>
        </div>
        <div>
          <Image src={newsDetails[0].img} alt="" width={1620} height={609} />
        </div>
      </div>
      
    </section>
   );
}
 
export default Main;
