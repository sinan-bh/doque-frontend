import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import { WorkSpaceContextProvider } from "@/contexts/workspace-context";
import "./globals.css";
import UserContextProvider from "@/contexts/user-context";
import { MessageProvider } from "@/contexts/message-context";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/components/dark-mode/theme-provider";
import { AdminProvider } from "@/contexts/admin-context";

export const metadata: Metadata = {
  title: "DOQUE",
  description: "Task management web application",
};

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={poppins.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <AdminProvider>
            <UserContextProvider>
              <WorkSpaceContextProvider>
                <MessageProvider>{children}</MessageProvider>
              </WorkSpaceContextProvider>
            </UserContextProvider>
            <Toaster />
          </AdminProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
