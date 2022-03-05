import "../styles/settings.css";
import type { AppProps } from "next/app";
import { ModalProvider } from "src/Context/ModalContext";
import { AuthProvider } from "src/Context/AuthContext";
function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ModalProvider>
      <AuthProvider>
        <Component {...pageProps} />
      </AuthProvider>
    </ModalProvider>
  );
}
export default MyApp;
