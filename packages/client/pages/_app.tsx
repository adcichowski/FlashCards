import "../styles/settings.css";

import type { AppProps } from "next/app";
import { ModalProvider } from "src/Context/ModalContext";
import { AuthProvider } from "src/Context/AuthContext";
import { CardProvider } from "src/Context/CardContext";
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
