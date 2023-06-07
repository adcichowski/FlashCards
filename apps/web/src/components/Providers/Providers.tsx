"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
import { Modal } from "src/components/Modal/Modal";
import { AuthProvider } from "src/context/AuthContext";
import { ModalProvider } from "src/context/ModalContext";

export function Providers({ children }: { readonly children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <ModalProvider>
          <Modal />
          {children}
          <div id="modal-root" />
        </ModalProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}
