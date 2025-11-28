import { createBrowserRouter } from "react-router-dom";

import appointment from "@/pages/appointment";
import business from "@/pages/business";
import service from "@/pages/service";
import user from "@/pages/user";
import Stats from "@/pages/stats";
import DefaultLayout from "./layouts/default";

const routes = [
  {
    path: user.pageData.endpoint,
    element: <DefaultLayout />,
    children: [
      { path: "new", element: user.New() },
      { path: "all", element: user.All() },
      { path: "auth", element: user.Auth() },
    ],
  },
  {
    path: business.pageData.endpoint,
    element: <DefaultLayout />,
    children: [
      { path: "new", element: business.New() },
      { path: "all", element: business.All() },
    ],
  },
  {
    path: service.pageData.endpoint,
    element: <DefaultLayout />,
    children: [
      { path: "new", element: service.New() },
      { path: "all", element: service.All() },
    ],
  },
  {
    path: appointment.pageData.endpoint,
    element: <DefaultLayout />,
    children: [
      { path: "new", element: appointment.New() },
      { path: "all", element: appointment.All() },
    ],
  },
  {
    path: "stats/:date",
    element: <DefaultLayout />,
    children: [{ index: true, element: <Stats /> }],
  },
];

export const router = createBrowserRouter(routes);
