import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { RouterProvider } from "react-router";
import { getRouter } from "./customComponents/Router";
import { AuthProvider } from "./contexts/auth/AuthProvider";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={getRouter()} />
    </AuthProvider>
  </StrictMode>
);
