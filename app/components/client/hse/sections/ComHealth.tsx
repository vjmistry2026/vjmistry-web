import Image from "next/image";
import { Fragment } from "react";
import AnimatedHeading from "../../common/AnimateHeading";
import { HSEData } from "../data";

const ComHealth = () => {
  const { title, desc, stats } = HSEData.commitment;

  return ( 
    <section className="pt-130 pb-10 xl:pb-15 2xl:pb-[113px] bg-light relative overflow-hidden">
      <div className="absolute bottom-12 right-0">
        <Image src="/assets/images/hse/shapes/shape-1.svg" width={1705} height={592} alt="" />
      </div>
      <div className="container">
            <AnimatedHeading text={title} className="mb-30 xl:mb-[53px] max-w-xl leading-[1.2]" />
        <div className="grid grid-cols-1 xl:grid-cols-[1fr_3fr] 2xl:grid-cols-[666px_877px] gap-5 xl:gap-10 2xl:gap-17 3xl:gap-[77px]">
         <div>
            <p className="cmn-p font-bold max-w-[640px]">{desc}</p>
         </div>
         <div className="relative z-10 flex items-end">
          <div className="flex w-full flex-col gap-10 py-10 sm:grid sm:grid-cols-[minmax(0,1fr)_1px_minmax(0,1fr)_1px_minmax(0,1fr)] sm:items-center sm:gap-x-0 sm:gap-y-0 xl:py-0 3xl:grid-cols-[267px_1px_351px_1px_259px]">
            {stats.map((item, index) => (
              <Fragment key={`${item.value}-${item.label}`}>
                <div
                  className={`flex flex-col justify-center ${
                    index === 0
                      ? "sm:pr-14 lg:pr-18 2xl:pr-20 3xl:pr-0 3xl:w-full 3xl:items-start"
                      : index === stats.length - 1
                        ? "sm:pl-14 lg:pl-18 2xl:pl-20 3xl:pl-0 3xl:w-full "
                        : "sm:px-14 lg:px-18 2xl:px-20 3xl:px-0 3xl:w-full 3xl:items-center "
                  }`}
                >
                  <div
                    className={`flex flex-col ${
                      index === stats.length - 1
                        ? "items-end"
                        : index === 1
                          ? "items-center"
                          : "items-start text-left"
                    }`}
                  >
                    <div className="w-fit">
                      <h3 className="font-condensed text-[58px] leading-none text-primary sm:text-[68px] lg:text-[76px] 2xl:text-[82px] w-fit">
                        {item.value}
                      </h3>
                      <p className="mt-3 whitespace-nowrap font-nexa text-20 leading-1p5 text-paragraph font-bold w-fit">
                        {item.value === "ISO" ? "45001 Certified" : item.label}
                      </p>
                    </div>
                  </div>
                </div>
                {index !== stats.length - 1 ? (
                  <span
                    className="hidden h-[110px] w-px self-center sm:block xl:h-[138px]"
                    style={{
                      background:
                        "linear-gradient(180deg, rgba(237, 28, 36, 0) 0%, #ED1C24 100%)",
                    }}
                  />
                ) : null}
              </Fragment>
            ))}
          </div>
         </div>
        </div>
      </div>
    </section>
   );
}
 
export default ComHealth;
