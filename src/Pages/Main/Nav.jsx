import React, { useState } from "react";
import logoImg from "../../assets/logo.png";
import { CircleArrowRight, Menu, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../../store/authStore";
import profile from "../../assets/UserProfile.png";
import { div } from "framer-motion/client";

const Nav = () => {
    const navigate = useNavigate();
    const [menuOpen, setMenuOpen] = useState(false);
    const [profileOpen, setProfileOpen] = useState(false);

    const NavigateToApp = () => {
        // window.location.href = "https://zurtle-school-app.onrender.com/";
        navigate("/login");
    };

    const authorized = useAuthStore((state) => state.authorized);
    const logout = useAuthStore((state) => state.logout);

    const handleLogout = () => {
        logout();
        localStorage.clear();
        navigate("/login");
    };

    return (
        <div className="fixed z-50 w-full">
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

                    <div className="flex items-center gap-3 md:hidden">
                        {authorized ? (
                            <div className="relative">
                                <button
                                    className="flex cursor-pointer items-center gap-3 rounded-full"
                                    onClick={() => setProfileOpen(!profileOpen)}
                                >
                                    <img
                                        src={profile}
                                        alt="Profile"
                                        className="h-8 w-8 rounded-full object-cover"
                                    />
                                </button>

                                {profileOpen && (
                                    <div className="absolute right-0.5 top-10 h-[50px] w-[100px] rounded-md bg-white p-2 shadow-sm">
                                        <button
                                            onClick={() => handleLogout()}
                                            type="button"
                                            className="flex items-center gap-1 border border-green-500 px-3 py-1 text-green-600 duration-300 hover:bg-green-500 hover:text-white"
                                        >
                                            Logout
                                        </button>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <button
                                onClick={() => NavigateToApp()}
                                className="flex items-center gap-1 rounded-full border border-green-500 px-3 py-1 text-green-600 duration-300 hover:bg-green-500 hover:text-white"
                            >
                                Login
                                <CircleArrowRight
                                    className="fill-green-500 text-white"
                                    size={20}
                                />
                            </button>
                        )}

                        <button onClick={() => setMenuOpen(!menuOpen)}>
                            {menuOpen ? (
                                <X
                                    size={28}
                                    className="text-green-500"
                                />
                            ) : (
                                <Menu
                                    className="text-green-600"
                                    size={28}
                                />
                            )}
                        </button>
                    </div>

                    <ul className="hidden gap-5 text-[16px] md:flex">
                        {["Career", "Assessment", "Test", "Blogs", "Testimonials"].map((item) => (
                            <li
                                key={item}
                                className="cursor-pointer duration-200 hover:text-green-500"
                            >
                                {item}
                            </li>
                        ))}
                    </ul>

                    <div className="hidden cursor-pointer md:flex">
                        {authorized ? (
                            <div className="relative">
                                <button className="flex cursor-pointer items-center gap-3 rounded-full">
                                    <img
                                        onClick={() => setProfileOpen(!profileOpen)}
                                        src={profile}
                                        alt="Profile"
                                        className="h-8 w-8 rounded-full object-cover"
                                    />
                                </button>

                                {profileOpen && (
                                    <div className="absolute right-0.5 top-10 h-[50px] w-[100px] rounded-md bg-white p-2 shadow-sm">
                                        <button
                                            onClick={() => handleLogout()}
                                            type="button"
                                            className="flex items-center gap-1 border border-green-500 px-3 py-1 text-green-600 duration-300 hover:bg-green-500 hover:text-white"
                                        >
                                            Logout
                                        </button>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <button
                                onClick={() => NavigateToApp()}
                                type="button"
                                className="flex items-center gap-3 rounded-full border border-green-500 px-4 py-1 text-green-500 duration-300 hover:bg-green-500 hover:text-white"
                            >
                                Login
                                <CircleArrowRight
                                    className="fill-green-500 text-white"
                                    size={28}
                                />
                            </button>
                        )}
                    </div>
                </div>

                <div className={`overflow-hidden transition-all duration-300 md:hidden ${menuOpen ? "max-h-[500px]" : "max-h-0"}`}>
                    <ul className="flex flex-col items-center gap-4 py-4">
                        {["Career", "Assessment", "Test", "Blogs", "Testimonials"].map((item) => (
                            <li
                                key={item}
                                className="cursor-pointer text-[16px] duration-200 hover:text-green-500"
                            >
                                {item}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Nav;
