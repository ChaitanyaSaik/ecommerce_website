import { Inter } from "next/font/google"
import "./globals.css"
import "../styles/scrollbar-hide.css"
import { CartProvider } from "@/hooks/use-cart"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "ShopNCS - Premium Shopping Experience",
  description: "Shop the latest products from top brands at ShopNCS",
    generator: 'v0.dev'
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <CartProvider>{children}</CartProvider>
      </body>
    </html>
  )
}



import './globals.css'