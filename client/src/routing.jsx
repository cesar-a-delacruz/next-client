import NewUser from "@/pages/user/new";
import NewBusiness from "@/pages/business/new";
import NewService from "@/pages/service/new";
import NewAppointment from "@/pages/appointment/new";

import AllUsers from "@/pages/user/all";
import AllBusinesses from "@/pages/business/all";
import AllServices from "@/pages/service/all";
import AllAppointments from "@/pages/appointment/all";

import { createBrowserRouter } from "react-router-dom";

const routes = [
  {
    path: "/user",
    children: [
      { path: "new", element: <NewUser /> },
      { path: "all", element: <AllUsers /> },
    ],
  },
  {
    path: "/business",
    children: [
      { path: "new", element: <NewBusiness /> },
      { path: "all", element: <AllBusinesses /> },
    ],
  },
  {
    path: "/service",
    children: [
      { path: "new", element: <NewService /> },
      { path: "all", element: <AllServices /> },
    ],
  },
  {
    path: "/appointment",
    children: [
      { path: "new", element: <NewAppointment /> },
      { path: "all", element: <AllAppointments /> },
    ],
  },
];

export const router = createBrowserRouter(routes);
