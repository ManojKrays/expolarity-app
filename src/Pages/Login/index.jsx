import React, { useState } from "react";
import apiDetails from "../../config/apiDetails";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash, FaLock } from "react-icons/fa";
import { LuUserRound } from "react-icons/lu";
import logo from "../../assets/Login/LoginLogo.svg";
import flyingHuman from "../../assets/Login/flyingHuman.svg";
import google from "../../assets/Login/google.svg";
import "./Login.css";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { post } from "../../config/network";
import { errorNotify, successNotify } from "../../service/Messagebar";
import useAuthStore from "../../store/authStore";

const Login = () => {
    const loginUser = useAuthStore((state) => state.setUser);
    const navigate = useNavigate();
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [verified, setVerified] = useState(null);
    const [verificationLoading, setVerificationLoading] = useState(false);

    const togglePasswordVisibility = () => {
        setPasswordVisible((prev) => !prev);
    };

    const {
        register,
        handleSubmit,
        formState: { errors },
        getValues,
    } = useForm();

    const googleLogin = async (e) => {
        window.location.href = `${apiDetails.baseUrl}${apiDetails.apis.googleLogin}`;
    };

    const sendVerification = async () => {
        setVerificationLoading(true);
        try {
            const email = getValues("emailId");

            if (!email) {
                errorNotify("Please enter your email first");
                return;
            }
            const data = {
                email,
            };

            const res = await post(apiDetails.endPoint.sendVerification, data);
            setVerificationLoading(false);
            if (res.status === 200) {
                successNotify("Verification link sent to your email please verify!");
                setVerified(true);
            }
        } catch (err) {
            console.log("error", err);
            setVerificationLoading(false);
        } finally {
            setVerificationLoading(false);
        }
    };

    const login = async (data) => {
        try {
            const res = await post(apiDetails.endPoint.login, data);
            if (res.status) {
                return res.data;
            }
            throw new Error(res.data.message || "Login failed");
        } catch (err) {
            throw new Error(err.message || "Login failed");
        }
    };

    const mutation = useMutation({
        mutationFn: login,
        onSuccess: (data) => {
            loginUser(data?.student);
            if (data?.student?.status != "Unverified") {
                successNotify("User Successfully Login!");
                setVerified(true);
                setTimeout(() => {
                    navigate("/Assessment");
                }, 1000);
            } else {
                setVerified(false);
                errorNotify("Please Verify Your Email");
            }
        },
        onError: (error) => {
            const message = error.message || "Login failed";
            errorNotify(message);
        },
    });

    const onSubmit = async (data) => {
        mutation.mutate(data);
    };

    return (
        <div className="patternBg flex min-h-screen items-center justify-center">
            <div className="loginBg flex w-[95%] max-w-4xl items-center justify-center rounded-xl p-2 shadow-md">
                <div className="flex w-full flex-col gap-9 p-5 sm:flex-row md:p-10 lg:p-12">
                    <div className="hidden w-[400px] flex-col justify-center md:flex">
                        <p className="font-inter text-left text-3xl tracking-wider text-white">
                            Sign In to <br /> Expolarity.ai
                        </p>
                        <div className="mb-4 flex justify-end">
                            <img
                                src={flyingHuman}
                                alt="student"
                                className="w-40 sm:w-72"
                            />
                        </div>
                        <p className="font-gilory text-left text-[13px] text-white">
                            If you don’t have an account
                            <br /> you can {""}
                            <Link
                                to={"/register"}
                                className="cursor-pointer"
                            >
                                <span className="text-[#38B76C]">Register here!</span>
                            </Link>
                        </p>
                    </div>

                    <div className="w-full md:w-[300px]">
                        <div className="mb-7 flex justify-end md:-mt-10">
                            <img
                                src={logo}
                                alt="logo"
                                className="w-28"
                            />
                        </div>

                        <form
                            className="flex flex-col font-mallanna md:w-[300px] md:items-end"
                            onSubmit={handleSubmit(onSubmit)}
                        >
                            <div className="relative w-full">
                                {errors.emailId && <p className="pb-0.5 text-xs text-red-500">{errors.emailId.message}*</p>}

                                <div className="relative">
                                    <input
                                        type="text"
                                        id="emailId"
                                        name="emailId"
                                        className="w-full rounded-md border border-gray-300 bg-[#EAF0F7] p-3 pl-10 text-sm outline-none"
                                        placeholder="Enter Email"
                                        {...register("emailId", {
                                            required: "Email is required",
                                            pattern: {
                                                value: /^\S+@\S+$/i,
                                                message: "Invalid email address",
                                            },
                                        })}
                                    />
                                    <span className="absolute left-3 top-[50%] -translate-y-1/2 transform text-gray-400">
                                        <LuUserRound />
                                    </span>
                                </div>
                            </div>

                            {verified === false && (
                                <div className="flex items-end justify-end">
                                    <button
                                        type="button"
                                        onClick={() => sendVerification()}
                                        className="mt-1.5 w-[110px] cursor-pointer rounded-md bg-blue-600 px-2 py-1.5 text-xs text-white"
                                    >
                                        {verificationLoading ? "Loading..." : "Send Verification"}
                                    </button>
                                </div>
                            )}

                            <div className="relative w-full pt-4">
                                {errors.password && <p className="pb-0.5 text-xs text-red-500">{errors.password.message}*</p>}

                                <div className="relative">
                                    <input
                                        type={passwordVisible ? "text" : "password"}
                                        id="password"
                                        name="password"
                                        className="w-full rounded-md border border-gray-300 bg-[#EAF0F7] p-2 pl-10 pr-10 text-sm outline-none"
                                        placeholder="••••••••"
                                        {...register("password", {
                                            required: "Password is required",
                                            minLength: {
                                                value: 6,
                                                message: "Password must be at least 6 characters",
                                            },
                                        })}
                                    />
                                    <span className="absolute left-3 top-[50%] -translate-y-1/2 transform text-gray-400">
                                        <FaLock />
                                    </span>
                                    <span
                                        className="absolute right-3 top-[50%] -translate-y-1/2 transform cursor-pointer text-gray-400"
                                        onClick={togglePasswordVisibility}
                                    >
                                        {passwordVisible ? <FaEyeSlash /> : <FaEye />}
                                    </span>
                                </div>
                            </div>
                            <p className="font-gilory cursor-pointer pt-2 text-xs text-[#C7C7C7]">Recover Password ?</p>

                            <div className="mt-9 w-full rounded-[8px] bg-[#38B76C] text-center">
                                <button
                                    type="submit"
                                    disabled={mutation.isPending}
                                    className="gilory-medium w-full cursor-pointer p-2 text-white"
                                >
                                    {mutation.isPending ? "Loading..." : "Sign In"}
                                </button>
                            </div>
                        </form>

                        <p className="font-gilory flex cursor-pointer items-center justify-center gap-1 pt-2 text-xs text-[#C7C7C7]">
                            If you don’t have an account, click
                            <Link
                                to={"/register"}
                                className="cursor-pointer text-[#38B76C] underline"
                            >
                                here!
                            </Link>
                        </p>

                        <div className="flex items-center pb-9 pt-5 font-mallanna">
                            <div className="flex-grow border-t border-[#DFDFDF]"></div>
                            <span className="mx-4 flex-shrink text-xs text-white">Or continue with</span>
                            <div className="flex-grow border-t border-[#DFDFDF]"></div>
                        </div>

                        <div
                            // onClick={() => googleLogin()}
                            className="flex cursor-pointer items-center justify-center gap-3 rounded-[8px] bg-white p-2 py-3 font-mallanna"
                        >
                            <img
                                src={google}
                                alt="google"
                                className="w-5 drop-shadow-2xl"
                            />
                            <p className="text-gray-500">Sign in with Google</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
