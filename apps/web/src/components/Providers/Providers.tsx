"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SessionProvider } from "next-auth/react";
import { Modal } from "src/components/Modal/Modal";
import { ModalProvider } from "src/context/ModalContext";

const client = new QueryClient();
export function Providers({ children }: { readonly children: React.ReactNode }) {
  return (
    <SessionProvider>
      <QueryClientProvider client={client}>
        <ModalProvider>
          <>
            <Modal />
            {children}
            <div id="modal-root" />
          </>
        </ModalProvider>
      </QueryClientProvider>
    </SessionProvider>
  );
}
