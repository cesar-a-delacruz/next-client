import DefaultLayout from "@/layouts/default";
import All from "@/pages/service/All";
import New from "@/pages/service/New";
export default {
  path: "service",
  element: <DefaultLayout />,
  children: [
    { path: "new", element: <New /> },
    { path: "all", element: <All /> },
  ],
};
