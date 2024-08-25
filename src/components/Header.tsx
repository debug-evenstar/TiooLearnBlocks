import { FC } from "react";

interface Props {
  activeSlide: number
  back: () => void
  name: string;
  manager: any;
  showEdit: any;
  closeEdit: any;
}
const truncateString = (str: string, maxLength: number) => {
  if (str.length <= maxLength) {
    return str;
  }
  return str.slice(0, maxLength) + "...";
};

export const Header: FC<Props> = ({ activeSlide, back, name, showEdit, closeEdit, manager }) => {

  const lesson = manager.lesson;
  const slidesCount = lesson?.lesson_slides?.length ?? 0;

  const handleBackClick = () => {
    showEdit ?
      closeEdit() : back();
  }

  // const NameAvat = () => {e
  //   const nameRow = name.split(' ')
  //   const fname = nameRow[0]?.charAt(0)
  //   const lname = nameRow.length > 1 && nameRow[1].charAt(0)

  //   return <div className="h-full w-full bg-[#4F46E5] rounded-[50px] font-semibold text-white text-xl flex items-center justify-center">{fname}{lname}</div>
  // }
  return (
    <div className="sticky top-0 z-30 shadow border-b bg-white border-[#030036] border-opacity-10 px-6 w-full flex items-center h-[80px]">
      <div className="flex px-[22px] items-center justify-between w-full relative">
        <button onClick={handleBackClick} className="w-[140px] rounded-[8px] border border-[#4F46E5] text-[#4F46E5] flex items-center justify-center py-2 cursor-pointer text-semibold" >
          Back
        </button>
        <div className="w-8/12">
          <h3 className="text-center text-[#030036] opacity-70 text-[18px]">
            <span className="font-normal"> Slide {activeSlide + 1}</span>
          </h3>
        </div>
        <div className="flex items-center justify-end">
          <div className="flex items-center justify-end cursor-pointer">
            <span className="flex items-center cursor-pointer h-[50px] w-[50px]">
              {/* <img
                src="https://images.squarespace-cdn.com/content/v1/530a77dee4b035db71736c02/1570812709805-UW9CYAKYVXKSTO845HHI/Connecticut+headshots+-+lawyer+headshot+-+Seshu+Badrinath.jpg?format=1000w"
                alt="profile"
                loading="lazy"
                className="h-full w-full rounded-full"
              /> */}
              {/* <NameAvat /> */}
            </span>
            <div className="flex flex-col items-start ml-3">
              <h3 className="font-inter font-normal text-base text-[#030036]" title={lesson?.topic ?? ""
              }>
                {/* {truncateString(name, 17)} */}
                {truncateString(lesson?.topic ?? "", 17)}
              </h3>
              <p className="text-[#87909E] text-[12px] font-inter font-normal pt-1">
                <span>{slidesCount ?? "0"}</span> Lesson slide<span>{slidesCount > 1 ? "s" : ""}
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;