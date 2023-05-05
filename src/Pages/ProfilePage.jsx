import React from "react";
import HomeLayout from "../Layout/HomeLayout";
import { useAuth } from "../context/UserAuthContext";
import Button from "../Components/Button/Button";
import { IoLogOutOutline } from "react-icons/all";
import { useNavigate } from "react-router-dom";
const ProfilePage = () => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      await logout();
      setTimeout(() => {
        navigate("/login");
      }, 200);
    } catch (err) {
      console.log(err.message);
    }
  };
  return (
    <HomeLayout
      children={
        <div className="flex flex-col">
          <span>{currentUser.email}</span>
          <span onClick={handleLogout}>
            <Button
              title={"Logout"}
              icon={<IoLogOutOutline size={25} className="text-red-400" />}
              border={true}
              md={true}
              linkname={""}>
              Logout
            </Button>
          </span>
        </div>
      }
    />
  );
};

export default ProfilePage;
