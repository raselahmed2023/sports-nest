"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { authClient } from "../lib/auth-client";

const PrivateRoute = ({ children }) => {
  const router = useRouter();
  const pathname = usePathname();
  const { data: session, isPending } = authClient.useSession();

  useEffect(() => {
    if (!isPending && !session?.user) {
      router.push(`/login?redirect=${encodeURIComponent(pathname)}`);
    }
  }, [isPending, session, pathname, router]);

  if (isPending) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-base-200">
        <div className="text-center">
          <span className="loading loading-spinner loading-lg text-success"></span>
          <p className="mt-3 text-base-content/60">Checking your session...</p>
        </div>
      </div>
    );
  }

  if (!session?.user) {
    return null;
  }

  return children;
};

export default PrivateRoute;