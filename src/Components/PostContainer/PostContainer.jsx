import React from "react";
import Button from "../Button/Button";
import image from "../../assets/react.svg";
import { AiOutlineLike, BiComment } from "react-icons/all";
const PostContainer = () => {
  return (
    <div className="bg-white py-3 rounded-lg shadow-sm border-[1px] border-gray-100 drop-shadow-sm w-[80%] min-w-[37rem] h-[35rem]">
      {/* post details -- username --image */}
      <p className="flex justify-start items-center h-10 overflow-hidden gap-3 p-3">
        <Button
          title={"User"}
          disable={true}
          icon={<img alt="image" src="" />}
        />
      </p>
      {/* post description */}
      <p className="p-4 border-b-[1px] border-b-gray-200">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias quos
        impedit modi? Amet deserunt vel labore nemo recusandae quas, officiis
        provident quisquam veritatis animi explicabo. Cumque aperiam unde a
        reiciendis.
      </p>
      {/* image container for post */}
      <p className="w-full h-[65%] py-1">
        <img src={image} alt="" className="h-full w-full object-contain" />
      </p>
      {/* reaction section */}
      <p className="border-t-[1px] border-t-gray-200 flex justify-center items-center">
        <Button
          disable={true}
          icon={<AiOutlineLike size={25} className="hover:text-blue-500"/>}
          title={"Like"}
          textHover={true}
          textColor={"red-900"}
        />
        <Button
          disable={true}
          icon={<BiComment size={25} className="hover:text-green-300"/>}
          title={"Comment"}
        />
      </p>
    </div>
  );
};

export default PostContainer;
