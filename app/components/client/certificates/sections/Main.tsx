import AnimatedHeading from "../../common/AnimateHeading";
import Image from "next/image";
const Main = ({ data }: { data: CertificateType['firstSection'] }) => {
  return (
    <section className="py-30 xl:py-150 relative overflow-hidden">
      <div className="absolute bottom-0 2xl:bottom-[-8%] right-0 opacity-80">
        <Image src="/assets/shapes/shape-main.svg" alt="" width={1467} height={649.61} className="object-cover max-w-[1149px] max-h-[566px]" />
      </div>
      <div className="container">
        <AnimatedHeading text={data.title} className="mb-30 max-w-xl leading-[1.2]" />
        <p className="cmn-p font-bold max-w-[98ch]">{data.description}</p>
      </div>
    </section>
  );
}

export default Main;