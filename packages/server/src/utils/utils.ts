import("dotenv");

export function getEnv(name: string) {
  const val = process.env[name];
  if (!val) {
    throw new Error("Missing ENV for " + name);
  }
  return val;
}
