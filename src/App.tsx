import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import { Global } from "@emotion/react";
import globalStyles from "./styles/globalStyles";
import MainPage from "./pages/main";
import RestaurantDetailPage from "./pages/restaurant";
import Provider from "./Provider";
import RankingPage from "./pages/ranking";
import SearchPage from "./pages/search";
import LoginPage from "./pages/login";
import LoginRedirectPage from "./pages/login/oauth";
import MyPage from "./pages/my";
import SearchResultPage from "./pages/search/result";

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
        children: [
          {
            index: true,
            element: <SearchPage />,
          },
          {
            path: "/search/result",
            element: <SearchResultPage />,
          },
        ],
      },
      {
        path: "/login",
        children: [
          {
            index: true,
            element: <LoginPage />,
          },
          {
            path: "/login/oauth",
            element: <LoginRedirectPage />,
          },
        ],
      },
      {
        path: "/my",
        element: <MyPage />,
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
