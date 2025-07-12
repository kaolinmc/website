"use client"

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import React, {useCallback, useEffect, useState} from "react";
import ExtensionCard, {ExtensionCardSkeleton} from "@/components/ExtensionCard";
import {queryServer, WrappedExtension} from "@/components/util";
import {ExtensionNotFound} from "@/components/ExtensionNotFound";


export default function Page() {
    return (
        <div>
            <Header/>
            <ExtensionSearch/>
            <Footer></Footer>
        </div>
    );
}

// Dummy components for now, replace with actual implementations
// const SkeletonExtensionCard = () => <div
//     className="p-4 bg-gray-800 text-white rounded-lg shadow-md animate-pulse">Loading...</div>;

const ExtensionSearch: React.FC = () => {
    const [extensionContent, setExtensionContent] = useState<React.ReactNode>(null)
    const [extensions, setExtensions] = useState<WrappedExtension[]>([])
    const [searchTarget, setSearchTarget] = useState("");
    const [repositories, setRepositories] = useState<string[]>([
        "https://repo.kaolinmc.com"
    ])
    const [page, setPage] = useState(0);
    const [pagination] = useState(10);
    const [modalOpen, setModalOpen] = useState(false);
    const [repositoryInputTarget, setRepositoryInputTarget] = useState("");
    const [queryingServer, setQueryingServer] = useState(true)

    const doQuery = useCallback(() => {
        setQueryingServer(true)
        Promise.all(repositories.map(async (repo) => {
            return await queryServer(repo, searchTarget, page, pagination)
        })).then((res) => {
            setQueryingServer(false)
            const flatMap = res.flatMap((it) => it)
            setExtensions(flatMap)
        })
            .catch(() => {
                setQueryingServer(false)
                console.log("Error occurred")
                // TODO alerts
            })
    }, [searchTarget])

    useEffect(() => {
        doQuery()
    }, [doQuery])

    useEffect(() => {
        if (queryingServer) {
            setExtensionContent(
                <>
                    {[...Array(3).keys()].map((it) => <ExtensionCardSkeleton key={it}/>)}
                </>
            )
        } else if (extensions.length == 0) {
            setExtensionContent(<ExtensionNotFound/>)
        } else {
            setExtensionContent(<>
                {extensions.map((extension: WrappedExtension, index) => {
                    return <ExtensionCard
                        extension={extension}
                        key={index}
                    />
                })}
            </>)
        }
    }, [extensions, queryingServer])

    return <div className={"pt-20 ml-3 mr-3 align-middle"}>
        <form onSubmit={async (it) => {
            it.preventDefault()
            doQuery()
        }}>
            <div className="flex items-center justify-center">
                <input
                    id="search-input"
                    type="text"
                    placeholder={"Search Extensions"}
                    className="shadow appearance-none border rounded w-md py-2 px-3 leading-tight focus:outline-none focus:shadow-outline bg-zinc-700 border-zinc-600"
                    onChange={(it) => {
                        setSearchTarget(it.target.value)
                    }} value={searchTarget}/>
                <button type="button"
                        className="ml-2 bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        onClick={() => {
                            setModalOpen(true)
                        }}>
                    Repositories
                </button>
            </div>
        </form>
        {modalOpen && (
            <div className="fixed inset-0 backdrop-blur-xs flex items-center justify-center z-50">
                <div className="bg-gray-800 p-6 rounded-lg shadow-xl w-full max-w-md">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-xl font-bold text-white">Configure Repositories</h3>
                        <button onClick={() => setModalOpen(false)}
                                className="text-gray-400 hover:text-gray-200 text-2xl">&times;</button>
                    </div>
                    <ul className="mb-4 max-h-60 overflow-y-auto">
                        {
                            repositories.map((it, i) => {
                                return <li key={i}
                                           className="flex justify-between items-center bg-gray-700 p-3 rounded-md mb-2 text-white">
                                    {it}
                                    <button
                                        className="bg-red-600 hover:bg-red-700 text-white font-bold py-1 px-3 rounded text-sm"
                                        onClick={() => {
                                            setRepositories((prev) =>
                                                prev.filter((r) => r != it)
                                            )
                                        }}>Remove
                                    </button>
                                </li>
                            })
                        }
                    </ul>
                    <div className="flex items-center mb-3">
                        <input
                            type="text"
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-700 text-white border-gray-600"
                            value={repositoryInputTarget}
                            placeholder="Add new repository URL"
                            onChange={(it) => {
                                setRepositoryInputTarget(it.target.value)
                            }}/>
                        <button
                            className="ml-2 bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            onClick={() => {
                                if (repositoryInputTarget == "") return

                                setRepositories([
                                    ...repositories,
                                    repositoryInputTarget
                                ])
                                setRepositoryInputTarget("")
                            }}>
                            Add
                        </button>
                    </div>
                </div>
            </div>
        )}
        {
            extensionContent
        }
        <div className="flex justify-center my-4">
            <button
                className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                onClick={() => {
                    if (page > 0) {
                        setPage(page - 1);
                        doQuery();
                    }
                }}
            >
                Previous
            </button>
            <span className={"font-bold my-2 mx-4"}>
                Page {page + 1}
            </span>
            <button
                className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                onClick={() => {
                    setPage(page + 1);
                    doQuery();
                }}>Next
            </button>
        </div>
    </div>
}