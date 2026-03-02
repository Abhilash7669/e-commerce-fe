import Header from "@/components/layouts/header/header";
import AuthProvider from "@/providers/auth.provider";
import CartProvider from "@/providers/cart.providers";

type Props = {
  children: React.ReactNode;
};

export default function MainLayout({ children }: Props) {
  return (
    <div>
      <AuthProvider>
        <Header />
        <CartProvider>{children}</CartProvider>
      </AuthProvider>
    </div>
  );
}
