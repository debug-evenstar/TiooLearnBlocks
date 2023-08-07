import React from "react";
import SwiperCore from "../../utilities/swiperCore";

const SliderComponent = () => {
  const rawData = [
    {
      quest: "icarry money come them follow onboard",
    },
    {
      quest: "icarry money come them follow onboard two",
    },
    {
      quest: "icarry money come them follow onboard three",
    },
    {
      quest: "icarry money come them follow onboard four",
    },
  ];
  return (
    <>
      <div className="py-6">
      <div className="w-full absolute">
        <SwiperCore
          items={rawData.map((item) => (
            <div key={item.quest}>{item.quest}</div>
          ))}
          navigation
          slidesPerView={1}
          className="w-full h-full text-center"
        />
      </div>
      </div>
    </>
  );
};

export default SliderComponent;
