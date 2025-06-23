import React from "react";
import { motion } from "framer-motion";
import bg from "../../assets/launch.jpg";

const ComingSoon = () => {
    return (
        <div className="comic-neue-regular launchBg relative flex h-screen w-full items-center justify-center overflow-hidden bg-black text-white">
            <div className="animate-rise absolute bottom-0 left-1/2 h-[80%] w-[200%] -translate-x-1/2 transform rounded-full bg-gradient-to-t from-white/20 via-white/10 to-transparent blur-3xl" />

            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(white,transparent_2%)] bg-[length:3px_3px] opacity-10" />

            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 2 }}
                className="z-10 text-center"
            >
                <p className="mb-2 text-2xl tracking-widest text-gray-200">Expolarity.ai</p>
                <h1 className="mb-4 text-4xl font-bold md:text-6xl">Big Things Are Coming!</h1>
                <p className="mb-6 text-xl text-gray-300">We’re getting ready for something amazing.</p>
                {/* <button className="rounded-full bg-white px-6 py-3 font-semibold text-black transition hover:bg-gray-200">Notify Me</button> */}
            </motion.div>
        </div>
    );
};

export default ComingSoon;
