import React, { useState, useEffect } from "react";
import { RxCross2, IoImagesOutline, BsEmojiHeartEyes } from "react-icons/all";
import { useAuth } from "../../context/UserAuthContext";
import { storage, db } from "../../firebase";
import { uploadBytes, ref, getDownloadURL } from "firebase/storage";
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import { toast, Slide } from "react-toastify";
import {
  getFirestore,
  collection,
  setDoc,
  doc,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { useNavigate } from "react-router-dom";
const Modal = ({ modalState, changeModalState }) => {
  const { currentUser } = useAuth();
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // for image preview
  const [imagePreview, setImagePreview] = useState(null);
  // to get user name
  const [userPostData, setUserPostData] = useState(null);
  const [dbUserName, setDbUserName] = useState("");
  useEffect(() => {
    async function fetchData() {
      const userCollection = collection(db, "username");
      const userQuery = query(
        userCollection,
        where("userId", "==", currentUser.uid)
      );
      const userQuerySnapshot = await getDocs(userQuery);

      const userData = userQuerySnapshot.docs.map((doc) => doc.data());
      setUserPostData(userData[0]);
      setDbUserName(userData[0].userName);
    }

    fetchData();
  }, [currentUser?.uid]);
  // to handle change in content

  const handleContentChange = (e) => {
    setContent(e.target.value);
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
    if (e.target.files && e.target.files[0]) {
      const imageName = e.target.files[0];
      setImagePreview(URL.createObjectURL(imageName));
    } else {
      setImagePreview(null);
    }
  };

  const handleClick = () => {
    setTimeout(() => {
      setContent("");
      setImage(null);
      setImagePreview(null);
      changeModalState();
    }, 400);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    // Upload image to Firebase Storage
    try {
      const postCollection = collection(db, "posts");
      setTimeout(() => {
        navigate("/");
        setLoading(false);
      }, 1000);
      if (image && content) {
        const imageRef = ref(
          storage,
          `images/${currentUser.uid}/${image.name}`
        );
        await uploadBytes(imageRef, image);
        const imageUrl = await getDownloadURL(imageRef);
        // Save post details to Firestore
        const newPost = doc(postCollection);
        await setDoc(newPost, {
          content: content,
          imageUrl: imageUrl,
          userId: currentUser.uid,
          username: dbUserName,
          createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        });

        // Reset form fields
        setContent("");
        setImage(null);
      } else {
        toast.error("You can't add empty fields.", {
          className: "toast-center",
          position: "bottom-center",
          autoClose: 1000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
          closeButton: false,
          transition: Slide,
          icon: false,
        });
      }
    } catch (errr) {
      console.log(errr);
      // Reset form fields
      setContent("");
      setImage(null);
    }
  };

  useEffect(() => {
    document.body.style.overflow = modalState ? "hidden" : "auto";
  }, [modalState]);

  return (
    <div
      className={`modal ${
        modalState === false && "hidden"
      } h-screen fixed w-full left-0 top-0 flex justify-center items-center`}>
      <div
        onClick={() => {
          handleClick();
        }}
        className={`${
          modalState === false && "hidden"
        } h-screen bg-transparent z-[10] fixed w-full left-0 top-0 flex justify-center items-center`}></div>
      <div
        className={`bg-white py-3 rounded-lg z-[10] shadow-md border-[1px] border-gray-100 drop-shadow-sm md:min-w-[35rem]  w-[30rem] md:min-h-[28rem] h-auto p-10 gap-5 flex flex-col`}>
        <p className="flex justify-center items-center p-1 border-b-[1px] border-b-gray-200 text-black/90 font-[500] text-[19px]">
          <span className="flex-1 flex items-center justify-center">
            Create Post
          </span>
          <span
            onClick={() => {
              handleClick();
            }}
            className="cursor-pointer hover:bg-gray-300 bg-gray-200 h-[1.7rem] w-[1.7rem] flex justify-center items-center rounded-full">
            <RxCross2 size={20} />
          </span>
        </p>
        <form
          className="flex flex-col justify-center items-center w-full gap-5"
          onSubmit={handleSubmit}>
          <textarea
            value={content}
            name="postDetails"
            id="post"
            cols="30"
            rows="8"
            maxLength={200}
            placeholder="What's on your mind?"
            className="bg-blue-100/10 w-full text-[17px] border-[1px] resize-none focus:outline-blue-200 p-2 border-gray-200 rounded-md"
            onChange={handleContentChange}></textarea>{" "}
          {imagePreview && (
            <img
              src={imagePreview}
              alt=""
              className="relative w-full h-[12rem] rounded-md object-contain"
            />
          )}
          <div className="border-[1px] border-gray-200 rounded-md w-full h-[3.5rem] flex justify-start items-center px-10 gap-10">
            <span className="font-[500] flex-1 min-w-[10rem]">
              Upload Photo
            </span>
            <label htmlFor="image" className="cursor-pointer">
              <span>
                <IoImagesOutline size={27} className="text-green-700" />
              </span>
              <input
                type="file"
                name="image"
                id="image"
                hidden
                onChange={handleImageChange}
              />
            </label>
          </div>
          <button
            type="submit"
            className={`w-full bg-blue-700 hover:bg-blue-800 font-[600] text-[18px] text-white h-10 rounded-md ${
              loading && "opacity-80 bg-blue-800"
            }`}>
            {loading ? "Posting" : "Post"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Modal;
