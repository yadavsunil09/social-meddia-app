import React, { useState } from "react";
import Logo from "../Logo/Logo";
import { Link, useLocation } from "react-router-dom";
import { TbBrandWebflow } from "react-icons/all";
import Modal from "../Modal/Modal";
const Navbar = ({ links }) => {
  const location = useLocation();
  const [modalState, setModalState] = useState(false);

  const handleModalToggle = () => {
    setModalState(!modalState);
  };

  function handleModalOnClick(tag) {
    if (tag == "post") {
      setModalState(true);
    }
  }
  return (
    <nav className="bg-blue-500 h-[4rem] flex justify-between items-center px-3 fixed z-10 w-[90%] backdrop-blur-[5px] rounded-full top-2">
      <div className=" w-30">
        <Logo
          // icon={<TbBrandWebflow size={30} className="text-black" />}
          title={"The Social"}
        />
      </div>
      <div className="w-3/5 flex justify-start items-center gap-x-5 h-10 text-white">
        {links?.map((item, index) => {
          return (
            <Link
              onClick={() => handleModalOnClick(item?.tag)}
              to={item.linkname}
              key={index}
              className={` ${
                location.pathname === item.linkname &&
                " border-blue-700 border-b-[3px] bg-blue-600 rounded-md text-white-700 hover:bg-transparent transition-all linear duration-100"
              } cursor-pointer rounded-md hover:bg-blue-600 h-[2.5rem] w-[3.5rem] font-[400] font-sans uppercase text-lg flex justify-center items-center`}>
              {item.label}
            </Link>
          );
        })}
      </div>
      <Modal modalState={modalState} changeModalState={handleModalToggle} />
    </nav>
  );
};

export default Navbar;
