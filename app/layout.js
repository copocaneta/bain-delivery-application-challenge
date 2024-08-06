"use client";

import { QueryClient, QueryClientProvider } from "react-query";
import Link from "next/link";
import "./globals.css";

const queryClient = new QueryClient();

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body>
                <QueryClientProvider client={queryClient}>
                    <nav>
                        <Link href="/">Home</Link> |{" "}
                        <Link href="/saved-results">Saved Results</Link>
                    </nav>
                    {children}
                </QueryClientProvider>
            </body>
        </html>
    );
}
