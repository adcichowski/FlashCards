import "../styles/settings.css";

import type { AppProps } from "next/app";

import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";

// const ModalComponent = dynamic<{}>(() => import("../src/components/Modal/Modal").then((module) => module.Modal), {
//   ssr: false,
// });

function MyApp({ Component, pageProps }: AppProps) {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      {process.env.NODE_ENV === "development" && <ReactQueryDevtools position="top-left" />}
      <Component {...pageProps} />
    </QueryClientProvider>
  );
}
export default MyApp;
