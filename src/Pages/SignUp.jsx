import React from "react";

const SignUp = () => {
  return (
    <div className="flex justify-center items-center p-10 h-screen">
      <form className="flex flex-col gap-10 justify-center items-center p-5 border-[1px] border-gray-200 w-[28rem] min-h-[20rem] rounded-md bg-white">
        <h2 className="text-black backdrop-blur-sm p-2 w-full flex justify-center items-center font-[600] capitalize text-[25px] border-b-[1px] border-b-gray-200">
          Create new account
        </h2>

        <label htmlFor="name" className="w-full">
          <input
            label="Username"
            type="text"
            name="name"
            id="name"
            placeholder="Username"
            className="border-[1px] border-gray-400 w-full h-[2.5rem] rounded-[0.2rem] px-4 focus:outline-none focus:border-gray-900"
          />
        </label>
        <label htmlFor="email" className="w-full">
          <input
            label="Email"
            type="email"
            name="email"
            id="email"
            placeholder="Email Address"
            className="border-[1px] border-gray-400 w-full h-[2.5rem] rounded-[0.2rem] px-4 focus:outline-none focus:border-gray-900"
          />
        </label>
        <label htmlFor="password" className="w-full">
          <input
            label="Password"
            type="password"
            name="password"
            id="password"
            placeholder="Password"
            className="border-[1px] border-gray-400 w-full h-[2.5rem] rounded-[0.2rem] px-4 focus:outline-none focus:border-gray-900"
          />
        </label>
        <button
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

export default SignUp;
