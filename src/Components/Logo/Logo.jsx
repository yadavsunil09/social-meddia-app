import React from "react";

const Logo = ({ icon, title }) => {
  return (
    <div className="cursor-pointer h-10 flex justify-center items-center rounded-md">
      <span> {icon}</span>
      <span className="text-white font-[600] text-md italic">{title}</span>
    </div>
  );
};

export default Logo;
