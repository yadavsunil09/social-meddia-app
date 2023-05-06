import React, { useState } from "react";
import Button from "../Components/Button/Button";
import { BiImageAdd } from "react-icons/bi";
import image from "../assets/profile.png";
import { toast, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuth } from "../context/UserAuthContext";
import { storage, db } from "../firebase";
import { uploadBytes, ref, getDownloadURL } from "firebase/storage";
import {
  collection,
  query,
  where,
  setDoc,
  doc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { IoMdAdd } from "react-icons/io";
const CreateProfile = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState("");
  const [uploadImage, setUploadImage] = useState(null);
  const [user, setUser] = useState(null);
  const handleImagePreview = (event) => {
    if (event.target.files && event.target.files[0]) {
      setUploadImage(event.target.files[0]);

      const image = event.target.files[0];
      setImagePreview(URL.createObjectURL(image));
    } else {
      setImagePreview(null);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (user && image) {
      setLoading(true);

      const userCollection = collection(db, "username");
      const userQuery = query(userCollection, where("userName", "==", user));
      const userQuerySnapshot = await getDocs(userQuery);
      const userQueryForId = query(
        userCollection,
        where("userId", "==", currentUser.uid)
      );
      const userQuerySnapshotForId = await getDocs(userQueryForId);
      if (!userQuerySnapshot.empty) {
        toast.error("Username already exists.", {
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
        setLoading(false);
        return;
      } else if (userQuerySnapshotForId.docs[0]?.id == currentUser.uid) {
        const imageRef = ref(
          storage,
          `profilePicture/${currentUser.uid}/${uploadImage.name}`
        );
        await uploadBytes(imageRef, uploadImage);
        const imageUrl = await getDownloadURL(imageRef);
        const userRef = doc(userCollection, currentUser.uid);
        await updateDoc(userRef, {
          userName: user,
          imageUrl: imageUrl,
        });
        const toastId = "alert";
        const existingToast = toast.isActive(toastId);

        toast.success("Profile Updated.", {
          toastId: toastId,
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

        setLoading(false);
        navigate("/");
        setUser("");
        setImagePreview(null);
        setUser("");
      } else {
        if (!user) {
          const toastId = "alert";
          const existingToast = toast.isActive(toastId);

          if (existingToast) {
            toast.update(toastId, {
              render: "Username is required.",
              autoClose: 1000,
            });
          } else {
            toast.error("Username is required.", {
              toastId: toastId,
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
        }
        if (uploadImage) {
          const imageRef = ref(
            storage,
            `profilePicture/${currentUser.uid}/${uploadImage.name}`
          );
          await uploadBytes(imageRef, uploadImage);
          const imageUrl = await getDownloadURL(imageRef);
          const newUser = doc(userCollection, currentUser.uid);
          await setDoc(newUser, {
            userName: user,
            imageUrl: imageUrl,
            userId: currentUser.uid,
          });

          setLoading(false);
          navigate("/");
          setUser("");
          setImagePreview(null);
          setUser("");
        }
        const toastId = "alert";
        const existingToast = toast.isActive(toastId);

        if (existingToast) {
          toast.update(toastId, {
            render: "Profile Created.",
            autoClose: 1000,
          });
        } else {
          toast.success("Profile Created.", {
            toastId: toastId,
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
      }
    } else {
      setLoading(false);
      toast.error("Username is required.", {
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
  };
  return (
    <div
      className="flex flex-col justify-center items-center p-10 w-full h-screen"
      onSubmit={handleSubmit}>
      <form className="flex flex-col gap-5 w-[20rem] sm:w-[22rem] md:w-[25rem] justify-center items-center  p-5 rounded-md">
        <label htmlFor="pp">
          <img
            src={imagePreview ? imagePreview : image}
            alt=""
            className="border-[1px] border-gray-200 flex justify-center items-center w-40 h-40 rounded-lg object-contain cursor-pointer"
          />
        </label>
        <label htmlFor="username" className="w-full">
          <input
            onChange={(event) => {
              setUser(event.target.value);
            }}
            maxLength={10}
            label="Username"
            type="text"
            name="username"
            id="username"
            placeholder="Username"
            className={`border-[1px] border-gray-400 w-full h-[2.5rem] 
                placeholder-black/80
            rounded-[0.2rem] px-4 focus:outline-none focus:border-gray-900`}
          />
        </label>
        <label
          htmlFor="pp"
          className="w-full flex justify-center items-center border-[1px] border-gray-400 placeholder-black/80
          rounded-[0.2rem] h-[3rem] cursor-pointer hover:bg-gray-100">
          <span>
            <BiImageAdd size={35} />
          </span>
          <input
            hidden
            maxLength={10}
            label="Profile Picture"
            type="file"
            name="profilepicture"
            id="pp"
            placeholder="Username"
            onChange={handleImagePreview}
            className={`border-[1px] border-gray-400 w-full h-[2.5rem] 
                placeholder-black/80
            rounded-[0.2rem] px-4 focus:outline-none focus:border-gray-900`}
          />
        </label>
        <span onClick={handleSubmit}>
          <Button
            title={`${loading ? "Processing.." : "Continue"}`}
            icon={<IoMdAdd size={25} className="text-red-400" />}
            border={true}
            linkname={""}
          />
        </span>
      </form>
    </div>
  );
};

export default CreateProfile;
