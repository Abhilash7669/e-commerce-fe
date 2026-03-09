import Header from "@/components/layouts/header/header";
import AuthProvider from "@/providers/auth-cart.provider";

type Props = {
  children: React.ReactNode;
};

export default function MainLayout({ children }: Props) {
  return (
    <div>
      <AuthProvider>
        <Header />
        {children}
      </AuthProvider>
    </div>
  );
}
