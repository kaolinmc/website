import React, {ReactNode} from 'react';
import logo from "./logo.png"
import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import {DISCORD_INVITE} from "@/components/util";
import Link from "next/link";

const Hero = () => (
    <main className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
        <div className="container mx-auto text-center px-6 z-10">
            <Image src={logo} alt="Kaolin Logo" className="h-32 w-32 mx-auto mb-6"/>
            <h1 className="font-pixel text-4xl md:text-6xl lg:text-7xl mb-4">KAOLIN</h1>
            <p className="text-xl md:text-2xl text-amber-200 mb-8 max-w-3xl mx-auto">
                Minecraft Modding. Reenvisioned.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
                <a href="#get-started"
                   className="w-full sm:w-auto btn-pixel bg-amber-500 text-gray-900 font-pixel text-lg px-8 py-4 rounded-lg hover:bg-amber-400">
                    Get Started
                </a>
                <a href={DISCORD_INVITE}
                   className="w-full sm:w-auto btn-pixel bg-gray-700 text-white font-pixel text-lg px-8 py-4 rounded-lg hover:bg-gray-600">
                    Join Discord
                </a>
            </div>
        </div>
    </main>
);

const FeatureCard: React.FC<{ icon: ReactNode, title: string, children: string }> = ({icon, title, children}) => (
    <div className="bg-gray-900 p-6 rounded-lg border-2 border-gray-700 text-center">
        <div className="text-4xl mb-4 flex items-center justify-center" >{icon}</div>
        <h3 className="font-pixel text-xl mb-2 text-amber-400">{title}</h3>
        <p className="text-gray-400">{children}</p>
    </div>
);

