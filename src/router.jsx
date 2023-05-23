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
import ArtistForm from "./views/Artists/ArtistsForm";
import ArtistsImport from "./views/Artists/ArtistImport";
import ArtistMusicList from "./views/Music/ArtistMusicList";
import MusicForm from "./views/Music/MusicForm";

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
      {
        path: "/artists/import",
        element: <ArtistsImport key="artistImport" />,
      },
      {
        path: "/artists/:artist_id/music",
        element: <ArtistMusicList key="artistMusic" />,
      },
      {
        path: "/artists/:artist_id/music/new",
        element: <MusicForm key="musicAdd" />,
      },
      {
        path: "/artists/:artist_id/music/:id",
        element: <MusicForm key="musicEdit" />,
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
