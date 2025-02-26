"use client";
import { signIn, useSession } from "next-auth/react";
import React from "react";

const Page = () => {
  const { data: session, status } = useSession();
  React.useEffect(() => {
    if (status === "unauthenticated") signIn(); // Redirects to sign-in page
  }, [status]);

  if (status === "loading") return <p>Loading...</p>;
  if (!session) return null;
  return (
    <div className="border">
      <h1 className="text-4xl font-bold">Welcome to Dashboard</h1>
    </div>
  );
};

export default Page;
