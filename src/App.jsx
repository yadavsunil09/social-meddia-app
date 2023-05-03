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
function App() {
  const router = createBrowserRouter([
    { path: "/", element: <HomePage /> },
    { path: "/profile", element: <ProfilePage /> },
  ]);
  return (
    <RouterProvider router={router}>
      <HomeLayout />
    </RouterProvider>
  );
}

export default App;
