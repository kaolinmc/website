'use client';

import React, {useEffect, useState} from 'react';
import Link from 'next/link';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Head from "next/head";
import MarkdownRenderer from "@/components/MarkdownRenderer";
import {redirect} from "next/navigation";

export default function Page(
    {
        params,
    }: {
        params: Promise<{ slug: string }>
    }) {
    const {slug} = React.use(params)

    const [docContent, setDocContent] = useState<string>("Documentation not found... Redirecting");
    const [docData, setDocData] = useState<{ title: string; order?: number }>({title: ''});
    const [allDocsData, setAllDocsData] = useState<Array<{ slug: string; title: string; order?: number, ignore: boolean }>>([]);
    const [asideOpen, setAsideOpen] = useState(false)

    useEffect(() => {
        if (slug) {
            const fetchDocData = async () => {
                try {
                    const response = await fetch(`/api/docs?slug=${slug}`);
                    if (!response.ok) {
                        throw new Error(`Error fetching doc: ${response.statusText}`);
                    }
                    const data = await response.json();
                    setDocContent(data.content);
                    setDocData(data.data);
                    setAllDocsData(data.allDocs);
                } catch (error) {
                    redirect('/docs/getting-started');
                    console.error("Failed to fetch document:", error);
                    // Handle error, e.g., redirect to a 404 page or show an error message
                }
            };
            fetchDocData();
        }
    }, [slug]);

    if (!slug) {
        return (
            <div
                className="min-h-screen bg-gray-900 text-gray-100 flex flex-col items-center justify-center">
                Loading documentation...
            </div>
        );
    }

    const sortedDocs = [...allDocsData]
        .sort((a, b) => (a.order || Infinity) - (b.order || Infinity))
        .filter((doc) => !doc.ignore);

    return (
        <>
            <Head>
                <title>{docData.title} - Docs</title>
                <meta name="description" content={docData.title}/>
            </Head>

            <Header/>

            <div className="min-h-screen text-gray-100 flex flex-col pt-20">
                <div className="flex-grow flex max-w-7xl mx-auto w-full py-8">
                    {/* Mobile aside overlay */}
                    {asideOpen && (
                        <div
                            className="absolute inset-0 z-50 md:hidden"
                            onClick={() => setAsideOpen(false)}
                        ></div>
                    )}

                    {/*Aside navigation*/}
                    <aside
                        className={`bg-gray-800 md:bg-transparent md:dark:bg-transparent fixed inset-y-0 left-0 w-64 z-50 transform ${
                            asideOpen ? 'translate-x-0' : '-translate-x-full'
                        } md:relative md:translate-x-0 md:w-64 flex-shrink-0 pr-8 border-r border-gray-700 overflow-y-auto transition-transform duration-300 ease-in-out`}
                    >
                        <div className="p-4">
                            <nav className="space-y-2">
                                <h3 className="text-lg font-semibold mb-4 text-gray-300 ml-2">Documentation</h3>
                                {sortedDocs.map((doc) => (
                                    <Link
                                        key={doc.slug}
                                        href={`/docs/${doc.slug}`}
                                        className={`block py-2 px-3 rounded-md transition-colors duration-200 ${
                                            slug === doc.slug
                                                ? 'bg-indigo-900 text-indigo-300 font-medium'
                                                : 'text-gray-400 hover:bg-gray-800'
                                        }`}
                                        onClick={() => setAsideOpen(false)}
                                    >
                                        {doc.title}
                                    </Link>
                                ))}
                            </nav>
                        </div>
                    </aside>

                    <article className="flex-grow pl-8 prose dark:prose-invert max-w-none">
                        <div className="flex items-center space-x-4">
                            {/* Mobile menu button */}
                            <div className="md:hidden">
                                <button
                                    onClick={() => setAsideOpen(!asideOpen)}
                                    className=" text-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                         strokeWidth={1.5} stroke="currentColor" className="size-6 h-6 w-6"
                                         aria-hidden="true">
                                        <path strokeLinecap="round" strokeLinejoin="round"
                                              d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"/>
                                    </svg>
                                </button>
                            </div>
                            <h1 className="text-4xl font-extrabold text-gray-100 mb-5">{docData.title}</h1>
                        </div>
                        <MarkdownRenderer markdown={docContent}/>
                    </article>
                </div>

            </div>
            <Footer></Footer>

        </>
    );
};


// API Route to handle data fetching (e.g., in pages/api/docs.ts or app/api/docs/route.ts)
// For app router, you'd create a route.ts file inside app/api/docs/[slug]/route.ts

// Example of app/api/docs/route.ts (or app/api/docs/[slug]/route.ts for specific slug)
/*

*/