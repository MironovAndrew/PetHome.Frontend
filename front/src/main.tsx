import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from 'react-redux';
import { RouterProvider } from "react-router";
import { AuthProvider } from "./contexts/auth/AuthProvider";
import { getRouter } from "./customComponents/Router";
import { store } from "./store/store";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <AuthProvider>
        <RouterProvider router={getRouter()} />
      </AuthProvider>
    </Provider>
  </StrictMode> 
);