const Features = () => (
    <section id="features" className="py-20 bg-gray-800/50">
        <div className="container mx-auto px-6">
            <h2 className="font-pixel text-3xl md:text-4xl text-center mb-12">Why Kaolin?</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                <FeatureCard icon={
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-8">
                        <path d="M11.25 5.337c0-.355-.186-.676-.401-.959a1.647 1.647 0 0 1-.349-1.003c0-1.036 1.007-1.875 2.25-1.875S15 2.34 15 3.375c0 .369-.128.713-.349 1.003-.215.283-.401.604-.401.959 0 .332.278.598.61.578 1.91-.114 3.79-.342 5.632-.676a.75.75 0 0 1 .878.645 49.17 49.17 0 0 1 .376 5.452.657.657 0 0 1-.66.664c-.354 0-.675-.186-.958-.401a1.647 1.647 0 0 0-1.003-.349c-1.035 0-1.875 1.007-1.875 2.25s.84 2.25 1.875 2.25c.369 0 .713-.128 1.003-.349.283-.215.604-.401.959-.401.31 0 .557.262.534.571a48.774 48.774 0 0 1-.595 4.845.75.75 0 0 1-.61.61c-1.82.317-3.673.533-5.555.642a.58.58 0 0 1-.611-.581c0-.355.186-.676.401-.959.221-.29.349-.634.349-1.003 0-1.035-1.007-1.875-2.25-1.875s-2.25.84-2.25 1.875c0 .369.128.713.349 1.003.215.283.401.604.401.959a.641.641 0 0 1-.658.643 49.118 49.118 0 0 1-4.708-.36.75.75 0 0 1-.645-.878c.293-1.614.504-3.257.629-4.924A.53.53 0 0 0 5.337 15c-.355 0-.676.186-.959.401-.29.221-.634.349-1.003.349-1.036 0-1.875-1.007-1.875-2.25s.84-2.25 1.875-2.25c.369 0 .713.128 1.003.349.283.215.604.401.959.401a.656.656 0 0 0 .659-.663 47.703 47.703 0 0 0-.31-4.82.75.75 0 0 1 .83-.832c1.343.155 2.703.254 4.077.294a.64.64 0 0 0 .657-.642Z" />
                    </svg>
                } title="Full Dependency management">
                    Kaolin handles downloading of other extensions + Java libraries for you at runtime.
                </FeatureCard>
                <FeatureCard icon={
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-8">
                        <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM6.262 6.072a8.25 8.25 0 1 0 10.562-.766 4.5 4.5 0 0 1-1.318 1.357L14.25 7.5l.165.33a.809.809 0 0 1-1.086 1.085l-.604-.302a1.125 1.125 0 0 0-1.298.21l-.132.131c-.439.44-.439 1.152 0 1.591l.296.296c.256.257.622.374.98.314l1.17-.195c.323-.054.654.036.905.245l1.33 1.108c.32.267.46.694.358 1.1a8.7 8.7 0 0 1-2.288 4.04l-.723.724a1.125 1.125 0 0 1-1.298.21l-.153-.076a1.125 1.125 0 0 1-.622-1.006v-1.089c0-.298-.119-.585-.33-.796l-1.347-1.347a1.125 1.125 0 0 1-.21-1.298L9.75 12l-1.64-1.64a6 6 0 0 1-1.676-3.257l-.172-1.03Z" clipRule="evenodd" />
                    </svg>
                } title="Reloadable">
                    Kaolin extensions are always fully hot-swappable during development and production time to enable rapid iteration.
                </FeatureCard>
                <FeatureCard icon={
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-8">
                        <path fillRule="evenodd" d="M12 6.75a5.25 5.25 0 0 1 6.775-5.025.75.75 0 0 1 .313 1.248l-3.32 3.319c.063.475.276.934.641 1.299.365.365.824.578 1.3.64l3.318-3.319a.75.75 0 0 1 1.248.313 5.25 5.25 0 0 1-5.472 6.756c-1.018-.086-1.87.1-2.309.634L7.344 21.3A3.298 3.298 0 1 1 2.7 16.657l8.684-7.151c.533-.44.72-1.291.634-2.309A5.342 5.342 0 0 1 12 6.75ZM4.117 19.125a.75.75 0 0 1 .75-.75h.008a.75.75 0 0 1 .75.75v.008a.75.75 0 0 1-.75.75h-.008a.75.75 0 0 1-.75-.75v-.008Z" clipRule="evenodd" />
                        <path d="m10.076 8.64-2.201-2.2V4.874a.75.75 0 0 0-.364-.643l-3.75-2.25a.75.75 0 0 0-.916.113l-.75.75a.75.75 0 0 0-.113.916l2.25 3.75a.75.75 0 0 0 .643.364h1.564l2.062 2.062 1.575-1.297Z" />
                        <path fillRule="evenodd" d="m12.556 17.329 4.183 4.182a3.375 3.375 0 0 0 4.773-4.773l-3.306-3.305a6.803 6.803 0 0 1-1.53.043c-.394-.034-.682-.006-.867.042a.589.589 0 0 0-.167.063l-3.086 3.748Zm3.414-1.36a.75.75 0 0 1 1.06 0l1.875 1.876a.75.75 0 1 1-1.06 1.06L15.97 17.03a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
                    </svg>
                } title="Partitioning API">
                    Kaolin&#39;s Partition API simplifies support for various Minecraft versions, sides, and environments.
                </FeatureCard>
                <FeatureCard icon={
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-8">
                        <path fillRule="evenodd" d="M14.615 1.595a.75.75 0 0 1 .359.852L12.982 9.75h7.268a.75.75 0 0 1 .548 1.262l-10.5 11.25a.75.75 0 0 1-1.272-.71l1.992-7.302H3.75a.75.75 0 0 1-.548-1.262l10.5-11.25a.75.75 0 0 1 .913-.143Z" clipRule="evenodd" />
                    </svg>
                } title="Blazingly Fast">
                    Lightweight, asynchronous, and modular: Kaolin is the most robust modloader ever built.
                </FeatureCard>
            </div>
        </div>
    </section>
);

const GetStartedStep: React.FC<{ number: string; title: string; children: ReactNode }> = ({
                                                                                              number,
                                                                                              title,
                                                                                              children
                                                                                          }) => (
    <div className="flex flex-col items-center">
        <div
            className="bg-amber-500 text-gray-900 w-16 h-16 rounded-full flex items-center justify-center font-pixel text-2xl border-4 border-black mb-4">{number}</div>
        <h3 className="font-pixel text-xl mb-2">{title}</h3>
        <p className="text-gray-400">{children}</p>
    </div>
);

const GetStarted = () => (
    <section id="get-started" className="py-20">
        <div className="container mx-auto px-6">
            <h2 className="font-pixel text-3xl md:text-4xl text-center mb-12">Get Started in 3 Steps</h2>
            <div className="max-w-3xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                <GetStartedStep number="1" title="Install">
                    <Link className={"underline"} href={"/docs"}>Install</Link> Kaolin Kiln in your Gradle project
                </GetStartedStep>
                <GetStartedStep number="2" title="Setup">
                    <Link className={"underline"} href={"/docs/setup"}>Configure</Link> your project and setup your first launch configuration
                </GetStartedStep>
                <GetStartedStep number="3" title="Develop!">
                   Get started developing with the most thought-out mod loader ever built.
                </GetStartedStep>
            </div>
        </div>
    </section>
);

export default function Page() {
    return (
        <div>
            <Header/>
            <Hero/>
            <Features/>
            <GetStarted/>
            <Footer></Footer>
        </div>
    );
}
