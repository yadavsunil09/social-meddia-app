import { useState, useEffect, useCallback } from "react";
import Button from "../Button/Button";
import image from "../../assets/profile.png";
import { AiOutlineHeart, CgComment, IoSend } from "react-icons/all";
import { db } from "../../firebase";
import firebase from "firebase/compat/app";

import {
  collection,
  query,
  where,
  setDoc,
  doc,
  getDocs,
} from "firebase/firestore";
import { useAuth } from "../../context/UserAuthContext";
import { toast } from "react-toastify";
const PostContainer = ({
  userDetail,
  postDescription,
  imageUrl,
  userId,
  postid,
  profilePicture,
}) => {
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [fetchData, setFetchData] = useState(false);
  const handleLike = async (postId, userId) => {
    const profileCollection = collection(db, "likes");
    const profileQuery = query(
      profileCollection,
      where("postId", "==", postid)
    );
    const docRef = doc(db, "likes", `${postId}_${userId}`);
    await setDoc(docRef, { postId, userId });
    setFetchData(!fetchData);
  };
  const { currentUser } = useAuth();
  const [likes, setLikes] = useState([]);
  const [comment, setComment] = useState(false);
  const [commentState, setCommentState] = useState(false);
  const [comments, setComments] = useState([]);

  const fetchPostDetail = useCallback(async () => {
    const profileCollection = collection(db, "likes");
    const profileQuery = query(
      profileCollection,
      where("postId", "==", postid)
    );
    const profileQuerySnapshot = await getDocs(profileQuery);

    const userProfileData = profileQuerySnapshot.docs.map((doc) => doc?.data());
    setLikes(userProfileData);
    const commentsCollection = collection(db, "comments");
    const commentsQuery = query(
      commentsCollection,
      where("postId", "==", postid)
    );
    const commentsQuerySnapshot = await getDocs(commentsQuery);

    const commentsData = commentsQuerySnapshot.docs.map((doc) => doc.data());

    setComments(commentsData);
    const commentUserCollection = collection(db, "username");
    const commentUserQuery = query(
      commentUserCollection,
      where("userId", "==", userId)
    );
    const commentUserQuerySnapshot = await getDocs(commentUserQuery);
    const commentUserData = commentUserQuerySnapshot.docs.map((doc) =>
      doc.data()
    );
  }, [postid, userId]);
  useEffect(() => {
    fetchPostDetail();
  }, [fetchData]);

  const handleComment = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (content.length !== 0) {
      const commentCollection = collection(db, "comments");
      const newPost = doc(commentCollection);
      await setDoc(newPost, {
        content: content,
        userId: currentUser.uid,
        postId: postid,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      });
      setFetchData(!fetchData);
    } else {
      setLoading(false);
      setFetchData(false);
    }
  };
  const handleContentChange = (e) => {
    setContent(e.target.value);
  };

  return (
    <div className="bg-white py-3 rounded-lg shadow-md border-[1px] border-gray-100 d rop-shadow-sm md:w-[80%] min-w-[30rem] w-[60%] md:min-w-[37rem] min-h-[37rem] h-auto">
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
          icon={<AiOutlineHeart size={25} className="hover:text-pink-700" />}
          title={likes.length}
          textHover={true}
          textColor={"red-900"}
        />
        <Button
          onClick={() => {
            setComment(true);
          }}
          title={comments?.length}
          disable={true}
          icon={<CgComment size={25} className="hover:text-green-700" />}
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
              onChange={handleContentChange}
              name="postDetails"
              id="post"
              cols="30"
              rows={`${commentState ? "6" : "2"}`}
              maxLength={200}
              placeholder="Comment"
              className="bg-blue-100/10 w-full text-[17px] border-[1px] resize-none focus:outline-blue-200 p-2 focus:outline-[1px] border-gray-200 rounded-md"></textarea>

            <button
              type="submit"
              className="relative right-0 bottom-6 w-full  flex justify-end items-center ">
              <span className="rounded-md z-10 h-[1.5rem] w-[1.8rem] flex justify-center items-center group hover:bg-blue-100 bg-black/10">
                <IoSend size={18} className="group-hover:text-blue-900" />
              </span>
            </button>
          </div>
        </form>
      )}
      {comments.length > 0 && (
        <div className="flex flex-col justify-start items-start gap-2 px-2 w-full">
          {comments.map((item, index) => (
            <div
              key={index}
              className="bg-blue-50 p-1 rounded-lg border-blue-200 border-[1px] flex flex-col justify-start items-start w-full">
              {item.content}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PostContainer;
