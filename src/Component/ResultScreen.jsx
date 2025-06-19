import React, { useState, useEffect } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer, Cell } from "recharts";
import useAuthStore from "../store/authStore";
import { get } from "../config/network";
import apiDetails from "../config/apiDetails";
import { useQuery } from "@tanstack/react-query";

const ResultScreen = ({ setSelectedCareer, setCurrentScreen }) => {
    const resultId = useAuthStore((state) => state?.user?.resultId);
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
                { type: "R", label: "Realistic", value: scores.Realistic },
                { type: "I", label: "Investigative", value: scores.Investigative },
                { type: "A", label: "Artistic", value: scores.Artistic },
                { type: "S", label: "Social", value: scores.Social },
                { type: "E", label: "Enterprising", value: scores.Enterprising },
                { type: "C", label: "Conventional", value: scores.Conventional },
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
                    <h2 className="mb-4 text-center text-lg font-semibold">Career Result</h2>

                    <div className="-ml-10 sm:-ml-8">
                        <ResponsiveContainer height={250}>
                            <BarChart data={riasecvalues}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis
                                    dataKey="type"
                                    tick={{ fontSize: 12 }}
                                />
                                <YAxis tick={{ fontSize: 12 }} />
                                {/* <Tooltip
                                    formatter={(value) => [`${value}`, "Score"]}
                                    labelFormatter={(label) => `Type: ${label}`}
                                /> */}
                                <Bar
                                    dataKey="value"
                                    label={{ position: "top", fontSize: 12 }}
                                >
                                    {riasecvalues?.map((entry, index) => (
                                        <Cell
                                            key={`cell-${index}`}
                                            fill={colorMap[entry.type] || "#ccc"}
                                        />
                                    ))}
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </div>

                    {/* career path content */}
                    <div>
                        <div className="mb-3 mt-6 rounded-lg border border-indigo-200 bg-indigo-50 p-4 text-sm shadow-sm">
                            <h3 className="mb-2 text-lg font-bold text-indigo-800">Based On Your Personality Type</h3>
                            <div className="mb-3 leading-relaxed text-gray-700">
                                <p className="text-base font-semibold text-indigo-800">Your Interpretation :</p>
                                <p className="pt-2 text-justify">- {recommendation?.[1]?.interpretation}</p>
                            </div>
                            <div className="mb-3 leading-relaxed text-gray-700">
                                <p className="text-base font-semibold text-indigo-800">Your Recommendations :</p>{" "}
                                <p className="pt-2 text-justify">{recommendation?.[1]?.recommendations}</p>
                            </div>
                        </div>

                        <div className="mb-3 mt-6 rounded-lg border border-indigo-200 bg-indigo-50 p-4 text-sm shadow-sm">
                            <p className="text-justify text-base font-semibold text-indigo-800">
                                Based on your personality, skills, and interests, here are the career paths that best match your unique potential!
                            </p>
                            <div className="flex flex-wrap gap-3 pt-3">
                                {(jobs.length <= 6 ? jobs : jobs.slice(0, 6)).map((career, idx) => (
                                    <div
                                        onClick={() => {
                                            setSelectedCareer(career);
                                            setCurrentScreen("career");
                                        }}
                                        key={idx}
                                        className="cursor-pointer rounded-sm bg-white px-3 py-1 text-xs font-semibold text-indigo-700 shadow transition hover:bg-indigo-100"
                                    >
                                        {career}
                                    </div>
                                ))}

                                <p className="text-[9px] leading-relaxed text-gray-700">
                                    Note: Here are some fun and exciting careers you might enjoy exploring when you grow up. Click on them to learn
                                    more!
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default ResultScreen;
