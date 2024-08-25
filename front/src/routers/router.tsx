import PrivateRoute from "@routers/PrivateRoute"
import UnauthenticatedRoute from "@routers/UnauthenticatedRoute"
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
          <PrivateRoute>
            <Home />
          </PrivateRoute>
        ),
      },
      {
        path: "/profile",
        element: (
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        ),
      },
      {
        path: "/graphics",
        element: (
          <PrivateRoute>
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
    element:  <UnauthenticatedRoute>
                <LoginPage />
              </UnauthenticatedRoute>,
  },
  {
    path: "/register",
    element: <UnauthenticatedRoute>
                <RegisterPage />
              </UnauthenticatedRoute>,
  },
  {
    path: "*",
    element: <NotFoundView />,
  }
])

export default router
