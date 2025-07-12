import React, {MouseEventHandler} from 'react';
import {WrappedExtension} from "@/components/util";
import defaultIcon from "@/app/extensions/default_icon.png"
import Image from "next/image";
import Link from "next/link";

const ExtensionCard: React.FC<{
    extension: WrappedExtension,
    onClick?: MouseEventHandler<HTMLDivElement> | undefined,
}> = ({
          extension,
          onClick = undefined
      }) => {
    const maxDescLength = 200

    const [group, artifact, version] = extension.pointer.descriptor.split(":")

    let description = extension.metadata.description
    if (description && description.length > maxDescLength) {
        description = description.substring(0, maxDescLength - 3) + "..."
    }

    return (
        <Link href={`/extensions/${group.replaceAll(".", "/")}/${artifact}/${version}`}>
            <div onClick={onClick}
                 className="flex items-center p-4 hover:bg-zinc-700 bg-zinc-800 rounded-lg shadow-md w-full md:max-w-lg mx-auto my-4 transition-all">

                <div className="flex justify-between items-center mb-1">
                    <Image height={100} src={extension.metadata.icon ?? defaultIcon}
                           alt={`${extension.metadata.name} icon`}
                           className="mr-4 rounded-lg object-cover bg-zinc-700 border-2 border-zinc-600" style={{
                               imageRendering: "pixelated"
                    }}/>
                    <div>
                        <div className={"flex items-center align-middle"}>
                            <h2 className="text-xl font-semibold text-white">{extension.metadata.name}</h2>
                            {
                                extension.metadata.developers.length > 0 ?
                                    <p className="text-sm text-gray-400 mb-2 mt-3 ml-5">By {extension.metadata.developers.join(", ")}</p> :
                                    <p></p>
                            }
                        </div>
                        <div className={"flex gap-2"}>
                            <div className="inline-block text-sm text-gray-400 rounded-md bg-zinc-700 border-2 border-zinc-600 p-0.5 mb-2">v{version}</div>
                            <div className={"flex justify-between items-center text-gray-400 p-0.5 mb-2"}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                     strokeWidth={2.5} stroke="currentColor" className="size-4 mr-1">
                                    <path strokeLinecap="round" strokeLinejoin="round"
                                          d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3"/>
                                </svg>
                                {extension.downloads.toString()}
                            </div>

                        </div>


                        <p className="text-gray-300 text-sm mb-3 line-clamp-3">{description}</p>
                    </div>
                </div>
            </div>
        </Link>
    );
};

export const ExtensionCardSkeleton: React.FC = () => {
    return (
        <div
            className="flex items-center p-4 bg-zinc-800 rounded-lg shadow-md w-full md:max-w-lg mx-auto my-4 animate-pulse"
        >
            <div className="flex justify-between items-center mb-1 w-full">
                <div
                    className="mr-4 rounded-lg object-cover bg-zinc-700 border-2 border-zinc-600 h-[100px] w-[100px]"></div>
                <div className="flex-grow">
                    <div className={"flex items-center align-middle"}>
                        <div className="h-6 bg-zinc-700 rounded w-3/4 mb-2"></div>
                        <div className="h-4 bg-zinc-700 rounded w-1/4 ml-5 mb-2 mt-3"></div>
                    </div>
                    <div
                        className="inline-block h-5 bg-zinc-700 rounded-md border-2 border-zinc-600 p-0.5 mb-2 w-1/4"></div>
                    <div className="h-4 bg-zinc-700 rounded mb-2 w-full"></div>
                    <div className="h-4 bg-zinc-700 rounded mb-2 w-5/6"></div>
                    <div className="h-4 bg-zinc-700 rounded w-3/4"></div>
                </div>
            </div>
        </div>
    );
};

export default ExtensionCard;