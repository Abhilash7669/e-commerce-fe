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
import { setCookieValue } from "@/lib/helper/token-extraction";
import { authService } from "@/services/auth/auth.services";
import { useCartSheetToggle } from "@/store/cart-ui/index.cart-ui";
import { useCartItemsCount } from "@/store/cart/index.cart";
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

  const cartCount = useCartItemsCount();
  const toggleCartSheet = useCartSheetToggle();

  const { execute, isLoading, message } = useMutationApi({
    dataFn: async () => await authService.login(loginData),
  });

  async function handleLogin() {
    const res = await execute();
    if (!res?.success) {
      console.log(message, "ERROR MESSAGE HERE");
      return;
    }
    if (res.data) {
      await setCookieValue({
        key: "lilly_Token",
        value: res.data.access_token as string,
      });
    }
  }

  return (
    <div className="flex items-center gap-4">
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
