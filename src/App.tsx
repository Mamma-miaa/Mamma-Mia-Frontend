import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import { Global } from "@emotion/react";
import globalStyles from "./styles/globalStyles";
import MainPage from "./pages/main";
import RestaurantDetailPage from "./pages/restaurant";
import Provider from "./Provider";
import RankingPage from "./pages/ranking";
import SearchPage from "./pages/search";
import LoginPage from "./pages/login";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Provider>
        <Outlet />
      </Provider>
    ),
    children: [
      {
        path: "/",
        element: <MainPage />,
      },
      {
        path: "/restaurant",
        element: <RestaurantDetailPage />,
      },
      {
        path: "/ranking",
        element: <RankingPage />,
      },
      {
        path: "/search",
        element: <SearchPage />,
      },
      {
        path: "/login",
        element: <LoginPage />,
      },
    ],
  },
]);

function App() {
  return (
    <>
      <Global styles={globalStyles} />
      <RouterProvider router={router} />
    </>
  );
}

export default App;
