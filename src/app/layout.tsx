import "./globals.css";
import React from "react";
import {Press_Start_2P} from 'next/font/google';

const pressStart2P = Press_Start_2P({
    subsets: ['latin'],
    weight: '400', // 'Press Start 2P' only has a 400 weight
    display: 'swap',
    variable: '--font-press-start-2p', // Optional: for use with CSS variables
});

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" className={pressStart2P.className}>
        <head>
            <title>Kaolin</title>
            <link rel="icon" type="image/x-icon" href="/favicon.ico"/>
        </head>
        <body>
        <div className="text-white bg-pattern">
            {children}
        </div>
        </body>
        </html>
    );
}
