import DefaultLayout from "@/layouts/default";
import All from "@/pages/appointment/All";
import New from "@/pages/appointment/New";
export default {
  path: "appointment",
  element: <DefaultLayout />,
  children: [
    { path: "new", element: <New /> },
    { path: "all", element: <All /> },
  ],
};
