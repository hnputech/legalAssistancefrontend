import { createBrowserRouter } from "react-router-dom";
import { Chat } from "../conponents/chat/Chat";
import { Template } from "../conponents/templates/Template";
import SellPurchase from "../conponents/templates/agreements";
export const router = createBrowserRouter([
  {
    path: "/",
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
]);
