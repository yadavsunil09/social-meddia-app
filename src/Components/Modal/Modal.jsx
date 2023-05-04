import React from "react";
import { RxCross2, IoImagesOutline, BsEmojiHeartEyes } from "react-icons/all";
const Modal = () => {
  return (
    <div className="h-screen bg-black/30 backdrop-blur-sm z-10 fixed w-full left-0 top-0 flex justify-center items-center">
      <div className="bg-white py-3 rounded-lg shadow-md border-[1px] border-gray-100 drop-shadow-sm md:min-w-[35rem] h-[28rem] w-[30rem] md:h-[28rem] p-10 gap-5 flex flex-col">
        <p className="flex justify-center items-center p-1 border-b-[1px] border-b-gray-200 text-black/90 font-[500] text-[19px]">
          <span className="flex-1 flex items-center justify-center">
            Create Post
          </span>
          <span className="cursor-pointer hover:bg-gray-200 bg-gray-100 h-[1.7rem] w-[1.7rem] flex justify-center items-center rounded-full">
            <RxCross2 size={20} />
          </span>
        </p>
        <form className="flex flex-col justify-center items-center w-full gap-5">
          <textarea
            name="postDetails"
            id="post"
            cols="30"
            rows="8"
            maxLength={200}
            placeholder="What's on your mind?"
            className="bg-blue-100/10 w-full text-[17px] border-[1px] resize-none focus:outline-blue-200 p-2 border-gray-200 rounded-md"></textarea>
          <div className="border-[1px] border-gray-200 rounded-md w-full h-[3.5rem] flex justify-start items-center px-10 gap-10">
            <span className="font-[500] flex-1 min-w-[10rem]">
              Add to your post
            </span>
            <label htmlFor="image" className="cursor-pointer">
              <span>
                <IoImagesOutline size={27} className="text-green-700" />
              </span>
              <input type="file" name="image" id="image" hidden />
            </label>
            <span>
              <BsEmojiHeartEyes size={25} className="text-yellow-400" />
            </span>
          </div>
          <button
            type="submit"
            className="w-full bg-red-700 hover:bg-red-800 font-[600] text-[18px] text-white h-10 rounded-md">
            Post
          </button>
        </form>
      </div>
    </div>
  );
};

export default Modal;
