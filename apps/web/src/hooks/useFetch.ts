import { useSession } from "next-auth/react";
import { fetcher } from "src/utils/fetcher";

export function useFetch() {
  const session = useSession();

  if (session.status === "authenticated") {
    return <T>(endpoint: string, options: Parameters<typeof fetcher>[1]) => {
      return fetcher<T>(endpoint, {
        ...options,
        headers: {
          Authorization: `Bearer ${session.data.user.token}`,
          ...options?.headers,
        },
      });
    };
  }
}
