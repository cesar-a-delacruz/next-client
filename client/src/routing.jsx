import NewUser from "@/pages/user/new";
import NewBusiness from "@/pages/business/new";
import NewService from "@/pages/service/new";
import NewAppointment from "@/pages/appointment/new";
import { createBrowserRouter } from "react-router-dom";

const routes = [
  {
    path: "/user",
    children: [{ path: "new", element: <NewUser /> }],
  },
  {
    path: "/business",
    children: [{ path: "new", element: <NewBusiness /> }],
  },
  {
    path: "/service",
    children: [{ path: "new", element: <NewService /> }],
  },
  {
    path: "/appointment",
    children: [{ path: "new", element: <NewAppointment /> }],
  },
];

export const router = createBrowserRouter(routes);
