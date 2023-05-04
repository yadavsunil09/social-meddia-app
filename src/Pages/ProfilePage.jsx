import React from "react";
import HomeLayout from "../Layout/HomeLayout";
import Modal from "../Components/Modal/Modal";

const ProfilePage = () => {
  return (
    <HomeLayout
      children={
        <div>
          <Modal />
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Repudiandae,
          alias ea autem ab quae cumque tenetur animi nulla nobis iste, vel odit
          ducimus omnis aut recusandae dolorem ratione! Mollitia, laboriosam?
        </div>
      }
    />
  );
};

export default ProfilePage;
