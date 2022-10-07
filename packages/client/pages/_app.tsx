import "../styles/settings.css";

import type { AppProps } from "next/app";

import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { AuthProvider } from "src/context/AuthContext";
import { ModalProvider } from "src/context/ModalContext";
import { Modal } from "src/components/Modal/Modal";

function MyApp({ Component, pageProps }: AppProps) {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <ModalProvider>
          {process.env.NODE_ENV === "development" && <ReactQueryDevtools position="top-left" />}
          <Component {...pageProps} />
          <Modal />
        </ModalProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}
export default MyApp;
