import { randomUUID } from "crypto";

export function createUserToken(): string {
  return randomUUID();
}
