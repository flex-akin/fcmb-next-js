"use client";


import Navbar from "@components/Navbar";
import "@styles/globals.css";
import { Inter } from "next/font/google";
import localFont from 'next/font/local'
import { loadUser } from "@redux/actions/authActions";
import { useEffect } from "react";
import store from "@redux/store";

const inter = Inter({ subsets: ["latin"] });
// const gotham = localFont({
//   src: [
//     {
//       path: './fonts/gotham/GothamMediumItalic.ttf',
//       weight: '400',
//       style: 'normal',
//     },
//     {
//       path: './Roboto-Italic.woff2',
//       weight: '400',
//       style: 'italic',
//     },
//     {
//       path: './Roboto-Bold.woff2',
//       weight: '700',
//       style: 'normal',
//     },
//     {
//       path: './Roboto-BoldItalic.woff2',
//       weight: '700',
//       style: 'italic',
//     },
//   ],
// })

export default function RootLayout({ children }) {

  useEffect(() => {
    store.dispatch(loadUser());
  }, []);
  return (

    <section className={inter.className + " min-h-screen bg-neutral-100 "}>
      <Navbar />
      <section className="flex flex-col mt-12 max-w-7xl mx-auto space-y-10 justify-center">
        {children}
      </section>
    </section>

  );
}
