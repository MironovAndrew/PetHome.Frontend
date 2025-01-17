import { createBrowserRouter } from "react-router";
import { RootLayout } from "./RootLayout";
import { Registration } from "../pages/contentPages/userManagment/Registration";
import { Login } from "../pages/contentPages/userManagment/Login";
import { Main } from "../pages/contentPages/userManagment/Main";
import { Volunteers } from "../pages/contentPages/petManagment/Volunteers";
import { Pets } from "../pages/contentPages/petManagment/Pets";

export function getRouter(){
    return createBrowserRouter([
    {
        path:"/",
        element: <RootLayout/>,
        children:[
          {
              path:"/registration",
              element: <Registration/>
          },
          {
              path:"/login",
              element: <Login/>
          },
          {
              path:"/main",
              element: <Main/>
          },
          {
              path: "volunteers",
              element: <Volunteers/>
          },
          {
              path: "pets",
              element: <Pets/>
          }
        ]
    }]);
}