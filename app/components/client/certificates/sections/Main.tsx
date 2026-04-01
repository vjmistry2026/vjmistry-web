import AnimatedHeading from "../../common/AnimateHeading";
import Image from "next/image";
const Main = ({ data }: { data: CertificateType['firstSection'] }) => {
  return (
    <section className="py-30 xl:py-150 relative overflow-hidden">
      <div className="absolute bottom-0 2xl:bottom-[-8%] right-0 opacity-80">
        <Image src="/assets/shapes/shape-main.svg" alt="" width={1467} height={649.61} className="object-cover max-w-[1149px] max-h-[566px] 2xl:h-[400px] 2xl:w-[800px] 3xl:h-[566px] 3xl:w-[1149px]" />
      </div>
      <div className="container">
<<<<<<< HEAD
        <AnimatedHeading text={data.title} className="mb-30 max-w-xl leading-[1.2]" />
        <p className="cmn-p font-bold max-w-[98ch]">{data.description}</p>
=======
        <AnimatedHeading text="Setting Standards in Accountability" className="mb-4 md:mb-30 max-w-xl leading-[1.2]"/>
        <p className="cmn-p font-bold max-w-[98ch]">At V.J. Mistry & Company Ltd, we don’t just meet standards; we set them. Our legal compliance ensures that every contract is backed by the highest level of professional accountability and government recognition.</p>
>>>>>>> 519e1581e605101f3ae7af8e8dbf568be9779d2e
      </div>
    </section>
  );
}

export default Main;