import { Poppins } from "next/font/google";
import "../styles/index.scss";
import "@mantine/core/styles.css";
import { AppWrapper } from "@/context";
import Navbar from "@/components/Navbar";
import { createTheme, MantineProvider } from "@mantine/core";

// const theme = createTheme({});

const poppins = Poppins({
  weight: ["400", "500", "700"],
  subsets: ["latin"],
  variable: "--font-poppins",
});

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <>
      <html lang="en">
        <body className={poppins.className} suppressHydrationWarning={true}>
          <MantineProvider>
            <AppWrapper>
              <Navbar />
              <div className="wrapper-all">{children}</div>
            </AppWrapper>
          </MantineProvider>
        </body>
      </html>
    </>
  );
}
