import "./App.css";
import HomePage from "./Pages/HomePage";
import ProfilePage from "./Pages/ProfilePage";
import { AuthProvider } from "./context/UserAuthContext";
import ProtectedRoute from "./utils/ProtectedRoute";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
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
    { path: "/", element: <ProtectedRoute component={<HomePage />} /> },
    {
      path: "/profile",
      element: <ProtectedRoute component={<ProfilePage />} />,
    },
    { path: "/login", element: <LoginPage /> },
    { path: "/signup", element: <SignUpPage /> },
  ]);
  return (
    <AuthProvider>
      <ToastContainer className="text-center" />
      <RouterProvider router={router}>
        <HomeLayout />
      </RouterProvider>
    </AuthProvider>
  );
}

export default App;
