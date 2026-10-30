import type { Metadata } from "next";
import { bodyFont } from "@/utils/fonts";
import "./globals.css";
import Link from "next/link";

export const metadata: Metadata = {
  title: {
    template: "%s | The Creative Works of Hasan Abir",
    default: "The Creative Works of Hasan Abir",
  },
  description:
    "This website is a showcase of the Art pieces created by Hasan Abir.",
};

interface Link {
  url: string;
  name: string;
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const links: Link[] = [
    { url: "/", name: "Home" },
    { url: "/work", name: "Work" },
    { url: "/about", name: "About" },
    { url: "/contact", name: "Contact" },
  ];

  return (
    <html lang="en">
      <body className={bodyFont.className}>
        <nav className="p-16">
          <ul>
            {links.map((link) => {
              return (
                <li key={link.url}>
                  <Link href={link.url}>{link.name}</Link>
                </li>
              );
            })}
          </ul>
        </nav>
        <main>{children}</main>
      </body>
    </html>
  );
}
