import { createBrowserRouter, Navigate } from "react-router-dom";
import { AuthLayout, ForgotPasswordPage, LoginPage, RegisterPage,} from "@/pages/auth";
import { ProfilePage } from "@/pages/profile";
import { HomePage } from "@/pages/home";
import { ProtectedRoute } from "./ProtectedRoute";
import { AppLayout } from "../layouts";

export const router = createBrowserRouter([
  {
    element: <AuthLayout />,
    children: [
      { path: "login", element: <ProtectedRoute mode="onlyGuests"><LoginPage /></ProtectedRoute>  },
      { path: "register", element: <ProtectedRoute mode="onlyGuests"><RegisterPage /></ProtectedRoute>  },
      { path: "forgot-password", element: <ProtectedRoute mode="onlyGuests"><ForgotPasswordPage /></ProtectedRoute>  },
    ],
  },

  {
    element: <AppLayout />, children: [
      { index: true, element: ( <ProtectedRoute mode="onlyAuthenticated"> <HomePage /> </ProtectedRoute> )},
      { path: "home", element: <Navigate to="/" replace/>},
      { path: "profile", element: ( <ProtectedRoute mode="onlyAuthenticated"> <ProfilePage /> </ProtectedRoute> )},
    ],
  },
])