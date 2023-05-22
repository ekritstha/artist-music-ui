import { createBrowserRouter } from "react-router-dom";
import Login from "./views/Login";
import Register from "./views/Register";
import NotFound from "./views/NotFound";
import DefaultLayout from "./components/DefaultLayout";
import GuestLayout from "./components/GuestLayout";
import Dashboard from "./views/Dashboard";
import Users from "./views/Users/Users";
import UserStoreForm from "./views/Users/UserStoreForm";
import UserUpdateForm from "./views/Users/UserUpdateForm";
import Artists from "./views/Artists/Artists";
import ArtistForm from "./views/Artists/ArtistForm";

const router = createBrowserRouter([
  {
    path: "/",
    element: <DefaultLayout />,
    children: [
      {
        path: "/dashboard",
        element: <Dashboard />,
      },
      {
        path: "/users",
        element: <Users />,
      },
      {
        path: "/users/new",
        element: <UserStoreForm key="userCreate" />,
      },
      {
        path: "/users/:id",
        element: <UserUpdateForm key="userUpdate" />,
      },
      {
        path: "/artists",
        element: <Artists />,
      },
      {
        path: "/artists/new",
        element: <ArtistForm key="artistCreate" />,
      },
      {
        path: "/artists/:id",
        element: <ArtistForm key="artistUpdate" />,
      },
    ],
  },
  {
    path: "/",
    element: <GuestLayout />,
    children: [
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default router;
