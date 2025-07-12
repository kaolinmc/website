"use client"

import React, {useState} from 'react';
import ReactMarkdown from 'react-markdown';
import {Prism as SyntaxHighlighter} from 'react-syntax-highlighter';
import {darcula} from 'react-syntax-highlighter/dist/cjs/styles/prism';
import Link from "next/link";

interface CodeSnippedProps extends React.HTMLAttributes<HTMLDivElement> {
    codeText: string
}

export const CodeSnippetBlock: React.FC<CodeSnippedProps> = ({codeText, children, ...props}) => {
    const [hover, setHover] = useState(false)
    const [clicked, setClicked] = useState(false)

    return <div onMouseEnter={() => {
        setHover(true)
    }} onMouseLeave={() => {
        setHover(false)
    }} {...props}>
        <button
            className={`float-right ${hover ? 'opacity-100' : 'opacity-0'} dark:bg-stone-800 p-2 rounded-md border-1 border-stone-400 cursor-pointer hover:p-1.75 hover:m-0.25 duration-200`}
            onClick={async () => {
                await navigator.clipboard.writeText(codeText)
                setClicked(true)
                if (!clicked) setInterval(() => {
                    setClicked(false)
                }, 5000)
            }}
        >
            {clicked ?
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                     stroke="currentColor" className="size-6 stroke-stone-400">
                    <path strokeLinecap="round" strokeLinejoin="round"
                          d="M11.35 3.836c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m8.9-4.414c.376.023.75.05 1.124.08 1.131.094 1.976 1.057 1.976 2.192V16.5A2.25 2.25 0 0 1 18 18.75h-2.25m-7.5-10.5H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V18.75m-7.5-10.5h6.375c.621 0 1.125.504 1.125 1.125v9.375m-8.25-3 1.5 1.5 3-3.75"/>
                </svg> : <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                              stroke="currentColor" className="size-6 stroke-stone-400">
                    <path strokeLinecap="round" strokeLinejoin="round"
                          d="M15.666 3.888A2.25 2.25 0 0 0 13.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 0 1-.75.75H9a.75.75 0 0 1-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 0 1-2.25 2.25H6.75A2.25 2.25 0 0 1 4.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 0 1 1.927-.184"/>
                </svg>
            }
        </button>
        <div>
            {children}
        </div>
    </div>
}

interface MarkdownRendererProps {
    markdown: string;
}

const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({markdown}) => {
    return (
        <div className={"markdown-container"}>
            <ReactMarkdown
                components={{
                    hr({}) {
                        return <div className={"border-t border-gray-200 dark:border-gray-700"}></div>
                    },
                    a({children, href}) {
                        if (href) {
                            return <Link className={"underline"} href={href}>{children}</Link>
                        }
                        return <p>{children}</p>
                    },
                    code({className, children, ...props}) {
                        const match = /language-(\w+)/.exec(className || '');
                        console.log(match)
                        return match ? (
                            <SyntaxHighlighter
                                showLineNumbers={true}
                                // @ts-expect-error it actually works trust
                                style={darcula}
                                language={match[1]}
                                PreTag={CodeSnippetBlock}
                                codeText={children}
                                {...props}
                            >
                                {String(children).replace(/\n$/, '')}
                            </SyntaxHighlighter>
                            // <CodeSnippetBlock language={match[0]}>
                            //     {String(children).replace(/\n$/, '')}
                            // </CodeSnippetBlock>
                        ) : (
                            <code className={className} {...props}>
                                {children}
                            </code>
                        );
                    },
                }}
            >
                {markdown}
            </ReactMarkdown>
        </div>

    );
}

export default MarkdownRenderer;