import Head from "next/head";
import { Inter } from "next/font/google";
import { useEffect, useRef } from "react";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <div>
      <Head>
        <title>ShopReacter.com - Wrap Yourself in Cozy</title>
        <meta name="description" content="ShopReacter.com - Wrap Yourself In Cozy" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="bg-white">
        <img src="/home.jpg" alt="" />
      </div>
    </div>
  );
}
