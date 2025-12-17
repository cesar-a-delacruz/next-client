import { createBrowserRouter } from "react-router-dom";
import { Navigate } from "react-router-dom";

import user from "@/routes/user.jsx";
import appointment from "@/routes/appointment.jsx";
import service from "@/routes/service.jsx";
import business from "@/routes/business";
import Auth from "@/pages/Auth";
import Stats from "@/pages/Stats";
import DefaultLayout from "./layouts/default.jsx";

const routes = [
  user,
  appointment,
  service,
  business,
  {
    path: "auth",
    element: <DefaultLayout />,
    children: [{ index: true, element: <Auth /> }],
  },
  {
    path: "stats",
    element: <DefaultLayout />,
    children: [{ index: true, element: <Stats /> }],
  },
  {
    path: "*",
    element: <Navigate to={"/auth"} />,
  },
];

export const router = createBrowserRouter(routes);
