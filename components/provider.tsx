"use client";

import { useEffect } from "react";
import { SessionProvider, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <ChildrenComponent children={children} />
    </SessionProvider>
  );
}

const ChildrenComponent = ({ children }: { children: React.ReactNode }) => {

  const session = useSession();
  const router = useRouter();

  useEffect(() => {
    console.log("ss:", session)
    if (session.status === "authenticated") {
      router.push("/dashboard")
    }
  }, [session])

  return (
    <>{children}</>
  )
}
