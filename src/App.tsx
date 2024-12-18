import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Editorial } from "components";
// import { refreshToggleSidebarState } from "provider/rightSidebarSlice";
// import { refreshToggleShowOptionBox } from "provider/showOptionsBoxSlice";
import LessonPage from "pages/LessonPage";
// import { LessonPage } from '@Praxeum-ai/LearnBlocks';

import {
  textbook,
  getTextbookChapters,
  getChapterLessons,
} from "./constants/library";
import { ConfigureLibrary } from "setup";
import Test from "pages/Test";
import AssessmentPage from "pages/CBT";
import GlobalResource from "services/api/resources/GlobalResource";

function App() {
  const datas = {
    topic: "Change of things",
    term: "1",
    lessons: [
      {
        id: 1,
        topic: "The Environment",
      },
      {
        id: 2,
        topic: "Air in Motion",
      },
      {
        id: 3,
        topic: "Basics of Living things",
      },
      {
        id: 4,
        topic: "Animals",
      },
      {
        id: 5,
        topic: "Soil",
      },
    ],
  };

  // const [saving, setSaving] = useState(false);
  // const [data, setData] = useState<any>();
  const [date, setDate] = useState<any>();
  const [bookData, setBookData] = useState<any>();
  const [ examData, setExamData] = useState<any>(null);
  const fetchLess = async () => {
    try {
      const response = await fetch(
        `http://192.168.79.222:8085/open/lesson/${process.env.REACT_APP_TEXTBOOK_ID}/template`
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      if (!data.error) {
        setDate(data.data);
      } else {
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const fetchTextbook = async () => {
    const textbook_id = process.env.REACT_APP_TEXTBOOK_ID;
    try {
      const response = await fetch(
        `http://192.168.79.222:8085/open/textbook/${textbook_id}`
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      if (!data.error) {
        setBookData(data.data);
      } else {
        // console.log(data);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const fetchExamSet = () => {
    GlobalResource.getExamSet(1)
    .then((response) => setExamData(response.data));
  }

  useEffect(() => {
    fetchLess();
    fetchTextbook();
    fetchExamSet();
  }, []);

  const layout = {
    position: {
      xAxis: {
        offset: 0,
        offsetPercent: 0,
      },
      yAxis: {},
    },
    size: {
      width: 0,
      widhtPercent: 0,
      height: 0,
      heightPercent: 0,
    },
  };

  const handleBack = () => {
    // navigate('/')
  };

  useEffect(() => {
    ConfigureLibrary.save({
      baseUrl: "http://localhost:8085",
      token: process.env.REACT_APP_API_TOKEN ?? "",
      authType: "student",
    });
  }, []);

  const lesson_index =
    Number.parseInt(`${process.env.REACT_APP_LESSON_INDEX}`) ?? 0;
  const chapter_index =
    Number.parseInt(`${process.env.REACT_APP_CHAPTER_INDEX}`) ?? 0;

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <Editorial
                data={date}
                back={handleBack}
                user={{
                  name: "John",
                  auth: "",
                  base: "",
                }}
                lessonList={datas}
                refetch={fetchLess}
              />
            }
          />
          <Route path="/test" element={<Test />} />

          <Route
            path="/cbt"
            element={
              <AssessmentPage
                studentName={"Praise Ike"}
                duration={10} // in minutes
                goHome={() => alert("going home")}
                goBack={() => console.log("back")}
                examData={examData}
              />
            }
          />

          <Route
            path="/study"
            element={
              bookData ? (
                <LessonPage
                  textbook={bookData}
                  chapters={bookData.chapters}
                  lesson={
                    bookData.chapters[chapter_index]?.lessons[lesson_index]
                  }
                  retake={false}
                  back={() => console.log("back")}
                />
              ) : (
                <></>
              )
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
