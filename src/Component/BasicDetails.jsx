import React, { useState } from "react";
import Select from "react-select";
import countryList from "react-select-country-list";
import { post } from "../config/network";
import apiDetails from "../config/apiDetails";
import { useMutation } from "@tanstack/react-query";
import { errorNotify, successNotify } from "../service/Messagebar";
import { Controller, useForm } from "react-hook-form";

const BasicDetails = () => {
    const countries = countryList().getData();

    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
    } = useForm();

    const saveBasicDetails = async (basic) => {
        try {
            const reqData = {
                ...basic,
                country: basic.country.label,
                onboarded: true,
            };

            const res = await post(`${apiDetails.endPoint.saveBasics}/25`, reqData);
            return res;
        } catch (err) {
            console.log(err);
            throw err;
        }
    };

    const mutation = useMutation({
        mutationFn: saveBasicDetails,
        onSuccess: () => successNotify(res.message || "Details Saved Successfully!"),
        onError: (err) => errorNotify(err.message),
    });

    const onSubmit = async (data) => {
        mutation.mutate(data);
    };

    return (
        <div className="font-gilory w-[350px] rounded-xl bg-[#1D4A28] p-5 md:w-[400px]">
            <p className="gilory-medium text-center text-[18px] text-white">
                One more steps to complete <br /> your profile ! 🚀
            </p>
            <div className="flex w-full justify-center">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="relative w-[300px] md:w-[300px]">
                        <label
                            htmlFor="grade"
                            className="block py-2 text-left text-sm text-white"
                        >
                            Grade*
                        </label>

                        <select
                            id="grade"
                            className="w-full rounded-md border border-gray-300 bg-[#EAF0F7] p-3 text-sm outline-none"
                            {...register("grade", { required: "Grade is required" })}
                        >
                            <option value="">Select a Grade</option>
                            {[5, 6, 7, 8, 9, 10, 11, 12].map((g) => (
                                <option
                                    key={g}
                                    value={g}
                                >
                                    {g}
                                </option>
                            ))}
                        </select>
                        {errors.grade && <p className="mt-1 text-right text-xs text-red-500">required*</p>}
                    </div>

                    <div className="relative w-full md:w-[300px]">
                        <label
                            htmlFor="gender"
                            className="block py-2 text-left text-sm text-white"
                        >
                            Gender*
                        </label>
                        <select
                            id="gender"
                            className="w-full rounded-md border border-gray-300 bg-[#EAF0F7] p-3 text-sm outline-none"
                            {...register("gender", { required: "Gender is required" })}
                        >
                            <option value="">Select Gender</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                        </select>
                        {errors.gender && <p className="mt-1 text-right text-xs text-red-500">required*</p>}
                    </div>

                    <div className="relative w-full md:w-[300px]">
                        <label
                            htmlFor="country"
                            className="block py-2 text-left text-sm text-white"
                        >
                            Country*
                        </label>
                        <Controller
                            name="country"
                            control={control}
                            rules={{ required: "Country is required" }}
                            render={({ field }) => (
                                <Select
                                    {...field}
                                    options={countries}
                                    placeholder="Select your country"
                                    className="text-black"
                                />
                            )}
                        />
                        {errors.country && <p className="mt-1 text-right text-xs text-red-500">required*</p>}
                    </div>

                    <div className="font-gilory flex items-center py-5">
                        <div className="flex-grow border-t border-[#DFDFDF]"></div>
                        <span className="mx-4 flex-shrink text-xs text-white">Your Profile </span>
                        <div className="flex-grow border-t border-[#DFDFDF]"></div>
                    </div>

                    <button
                        type="submit"
                        disabled={mutation.isPending}
                        className="gilory-medium w-full cursor-pointer rounded-[8px] bg-[#38B76C] p-2 text-center text-white md:w-[300px]"
                    >
                        {mutation.isPending ? "loading..." : "Save"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default BasicDetails;
