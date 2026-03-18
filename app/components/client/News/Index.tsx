
import { Suspense } from "react";
import PageBanner from "../common/PageBanner";

import { bannerData } from "./data";
import Main from "./sections/Main";
const Index = () => {
  return (
    <>
      <PageBanner title={bannerData.title} image={bannerData.image} />
      <Suspense>
        <Main />
      </Suspense>
    </>
  );
}

export default Index;