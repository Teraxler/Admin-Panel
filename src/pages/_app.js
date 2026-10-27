import { Theme } from "@radix-ui/themes";
import DashboardLayout from "@/components/layout/DashboardLayout/DashboardLayout";
import { AuthProvider } from "@/context/AuthContext";
import "@/styles/globals.css";
import { Toaster } from "sonner";
import { StorageProvider } from "@/context/StorageContext";
import { Analytics } from "@vercel/analytics/next";

export default function App({ Component, pageProps }) {
  const appLayout =
    Component.getLayout ??
    ((page) => <DashboardLayout>{page}</DashboardLayout>);

  return (
    <>
      <Theme>
        <Toaster richColors position="top-right" />
        <StorageProvider>
          <AuthProvider>{appLayout(<Component {...pageProps} />)}</AuthProvider>
        </StorageProvider>
      </Theme>

      <Analytics />
    </>
  );
}
