import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import RenderComponent from "pages/renderComp";
import { Editorial } from "components";
import { LessonPage } from "pages";
import axios from "axios";
import { refreshToggleSidebarState } from "provider/rightSidebarSlice";
import { useDispatch } from "react-redux";

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

  const dispatch = useDispatch();
  const [saving, setSaving] = useState(false);
  const [date, setDate] = useState<any>();
  const fetchLess = async () => {
    await axios
      .get("https://beta.api.hellotioo.com/open/lesson/473/template")
      .then((res: any) => {
        if (!res.error) {
          setDate(res.data.data);
        } else console.log(res);
      });
  };
  useEffect(() => {
    fetchLess();
    dispatch(refreshToggleSidebarState());
  }, []);

  const handleBack = () => {
    // navigate('/')
  };

  return (
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
              title="Mollllle"
              subject="dsd"
              className="Class 2"
              slides={[]}
              back={() => {}}
            />
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
