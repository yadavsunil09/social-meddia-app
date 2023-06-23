import { useEffect, useState } from "react";
import HomeLayout from "../Layout/HomeLayout";
import { useAuth } from "../context/UserAuthContext";
import Button from "../Components/Button/Button";
import { FiEdit, HiOutlineMail, IoLogOutOutline } from "react-icons/all";
import { useNavigate } from "react-router-dom";
import PostContainer from "../Components/PostContainer/PostContainer";
import LoadingSkeleton from "../Components/LoadingSkeleton/LoadingSkeleton";
import { toast, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { db } from "../firebase";
import dummyImage from "../assets/profile.png";
import { collection, query, where, getDocs } from "firebase/firestore";
const ProfilePage = () => {
  const { currentUser, logout } = useAuth();
  const [userPostData, setUserPostData] = useState(null);
  const [userCurrent, setUserCurrent] = useState("");
  const [profilePicture, setProfilePicture] = useState("");
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      await logout();
      setTimeout(() => {
        localStorage.removeItem("user");
        navigate("/login");
      }, 200);
      toast.success("You logged out. See you soon.", {
        className: "toast-center",
        position: "bottom-center",
        autoClose: 1000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "colored",
        icon: false,
      });
    } catch (err) {
      console.log(err.message);
    }
  };
  useEffect(() => {
    async function fetchData() {
      const userCollection = collection(db, "posts");
      const userQuery = query(
        userCollection,
        where("userId", "==", currentUser.uid)
      );
      const userQuerySnapshot = await getDocs(userQuery);

      const userData = userQuerySnapshot.docs.map((doc) => doc.data());
      setUserPostData(userData);

      const profileCollection = collection(db, "username");
      const profileQuery = query(
        profileCollection,
        where("userId", "==", currentUser.uid)
      );
      const profileQuerySnapshot = await getDocs(profileQuery);

      const userProfileData = profileQuerySnapshot.docs.map((doc) =>
        doc.data()
      );
      setUserCurrent(userProfileData[0].userName);
      setProfilePicture(userProfileData[0].imageUrl);
    }

    fetchData();
  }, [currentUser.uid]);
  return (
    <HomeLayout>
      <div className="flex flex-col justify-center items-center h-auto min-h-screen w-full gap-2">
        <div className="relative flex flex-col lg:flex-row justify-start items-start border-[0px] border-gray-200 h-[35rem] lg:h-[18rem] w-[25rem] sm:w-full gap-2 lg:gap-10 p-2">
          <div className="bg-blue-100 border-[1px] border-blue-200 w-full left-0 h-[12rem] absolute z-[0] top-[-2rem] rounded-lg">
            &nbsp;
          </div>
          <img
            src={profilePicture ? profilePicture : dummyImage}
            alt="Profile"
            className="relative top-[6rem] bg-gray-100 left-5 h-[10rem] rounded-md min-w-[10rem] p-1 border-[1px] border-gray-200 cursor-pointer hover:border-gray-300"
          />
          <div className="flex flex-col justify-start p-2 gap-2 items-start h-auto max-h-[10rem] z-1 relative top-[10rem]">
            <span>{userCurrent}</span>
            <div className="flex justify-center items-center">
              <HiOutlineMail size={25} /> : <span>{currentUser.email}</span>
            </div>
          </div>
          <div className="flex flex-col lg:flex-row gap-4 py-4 relative top-[10rem] w-full justify-start items-start h-auto flex-wrap lg:justify-end lg:items-center">
            <Button
              title={"Edit Profile"}
              icon={<FiEdit size={20} className="text-blue-400" />}
              border={true}
              linkname={"/createProfile "}
            />
            <span onClick={handleLogout}>
              <Button
                title={"Logout"}
                icon={<IoLogOutOutline size={25} className="text-red-400" />}
                border={true}
                md={true}
                linkname={""}
              />
            </span>
          </div>
        </div>
        <div className="w-full h-auto flex flex-col justify-center items-center relative gap-20">
          <h2 className="w-full flex justify-center items-center border-b-[1px] h-10 font-[600] text-[18px]">
            Your Timeline
          </h2>
          {userPostData ? (
            userPostData.map((data, index) => {
              return (
                <PostContainer
                  profilePicture={profilePicture && profilePicture}
                  key={index}
                  userId={userCurrent}
                  userDetail={profilePicture}
                  postDescription={data.content}
                  imageUrl={data.imageUrl}
                />
              );
            })
          ) : (
            <>
              <LoadingSkeleton />
              <LoadingSkeleton />
              <LoadingSkeleton />
            </>
          )}
        </div>
      </div>
    </HomeLayout>
  );
};

export default ProfilePage;
