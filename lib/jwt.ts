import jwt from "jsonwebtoken";

// In production JWT_SECRET MUST be provided via the environment; a hardcoded
// fallback is only tolerated in local development.
const SECRET =
  process.env.JWT_SECRET ||
  (process.env.NODE_ENV === "production" ? "" : "dev-only-insecure-secret");

if (!SECRET) {
  throw new Error("JWT_SECRET environment variable is required in production");
}

export function signJWT(payload: object, expiresIn: any = "1d"): string {
  return jwt.sign(payload, SECRET, { expiresIn });
}

export function verifyJWT(token: string): any {
  try {
    return jwt.verify(token, SECRET);
  } catch {
    return null;
  }
}
