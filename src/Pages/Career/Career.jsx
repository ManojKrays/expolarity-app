import React from "react";
import logoImg from "../../assets/logo.png";
import { CircleArrowRight, CircleCheck } from "lucide-react";

const Career = () => {
    return (
        <div className="fixed z-50 w-full font-mallanna">
            <div className="bg-green-600 py-1.5 text-center text-white">Clarity Today.Confidence Tomorrow</div>
            <div className="relative bg-[#FBFBFB] py-4 font-mallanna">
                <div className="flex items-center justify-between px-4 md:justify-around">
                    <div className="flex items-center gap-2">
                        <img
                            src={logoImg}
                            alt="Logo"
                            className="h-8 w-8"
                        />
                        <div className="flex flex-col">
                            <h1 className="text-2xl text-green-600">Expolarity.Ai</h1>
                            <p className="-mt-1 text-[9px] text-green-500">EMPOWERING CAREER GROWT</p>
                        </div>
                    </div>

                    <button className="flex items-center gap-1 rounded-full border border-green-500 px-3 py-1 text-green-600 duration-300 hover:bg-green-500 hover:text-white">
                        Login
                        <CircleArrowRight
                            className="fill-green-500 text-white"
                            size={20}
                        />
                    </button>
                </div>
            </div>

            <div className="mx-auto flex min-h-[80dvh] w-[48%] flex-col items-center justify-center text-center">
                <h2 className="text-[45px] font-bold leading-[1.2]">
                    Welcome to Your <br /> Career Assessment!
                </h2>
                <p>
                    This test is designed to help you discover your ideal career path based on your interests and your ideal work values. It takes
                    10-15 minutes to complete and provides the most accurate results when answered thoughtfully.{" "}
                </p>

                <ul className="flex flex-col items-center justify-center space-y-2 pt-4">
                    {["Personality Assessment", "Interest Inventory", "Skills Assessment"].map((item) => (
                        <li
                            key={item}
                            className="flex items-center gap-1"
                        >
                            <CircleCheck
                                size={20}
                                className="fill-green-500 text-white"
                            />
                            {item}
                        </li>
                    ))}
                </ul>

                <p className="pt-3">Ready to begin? Click "Start Test" below</p>

                <button
                    type="button"
                    className="mt-5 flex w-[145px] cursor-pointer items-center justify-center gap-3 rounded-full border border-green-500 bg-green-500 px-2 py-2 font-semibold text-white duration-300 hover:bg-white hover:text-green-500"
                >
                    Take the test
                    <CircleArrowRight
                        className="fill-white text-green-500"
                        size={25}
                    />
                </button>
            </div>
        </div>
    );
};

export default Career;
