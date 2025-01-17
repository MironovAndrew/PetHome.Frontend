import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { getRouter } from "./customComponents/router";
import { RouterProvider } from "react-router";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={getRouter()} />
  </StrictMode>
);
