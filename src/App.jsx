import "./App.css";
import HomePage from "./Pages/HomePage";
import ProfilePage from "./Pages/ProfilePage";
import { AuthProvider } from "./context/UserAuthContext";
import {
  BrowserRouter,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import HomeLayout from "./Layout/HomeLayout";
import LoginPage from "./Pages/LoginPage";
import SignUpPage from "./Pages/SignUpPage";
function App() {
  const router = createBrowserRouter([
    { path: "/", element: <HomePage /> },
    { path: "/profile", element: <ProfilePage /> },
    { path: "/login", element: <LoginPage /> },
    { path: "/signup", element: <SignUpPage /> },
  ]);
  return (
    <AuthProvider>
      <RouterProvider router={router}>
        <HomeLayout />
      </RouterProvider>
    </AuthProvider>
  );
}

export default App;
