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
        "http://localhost:8085/open/textbook/2"
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      if (!data.error) {
        setBookData(data.data);
        console.log(data.data);
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
    console.log(bookData?.chapters);
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
      token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyZGF0YSI6eyJpZCI6NCwiZW1haWwiOiJwcmFpc2Vpa2UxMjNAZ21haWwuY29tIiwiYWNjb3VudF90eXBlIjoic2Nob29sIn0sImlhdCI6MTcyNTQxNDgzNywiZXhwIjoxNzMzMTkwODM3fQ.XhoKL5q30UfFGMJsOkO0uozGDzciRLQOSEiZv8-QiNQ",
      authType: "student"
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
          <Route path="/test" element={<Test/>}/>

          <Route
            path="/study"
            element={
              bookData ? <LessonPage
                textbook={bookData}
                chapters={bookData.chapters}
                lesson={bookData.chapters[0]?.lessons[0]}
                retake={false}
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