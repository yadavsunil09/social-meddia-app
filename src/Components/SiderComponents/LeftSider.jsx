import React from "react";
import Button from "../Button/Button";
import {
  FaUserFriends,
  MdOutlineRecentActors,
  MdOutlineVideoLibrary,
  AiOutlineFieldTime,
} from "react-icons/all";
import image from "../../assets/react.svg";
const LeftSider = () => {
  return (
    <aside className="flex flex-col gap-3 overflow-x-hidden overflow-y-auto w-full bg-[#fafafa]">
      <Button title={"User"} icon={<img src={image} />} linkname="/profile" />
      <Button title={"Friends"} icon={<FaUserFriends size={25} className=""/>} />
      <Button
        title={"Most Recent"}
        icon={<MdOutlineRecentActors size={25} />}
      />
      <Button title={"Watch"} icon={<MdOutlineVideoLibrary size={25} />} />
      <Button title={"Memories"} icon={<AiOutlineFieldTime size={25} />} />
    </aside>
  );
};

export default LeftSider;
