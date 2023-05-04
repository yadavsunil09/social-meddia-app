import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import HomePage from "./Pages/HomePage";
import ProfilePage from "./Pages/ProfilePage";
import {
  BrowserRouter,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import HomeLayout from "./Layout/HomeLayout";
import Login from "./Pages/Login";
import SignUp from "./Pages/SignUp";
function App() {
  const router = createBrowserRouter([
    { path: "/", element: <HomePage /> },
    { path: "/profile", element: <ProfilePage /> },
    { path: "/login", element: <Login /> },
    { path: "/signup", element: <SignUp /> },
  ]);
  return (
    <RouterProvider router={router}>
      <HomeLayout />
    </RouterProvider>
  );
}

export default App;
