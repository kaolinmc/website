import React from "react";

export const ExtensionNotFound: React.FC = () => {
    return (
        <div className="flex items-center justify-center min-h-[50vh] px-4 m-5 mb-20">
            <div className="text-center bg-zinc-800 rounded-lg shadow-lg p-8 md:p-12 max-w-md w-full">
                <svg
                    className="mx-auto h-24 w-24 text-red-500 mb-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    aria-hidden="true"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 9v3.75m-9.303 3.376c-.866 1.5.174 3.35 1.9 3.35h13.713c1.72 0 2.76-1.85 1.9-3.35L13.713 2.2c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
                    />
                </svg>
                <h2 className="text-3xl font-bold text-white mb-4">Extension Not Found</h2>
                <p className="text-gray-300 text-lg mb-6">
                    We couldn't find the extension you're looking for. It might have been moved or removed.
                </p>
                <a href="/extensions"
                   className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition duration-300">
                    Go to Homepage
                </a>
            </div>
        </div>
    );
}