"use client";
import { ReactNode, useEffect } from "react";
import { useUserStore } from "@/stores/user";
import { verifySession } from "@/actions/sessions";

export function UserProvider({ children }: { children: ReactNode }) {
  const updateUser = useUserStore((state) => state.updateUser);

  useEffect(() => {
    const setUser = async () => {
      const user = await verifySession();

      if (user) {
        updateUser(user);
      }
    };

    setUser();
  }, []);

  return <>{children}</>;
}
