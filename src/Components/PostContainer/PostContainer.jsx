import React, { useState, useEffect } from "react";
import Button from "../Button/Button";
import image from "../../assets/profile.png";
import {
  AiOutlineLike,
  BiComment,
  CiFaceFrown,
  CiFaceMeh,
  CiFaceSmile,
  FaRegHandPeace,
  FaRegHandshake,
  RiSendPlane2Fill,
} from "react-icons/all";
import { storage, db } from "../../firebase";
import firebase from "firebase/compat/app";

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
import { useAuth } from "../../context/UserAuthContext";
const PostContainer = ({
  userDetail,
  postDescription,
  imageUrl,
  userId,
  postid,
  profilePicture,
}) => {
  const [loading, setLoading] = useState(false);
  const handleLike = async (postId, userId) => {
    const profileCollection = collection(db, "likes");
    const profileQuery = query(
      profileCollection,
      where("postId", "==", postid)
    );
    const docRef = doc(db, "likes", `${postId}_${userId}`);
    await setDoc(docRef, { postId, userId });
    console.log(postId, userDetail);
  };
  const { currentUser } = useAuth();
  const [likes, setLikes] = useState([]);
  const [comment, setComment] = useState(false);
  const [commentState, setCommentState] = useState(false);
  const [comments, setComments] = useState([]);
  useEffect(() => {
    async function fetchData() {
      const profileCollection = collection(db, "likes");
      const profileQuery = query(
        profileCollection,
        where("postId", "==", postid)
      );
      const profileQuerySnapshot = await getDocs(profileQuery);

      const userProfileData = profileQuerySnapshot.docs.map((doc) =>
        doc?.data()
      );
      // setProfilePicture(userProfileData[0].imageUrl);
      setLikes(userProfileData);
      // console.log("data", userProfileData.length);

      const commentsCollection = collection(db, "comments");
      const commentsQuery = query(
        commentsCollection,
        where("postId", "==", postid)
      );
      const commentsQuerySnapshot = await getDocs(commentsQuery);

      const commentsData = commentsQuerySnapshot.docs.map((doc) => doc.data());

      setComments(commentsData);
      // setCommentText("");
      // const commentUserCollection = collection(db, "username");
      // const commentUserQuery = query(
      //   commentUserCollection,
      //   where("userId", "==", userId)
      // );
      // const commentUserQuerySnapshot = await getDocs(commentUserQuery);
      // const commentUserData = commentUserQuerySnapshot.docs.map((doc) =>
      //   doc.data()
      // );
      // console.log("comment user dataa", commentUserData);
      // console.log("comments data are", commentsData);
    }

    fetchData();
  }, [likes, comments]);

  // console.log(comments);
  const [content, setContent] = useState("");
  const handleComment = async (e) => {
    e.preventDefault();
    setLoading(true);
    const commentCollection = collection(db, "comments");
    const newPost = doc(commentCollection);
    await setDoc(newPost, {
      content: content,
      userId: currentUser.uid,
      postId: postid,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    });
  };
  const handleContentChange = (e) => {
    setContent(e.target.value);
  };

  return (
    <div className="bg-white py-3 rounded-lg shadow-md border-[1px] border-gray-100 drop-shadow-sm md:w-[80%] min-w-[30rem] w-[60%] md:min-w-[37rem] min-h-[37rem] h-auto">
      {/* post details -- username --image */}
      <p className="flex justify-start items-center h-10 overflow-hidden gap-3 p-3">
        <Button
          title={userId}
          disable={true}
          icon={
            <img
              alt="image"
              src={profilePicture ? profilePicture : image}
              className="rounded-md h-20 object-contain"
            />
          }
        />
        {/* <span>{userId}</span> */}
      </p>
      {/* post description */}
      <p className="p-4 border-b-[1px] border-b-gray-200">{postDescription}</p>
      {/* image container for post */}
      <p className="w-full max-h-[65%] py-1">
        <img
          src={imageUrl ? imageUrl : image}
          alt=""
          className="max-h-[30rem] h-auto w-full object-cocntain"
        />
      </p>
      {/* reaction section */}
      <p className="border-t-[1px] border-t-gray-200 flex justify-center items-center ">
        <Button
          onClick={() => {
            handleLike(postid, currentUser.uid);
          }}
          disable={true}
          icon={<AiOutlineLike size={25} className="hover:text-blue-500" />}
          title={likes.length}
          textHover={true}
          textColor={"red-900"}
        />
        <Button
          onClick={() => {
            setComment(!comment);
          }}
          title={comments?.length}
          disable={true}
          icon={<BiComment size={25} className="hover:text-green-300" />}
          // title={"Comment"}
        />
      </p>
      {comment && (
        <form
          className="border-t-[1px] border-t-gray-200 p-2 gap-2 flex flex-col justify-start items-start"
          onSubmit={handleComment}>
          <div className="flex  flex-col justify-start items-start w-full p-1 rounded-lg ">
            <textarea
              onClick={() => {
                setCommentState(true);
              }}
              onMouseLeave={() => {
                setCommentState(false);
              }}
              onChange={handleContentChange}
              name="postDetails"
              id="post"
              cols="30"
              rows={`${commentState ? "6" : "2"}`}
              maxLength={200}
              placeholder="Comment"
              className="bg-blue-100/10 w-full text-[17px] border-[1px] resize-none focus:outline-blue-200 p-2 focus:outline-[1px] border-gray-200 rounded-md"></textarea>
            <div className="w-full bg-rd-900 h-10 border-[1px] rounded-md border-blue-200 flex justify-between px-5 gap-10 items-center">
              <div className="flex justify-start items-center gap-5">
                <span>
                  <CiFaceSmile size={25} className="text-green-400" />
                </span>
                <span>
                  <CiFaceFrown size={25} className="text-red-500" />
                </span>
                <span>
                  <CiFaceMeh size={25} className="text-yellow-400" />
                </span>
                <span>
                  <FaRegHandshake size={25} className="text-blue-400" />
                </span>
                <span>
                  <FaRegHandPeace size={22} className="text-pink-900" />
                </span>
              </div>
              <button type="submit">
                <RiSendPlane2Fill size={25} className="hover:text-blue-400" />
              </button>
            </div>
          </div>
        </form>
      )}
      <div className="flex flex-col justify-start items-start bg-blue-50 p-1 rounded-lg border-blue-200 border-[1px]">
        {/* <span className="border-[1px] border-blue-200 px-2 bg-blue-100/70 rounded-lg cursor-pointer">
          username
        </span> */}
        {comments.map((item, index) => (
          <div key={index}>{item.content}</div>
        ))}
      </div>
    </div>
  );
};

export default PostContainer;
