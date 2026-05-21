// Tiny session helper for the static prototype. No real auth.
const KEY = "superpilot_user";

export function signIn(email: string) {
  if (typeof window === "undefined") return;
  sessionStorage.setItem(KEY, email);
}

export function signOut() {
  if (typeof window === "undefined") return;
  sessionStorage.removeItem(KEY);
}

export function getSession(): string | null {
  if (typeof window === "undefined") return null;
  return sessionStorage.getItem(KEY);
}
