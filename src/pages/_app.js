import { Theme } from "@radix-ui/themes";
import DashboardLayout from "@/components/layout/DashboardLayout/DashboardLayout";
import { AuthProvider } from "@/context/AuthContext";
import "@/styles/globals.css";
import { Toaster } from "sonner";

export default function App({ Component, pageProps }) {
  const appLayout =
    Component.getLayout ??
    ((page) => <DashboardLayout>{page}</DashboardLayout>);

  return (
    <Theme>
      <Toaster richColors position="top-right" />
      <AuthProvider>{appLayout(<Component {...pageProps} />)}</AuthProvider>
    </Theme>
  );
}
