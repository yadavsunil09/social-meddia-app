import React from "react";
import { VariantProps, cva } from "class-variance-authority";
const modalVariants = cva("inline-flex flex-col items center justify-center", {
  variants: {
    variant: { default: "bg-red-900", outline: "bg-black" },
    size: { default: "h-20 bg-red-500 py-2 px-4", sm: "h-9 px-2 rounded-md" },
    defaultVariants: { variant: "default", size: "default" },
  },
});
const Modal = () => {
  return <div>Modal</div>;
};

export default Modal;
