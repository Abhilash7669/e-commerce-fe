"use client";

import Pill from "@/components/pills/pill";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useMutationApi } from "@/hooks/useMutationApi";
import { ENV } from "@/lib/config/env.config";
import { setCookieValue } from "@/lib/helper/token-extraction";
import { authService } from "@/services/auth/auth.services";
import {
  useCartTotal,
  useDummyAuthCount,
  useTriggerAuthFlow,
} from "@/store/auth-cart";
import { useHasError } from "@/store/auth/index.auth";
import { useCartSheetToggle } from "@/store/cart-ui/index.cart-ui";
import { useState } from "react";
import { IoMdSearch } from "react-icons/io";
import { PiShoppingCartSimpleBold } from "react-icons/pi";

export default function HeaderActions() {
  // todo: temp dialog and mock login, remove later
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [loginData, setLoginData] = useState<{
    email: string;
    password: string;
  }>({
    email: "abhilashsk1998@gmail.com",
    password: "Kaizen47$",
  });

  const cartCount = useCartTotal();
  const toggleCartSheet = useCartSheetToggle();
  const hasError = useHasError();

  const { execute, isLoading, message } = useMutationApi({
    dataFn: async () => await authService.login(loginData),
  });

  const triggerAuthFlow = useTriggerAuthFlow();

  const dummyCount = useDummyAuthCount();

  async function handleLogin() {
    const res = await execute();
    if (!res?.success) {
      console.log(message, "ERROR MESSAGE HERE");
      return;
    }
    if (res.data) {
      const isCookieSet = await setCookieValue({
        key: ENV.AUTH_ACCESS_TOKEN_COOKIE_NAME,
        value: res.data.access_token as string,
      });

      console.log(isCookieSet, "IS SET");

      if (isCookieSet) await triggerAuthFlow();
    }
  }

  return (
    <div className="flex items-center gap-4">
      <p>This is the count from our shared slice: {dummyCount}</p>
      {hasError && <p className="text-red-500">{hasError}</p>}
      <IoMdSearch className="text-xl cursor-pointer" />
      <div onClick={toggleCartSheet} className="flex items-center gap-1">
        <PiShoppingCartSimpleBold className="text-xl cursor-pointer" />
        {cartCount && (
          <sup>
            <Pill className="bg-red-500 text-white rounded-full p-2 h-5 w-5">
              {cartCount}
            </Pill>
          </sup>
        )}
      </div>
      <Button onClick={() => setOpenDialog(true)}>Login</Button>
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Login</DialogTitle>
            <DialogDescription>Login to your account</DialogDescription>
          </DialogHeader>
          <div>
            <div>
              <label>Email</label>
              <input
                type="text"
                value={loginData.email}
                onChange={(e) =>
                  setLoginData((prevState) => ({
                    ...prevState,
                    email: e.target.value,
                  }))
                }
              />
            </div>
            <div>
              <label>Password</label>
              <input
                type="text"
                value={loginData.password}
                onChange={(e) =>
                  setLoginData((prevState) => ({
                    ...prevState,
                    password: e.target.value,
                  }))
                }
              />
            </div>
            <Button onClick={async () => await handleLogin()}>
              {isLoading ? "Loadinnggg" : "Login"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
