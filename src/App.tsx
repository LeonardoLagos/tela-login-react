import { createBrowserRouter } from "react-router-dom";
import { Login } from "./pages/login";
import { ErrorPage } from "./pages/errorPage";

const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login/>
  },
  {
    path:"*",
    element: <ErrorPage></ErrorPage>
  }
])

export default router