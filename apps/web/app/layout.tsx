import { Providers } from "src/components/Providers/Providers";
import { Kanit } from 'next/font/google'
import "../styles/settings.css";
export const metadata = {
  title: "FlashCards - Learn faster than you can",
  description: "Generated by Next.js",
};

const kanit = Kanit({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-kanit',
  weight: ["300","400","500","600","700","800"]
})

export default function RootLayout({ children }: { readonly children: React.ReactNode }) {
  return (
    <html lang="en" className={kanit.className}>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
