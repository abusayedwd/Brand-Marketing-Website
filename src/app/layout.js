 
// "use client";
// import { Geist, Geist_Mono } from "next/font/google";
// import "./globals.css";
// import Navbar from "@/components/pages/Navbar";
// import Footer from "@/components/pages/Footer";
// import { ConfigProvider } from "antd";
// import Providers from "@/redux/Providers";
// import { usePathname } from 'next/navigation';  // Import usePathname

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

// export default function RootLayout({ children }) {
//   const pathname = usePathname();  // Get the current pathname

//   // Check if the current route is "/dashboard"
//   const isDashboard = pathname === "/dashboard";

//   return (
//     <html lang="en">
//       <head>
//         {/* Direct Metadata */}
//         <title>Influencer Marketing</title>
//         <meta name="description" content="Influencer and Brand Marketing" />
//         <link rel="icon" href="/images/logo.png" sizes="32x32" type="image/png" /> {/* Favicon */}
//       </head>
//       <body className={`${geistSans.variable} ${geistMono.variable} antialiased `}>
//         <Providers>
    
//            {!isDashboard && <Navbar />}
//           {children}
//         { !isDashboard && <Footer /> }
          
//         </Providers>
//       </body>
//     </html>
//   );
// }


import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ConfigProvider } from "antd";
import Providers from "@/redux/Providers";
import Navbar from "@/components/pages/Navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Influencer Marketing",
  description: "Influencer and Brand Marketing",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* Metadata */}
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
        <link rel="icon" href="/images/logo.png" sizes="32x32" type="image/png" />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Providers> 
          {children}
        </Providers>
      </body>
    </html>
  );
}