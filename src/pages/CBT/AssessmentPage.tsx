import TopNav from "./TopNav";
import SideBar from "./SideBar";
import Footer from "./Footer";



const Main = ({ children }: any) => {
  return (
    <div className="border w-full h-screen flex  flex-col justify-between">
      {children}
    </div>
  );
};

const SlideContainer = () => {
  return <div className="flex h-full grow"></div>;
};


export default function AssessmentPage() {
  return (
    <div className="flex">
      <SideBar />
      <Main>
        <TopNav />
        <SlideContainer />
        <Footer />
      </Main>
    </div>
  );
}
