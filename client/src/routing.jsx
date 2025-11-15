import NewUser from "@/pages/user/new";
import { createBrowserRouter } from "react-router-dom";

const routes = [
  {
    path: "/user",
    children: [{ path: "new", element: <NewUser /> }],
  },
];

export const router = createBrowserRouter(routes);
