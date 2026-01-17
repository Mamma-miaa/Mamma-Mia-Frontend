import Spinner from "./@lib/components/Spinner";
import { OverlayProvider } from "overlay-kit";
import { Suspense } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Global } from "@emotion/react";
import globalStyles from "./styles/globalStyles";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

const Provider = ({ children }: { children: React.ReactNode }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <Global styles={globalStyles} />
      <Suspense fallback={<Spinner />}>
        <OverlayProvider>{children}</OverlayProvider>
      </Suspense>
    </QueryClientProvider>
  );
};

export default Provider;
