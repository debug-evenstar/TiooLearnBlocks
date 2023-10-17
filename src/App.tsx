import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import axios from "axios";

import RenderComponent from "pages/renderComp";
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
    ],
  };
  const user = {
    name: "Acrobatic Binge",
  };
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
  }, []);
  const changeFile = async (file: any, payload: any, id: any) => {
    setSaving(true);
    const checkImg = payload.filter(
      (where: any) => where.component === "Image"
    );
    const datas = payload.filter(
      (where: any) => where.component !== "Image" && where.component !== "Video"
    );
    const fd = new FormData();
    fd.append(!!checkImg.length ? "image" : "video", file);
    await axios
      .put(`https://beta.api.hellotioo.com/open/lesson/templateimage/${id}`, fd)
      .then((res: any) => {
        if (!res.error) {
          const url = res.data.data[0];
          const comps = {
            alternatives: [],
            component: !!checkImg.length ? "Image" : "Video",
            url: url,
          };
          const payloads = {
            slide_data: [...datas, comps],
          };
          axios
            .put(
              `https://api.hellotioo.com/open/lesson/template/${id}`,
              payloads
            )
            .then((res: any) => {
              if (!res.error) {
                fetchLess();
                setSaving(false);
              }
            });
        } else console.log(res);
      });
  };
  const changeCard = async (
    file: any,
    payload: any,
    id: any,
    length: number,
    changedIndex: any
  ) => {
    setSaving(true);
    const datas = payload.filter(
      (where: any) => where.component !== "FlashCards"
    );
    const cardsImg = payload.filter(
      (where: any) => where.component === "FlashCards"
    );
    const fd = new FormData();
    for (let i = 0; i < file.length; i++) {
      fd.append(`image`, file[i]);
    }
    await axios
      .put(`https://beta.api.hellotioo.com/open/lesson/templateimage/${id}`, fd)
      .then((res: any) => {
        if (!res.error) {
          const url = res.data.data;
          const newArray = Array(cardsImg[0].cards.length).fill("");
          changedIndex.forEach((i: number, index: number) => {
            if (i >= 0 && i < newArray.length) {
              newArray[i] = url[index];
            }
          });
          const updatedArray = cardsImg[0].cards.map((obj: any, i: number) => {
            if (changedIndex.includes(i)) {
              return { ...obj, url: newArray[i] };
            } else {
              return obj;
            }
          });
          const comps = {
            cards: updatedArray,
            component: "FlashCards",
          };
          const payloads = {
            slide_data: [...datas, comps],
          };
          axios
            .put(
              `https://beta.api.hellotioo.com/open/lesson/template/${id}`,
              payloads
            )
            .then((res: any) => {
              if (!res.error) {
                fetchLess();
                setSaving(false);
              }
            });
        } else console.log(res);
      });
  };
  const changeSlide = async (
    file: any,
    payload: any,
    id: any,
    length: number,
    changedIndex: any
  ) => {
    setSaving(true);
    const datas = payload.filter((where: any) => where.component !== "Slider");
    const slideImg = payload.filter(
      (where: any) => where.component === "Slider"
    );
    const fd = new FormData();
    for (let i = 0; i < file.length; i++) {
      fd.append(`image`, file[i]);
    }
    await axios
      .put(`https://beta.api.hellotioo.com/open/lesson/templateimage/${id}`, fd)
      .then((res: any) => {
        if (!res.error) {
          const url = res.data.data;
          const newArray = Array(slideImg[0].slides.length).fill([
            { url: "", component: "Image", alternative: [] },
          ]);
          changedIndex.forEach((i: number, index: number) => {
            if (i >= 0 && i < newArray.length) {
              newArray[i] = {
                url: url[index],
                component: "Image",
                alternative: [],
              };
            }
          });
          const updatedArray = slideImg[0].slides.map((obj: any, i: number) => {
            if (changedIndex.includes(i)) {
              return [newArray[i]];
            } else {
              return obj;
            }
          });
          const comps = {
            slides: updatedArray,
            component: "Slider",
            theme: slideImg[0].theme,
          };
          const payloads = {
            slide_data: [...datas, comps],
          };
          axios
            .put(
              `https://beta.api.hellotioo.com/open/lesson/template/${id}`,
              payloads
            )
            .then((res: any) => {
              if (!res.error) {
                fetchLess();
                setSaving(false);
              }
            });
        } else console.log(res);
      });
  };
  const createOverlay = async (
    file: any,
    ext: any,
    text: string,
    index: number
  ) => {
    const fd = new FormData();
      fd.append(`image`, file);
    await axios
      .put(`https://beta.api.hellotioo.com/open/lesson/templateimage/${index}`, fd)
      .then((res: any) => {
        if (!res.error) {
          const url = res.data.data;
          const overly = {
            component: "Image",
            url: url[0],
            extensions: ext,
          };
          const textData = {
            component: "Text",
            content: text,
            theme: "White",
          };
          const payload = {
            slide_index: index,
            slide_data: [overly, textData]
          };
          axios.post(`https://beta.api.hellotioo.com/open/lesson/${date.id}/slide`, payload)
          .then((res: any) => {
            if (!res.error) {
              fetchLess();
              setSaving(false);
            }
          });
        } else {
        }
      })
      .catch((err) => {});
  };
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
              changeFile={changeFile}
              back={handleBack}
              changeCard={changeCard}
              updateSlide={changeSlide}
              createOverlay={createOverlay}
              lessonlist={datas}
              name={user.name}
              isBusy={saving}
            />
          }
        />
        <Route
          path="/comp"
          element={<RenderComponent slides={date} back={handleBack} />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
