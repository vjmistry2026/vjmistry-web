import Breadcrumb from "../../common/Breadcrumb";
const PageHeader = () => {
  return ( 
    <section className="pt-100 lg:pt-130 3xl:pt-150 mb-15 mt-[77px] lg:mt-[122px]">
      <div className="container">
        <div className="flex items-center justify-between">
          <p className="font-nexa text-20 text-paragraph font-bold">Published on Sep 15, 2025 | Blog</p>
        <Breadcrumb variant="dark" />
        </div>
      </div>
    </section>
   );
}
 
export default PageHeader;