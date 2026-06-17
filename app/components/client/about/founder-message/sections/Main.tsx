import AnimatedHeading from "../../../common/AnimateHeading";
import { FoundersMessageType } from "@/app/types/foundersMessage";

const Main = ({ data }: { data: FoundersMessageType['firstSection'] }) => {
  return (
    <section className="pt-150 pb-100">
      <div className="container">
        <div className="grid grid-cols-1 xl:grid-cols-[auto_1fr] gap-x-10 xl:gap-x-130">
          <div>
            <img src="/assets/shapes/quote-open.svg" alt="" className="w-25 h-25 xl:w-auto xl:h-auto" />
          </div>
          <div className="relative pb-2 xl:pb-50">
            <div className="pb-80 mb-30 border-b border-border">
              <AnimatedHeading text={data.items[0].title} className="mb-30 max-w-[30ch]" />
              <div
                className="section-description "
                dangerouslySetInnerHTML={{
                  __html: data.items[0].message?.replace(/\n\n/g, "<br><br>") || <p></p>,
                }}
              />

            </div>
            <div >
              <h3 className="text-[22px] md:text-32 font-condensed leading-[100%] mb-[10px] ">
                {data.items[0].name}
              </h3>
              <p className="md:text-20 text-16 font-nexa font-bold leading-[1.5] text-paragraph">
                {data.items[0].designation}
              </p>
            </div>
            <div className="absolute bottom-0 right-0">
              <img src="/assets/shapes/quote-close.svg" alt="" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Main;