import React from "react";
import * as yup from "yup";
import { useFormik } from "formik";
import { useAuth } from "../context/UserAuthContext";
const SignUpPage = () => {
  const { signup } = useAuth();
  let schema = yup.object().shape({
    name: yup.string().required("Username is required"),
    email: yup.string().email().required("Email is required."),
    password: yup.string().required("Password is required."),
  });
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
    },
    onSubmit: (e) => {
      console.log(formik.values.email);
      signup(formik.values.email, formik.values.password)
        .then(() => {
          console.log("Signup successful!");
        })
        .catch((error) => {
          console.log("Signup error:", error.message);
        });
    },

    validationSchema: schema,
  });
  return (
    <div className="flex justify-center items-center p-10 h-screen">
      <form className="flex flex-col gap-10 justify-center items-center p-5 border-[1px] border-gray-200 min-w-[23rem] md:w-[28rem] min-h-[20rem] rounded-md bg-white">
        <h2 className="text-black backdrop-blur-sm p-2 w-full flex justify-center items-center font-[600] capitalize text-[25px] border-b-[1px] border-b-gray-200">
          Create new account
        </h2>

        <label htmlFor="name" className="w-full">
          <input
            onChange={formik.handleChange}
            label="Username"
            type="text"
            name="name"
            id="name"
            placeholder={
              formik.touched.name && formik.errors.name
                ? `${formik.errors.name}`
                : `Username `
            }
            className={`border-[1px] border-gray-400 w-full h-[2.5rem] ${
              formik.touched.name && formik.errors.name
                ? "placeholder-red-700 border-red-400"
                : "placeholder-black/80"
            } rounded-[0.2rem] px-4 focus:outline-none focus:border-gray-900`}
          />
        </label>
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
          Sign Up
        </button>
        <div className="flex justify-center items-center gap-1">
          <span>Already have an account?</span>
          <a href="/login" className=" text-blue-900 hover:underline">
            Login
          </a>
        </div>
      </form>
    </div>
  );
};

export default SignUpPage;
