import React from "react";

function Header() {
  const truncateString = (str: string, maxLength: number) => {
    if (str.length <= maxLength) {
      return str;
    }
    return str.slice(0, maxLength) + "...";
  };
  return (
    <div className="sticky top-0 z-30 shadow border-b bg-white border-[#030036] border-opacity-10 px-6 w-full flex items-center h-[80px]">
      <div className="flex px-[82px] items-center justify-between w-full relative">
        <div className="w-[140px] rounded-[8px] border border-[#4F46E5] text-[#4F46E5] flex items-center justify-center py-2 cursor-pointer text-semibold">
          {" "}
          Back
        </div>
        <div>
          <div className="flex items-center cursor-pointer">
            <span className="flex items-center cursor-pointer h-[50px] w-[50px]">
              <img
                src="https://images.squarespace-cdn.com/content/v1/530a77dee4b035db71736c02/1570812709805-UW9CYAKYVXKSTO845HHI/Connecticut+headshots+-+lawyer+headshot+-+Seshu+Badrinath.jpg?format=1000w"
                alt="profile"
                loading="lazy"
                className="h-full w-full rounded-full"
              />
            </span>
            <div className="flex flex-col items-start ml-3">
              <h3 className="font-inter font-normal text-base text-[#030036]">
                {truncateString("Flowinton Montesorrie School", 17)}
              </h3>
              <p className="text-[#87909E] text-[12px] font-inter font-normal pt-1">
                Update profile
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
