import React, { useState } from "react";
import flyingHuman from "../../assets/Login/flyingHuman.svg";
import logo from "../../assets/Login/LoginLogo.svg";
import { Link, useNavigate } from "react-router-dom";
import { LuBook, LuUser, LuUserRound, LuGlobe } from "react-icons/lu";
import { FaEye, FaEyeSlash, FaLock } from "react-icons/fa";
import Select from "react-select";
import countryList from "react-select-country-list";
import { useForm, Controller } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { post } from "../../config/network";
import apiDetails from "../../config/apiDetails";
import { errorNotify, successNotify } from "../../service/Messagebar";

const Register = () => {
    const [countries] = useState(countryList().getData());
    const [passwordVisible, setPasswordVisible] = useState(false);
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
    } = useForm();

    const togglePasswordVisibility = () => {
        setPasswordVisible((prev) => !prev);
    };

    const customStyles = {
        control: (provided, state) => ({
            ...provided,
            backgroundColor: "#EAF0F7",
            borderColor: "#D1D5DB",
            borderRadius: "0.375rem",
            paddingLeft: "2rem",
            minHeight: "40px",
            fontSize: "0.875rem",
            boxShadow: state.isFocused ? "0 0 0 1px #38B76C" : provided.boxShadow,
            "&:hover": {
                borderColor: "#38B76C",
            },
        }),
        placeholder: (provided) => ({
            ...provided,
            color: "#9CA3AF",
        }),
    };

    const gradeOptions = [5, 6, 7, 8, 9, 10, 11, 12].map((num) => ({
        value: num,
        label: num.toString(),
    }));

    const registerUser = async (data) => {
        try {
            const res = await post(apiDetails.endPoint.register, data);
            if (res.status) {
                return res.data;
            }
            throw new Error(res.data.message || "Register failed");
        } catch (err) {
            throw new Error(err.message || "Register failed");
        }
    };

    const mutation = useMutation({
        mutationFn: registerUser,
        onSuccess: (data) => {
            successNotify(data.message || "Registered successfully. Please check your email to activate your account.");

            navigate("/login");
        },
        onError: (error) => {
            errorNotify(error.message);
            console.error("Error creating user:", error);
        },
    });

    const onSubmit = async (data) => {
        const formData = {
            ...data,
            grade: data.grade?.value || "",
            gender: data.gender?.value || "",
            country: data.country?.label || "",
        };
        mutation.mutate(formData);
    };

    return (
        <div className="patternBg flex min-h-[100dvh] items-center justify-center">
            <div className="loginBg m-4 flex h-full w-full max-w-4xl items-center justify-center overflow-hidden rounded-xl shadow-md">
                <div className="flex w-full flex-col gap-9 border p-5 sm:flex-row md:p-10 lg:p-16">
                    <div className="hidden w-[400px] flex-col justify-center md:flex">
                        <p className="font-inter text-left text-3xl tracking-wider text-white">
                            Sign In to <br /> Expolarity.ai
                        </p>
                        <div className="mb-4 flex justify-end py-5">
                            <img
                                src={flyingHuman}
                                alt="student"
                                className="w-40 sm:w-80"
                            />
                        </div>
                        <p className="font-gilory text-left text-white">
                            Already have an account
                            <br /> you can{" "}
                            <Link
                                to={"/login"}
                                className="cursor-pointer"
                            >
                                <span className="text-[#38B76C]">Login here!</span>
                            </Link>
                        </p>
                    </div>

                    <div className="w-full">
                        <div className="mb-7 flex justify-end md:-mt-6">
                            <img
                                src={logo}
                                alt="logo"
                                className="w-28"
                            />
                        </div>

                        <form
                            className="flex flex-col font-mallanna md:items-end"
                            onSubmit={handleSubmit(onSubmit)}
                        >
                            <div>
                                <div className="flex flex-col gap-4 sm:flex-row">
                                    <div className="w-full">
                                        <div className="relative">
                                            <input
                                                {...register("name", { required: "Name is required" })}
                                                type="text"
                                                className="w-full rounded-md border-gray-300 bg-[#EAF0F7] p-3 pl-10 text-sm outline-none"
                                                placeholder="Enter Name"
                                            />
                                            <span className="absolute left-3 top-[50%] -translate-y-1/2 transform text-gray-400">
                                                <LuUserRound />
                                            </span>
                                        </div>
                                        {errors.name && <p className="text-xs text-red-500">{errors.name.message}</p>}
                                    </div>

                                    <div className="w-full">
                                        <div className="relative">
                                            <Controller
                                                control={control}
                                                name="grade"
                                                rules={{ required: "Grade is required" }}
                                                render={({ field }) => (
                                                    <Select
                                                        {...field}
                                                        options={gradeOptions}
                                                        placeholder="Grade"
                                                        styles={customStyles}
                                                    />
                                                )}
                                            />

                                            <span className="absolute left-3 top-[50%] -translate-y-1/2 transform text-gray-400">
                                                <LuBook />
                                            </span>
                                        </div>
                                        {errors.grade && <p className="text-xs text-red-500">{errors.grade.message}</p>}
                                    </div>
                                </div>

                                <div className="flex flex-col gap-4 pt-3 sm:flex-row sm:pt-4">
                                    <div className="w-full">
                                        <div className="relative">
                                            <Controller
                                                control={control}
                                                name="gender"
                                                rules={{ required: "Gender is required" }}
                                                render={({ field }) => (
                                                    <Select
                                                        {...field}
                                                        options={[
                                                            { label: "Male", value: "Male" },
                                                            { label: "Female", value: "Female" },
                                                        ]}
                                                        placeholder="Gender"
                                                        styles={customStyles}
                                                    />
                                                )}
                                            />

                                            <span className="absolute left-3 top-[50%] -translate-y-1/2 transform text-gray-400">
                                                <LuUser />
                                            </span>
                                        </div>
                                        {errors.gender && <p className="text-xs text-red-500">{errors.gender.message}</p>}
                                    </div>

                                    <div className="w-full">
                                        <div className="relative">
                                            <Controller
                                                control={control}
                                                name="country"
                                                rules={{ required: "Country is required" }}
                                                render={({ field }) => (
                                                    <Select
                                                        {...field}
                                                        options={countries}
                                                        placeholder="Country"
                                                        styles={customStyles}
                                                    />
                                                )}
                                            />
                                            <span className="absolute left-3 top-[50%] -translate-y-1/2 transform text-gray-400">
                                                <LuGlobe />
                                            </span>
                                        </div>
                                        {errors.country && <p className="text-xs text-red-500">{errors.country.message}</p>}
                                    </div>
                                </div>

                                <div className="flex flex-col gap-4 pt-3 sm:flex-row sm:pt-4">
                                    <div className="relative w-full">
                                        <div className="relative">
                                            <input
                                                {...register("email", {
                                                    required: "Email is required",
                                                    pattern: {
                                                        value: /^\S+@\S+$/i,
                                                        message: "Invalid email address",
                                                    },
                                                })}
                                                type="email"
                                                className="w-full rounded-md border border-gray-300 bg-[#EAF0F7] p-3 pl-10 text-sm outline-none"
                                                placeholder="Enter Email"
                                            />
                                            <span className="absolute left-3 top-[50%] -translate-y-1/2 transform text-gray-400">
                                                <LuUserRound />
                                            </span>
                                        </div>
                                        {errors.email && <p className="text-xs text-red-500">{errors.email.message}</p>}
                                    </div>

                                    <div className="relative w-full">
                                        <div className="relative">
                                            <input
                                                {...register("password", {
                                                    required: "Password is required",
                                                    minLength: {
                                                        value: 6,
                                                        message: "Password must be at least 6 characters",
                                                    },
                                                })}
                                                type={passwordVisible ? "text" : "password"}
                                                className="w-full rounded-md border border-gray-300 bg-[#EAF0F7] p-3 pl-10 pr-10 text-sm outline-none"
                                                placeholder="••••••••"
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
                                        {errors.password && <p className="text-xs text-red-500">{errors.password.message}</p>}
                                    </div>
                                </div>

                                <div className="font-gilory flex items-center py-5">
                                    <div className="flex-grow border-t border-[#DFDFDF]"></div>
                                    <span className="mx-4 flex-shrink text-xs text-white">Click to Register</span>
                                    <div className="flex-grow border-t border-[#DFDFDF]"></div>
                                </div>

                                <button
                                    type="submit"
                                    disabled={mutation.isPending}
                                    className="gilory-medium w-full cursor-pointer rounded-[8px] bg-[#38B76C] p-2 text-center text-white"
                                >
                                    {mutation.isPending ? "Loading..." : "Sign Up"}
                                </button>

                                <p className="font-gilory flex cursor-pointer items-center justify-center gap-1 pt-2 text-xs text-[#C7C7C7]">
                                    Already have an Account click here to{" "}
                                    <Link
                                        to={"/login"}
                                        className="cursor-pointer text-[#38B76C] underline"
                                    >
                                        Login
                                    </Link>
                                </p>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;
