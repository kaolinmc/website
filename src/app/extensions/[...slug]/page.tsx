'use client'
import React, {use, useEffect, useState} from 'react'
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import {ExtensionMetadata, ExtensionPointer, WrappedExtension} from "@/components/util";
import Image from "next/image";
import defaultIcon from "@/app/extensions/default_icon.png";
import MarkdownRenderer, {CodeSnippetBlock} from "@/components/MarkdownRenderer";
import {Prism as SyntaxHighlighter} from "react-syntax-highlighter";
import {darcula} from "react-syntax-highlighter/dist/cjs/styles/prism";
import {ExtensionNotFound} from "@/components/ExtensionNotFound";


const ContentSkeleton: React.FC = () => {
    return (
        <div className="container mx-auto p-4 md:p-8">
            <div className="bg-zinc-800 rounded-lg shadow-lg p-6 md:p-8 animate-pulse">
                {/* Header Section Skeleton */}
                <div className="flex flex-col md:flex-row items-center md:items-start mb-6 md:mb-8">
                    <div
                        className="w-[150px] h-[150px] bg-zinc-700 rounded-lg mr-0 md:mr-6 mb-4 md:mb-0 flex-shrink-0"></div>
                    <div className="text-center md:text-left flex-grow">
                        <div className="h-8 bg-zinc-700 rounded w-3/4 mb-2 mx-auto md:mx-0"></div>
                        <div className="h-6 bg-zinc-700 rounded w-1/2 mb-2 mx-auto md:mx-0"></div>
                        <div className="h-6 bg-zinc-700 rounded w-1/4 p-1 px-2 mx-auto md:mx-0"></div>
                    </div>
                </div>

                {/* Description Section Skeleton */}
                <div className="mb-6 md:mb-8">
                    <div className="h-7 bg-zinc-700 rounded w-1/3 mb-3"></div>
                    <div className="h-5 bg-zinc-700 rounded w-full mb-2"></div>
                    <div className="h-5 bg-zinc-700 rounded w-5/6"></div>
                </div>

                {/* Details Section Skeleton */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                    <div>
                        <div className="h-7 bg-zinc-700 rounded w-1/4 mb-3"></div>
                        <div className="h-5 bg-zinc-700 rounded w-2/3 mb-2"></div>
                        <div className="h-5 bg-zinc-700 rounded w-2/3 mb-2"></div>
                        <div className="h-5 bg-zinc-700 rounded w-2/3 mb-2"></div>
                    </div>
                    {/* Add more details skeletons if needed */}
                </div>
            </div>
        </div>
    );
};

const Content: React.FC<{
    extension: WrappedExtension,
}> = ({
          extension
      }) => {
    const [group, artifact, version] = extension.pointer.descriptor.split(":")

    let tomlCode = `[parents]\n${artifact} = {group = "${group}", version = "${version}"}`;
    return (
        <div className="container mx-auto p-4 md:p-8">
            <div className="bg-zinc-800 rounded-lg shadow-lg p-6 md:p-8">
                {/* Header Section */}
                <div className="flex flex-col md:flex-row items-center md:items-start mb-6 md:mb-8">
                    <Image
                        height={150}
                        width={150}
                        src={extension.metadata.icon ?? defaultIcon}
                        alt={`${extension.metadata.name} icon`}
                        className="mr-0 md:mr-6 mb-4 md:mb-0 rounded-lg object-cover bg-zinc-700 border-2 border-zinc-600 flex-shrink-0"
                    />
                    <div className="text-center md:text-left flex-grow">
                        <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
                            {extension.metadata.name}
                        </h1>
                        {extension.metadata.developers.length > 0 && (
                            <p className="text-md md:text-lg text-gray-400 mb-2">
                                By {extension.metadata.developers.join(", ")}
                            </p>
                        )}
                        <div
                            className="inline-block text-sm md:text-base text-gray-400 rounded-md bg-zinc-700 border-2 border-zinc-600 p-1 px-2 mb-4">
                            v{version}
                        </div>
                    </div>
                </div>

                {/* Description Section */}
                <div className="mb-6 md:mb-8">
                    <h2 className="text-xl md:text-2xl font-semibold text-white mb-3">Description</h2>
                    <p className="text-gray-300 text-base md:text-lg leading-relaxed">
                        {extension.metadata.description || "No description provided."}
                    </p>
                </div>

                {/* Details Section */}
                <div>
                    <div>
                        <h2 className="text-xl md:text-2xl font-semibold text-white mb-3">Details</h2>
                        <p>Extension.toml Config:</p>
                        <SyntaxHighlighter
                            showLineNumbers={true}
                            style={darcula}
                            language={"text"}
                            PreTag={CodeSnippetBlock}
                            codeText={tomlCode}
                        >
                            {tomlCode.replace(/\n$/, '')}
                        </SyntaxHighlighter>
                    </div>
                    {/* Add more details here if available in WrappedExtension */}
                </div>
            </div>
        </div>
    );
};


interface RetrievalError {
    error: string,
    notFound: boolean
}

export default function ExtensionPage({
                                          params,
                                      }: {
    params: Promise<{ slug: string[] }>
}) {
    const {slug} = use(params)

    const version = slug[slug.length - 1]
    const artifact = slug[slug.length - 2]
    const group = slug.slice(0, slug.length - 2)

    const [extension, setExtension] = useState<WrappedExtension | RetrievalError | null>(null)

    useEffect(() => {
        const metadataQuery = `https://repo.kaolinmc.com/registry/` +
            `${group.join("/")}/` +
            `${artifact}/` +
            `${version}/${artifact}-${version}-metadata.json`;

        const doFetch = async () => {
            let query = await fetch(metadataQuery);
            let json = await query.json();

            if (!query.ok) return {
                error: query.statusText,
                notFound: query.status == 404
            } as RetrievalError

            return json as ExtensionMetadata
        }

        doFetch().then((it) => {
            if ("error" in it) {
                setExtension(it)
            } else setExtension(
                {
                    metadata: it as ExtensionMetadata,
                    pointer: {
                        descriptor: group.join(".") + ":" + artifact + ":" + version,
                        repository: "https://repo.kaolinmc.com/registry",
                        repository_type: "REMOTE"
                    } as ExtensionPointer,
                    downloads: 0
                }
            )
        })
    }, [slug])

    const getContent = () => {
        if (extension == null) {
            return <ContentSkeleton/>
        } else if ("error" in extension) {
            if (extension.notFound) {
                return <ExtensionNotFound/>
            }
            return <div className="text-center text-red-500 text-xl mt-8">Error: {extension.error}</div>
        } else {
            return <Content extension={extension}/>
        }
    }

    return (
        <div>
            <Header/>

            <div className={"pt-20"}>
                {getContent()}
            </div>

            <Footer/>
        </div>
    )
}