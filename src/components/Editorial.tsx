import EditorialComp from "pages/editorial";
import React, { FC, useState } from "react";
interface UserProps {
  name: string;
  auth: string;
  base: string;
}
interface Props {
  data: any;
  user: UserProps;
  back: () => void;
  lessonList: any;
  refetch: () => void
}
const Editorial: FC<Props> = ({ data, user, back, lessonList, refetch }) => {
  const [saving, setSaving] = useState(false);
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
    await fetch(`${user.base}/open/lesson/templateimage/${id}`,{
        method: "PUT",
        headers: {
          'Authorization': `Bearer ${user.auth}` 
        },
        body: fd,
      })
      .then(response => response.json())
      .then((res: any) => {
        if (!res.error) {
          const url = res.data[0];
          const comps = {
            alternatives: [],
            component: !!checkImg.length ? "Image" : "Video",
            url: url,
          };
          const payloads = {
            slide_data: [...datas, comps],
          };
          fetch(
              `${user.base}/lesson/template/${id}`,{
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.auth}` 
                  },
                  body: JSON.stringify(payloads)
              }
            )
            .then((res: any) => {
              if (!res.error) {
                refetch();
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
      await fetch(`${user.base}/open/lesson/templateimage/${id}`,{
        method: "PUT",
        headers: {
          'Authorization': `Bearer ${user.auth}` 
        },
        body: fd,
      })
      .then(response => response.json())
      .then((res: any) => {
        if (!res.error) {
          const url = res.data;
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
            fetch(
              `${user.base}/lesson/template/${id}`,{
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.auth}` 
                  },
                  body: JSON.stringify(payloads)
              }
            )
            .then((res: any) => {
              if (!res.error) {
                refetch();
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
      await fetch(`${user.base}/open/lesson/templateimage/${id}`,{
        method: "PUT",
        headers: {
          'Authorization': `Bearer ${user.auth}` 
        },
        body: fd,
      })
      .then(response => response.json())
      .then((res: any) => {
        if (!res.error) {
          const url = res.data;
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
            fetch(
              `${user.base}/lesson/template/${id}`,{
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.auth}` 
                  },
                  body: JSON.stringify(payloads)
              }
            )
            .then((res: any) => {
              if (!res.error) {
                refetch();
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
      await fetch(`${user.base}/open/lesson/templateimage/${index}`,{
        method: "PUT",
        headers: {
          'Authorization': `Bearer ${user.auth}` 
        },
        body: fd,
      })
      .then(response => response.json())
      .then((res: any) => {
        if (!res.error) {
          const url = res.data;
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
            slide_data: [overly, textData],
          };
            fetch(
              `${user.base}/lesson/${data.id}/slide`,{
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.auth}` 
                  },
                  body: JSON.stringify(payload)
              }
            )
            .then((res: any) => {
              if (!res.error) {
                refetch();
                setSaving(false);
              }
            });
        } else {
        }
      })
      .catch((err) => {});
  };
  return (
    <>
      <EditorialComp
        data={data}
        changeFile={changeFile}
        back={back}
        changeCard={changeCard}
        updateSlide={changeSlide}
        createOverlay={createOverlay}
        lessonlist={lessonList}
        name={user.name}
        isBusy={saving}
      />
    </>
  );
};

export default Editorial;
