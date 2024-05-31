import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import RenderComponent from "pages/renderComp";
import { Editorial } from "components";
import { LessonPage } from "pages";
import { refreshToggleSidebarState } from "provider/rightSidebarSlice";
import { useDispatch } from "react-redux";
import { refreshToggleShowOptionBox } from "provider/showOptionsBoxSlice";
import NewLessonPage from "pages/newLessonPage";

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

    const [saving, setSaving] = useState(false);
    const [data, setData] = useState<any>();
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
                setData(data.data);
            } else {
                console.log(data);
            }
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };
    useEffect(() => {
        fetchLess();
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
                            data={data}
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
                        <NewLessonPage
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
