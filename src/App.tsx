import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import { Global } from "@emotion/react";
import globalStyles from "./styles/globalStyles";
import MainPage from "./pages/main";
import RestaurantDetailPage from "./pages/restaurant";
import { OverlayProvider } from "overlay-kit";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <OverlayProvider>
        <Outlet />
      </OverlayProvider>
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
