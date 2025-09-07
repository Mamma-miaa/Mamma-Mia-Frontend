import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Global } from "@emotion/react";
import globalStyles from "./styles/globalStyles";
import MainPage from "./pages/main";
import RestaurantDetailPage from "./pages/restaurant";

const router = createBrowserRouter([
  {
    path: "/",
    children: [
      {
        path: "/",
        element: <MainPage />,
      },
      {
        path: "/restaurant",
        element: <RestaurantDetailPage />,
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
