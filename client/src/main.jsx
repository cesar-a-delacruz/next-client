import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import * as routing from "@/routing";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={routing.router} />
  </StrictMode>,
);
