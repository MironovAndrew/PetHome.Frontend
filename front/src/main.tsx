import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { RouterProvider } from "react-router";
import { AuthProvider } from "./contexts/auth/AuthProvider";
import { getRouter } from "./customComponents/router";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={getRouter()} />
    </AuthProvider>
  </StrictMode>
);
