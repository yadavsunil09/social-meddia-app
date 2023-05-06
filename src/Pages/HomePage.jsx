import React, { useEffect, useState } from "react";
import HomeLayout from "../Layout/HomeLayout";
import PostContainer from "../Components/PostContainer/PostContainer";
import LoadingSkeleton from "../Components/LoadingSkeleton/LoadingSkeleton";
import { toast, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuth } from "../context/UserAuthContext";
import { storage, db } from "../firebase";
import { uploadBytes, ref, getDownloadURL } from "firebase/storage";
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
      const data = querySnapshot.docs.map((doc) => doc);
      // const userData = userQuerySnapshot.docs.map((doc) => doc.data());
      setUserPostData(data);
      const postdata = querySnapshot.docs.map((doc) => {
        return doc; // Add the document ID to the returned data object
      });
      // console.log(postdata);
      setPostId(postdata);

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
      // console.log(userProfileData);
    }

    fetchData();
  }, [currentUser.uid,]);
  return (
    <div>
      <HomeLayout
        children={
          <div className="flex flex-col justify-center items-center gap-10 bg-[#fafafa]">
            {userPostData !== null ? (
              userPostData.map((postData, index) => {
                const postId = postData.id;
                const data = postData.data();
                // console.log(postId);
                // console.log("data are", data);
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
              <LoadingSkeleton />
            )}
          </div>
        }
      />
    </div>
  );
};

export default HomePage;
