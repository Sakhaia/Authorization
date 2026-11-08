import { createBrowserRouter, Navigate } from "react-router-dom";
import { AuthLayout, ForgotPasswordPage, LoginPage, RegisterPage,} from "@/pages/auth";
import { AboutTab, EditProfilePage, PersonalTab, ProfilePage, SkillsTab } from "@/pages/profile";
import { HomePage } from "@/pages/home";
import { AppLayout } from "../layouts";
import { AuthCheck } from "./AuthCheck";
import { GuestOnly } from "./GuestOnly";
import { Specializations } from "@/pages/specializations";
import { SpecializationDetail } from "@/pages/specializationDetails";
import { SpecializationFormPage } from "@/pages/specializationForm";
import { AdminRoute } from "./AdminRoute";

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
    element: <AuthCheck/>, children: [{
      element: <AppLayout/>, children: [
        { index: true, element: <HomePage /> },
        { path: "home", element: <Navigate to="/" replace/> },
        { path: "profile", element: <ProfilePage /> },
        { path: "profile/edit", element: <EditProfilePage />, children: [
          { path: "personal", element: <PersonalTab/> },
          { path: "about", element: <AboutTab/> },
          { path: "skills", element: <SkillsTab/> }
        ]},
        { element: <AdminRoute/>, children: [
          { path: "specializations" , element: <Specializations/>},
          { path: "specializations/create", element: <SpecializationFormPage/>},
          { path: "specializations/:id", element: <SpecializationDetail/>},
          { path: "specializations/:id/edit", element: <SpecializationFormPage/>},
        ]},
      ]
    }],
  },
])