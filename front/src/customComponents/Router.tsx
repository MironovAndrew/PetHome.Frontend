import { createBrowserRouter } from "react-router";
import { RootLayout } from "./RootLayout";
import { Registration } from "../pages/contentPages/userManagment/Registration";
import { Login } from "../pages/contentPages/userManagment/Login";
import { Main } from "../pages/contentPages/userManagment/Main";
import { Volunteers } from "../pages/contentPages/petManagment/Volunteers";
import { Pets } from "../pages/contentPages/petManagment/Pets";
import { UserProfile } from "../pages/contentPages/userManagment/UserProfile";
import { Help } from "../pages/contentPages/userManagment/Help";
import { FavoritePets } from "../pages/contentPages/petManagment/FavoritePets";

export function getRouter() {
  return createBrowserRouter([
    {
      element: <RootLayout />,
      children: [
        {
          path: "/",
          element: <Main />,
        },
        {
          path: "/registration",
          element: <Registration />,
        },
        {
          path: "/login",
          element: <Login />,
        },
        {
          path: "/main",
          element: <Main />,
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
          element: <UserProfile />,
        },
        {
          path: "/favoritepets",
          element: <FavoritePets />,
        },
        {
          path: "/help",
          element: <Help />,
        },
      ],
    },
  ]);
}
