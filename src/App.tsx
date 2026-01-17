import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom"
import MainPage from "./pages/main"
import RestaurantDetailPage from "./pages/restaurant"
import Provider from "./Provider"
import RankingPage from "./pages/ranking"
import SearchPage from "./pages/search"
import LoginPage from "./pages/login"
import LoginRedirectPage from "./pages/login/oauth"
import MyPage from "./pages/my"
import SearchResultPage from "./pages/search/result"
import ChallengeRegistrationPage from "./pages/challenge/registration"
import ChallengePage from "./pages/challenge"
import ChallengeRestaurantDetailPage from "./pages/challenge/restaurant"

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
      {
        path: "/challenge",
        children: [
          {
            index: true,
            element: <ChallengePage />,
          },
          {
            path: "/challenge/registration",
            element: <ChallengeRegistrationPage />,
          },
          {
            path: "/challenge/restaurant",
            element: <ChallengeRestaurantDetailPage />,
          },
        ],
      },
    ],
  },
])

function App() {
  return <RouterProvider router={router} />
}

export default App
