import Image from "next/image"; 
import {  LogoFacebook, LogoGithub, LogoLinkedin } from "@gravity-ui/icons";
import { BookOpen, X } from "lucide-react";
import Link from "next/link";

const Footer = () => {
    return (
        <footer className="relative w-full text-white">


            <div className="absolute inset-0 z-0">
                <Image
                    alt="footer Image"
                    src="/footer.png"
                    fill
                    sizes="(max-width: 768px) 100vw, 25vw"
                    className="object-cover"
                    style={{ filter: "hue-rotate(260deg) saturate(1.4) brightness(0.45)" }}
                />

                <div className="absolute inset-0 bg-purple-900/70" />
            </div>


            <div className="relative z-10 max-w-6xl mx-auto px-6 py-12">

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">


                    <div className="flex flex-col gap-3">
                        <h1 className="flex items-center gap-2 text-3xl font-extrabold tracking-wide text-purple-200">
                            StudyNook  <BookOpen></BookOpen>
                        </h1>
                        <h2 className="text-lg font-semibold text-purple-100">
                            Book Borrowing Platform
                        </h2>
                        <p className="text-sm text-purple-300 leading-relaxed">
                            Your digital platform for booking and managing study rooms.
                        </p>

                        {/* Social Icons */}
                        <div className="flex gap-4 mt-4">
                            <Link
                                href="/"
                                aria-label="Facebook"
                                className="p-2 rounded-full bg-purple-700/60 hover:bg-purple-500 transition-colors duration-200"
                            >
                                <LogoFacebook size={18} />
                            </Link>
                            <Link
                                href="https://github.com/tawsifulMostafa/assignment-no-009"
                                aria-label="Github"
                                className="p-2 rounded-full bg-purple-700/60 hover:bg-purple-500 transition-colors duration-200"
                            >
                                <LogoGithub size={18} />
                            </Link>
                            <Link
                                href="/"
                                aria-label="LinkedIn"
                                className="p-2 rounded-full bg-purple-700/60 hover:bg-purple-500 transition-colors duration-200"
                            >
                                <LogoLinkedin size={18} />
                            </Link>
                            <Link
                                href="https://x.com/notfakeanas"
                                aria-label="Twitter"
                                className="p-2 rounded-full bg-purple-700/60 hover:bg-purple-500 transition-colors duration-200"
                            >
                                <X></X>
                            </Link>
                        </div>
                    </div>

                    {/* Categories Column */}
                    <div className="flex flex-col gap-3">
                        <h3 className="text-base font-bold uppercase tracking-widest text-purple-300 border-b border-purple-500/40 pb-2">
                            RiverSide
                        </h3>
                        {["Story", "Tech", "Science"].map((cat) => (
                            <a
                                key={cat}
                                href="#"
                                className="text-sm text-purple-200 hover:text-white hover:translate-x-1 transition-all duration-200 w-fit"
                            >
                                {cat}
                            </a>
                        ))}
                    </div>

                    {/* Contact Column */}
                    <div className="flex flex-col gap-3">
                        <h3 className="text-base font-bold uppercase tracking-widest text-purple-300 border-b border-purple-500/40 pb-2">
                            Contact Us
                        </h3>
                        <p className="text-sm text-purple-200">anasmoniri787@studyNook.com</p>
                        <p className="text-sm text-purple-200">+8801993-600590</p>
                        <p>Dhaka , Bangladesh</p>
                    </div>
                </div>

                {/* Divider */}
                <div className="mt-10 border-t border-purple-500/30" />


                <div className="mt-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-purple-400">
                    <p>© 2026 StudyNook. All rights reserved.</p>
                    <p>Made with 📚 for readers World Wide</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;