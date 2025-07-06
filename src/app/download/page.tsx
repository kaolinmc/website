import Image from "next/image";
import logo from "@/app/logo.png"
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import {DISCORD_INVITE} from "@/components/util";


const DownloadPage = () => {
    return (
        <>
            <Header links={[]}></Header>
            <div className="min-h-screen flex items-center justify-center text-white pt-20 pb-20">
                <div className="container mx-auto px-6 text-center">
                    <h1 className="mt-10 font-pixel text-4xl md:text-6xl lg:text-7xl mb-12">
                        Downloads
                    </h1>

                    <div className="max-w-3xl mx-auto bg-gray-900 p-8 rounded-lg border-2 border-gray-700 shadow-lg">
                        <div className="w-full flex justify-center mb-6">
                            <Image src={logo} alt="Kaolin Logo" className="h-24 w-24"/>
                        </div>
                        <h2 className="font-pixel text-2xl md:text-3xl text-amber-400 mb-4">
                            Kaolin is in Beta!
                        </h2>
                        <p className="text-lg text-gray-300 mb-8">
                            We&apos;re currently hard at work polishing Kaolin for its first public release.
                            During this phase, builds are only available to developers through our Gradle Plugin.
                        </p>
                        <p className="text-md text-gray-400 mb-8">
                            Want to get the latest updates, participate in future tests, or just hang out with the
                            community? Join our official Discord server!
                        </p>
                        <a
                            href={DISCORD_INVITE} // Replace with your actual Discord invite link
                            className="inline-block btn-pixel bg-gray-700 text-white font-pixel text-lg px-8 py-4 rounded-lg hover:bg-gray-600"
                        >
                            Join the Community
                        </a>
                    </div>
                </div>
            </div>
            <Footer></Footer>
        </>
    );
};

export default DownloadPage;