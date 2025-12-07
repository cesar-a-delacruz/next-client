import DefaultLayout from "@/layouts/default";
import All from "@/pages/business/All";
import New from "@/pages/business/New";
export default {
  path: "business",
  element: <DefaultLayout />,
  children: [
    { path: "new", element: <New /> },
    { path: "all", element: <All /> },
  ],
};
