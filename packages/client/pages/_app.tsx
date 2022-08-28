import "../styles/settings.css";

import type { AppProps } from "next/app";
import { ModalProvider } from "src/context/ModalContext";
import { AuthProvider } from "src/context/AuthContext";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import dynamic from "next/dynamic";

const ModalComponent = dynamic<{}>(() => import("src/components/Modal/Modal").then((module) => module.Modal), {
  ssr: false,
});

function MyApp({ Component, pageProps }: AppProps) {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <ModalProvider>
        <AuthProvider>
          {process.env.NODE_ENV === "development" && <ReactQueryDevtools position="top-left" />}
          <Component {...pageProps} />
        </AuthProvider>
        <ModalComponent />
      </ModalProvider>
    </QueryClientProvider>
  );
}
export default MyApp;
