import React, { useState, useEffect } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer, Cell } from "recharts";
import useAuthStore from "../store/authStore";
import { get } from "../config/network";
import apiDetails from "../config/apiDetails";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeft, Sparkles, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";

const ResultScreen = ({ setSelectedCareer, setCurrentScreen }) => {
    const resultId = useAuthStore((state) => state?.user?.id);
    const [riasecvalues, setRiasecValues] = useState([]);
    const [recommendation, setRecommandation] = useState(null);
    const [jobs, setJobs] = useState([]);

    const getResult = async () => {
        if (!resultId) throw new Error("Missing resultId");
        const res = await get(`${apiDetails.endPoint.result}/${resultId}`);

        return res.data;
    };

    const { isLoading, error, data } = useQuery({
        queryKey: ["result", resultId],
        queryFn: getResult,
        enabled: !!resultId,
    });

    useEffect(() => {
        if (data) {
            const scores = data?.scores?.[2]?.percent_scores;
            const barValues = [
                { type: "Realistic", label: "Realistic", value: scores.Realistic },
                { type: "Investigative ", label: "Investigative", value: scores.Investigative },
                { type: "Artistic ", label: "Artistic", value: scores.Artistic },
                { type: "Social ", label: "Social", value: scores.Social },
                { type: "Enterprising ", label: "Enterprising", value: scores.Enterprising },
                { type: "Conventional ", label: "Conventional", value: scores.Conventional },
            ];

            setRiasecValues(barValues);
            setRecommandation(data?.recommendations);

            const recommendationsArray = data?.recommendations?.[2]?.riasec?.recommendations.split(",").map((item) => item.trim());
            setJobs(recommendationsArray);
        }
    }, [data]);

    const colorMap = {
        R: "#4F46E5",
        I: "#10B981",
        A: "#F59E0B",
        S: "#EC4899",
        E: "#3B82F6",
        C: "#8B5CF6",
    };

    return (
        <>
            {isLoading ? (
                <div className="mt-5 px-6 pb-4 font-mallanna">
                    <div className="inline-flex items-center space-x-2 rounded-r-lg rounded-tl-lg bg-white px-4 py-2 text-xs text-gray-500 shadow">
                        <span>Typing</span>
                        <span className="flex items-center space-x-1">
                            <span className="block h-1 w-1 animate-bounce rounded-full bg-gray-400 [animation-delay:0ms]"></span>
                            <span className="block h-1 w-1 animate-bounce rounded-full bg-gray-400 [animation-delay:150ms]"></span>
                            <span className="block h-1 w-1 animate-bounce rounded-full bg-gray-400 [animation-delay:300ms]"></span>
                        </span>
                    </div>
                </div>
            ) : error ? (
                <div className="mb-2 rounded bg-red-100 p-2 text-sm text-red-700">⚠️ {error.message}</div>
            ) : (
                <div className="mx-auto min-h-[424px] w-full px-3 pt-2 font-mallanna">
                    <div>
                        <h1 className="text-foreground text-3xl font-bold"> Your Career Results</h1>
                        <p className="pb-10 text-[#12703C]">Below is you Career Result</p>
                    </div>

                    {/* Test Summary Card */}
                    <div className="border-border bg-card/80 mb-8 rounded-xl border-2 bg-white p-4 backdrop-blur-sm md:p-8">
                        {/* Header */}
                        <div className="mb-6 flex items-center gap-3">
                            <div className="to-primary-light flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-[#12703C]">
                                <Sparkles className="text-primary-foreground h-6 w-6 bg-white" />
                            </div>
                            <div>
                                <h2 className="text-foreground text-2xl font-bold">Assessment Complete</h2>
                                <p className="text-[#12703C]">All tests finished successfully</p>
                            </div>
                        </div>

                        {/* List Display Instead of Chart */}
                        <div className="space-y-6">
                            {riasecvalues?.map((item, index) => (
                                <div
                                    key={index}
                                    className="flex items-center justify-between gap-4"
                                >
                                    <div className="flex w-1/4 items-center gap-2">
                                        <CheckCircle className="hidden text-[#12703C] md:block md:h-5 md:w-5" />
                                        <span className="text-foreground font-semibold">{item.type}</span>
                                    </div>
                                    <div className="h-[6px] w-full rounded-full bg-primary">
                                        <div
                                            className="h-[6px] rounded-full bg-[#12703C]"
                                            style={{ width: `${item.value}%` }}
                                        ></div>
                                    </div>
                                    <span className="w-12 text-right font-semibold text-[#12703C]">{item.value}%</span>
                                </div>
                            ))}
                        </div>
                    </div>
                    {/* career path content */}
                    <div>
                        <div className="border- mb-3 mt-6 rounded-lg border bg-white p-4 text-sm shadow-sm">
                            <h3 className="mb-2 text-xl font-bold">Based On Your Personality Type</h3>
                            <div className="mb-3 leading-relaxed text-gray-700">
                                <p className="pt-2 text-lg font-bold text-[#12703C]">Your Interpretation :</p>
                                <p className="pt-2 text-justify text-lg">- {recommendation?.[1]?.interpretation}</p>
                            </div>
                            <div className="mb-3 leading-relaxed text-gray-700">
                                <p className="text-lg font-bold text-[#12703C]">Your Recommendations :</p>{" "}
                                <p className="pt-2 text-justify text-lg">{recommendation?.[1]?.recommendations}</p>
                            </div>
                        </div>
                    </div>
                    <div className="mb-8 text-center">
                        <h2 className="mb-2 mt-8 text-3xl font-bold">Your Top Career Matches</h2>
                        <p className="text-[#12703C]">Based on your assessment results</p>
                    </div>
                    <div>
                        {/* <p className="text-justify text-[18px] font-bold">
                                Based on your personality, skills, and interests, here are the career paths that best match your unique potential!
                            </p>
                            <p className="mb-4 text-[16px] font-bold leading-relaxed text-[#12703C]">Explore each career to see what suits you best.</p> */}

                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                            {(jobs.length <= 6 ? jobs : jobs.slice(0, 6)).map((career, idx) => (
                                <div
                                    key={idx}
                                    onClick={() => {
                                        setSelectedCareer(career);
                                        setCurrentScreen("career");
                                    }}
                                    className="cursor-pointer rounded-lg border border-[#12703C] bg-white p-4 shadow transition hover:bg-indigo-50 hover:shadow-md"
                                >
                                    <h3 className="text-md mb-1 text-center font-bold">{career}</h3>
                                    {/* <p className="text-xs text-gray-600">
                                        Short description about {career} goes here. Click to learn more about this career path.
                                    </p>
                                    <button className="mt-2 text-xs font-medium text-indigo-600 underline hover:text-indigo-800">
                                        View Details →
                                    </button> */}
                                </div>
                            ))}
                        </div>

                        <p className="mt-3 pb-6 text-[12px] font-semibold leading-relaxed text-gray-700">
                            Note: Here are some fun and exciting careers you might enjoy exploring when you grow up.
                        </p>
                    </div>
                </div>
            )}
        </>
    );
};

export default ResultScreen;
