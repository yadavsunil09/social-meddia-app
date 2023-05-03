import React from "react";
import { Link } from "react-router-dom";
const Button = ({
  title,
  icon,
  linkname,
  disable,
  hoverColor,
  textColor,
  textHover,
}) => {
  return (
    <Link
      to={linkname ? linkname : "/"}
      className={`hover:border-transparent min-h-[3rem] max-h-[4rem] w-auto rounded-md flex justify-start px-2 gap-x-5 items-center ${
        disable
          ? "hover:bg-none"
          : hoverColor
          ? `hover:bg-${hoverColor}`
          : "hover:bg-gray-100"
      }  cursor-pointer font-[500] overflow-hidden`}>
      <span
        className={`${
          textHover
            ? `hover:text-${textColor}`
            : textColor
            ? `text-${textColor}`
            : "text-black/80"
        } rounded-full max-w-[1.6rem]`}>
        {icon}
      </span>
      <span className="capitalize flex-1 text-black/80">{title} </span>
    </Link>
  );
};

export default Button;
