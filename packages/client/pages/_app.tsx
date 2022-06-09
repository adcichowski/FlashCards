import "../styles/settings.css";

import type { AppProps } from "next/app";
import { ModalProvider } from "src/context/ModalContext";
import { AuthProvider } from "src/context/AuthContext";
import { CardProvider } from "src/context/CardContext";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
function MyApp({ Component, pageProps }: AppProps) {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <ModalProvider>
        <AuthProvider>
          <CardProvider>
            {process.env.NODE_ENV === "development" && <ReactQueryDevtools position="top-left" />}
            <Component {...pageProps} />
          </CardProvider>
        </AuthProvider>
      </ModalProvider>
    </QueryClientProvider>
  );
}
export default MyApp;
