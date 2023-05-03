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
    <div className="flex flex-col gap-3 overflow-x-hidden overflow-y-auto w-full">
      <Button title={"User"} icon={<img src={image} />} linkname="/profile" />
      <Button title={"Friends"} icon={<FaUserFriends size={25} />} />
      <Button
        title={"Most Recent"}
        icon={<MdOutlineRecentActors size={25} />}
      />
      <Button title={"Watch"} icon={<MdOutlineVideoLibrary size={25} />} />
      <Button title={"Memories"} icon={<AiOutlineFieldTime size={25} />} />
    </div>
  );
};

export default LeftSider;
