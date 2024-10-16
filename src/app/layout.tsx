import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import { WorkSpactContextProvider } from "@/contexts/workspace-context";
import "./globals.css";
import UserContextProvider from "@/contexts/user-context";
import { MessageProvider } from "@/contexts/message-context";
import { Toaster } from "@/components/ui/toaster";

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
    <html lang="en">
      <body className={poppins.className}>
        <UserContextProvider>
          <WorkSpactContextProvider>
            <MessageProvider>{children}</MessageProvider>
          </WorkSpactContextProvider>
        </UserContextProvider>
        <Toaster />
      </body>
    </html>
  );
}
