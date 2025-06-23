import React from "react";
import bg from "../../assets/bg3.jpg";

const ComingSoonPage = () => {
    return (
        <div className="inter launchBg relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-black font-sans">
            {/* <img
                src={bg}
                alt="Planet Light"
                className="absolute inset-0 h-full w-full object-cover opacity-70"
            /> */}
            <div className="z-10 px-4 text-center sm:px-6 md:px-8">
                <p className="mb-3 text-base tracking-widest text-gray-200 sm:text-lg md:text-xl">Expolarity.ai</p>

                <h1 className="inter text-4xl font-medium leading-tight text-white drop-shadow-lg sm:text-5xl md:text-6xl">
                    Good things come <br />
                    to those <span className="instrument-serif-regular-italic">who wait.</span>
                </h1>

                <p className="comic-neue-regular mx-auto mt-5 max-w-[300px] text-sm text-gray-300 sm:max-w-lg sm:text-base md:max-w-[450px] md:text-lg">
                    Expolarity.ai is not just another edtech—it's revolutionizing education with AI and blockchain at its core.
                </p>

                <form className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
                    <input
                        type="email"
                        placeholder="Your Email Address"
                        className="w-full rounded-md border border-gray-600 bg-black bg-opacity-50 px-4 py-3 text-white placeholder-gray-400 focus:border-white focus:outline-none sm:w-72 md:w-[250px]"
                    />
                    <button
                        type="submit"
                        className="w-[150px] rounded-md bg-white px-3 py-2 text-base font-semibold text-black transition hover:bg-gray-200 md:px-6 md:py-3"
                    >
                        Get Notified
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ComingSoonPage;
