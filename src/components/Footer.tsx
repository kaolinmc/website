import React from "react";
import {DISCORD_INVITE} from "@/components/util";

const Footer = () => (
    <footer className="bg-gray-900 py-8">
        <div className="container mx-auto px-6 text-center text-gray-500">
            <p>&copy; 2025 Kaolin Project. Not affiliated with Mojang or Microsoft.</p>
            <div className="flex justify-center space-x-6 mt-4">
                <a href="https://github.com/kaolinmc" className="hover:text-white">GitHub</a>
                <a href={DISCORD_INVITE} className="hover:text-white">Discord</a>
            </div>
        </div>
    </footer>
);

export default Footer