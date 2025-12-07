import { createBrowserRouter } from "react-router-dom";
import { Navigate } from "react-router-dom";

import user from "@/routes/user";
import appointment from "@/routes/appointment";
import service from "@/routes/service";
import business from "@/routes/business";
import Auth from "@/pages/Auth";
import Stats from "@/pages/Stats";
import DefaultLayout from "./layouts/default";

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
