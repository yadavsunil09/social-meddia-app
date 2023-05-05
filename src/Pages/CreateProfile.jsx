import React, { useState } from "react";
import HomeLayout from "../Layout/HomeLayout";
import Button from "../Components/Button/Button";
import { IoLogOutOutline } from "react-icons/io5";
import { BiImageAdd } from "react-icons/bi";
import { FaUserAlt } from "react-icons/fa";

const CreateProfile = () => {
  const [imagePreview, setImagePreview] = useState(null);

  const handleImagePreview = (event) => {
    if (event.target.files && event.target.files[0]) {
      const image = event.target.files[0];
      setImagePreview(URL.createObjectURL(image));
    } else {
      setImagePreview(null);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center p-10 w-full h-screen">
      <form className="flex flex-col gap-5 w-[20rem] hover:border-gray-300  sm:w-[22rem] md:w-[25rem] justify-center items-center border-[1px] border-gray-200 p-5 rounded-md">
        <label htmlFor="pp">
          {" "}
          {imagePreview ? (
            <img
              src={imagePreview}
              alt=""
              className="border-[1px] border-gray-200 flex justify-center items-center w-40 h-40 rounded-lg object-contain"
            />
          ) : (
            <FaUserAlt
              size={35}
              className="border-[1px] border-gray-200 flex justify-center items-center w-40 h-auto p-2 max-h-40 rounded-lg object-contain"
            />
          )}
        </label>
        {/* <span>{currentUser.email}</span> */}
        <label htmlFor="username" className="w-full">
          <input
            maxLength={10}
            label="Username"
            type="text"
            name="username"
            id="username"
            placeholder="Username"
            className={`border-[1px] border-gray-400 w-full h-[2.5rem] 
                placeholder-black/80
            rounded-[0.2rem] px-4 focus:outline-none focus:border-gray-900`}
          />
        </label>
        <label
          htmlFor="pp"
          className="w-full flex justify-center items-center border-[1px] border-gray-400 placeholder-black/80
          rounded-[0.2rem] h-[3rem] cursor-pointer hover:bg-gray-100">
          <span>
            <BiImageAdd size={35} />
          </span>
          <input
            hidden
            maxLength={10}
            label="Profile Picture"
            type="file"
            name="profilepicture"
            id="pp"
            placeholder="Username"
            onChange={handleImagePreview}
            className={`border-[1px] border-gray-400 w-full h-[2.5rem] 
                placeholder-black/80
            rounded-[0.2rem] px-4 focus:outline-none focus:border-gray-900`}
          />
        </label>
        <span>
          <Button
            title={"Continue"}
            icon={<IoLogOutOutline size={25} className="text-red-400" />}
            border={true}
            md={true}
            linkname={""}>
            Logout
          </Button>
        </span>
      </form>
    </div>
  );
};

export default CreateProfile;
