import TopNav from "./TopNav";
import SideBar from "./SideBar";
import Footer from "./Footer";
import GlobalResource from "services/api/resources/GlobalResource";
import { useEffect, useRef, useState } from "react";
import SlideContainer from "./SlideContainter";
import { SubjectLesson } from "./types";

const Main = ({ children }: any) => {
  return (
    <div className="border w-full h-screen flex  flex-col justify-between">
      {children}
    </div>
  );
};

export default function AssessmentPage({ set_id }: any) {
  const [data, setData] = useState(null);
  const [current, setCurrent] = useState<SubjectLesson | null>(null);
  const [activeSlide, setActiveSlide] = useState(0);
  const [canProceed, setCanProceed] = useState(true);
  const sliderRef = useRef<any>(null);

  const slideManagerRef = useRef<any>(null);

  useEffect(() => {
    setActiveSlide(0);
    // setSlideManagerRef(() => useRef<any>(null))
  }, [current]);

  useEffect(() => {
    GlobalResource.getExamSet(set_id).then((response) => {
      setData(response.data);
      if (response.data.length > 0) setCurrent(response.data[0]);
    });
  }, []);

  return (
    <div className="flex">
      <SideBar
        lesson={current?.lesson}
        subject={current?.subject}
        activeSlide={activeSlide}
        setActiveSlide={setActiveSlide}
        slideManagerRef={slideManagerRef}
      />
      <Main>
        <TopNav data={data} setCurrent={setCurrent} />
        <SlideContainer
          key={current?.subject.id} // force it to rerender whenever i change subject
          activeSlide={activeSlide}
          setActiveSlide={setActiveSlide}
          ref={sliderRef}
          slideManagerRef={slideManagerRef}
          canProceed={canProceed}
          setCanProceed={setCanProceed}
          lesson={current?.lesson}
        />
        <Footer
          sliderRef={sliderRef}
          canProceed={canProceed}
          hasPrevious={activeSlide > 0}
          setCanProceed={setCanProceed}
        />
      </Main>
    </div>
  );
}
