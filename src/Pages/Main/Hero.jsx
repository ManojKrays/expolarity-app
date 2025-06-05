import React from "react";
import hero from "../../assets/HeroChildren.svg";
import { CircleArrowRight, CircleCheck } from "lucide-react";

const Hero = () => {
    const NavigateToApp = () => {
        window.location.href = "https://zurtle-school-app.onrender.com/login";
    };

    return (
        <div className="px-[5%] pt-[80px] font-mallanna">
            <div className="flex flex-col-reverse items-center justify-center lg:flex-row">
                <div className="flex flex-col gap-3 md:w-[500px]">
                    <h2 className="text-[45px] font-bold leading-[1.2]">
                        Find Your Perfect <br /> <span className="text-green-500">Career Match</span> Today
                    </h2>
                    <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aliquid, quaerat. Dolore, adipisci provident</p>
                    <ul className="space-y-2">
                        {["Personality Assessment", "Intrest Assessment", "Skill Assessment", "Apptitude Evaluvation"].map((item) => (
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
                    <button
                        onClick={() => NavigateToApp()}
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
                <div className="">
                    <img
                        src={hero}
                        alt="children"
                        className="w-full md:w-[500px]"
                    />
                </div>
            </div>
            <div className="flex flex-col items-center justify-center gap-5 pb-5 pt-5 md:flex-row md:gap-10">
                <div className="text-center text-green-800">
                    <p className="text-xl font-semibold">1576</p>
                    <p className="font-semibold">Test taken today</p>
                </div>

                <div className="hidden h-[25px] border-r-[2.5px] border-green-200 md:block" />

                <div className="text-center text-green-800">
                    <p className="text-xl font-semibold">300k</p>
                    <p className="font-semibold">Total taken today</p>
                </div>

                <div className="hidden h-[25px] border-r-[2.5px] border-green-200 md:block" />

                <div className="text-center text-green-800">
                    <p className="text-xl font-semibold">50k</p>
                    <p className="font-semibold">Test taken in your country</p>
                </div>

                <div className="hidden h-[25px] border-r-[2.5px] border-green-200 md:block" />

                <div className="text-center text-green-800">
                    <p className="text-xl font-semibold">4.7/5</p>
                    <p className="font-semibold">Average rating for accuracy</p>
                </div>
            </div>
        </div>
    );
};

export default Hero;
