// redux
import { Providers } from "../app/redux/providers";

// import { dbConnect } from "@/lib/mongo";
// import CartMobile from "./components/CartMobile";
// import CartMobileIcon from "./components/CartMobileIcon";
// import CartDesktop from "./components/CartDesktop";
// import Nav from "./components/Nav";
// import Footer from "./components/Footer";

//provider
import CartProvider from "./context/CartContext";
// css
import "./globals.css";
import {
  Bangers,
  Quicksand,
  Roboto_Condensed,
  // JetBrains_Mono,
} from "next/font/google";

// const JetBrainsMono = JetBrains_Mono({
//   subsets: ["latin"],
//   weight: ["100", "200", "300", "400", "500", "600", "700", "800"],
//   variable: "--font-jetbrainsMono",
// });

const quicksand = Quicksand({
  subsets: ["latin"],
  variable: "--font-quicksand",
});

const bangers = Bangers({
  subsets: ["latin"],
  variable: "--font-bangers",
  weight: ["400"],
});

const robotoCondensed = Roboto_Condensed({
  subsets: ["latin"],
  variable: "--font-robotoCondensed",
  weight: ["300", "400", "700"],
});

export default async function RootLayout({ children }) {
  // await dbConnect();

  return (
    <Providers>
      <CartProvider>
        <html lang="en">
          <body
            className={`${quicksand.variable} ${bangers.variable} ${robotoCondensed.variable} font-quicksand`}
          >
            {/* <Nav />
            <CartMobileIcon />
            <CartMobile /> */}
            {children}
            {/* <CartDesktop />
            <Footer /> */}
          </body>
        </html>
      </CartProvider>
    </Providers>
  );
}
