import { createBrowserRouter, Navigate } from "react-router-dom";
import { AuthLayout, ForgotPasswordPage, LoginPage, RegisterPage,} from "@/pages/auth";
import { AboutTab, EditProfilePage, PersonalTab, ProfilePage, SkillsTab } from "@/pages/profile";
import { HomePage } from "@/pages/home";
import { AppLayout } from "../layouts";
import { AuthCheck } from "./AuthCheck";
import { GuestOnly } from "./GuestOnly";

export const router = createBrowserRouter([
  {
    element:  <AuthLayout />,
    children: [
      { path: "login", element: <GuestOnly><LoginPage /></GuestOnly>  },
      { path: "register", element: <GuestOnly><RegisterPage /></GuestOnly>  },
      { path: "forgot-password", element: <GuestOnly><ForgotPasswordPage /></GuestOnly>  },
    ],
  },

  {
    element: <AuthCheck><AppLayout /></AuthCheck> , children: [
      { index: true, element: <HomePage /> },
      { path: "home", element: <Navigate to="/" replace/> },
      { path: "profile", element: <ProfilePage /> },
      { path: "profile/edit", element: <EditProfilePage />, children: [
        { path: "personal", element: <PersonalTab/> },
        { path: "about", element: <AboutTab/> },
        { path: "skills", element: <SkillsTab/> }
      ]},
      
    ],
  },
])