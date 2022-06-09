import React, { useEffect } from "react";

interface FetcherData<T> {
  readonly errorMessage?: string;
  readonly data: T | null;
  readonly status: "starting" | "loading" | "success" | "error";
}
export function useFetcher<T>(fetchFunc: () => Promise<T>) {
  const [fetchData, setFetchData] = React.useState<FetcherData<T>>({
    data: null,
    status: "starting",
    errorMessage: "",
  });
  useEffect(() => {
    if (fetchData.status !== "starting") return;
    setFetchData({ ...fetchData, status: "loading" });
    fetchFunc()
      .then((data) => {
        setFetchData({ data: data, status: "success" });
      })
      .catch((e) => {
        if (e instanceof Error) {
          setFetchData({ data: null, status: "error", errorMessage: e.message });
        }
      });
  }, [fetchFunc, fetchData]);
  return fetchData;
}

interface FetchConfig {
  readonly body?: object;
}
export async function fetcher<T>(path: string, { body }: FetchConfig): Promise<T> {
  try {
    const response = await fetch(path, {
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    if (response.ok) {
      return response.json() as Promise<T>;
    }
    throw new Error("Problem during fetch data");
  } catch (e) {
    if (e instanceof Error) {
      throw e;
    }
    throw new Error("Problem during fetch data");
  }
}
