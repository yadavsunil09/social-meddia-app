import React, { useEffect, useState } from "react";
import HomeLayout from "../Layout/HomeLayout";
import PostContainer from "../Components/PostContainer/PostContainer";
import LoadingSkeleton from "../Components/LoadingSkeleton/LoadingSkeleton";
import { toast, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuth } from "../context/UserAuthContext";
import { storage, db } from "../firebase";
import {
  getFirestore,
  collection,
  query,
  where,
  setDoc,
  doc,
  getDoc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import { useNavigate } from "react-router-dom";
const HomePage = () => {
  const { currentUser } = useAuth();
  const [userPostData, setUserPostData] = useState(null);
  const [profilePicture, setProfilePicture] = useState("");
  const [postId, setPostId] = useState([]);
  useEffect(() => {
    async function fetchData() {
      const querySnapshot = await getDocs(collection(db, "posts"));
      const data = querySnapshot?.docs?.map((doc) => doc);
      setUserPostData(data);
      const postdata = querySnapshot?.docs?.map((doc) => {
        return doc;
      });
      setPostId(postdata);

      const profileCollection = collection(db, "username");
      const profileQuery = query(
        profileCollection,
        where("userId", "==", currentUser?.uid)
      );
      const profileQuerySnapshot = await getDocs(profileQuery);

      const userProfileData = profileQuerySnapshot?.docs?.map((doc) =>
        doc.data()
      );
      setProfilePicture(userProfileData[0]?.imageUrl);
    }

    fetchData();
  }, [currentUser?.uid]);
  return (
    <div>
      <HomeLayout>
        <div className="flex flex-col justify-center items-center gap-10 bg-[#fafafa] relative top-5">
          {userPostData !== null ? (
            userPostData.map((postData) => {
              const postId = postData.id;
              const data = postData.data();
              return (
                <PostContainer
                  key={postId}
                  postid={postId}
                  userDetail={data.userId}
                  userId={data.username}
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
      </HomeLayout>
    </div>
  );
};

export default HomePage;
