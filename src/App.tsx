import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, } from "react-router-dom";
import axios from "axios";

// import Editorial from "./pages/editorial";
import RenderComponent from "./pages/renderComp";
import { Editorial } from "components";

function App() {
  // const datas = {
  //   topic: "Change of things",
  //   term: "1",
  //   lessons: [
  //     {
  //       id: 1,
  //       text: "The Environment",
  //     },
  //     {
  //       id: 2,
  //       text: "Air in Motion",
  //     },
  //     {
  //       id: 3,
  //       text: "Basics of Living things",
  //     },
  //     {
  //       id: 4,
  //       text: "Animals",
  //     },
  //     {
  //       id: 5,
  //       text: "Soil",
  //     },
  //   ]
  // };
  // const user = {
  //   name: 'Acrobatic Binge'
  // }
  // const [date, setDate] = useState<any>();
  // // const navigate = useNavigate()
  // const fetchLess = async () => {
  //   await axios
  //     .get("https://api.hellotioo.com/open/lesson/35/template")
  //     .then((res: any) => {
  //       if (!res.error) {
  //         setDate(res.data.data);
  //       } else console.log(res);
  //     });
  // };
  // useEffect(() => {
  //   fetchLess();
  // }, []);
  // const changeFile = async (file: any, payload:any, id: any) => {
  //   const checkImg = payload.filter((where: any) => where.component === "Image")
  //   const datas = payload.filter((where: any) => where.component !== "Image" && where.component !== "Video")
  //   const fd = new FormData()
  //   fd.append(!!checkImg.length? "image" : "video", file)
  //   await axios
  //     .put(`https://api.hellotioo.com/open/lesson/templateimage/${id}`, fd)
  //     .then((res: any) => {
  //       if (!res.error) {
  //         const url = res.data.data.image;
  //         const comps = {
  //           alternatives: [],
  //           component: !!checkImg.length? "Image" : "Video",
  //           url: url
  //         }
  //         const payloads = {
  //           slide_data: [
  //             ...datas,
  //             comps
  //           ]
  //         }
  //         axios
  //           .put(
  //             `https://api.hellotioo.com/open/lesson/template/${id}`,
  //             payloads
  //           )
  //           .then((res: any) => {
  //             if (!res.error) {
  //               fetchLess();
  //               alert("changed");
  //             }
  //           });
  //       } else console.log(res);
  //     });
  // };
  // const handleBack = () => {
  //   // navigate('/')
  // }
  // console.log(date);
  
  return (
    <BrowserRouter>
      <Routes>
        {/* <Route
          path="/"
          element={<Editorial data={date} changeFile={changeFile} back={handleBack} lessonlist={datas} name={user.name} />}
        /> */}
        <Route path="/comp" element={<RenderComponent />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
