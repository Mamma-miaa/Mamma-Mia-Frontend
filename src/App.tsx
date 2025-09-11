import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import { Global } from "@emotion/react";
import globalStyles from "./styles/globalStyles";
import MainPage from "./pages/main";
import RestaurantDetailPage from "./pages/restaurant";
import { OverlayProvider } from "overlay-kit";
import { Suspense } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <QueryClientProvider client={queryClient}>
        <Suspense fallback={<div>Loading...</div>}>
          <OverlayProvider>
            <Outlet />
          </OverlayProvider>
        </Suspense>
      </QueryClientProvider>
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
