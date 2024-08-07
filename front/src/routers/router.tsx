import PrivateRoute from "@routers/PrivateRoute"
import Admin from "@src/pages/Admin.page"
import Home from "@src/pages/Home.page"
import LoginPage from "@src/pages/Login.page"
import Profile from "@src/pages/Profile.page"
import Graphics from "@src/pages/Graphics.page"
import RegisterPage from "@src/pages/Register.page"
import { createBrowserRouter } from "react-router-dom"

import Layout from "@src/components/Layout"
import NotFoundView from "@src/components/Views/NotFoundView"

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: (
          <PrivateRoute roles={["player", "editor", "admin"]}>
            <Home />
          </PrivateRoute>
        ),
      },
      {
        path: "/admin",
        element: (
          <PrivateRoute roles={["admin", "editor"]}>
            <Admin />
          </PrivateRoute>
        ),
      },
      {
        path: "/profile",
        element: (
          <PrivateRoute roles={["admin", "editor", "player"]}>
            <Profile />
          </PrivateRoute>
        ),
      },
      {
        path: "/graphics",
        element: (
          <PrivateRoute roles={["admin", "editor", "player"]}>
            <Graphics />
          </PrivateRoute>
        ),
      },
      {
        path: "*",
        element: <NotFoundView />,
      }
    ],
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/register",
    element: <RegisterPage />,
  },
  {
    path: "*",
    element: <NotFoundView />,
  }
])

export default router
