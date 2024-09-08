import { createBrowserRouter } from "react-router-dom";
import { Chat } from "../conponents/chat/Chat";
import { Template } from "../conponents/templates/Template";
import SellPurchase from "../conponents/templates/agreements";
import { SideBarLayout } from "../conponents/layouts/SideBarLayout";
import { AllGeneratedTemplate } from "../conponents/table";
import { EditTemplate } from "../conponents/templates/EditTemplate";
import { Analyzer } from "../conponents/documentAnalyze/Analyzer";
import { SignIn } from "../conponents/login/SignIn";
import { SignUp } from "../conponents/login/SignUp";
import ProtectedRoute from "./ProtectedRoute";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <ProtectedRoute element={<SideBarLayout />} />,
    children: [
      {
        path: "",
        element: <Chat />,
      },
      {
        path: "/template",
        element: <Template />,
      },
      {
        path: "/template/:templateId",
        element: <SellPurchase />,
      },
      {
        path: "/AllGeneratedTemplate/:userId",
        element: <AllGeneratedTemplate />,
      },
      {
        path: "/show/:documentId",
        element: <EditTemplate />,
      },
      {
        path: "/analyze",
        element: <Analyzer />,
      },
    ],
  },
  {
    path: "/signin",
    element: <SignIn />,
  },
  {
    path: "/signup",
    element: <SignUp />,
  },
]);
