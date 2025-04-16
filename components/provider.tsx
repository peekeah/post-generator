"use client";

import { useEffect } from "react";
import { SessionProvider, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <ChildrenComponent component={children} />
    </SessionProvider>
  );
}

const ChildrenComponent = ({ component }: { component: React.ReactNode }) => {

  const session = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session.status === "authenticated") {
      router.push("/dashboard")
    }
  }, [session])

  return (
    <>{component}</>
  )
}
