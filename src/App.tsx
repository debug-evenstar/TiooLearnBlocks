import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
// import RenderComponent from "pages/renderComp";
import { Editorial } from "components";
// import { LessonPage } from "pages";
// import { refreshToggleSidebarState } from "provider/rightSidebarSlice";
// import { useDispatch } from "react-redux";
// import { refreshToggleShowOptionBox } from "provider/showOptionsBoxSlice";
import LessonPage from "pages/LessonPage";
// import { LessonPage } from '@Praxeum-ai/LearnBlocks';

// import AsyncStorage from "@react-native-async-storage/async-storage";
import { slides } from "dump/can";

import {
  textbook,
  getTextbookChapters,
  getChapterLessons,
} from "./constants/library";
import { ConfigureLibrary } from "setup";

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

  const fetchLess = async () => {
    try {
      const response = await fetch(
        "http://localhost:8085/open/lesson/2/template"
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      if (!data.error) {
        setDate(data.data);
      } else {
        console.log(data);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const fetchTextbook = async () => {
    try {
      const response = await fetch(
        "http://localhost:8085/open/textbook/15"
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

  useEffect(() => {
    fetchLess();
    fetchTextbook();
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

  const lessons: any[] = [];
  let chapters: any[] = getTextbookChapters().map((chapter) => ({
    ...chapter,
    lessons: getChapterLessons(chapter.id).map(
      (lesson: any) => ({
        ...lesson,
        slides: slides.map((slide: any) => [
          ...slide.map((comp: any) => ({
            ...comp,
            layout: layout,
          })),
        ]),
      })
    ),
  }));

  const handleBack = () => {
    // navigate('/')
  };

  useEffect(() => {
    ConfigureLibrary.save({
      baseUrl: "http://localhost:8085"
    });
  }, []);


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
          <Route
            path="/comp"
            element={
              <LessonPage
                textbook={textbook}
                chapters={chapters}
                lessons={lessons}
                back={() => console.log("back")}
              />
            }
          />
          <Route
            path="/study"
            element={
              bookData ? <LessonPage
                textbook={bookData}
                chapters={bookData.chapters}
                lessons={[]}
                back={() => console.log("back")}
              /> : <></>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;