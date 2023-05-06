import React, { useState, useEffect } from "react";
import Navbar from "../Components/Navbar/Navbar";
import { AiFillHome, FaUserAlt, MdPostAdd } from "react-icons/all";
import RightSider from "../Components/SiderComponents/RightSider";
import LeftSider from "../Components/SiderComponents/LeftSider";
import { useAuth } from "../context/UserAuthContext";
import { storage, db } from "../firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
const HomeLayout = ({ children, title }) => {
  const Links = [
    { label: <AiFillHome size={25} />, linkname: "/", tag: "" },
    { label: <MdPostAdd size={28} />, linkname: " ", tag: "post" },
    { label: <FaUserAlt size={25} />, linkname: "/profile", tag: "" },
  ];
  const [profilePicture, setProfilePicture] = useState("");
  const [userNa, setUserNa] = useState("");
  const { currentUser } = useAuth();
  useEffect(() => {
    async function fetchData() {
      const profileCollection = collection(db, "username");
      const profileQuery = query(
        profileCollection,
        where("userId", "==", currentUser.uid)
      );
      const profileQuerySnapshot = await getDocs(profileQuery);

      const userProfileData = profileQuerySnapshot.docs.map((doc) =>
        doc.data()
      );
      setProfilePicture(userProfileData[0].imageUrl);
      setUserNa(userProfileData[0].userName);
    }

    fetchData();
  }, [currentUser.uid]);

  return (
    <div className="flex flex-col justify-start items-center bg-[#fafafa] w-full">
      <div className="w-full">
        <Navbar links={Links} />
      </div>
      <section className="grid text-black relative top-[3.1rem] h-screen w-full order-2 bg-[#fafafa]">
        <div className="hidden md:flex w-[20%] fixed left-0 top-[3.1rem] h-full p-5 bg-[#fafafa]">
          <LeftSider profile={profilePicture} user={userNa} />
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
