import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, } from "react-router-dom";
import axios from "axios";

// import Editorial from "./pages/editorial";
import RenderComponent from "./pages/renderComp";
import { Editorial } from "components";

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
    ]
  };
  const user = {
    name: 'Acrobatic Binge'
  }
  const [saving, setSaving] = useState(false)
  const [date, setDate] = useState<any>();
  // const navigate = useNavigate()
  const fetchLess = async () => {
    await axios
      .get("https://api.hellotioo.com/open/lesson/35/template")
      .then((res: any) => {
        if (!res.error) {
          setDate(res.data.data);
        } else console.log(res);
      });
  };
  useEffect(() => {
    fetchLess();
  }, []);
  const changeFile = async (file: any, payload:any, id: any) => {
    setSaving(true)
    const checkImg = payload.filter((where: any) => where.component === "Image")
    const datas = payload.filter((where: any) => where.component !== "Image" && where.component !== "Video")
    const fd = new FormData()
    fd.append(!!checkImg.length? "image" : "video", file)
    await axios
      .put(`https://api.hellotioo.com/open/lesson/templateimage/${id}`, fd)
      .then((res: any) => {
        if (!res.error) {
          const url = res.data.data[0];
          const comps = {
            alternatives: [],
            component: !!checkImg.length? "Image" : "Video",
            url: url
          }
          const payloads = {
            slide_data: [
              ...datas,
              comps
            ]
          }
          axios
            .put(
              `https://api.hellotioo.com/open/lesson/template/${id}`,
              payloads
            )
            .then((res: any) => {
              if (!res.error) {
                fetchLess();
                setSaving(false)
              }
            });
        } else console.log(res);
      });
  };
  const changeCard = async (file: any, payload:any, id: any, length:number, changedIndex:any) => {
    setSaving(true)
    const datas = payload.filter((where: any) => where.component !== "FlashCards")
    const cardsImg = payload.filter((where: any) => where.component === "FlashCards")
    const fd = new FormData()
    for (let i = 0; i < file.length; i++) {
      fd.append(`image`, file[i]);
    }
    await axios
      .put(`https://api.hellotioo.com/open/lesson/templateimage/${id}`, fd)
      .then((res: any) => {
        if (!res.error) {
          const url = res.data.data;
          const comps = {
            cards: [
              {url: changedIndex.includes(0)? url[0] : cardsImg.card[0].url},
              {url: changedIndex.includes(1)? url[0] : cardsImg.card[1].url},
              {url: cardsImg.card[2].url},
              {url: cardsImg.card[3].url},
              {url: cardsImg.card[4].url},
            ],
            component: "FlashCards",
          }
          const payloads = {
            slide_data: [
              ...datas,
              comps
            ]
          }
          axios
            .put(
              `https://api.hellotioo.com/open/lesson/template/${id}`,
              payloads
            )
            .then((res: any) => {
              if (!res.error) {
                fetchLess();
                setSaving(false)
              }
            });
        } else console.log(res);
      });
  };
  const handleBack = () => {
    // navigate('/')
  }
  
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<Editorial data={date} changeFile={changeFile} back={handleBack} changeCard={changeCard} lessonlist={datas} name={user.name} isBusy={saving}/>}
        />
        <Route path="/comp" element={<RenderComponent />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
