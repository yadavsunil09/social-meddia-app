import React from "react";
import Navbar from "../Components/Navbar/Navbar";
import {
  AiFillHome,
  FaUserAlt,
  MdPostAdd,
  FaUserFriends,
} from "react-icons/all";
import RightSider from "../Components/SiderComponents/RightSider";
import Button from "../Components/Button/Button";
import LeftSider from "../Components/SiderComponents/LeftSider";
const HomeLayout = ({ children, title }) => {
  const Links = [
    { label: <AiFillHome size={25} />, linkname: "/" },
    { label: <MdPostAdd size={28} />, linkname: "" },
    { label: <FaUserAlt size={25} />, linkname: "/profile" },
  ];

  return (
    <div className="flex flex-col justify-start items-center bg-[#fafafa] w-full">
      <div className="w-full">
        <Navbar links={Links} />
      </div>
      <section className="grid text-black relative top-[3.1rem] h-screen w-full order-2 bg-[#fafafa]">
        <div className="hidden md:flex w-[20%] fixed left-0 top-[3.1rem] h-full p-5 bg-[#fafafa]">
          <LeftSider />
        </div>
        <div className="sm:w-[60%] min-w-[35rem] sm:left-[12%] md:left-[20%] flex justify-center items-start w-full relative p-5 bg-[#fafafa]">
          {children}
        </div>
        <div className=" hidden lg:flex  w-[20%] h-full fixed right-0 top-[3.1rem] p-5 bg-[#fafafa]">
          <RightSider />
        </div>
      </section>
    </div>
  );
};

export default HomeLayout;
