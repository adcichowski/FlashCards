export const fetcher = async <T>({
  endpoint,
  method,
  body,
  headers,
}: {
  readonly endpoint: string;
  readonly body: Record<string, unknown>;
  readonly method: "POST" | "PUT" | "GET" | "DELETE";
  readonly headers?: { readonly "Content-Type"?: string };
}) => {
  const res = await fetch(`http://localhost:4001/${endpoint}`, {
    method,
    body: method !== "GET" ? JSON.stringify(body) : undefined,
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
  });
  const data = (await res.json()) as T;
  return data;
};
