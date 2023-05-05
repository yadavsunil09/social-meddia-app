import React from "react";
import Button from "../Button/Button";
import image from "../../assets/react.svg";
import { AiOutlineLike, BiComment } from "react-icons/all";
const PostContainer = ({ userDetail, postDescription }) => {
  return (
    <div className="bg-white py-3 rounded-lg shadow-md border-[1px] border-gray-100 drop-shadow-sm md:w-[80%] min-w-[30rem] w-[60%] md:min-w-[37rem] md:h-[37rem]">
      {/* post details -- username --image */}
      <p className="flex justify-start items-center h-10 overflow-hidden gap-3 p-3">
        <Button
          title={userDetail}
          disable={true}
          icon={<img alt="image" src="" />}
        />
      </p>
      {/* post description */}
      <p className="p-4 border-b-[1px] border-b-gray-200">{postDescription}</p>
      {/* image container for post */}
      <p className="w-full h-[65%] py-1">
        <img src={image} alt="" className="h-full w-full object-contain" />
      </p>
      {/* reaction section */}
      <p className="border-t-[1px] border-t-gray-200 flex justify-center items-center ">
        <Button
          disable={true}
          icon={<AiOutlineLike size={25} className="hover:text-blue-500" />}
          title={"Like"}
          textHover={true}
          textColor={"red-900"}
        />
        <Button
          disable={true}
          icon={<BiComment size={25} className="hover:text-green-300" />}
          title={"Comment"}
        />
      </p>
    </div>
  );
};

export default PostContainer;
