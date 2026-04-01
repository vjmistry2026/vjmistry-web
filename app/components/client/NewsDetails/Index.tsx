import Main from "./sections/Main";
import PageHeader from "./sections/PageHeader";
import MoreDetails from "./sections/MoreDetails";
import { NewsType } from "@/app/types/news";

const Index = ({ news }: { news: NewsType['news'][number] }) => {
   return (
      <>
         <PageHeader
            date={news.firstSection.date}
            category={news.firstSection.category.name}
         />

         <Main
            image={news.firstSection.coverImage}
            imageAlt={news.firstSection.coverImage}
            title={news.firstSection.title}
         />

         <MoreDetails secondSection={news.secondSection} thirdSection={news.thirdSection} />
      </>
   );
}

export default Index;
