import { createBrowserRouter } from "react-router";
import { RootLayout } from "./RootLayout";
import { LoginPage } from "../pages/contentPages/userManagment/LoginPage";
import { MainPage } from "../pages/contentPages/userManagment/MainPage";
import { Volunteers } from "../pages/contentPages/petManagment/Volunteers";
import { Pets } from "../pages/contentPages/petManagment/Pets";
import { UserProfilePage } from "../pages/contentPages/userManagment/UserProfilePage";
import { HelpPage } from "../pages/contentPages/userManagment/HelpPage";
import { FavoritePets } from "../pages/contentPages/petManagment/FavoritePets";
import { NotFound } from "../pages/basePages/NotFound";
import { MainRegistrationPage } from "../pages/contentPages/userManagment/registration/mainRegistrationPage";
import { FileManager } from "../pages/handlerPages/FileManager";

export function getRouter() {
  return createBrowserRouter([
    {
      element: <RootLayout />,
      children: [
        {
          path: "/",
          element: <MainPage />,
        },
        {
          path: "/registration",
          element: <MainRegistrationPage />,
        },
        {
          path: "/login",
          element: <LoginPage />,
        },
        {
          path: "/main",
          element: <MainPage />,
        },
        {
          path: "/volunteers",
          element: <Volunteers />,
        },
        {
          path: "/pets",
          element: <Pets />,
        },
        {
          path: "/profile",
          element: <UserProfilePage />,
        },
        {
          path: "/favoritepets",
          element: <FavoritePets />,
        },
        {
          path: "/help",
          element: <HelpPage />,
        },
        {
          path: "/file",
          element: <FileManager />,
        },
      ],
      errorElement: <NotFound />,
    },
  ]);
}
