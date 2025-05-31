import { Inter } from "next/font/google";
import "./globals.css";
import { Suspense } from "react";
import { Providers } from "./Providers";
import DefaultLayout from "./components/DefaultLayout";
import {
  ClerkProvider,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
const inter = Inter({ subsets: ["latin"] });

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head></head>
      <body className={inter.className}>
        <main className="text-base relative h-screen max-h-screen bg-background/95 text-foreground">
          <ClerkProvider>
            <SignedIn>
              <div className="absolute top-4 right-4">
                <UserButton />
              </div>
              <Suspense>
                <Providers>
                  <DefaultLayout>{children}</DefaultLayout>
                </Providers>
              </Suspense>
            </SignedIn>
            <SignedOut>
              <div className="absolute top-4 bg-blue-500 border-2 right-4">
                <SignInButton mode="modal">Sign In</SignInButton>
              </div>
            </SignedOut>
          </ClerkProvider>
        </main>
      </body>
    </html>
  );
}
