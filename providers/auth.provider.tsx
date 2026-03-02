"use client";

import { useIsAuthenticated } from "@/store/auth/index.auth";
import { useEffect } from "react";

type Props = {
  children: React.ReactNode;
};

export default function AuthProvider({ children }: Props) {
  const isAuthenticated = useIsAuthenticated();

  useEffect(() => {
    isAuthenticated();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <>{children}</>;
}
