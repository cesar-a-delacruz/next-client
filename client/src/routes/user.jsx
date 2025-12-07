import DefaultLayout from "@/layouts/default";
import All from "@/pages/user/All";
import New from "@/pages/user/New";
export default {
  path: "user",
  element: <DefaultLayout />,
  children: [
    { path: "new", element: <New /> },
    { path: "all", element: <All /> },
  ],
};
