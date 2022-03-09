import "../styles/settings.css";

import type { AppProps } from "next/app";
import { ModalProvider } from "client/src/Context/ModalContext";
import { AuthProvider } from "client/src/Context/AuthContext";
import { CardProvider } from "client/src/Context/CardContext";
function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ModalProvider>
      <AuthProvider>
        <CardProvider>
          <Component {...pageProps} />
        </CardProvider>
      </AuthProvider>
    </ModalProvider>
  );
}
export default MyApp;
