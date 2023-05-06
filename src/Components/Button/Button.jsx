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
  border,
  md,
  ...rest
}) => {
  return (
    <Link
      {...rest}
      to={linkname && linkname}
      className={`lg:flex-row flex-col ${
        border && "border-[1px] border-gray-200 hover:border-gray-200"
      } hover:border-transparent  min-h-[3rem] max-h-[4rem] w-auto ${
        md && "max-w-[8rem] min-h-[2.5rem]"
      } rounded-md flex justify-start px-2 gap-x-5 items-center ${
        disable
          ? "hover:bg-none"
          : hoverColor
          ? `hover:bg-${hoverColor}`
          : "hover:bg-gray-100"
      }   font-[500] overflow-hidden `}>
      <span
        className={`${
          textHover
            ? `hover:text-${textColor}`
            : textColor
            ? `text-${textColor}`
            : "text-black/80"
        } rounded-full max-w-[1.6rem] cursor-pointer`}>
        {icon}
      </span>
      <span className="capitalize flex-1 text-black/80 cursor-pointer">
        {title}
      </span>
    </Link>
  );
};

export default Button;
