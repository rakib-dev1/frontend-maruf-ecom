import "next-auth";

declare module "next-auth" {
  interface Session {
    accessToken?: string; // Add accessToken to Session
  }
}
