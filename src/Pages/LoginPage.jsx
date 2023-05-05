import React, { useState } from "react";
import { useAuth } from "../context/UserAuthContext";
import { CgSpinner } from "react-icons/all";
import * as yup from "yup";
import { useFormik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import { toast, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const LoginPage = () => {
  const { login } = useAuth();
  const [loading, setLoading] = useState(false);
  let schema = yup.object().shape({
    email: yup.string().email().required("Email is required."),
    password: yup.string().required("Password is required."),
  });
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: async (e) => {
      setLoading(true);
      await login(formik.values.email, formik.values.password)
        .then(() => {
          setLoading(false);
          setTimeout(() => {
            navigate("/");
            const toastId = "alert";
            const existingToast = toast.isActive(toastId);

            if (existingToast) {
              toast.update(toastId, {
                render: "Welcome to Wtalks.",
                autoClose: 1000,
              });
            } else {
              toast.success("Welcome to Wtalks.", {
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

            setLoading(false);
          }, 1000);
        })
        .catch((error) => {
          console.log("Signup error:", error.message);
          setLoading(false);
          setTimeout(() => {
            const toastId = "alert";
            const existingToast = toast.isActive(toastId);

            if (existingToast) {
              toast.update(toastId, {
                render: "Unable to Sign in.",
                autoClose: 1000,
              });
            } else {
              toast.error("Unable to Sign in.", {
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

            setLoading(false);
          }, 1000);
        });
    },

    validationSchema: schema,
  });
  return (
    <div className="flex justify-center items-center p-10 h-screen">
      <form
        onSubmit={formik.handleSubmit}
        className="flex flex-col gap-10 justify-center items-center p-5 border-[1px] border-gray-200 min-w-[23rem] md:w-[28rem] min-h-[20rem] rounded-md bg-white">
        <h2 className="text-black backdrop-blur-sm p-2 w-full flex justify-center items-center font-[600] capitalize text-[25px] border-b-[1px] border-b-gray-200">
          Sign in
        </h2>
        <label htmlFor="email" className="w-full">
          <input
            onChange={formik.handleChange}
            label="Email"
            type="email"
            name="email"
            id="email"
            placeholder={
              formik.touched.email && formik.errors.email
                ? `${formik.errors.email}`
                : `Email Address`
            }
            className={`border-[1px] border-gray-400 w-full h-[2.5rem] ${
              formik.touched.email && formik.errors.email
                ? "placeholder-red-700 border-red-400"
                : "placeholder-black/80"
            } rounded-[0.2rem] px-4 focus:outline-none focus:border-gray-900`}
          />
        </label>
        <label htmlFor="password" className="w-full">
          <input
            onChange={formik.handleChange}
            label="Password"
            type="password"
            name="password"
            id="password"
            maxLength={15}
            placeholder={
              formik.touched.password && formik.errors.password
                ? `${formik.errors.password}`
                : `Password`
            }
            className={`border-[1px] border-gray-400 w-full h-[2.5rem] ${
              formik.touched.password && formik.errors.password
                ? "placeholder-red-700 border-red-400"
                : "placeholder-black/80"
            } rounded-[0.2rem] px-4 focus:outline-none focus:border-gray-900`}
          />
        </label>
        <button
          onClick={(e) => {
            e.preventDefault();
            formik.handleSubmit();
          }}
          type="submit"
          className="border-[1px] border-gray-400 flex justify-center items-center bg-red-700 hover:border-white hover:bg-red-800  text-white text-[20px] font-[600] w-full h-[2.5rem] rounded-[0.2rem] px-4">
          {loading ? (
            <CgSpinner size={28} className="animate-spin duration-100" />
          ) : (
            " Login "
          )}
        </button>
        <div className="flex justify-center items-center gap-1">
          <span>Don't have an account?</span>
          <Link
            to="/signup"
            className=" text-blue-900 hover:underline capitalize">
            sign up
          </Link>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
