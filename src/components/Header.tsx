"use client"

import Image from "next/image";
import logo from "@/app/logo.png";
import React from "react";
import Link from "next/link";
import {useState} from "react";
import github_logo from "./github-mark.svg"

const Header: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <header className="absolute top-0 left-0 right-0 p-6">
            <div className="container mx-auto flex justify-between items-center">
                <Link href={"/"} className="flex items-center space-x-3">
                    <Image src={logo} alt="Kaolin Logo" className="h-10 w-10"/>
                    <h1 className="font-pixel text-2xl">Kaolin</h1>
                    <span
                        className="invisible bg-amber-500 text-gray-900 px-2 py-1 rounded-full font-bold ml-2 md:visible">
                        Developer Beta
                    </span>
                </Link>
                <nav style={{
                    zIndex: 25
                }}
                     className={`md:flex items-center space-x-8 ${isOpen ? 'block' : 'hidden'} absolute md:relative top-full left-0 w-full md:w-auto bg-gray-800 md:bg-transparent p-4 md:p-0 flex-col md:flex-row`}>

                    <Link href="/extensions" className="hover:text-amber-300 transition-colors block py-2 md:py-0">Extensions</Link>
                    <Link href="/docs" className="hover:text-amber-300 transition-colors block py-2 md:py-0">Docs</Link>
                    <Link href={"https://github.com/kaolinmc"}>{
                        <Image className={"size-6 "} src={github_logo} alt={"Github"} />
                    }</Link>
                    <Link href="/download"
                          className="bg-amber-500 text-gray-900 px-4 py-2 rounded-md font-bold hover:bg-amber-400 transition-colors block mt-2 md:mt-0">Download</Link>
                </nav>
                <button className="md:hidden font-pixel text-2xl z-50 cursor-pointer"
                        onClick={() => setIsOpen(!isOpen)}>
                    {isOpen ? (
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                             strokeWidth={1.5} stroke="currentColor" className="h-6 w-6 size-6"
                             aria-hidden="true">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12"/>
                        </svg>
                    ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                             strokeWidth={1.5} stroke="currentColor" className="size-6 h-6 w-6"
                             aria-hidden="true">
                            <path strokeLinecap="round" strokeLinejoin="round"
                                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"/>
                        </svg>

                    )}
                </button>
            </div>
        </header>
    );
};

export default Header