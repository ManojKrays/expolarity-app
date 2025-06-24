import React from "react";
import logoImg from "../../assets/logo.png";

function Footer({ scrollToSection }) {
    return (
        <div className="flex flex-col font-mallanna">
            <div className="bg-[#EDFCF5] py-5">
                <div className="flex items-center justify-center gap-2">
                    <img
                        src={logoImg}
                        alt="Logo"
                        className="h-8 w-8"
                    />
                    <div className="flex flex-col">
                        <h1 className="text-2xl text-green-600">Expolarity.Ai</h1>
                        <p className="-mt-1 text-[9px] text-green-500">EMPOWERING CAREER GROWTH</p>
                    </div>
                </div>

                <ul className="flex flex-wrap items-center justify-center gap-5 pt-3 text-[16px]">
                    {["Home", "Why Us", "Testimonials", "Blogs"].map((item) => (
                        <li
                            key={item}
                            className="cursor-pointer duration-200 hover:text-green-500"
                            onClick={() => scrollToSection(item)}
                        >
                            {item}
                        </li>
                    ))}
                </ul>
            </div>
            <footer className="bg-green-600 py-1.5 text-center text-sm text-white">&copy;All Right Reserved Expolarity.AI</footer>
        </div>
    );
}

export default Footer;
