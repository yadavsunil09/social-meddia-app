import React from "react";
import fb from "../firebase";
import { useAuth } from "../context/UserAuthContext";

import * as yup from "yup";
import { useFormik } from "formik";
import { Link } from "react-router-dom";
const { logIn } = useAuth();
const LoginPage = () => {
  let schema = yup.object().shape({
    email: yup.string().email().required("Email is required."),
    password: yup.string().required("Password is required."),
  });
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: () => {
      console.log(formik.values);
      try {
        logIn(formik.values.email, formik.values.password);
      } catch (err) {
        console.log("error message", err.message);
      }
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
          className="border-[1px] border-gray-400 bg-red-700 hover:border-white hover:bg-red-800  text-white text-[20px] font-[600] w-full h-[2.5rem] rounded-[0.2rem] px-4">
          Login
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
