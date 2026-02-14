import Header from "@/components/layouts/header";
import React from "react";

type Props = {
  children: React.ReactNode;
};

export default function MainLayout({ children }: Props) {
  return (
    <div>
      <Header />
      {children}
    </div>
  );
}
