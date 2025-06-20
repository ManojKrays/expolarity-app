import React from "react";
import mobile from "../../assets/mobile.svg";
import { CircleArrowRight } from "lucide-react";
import useAuthStore from "../../store/authStore";

const Banner = ({ setIsOpen }) => {
    const NavigateToApp = () => {
        window.open("https://expolarity-app.onrender.com/login", "_blank");
    };

    const user = useAuthStore((state) => state?.user?.id);

    return (
        <div className="bg-green-500 px-[10%] font-mallanna">
            <div className="flex flex-col items-center justify-center md:flex-row">
                <div className="py-8 text-center text-white">
                    <h2 className="text-[30px] font-semibold">Want to learn more about assessment?</h2>
                    <p className="text-xl">Call us straight away we are glad to help you</p>
                    <p className="font-semibold">+91 9876543210</p>

                    <div className="flex items-center justify-center">
                        <button
                            type="button"
                            className="mt-5 flex w-[145px] cursor-pointer items-center justify-center gap-3 rounded-full border border-green-500 bg-white px-2 py-2 font-semibold text-green-500 duration-300 hover:bg-green-600 hover:text-white"
                            onClick={() => {
                                user ? setIsOpen(true) : NavigateToApp();
                            }}
                        >
                            Take the test
                            <CircleArrowRight
                                className="fill-white text-green-500"
                                size={25}
                            />
                        </button>
                    </div>
                </div>
                <div className="mx-auto w-full md:w-[350px]">
                    <img
                        src={mobile}
                        alt="mobile-enqury"
                        className="h-[250px] object-contain"
                    />
                </div>
            </div>
        </div>
    );
};

export default Banner;
