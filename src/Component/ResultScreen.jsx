import React from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer, Cell } from "recharts";
import useAuthStore from "../store/authStore";
import { get } from "../config/network";
import apiDetails from "../config/apiDetails";
import { useQuery } from "@tanstack/react-query";

// RIASEC values
const riasValues = [
    { type: "R", label: "Realistic", value: 65 },
    { type: "I", label: "Investigative", value: 80 },
    { type: "A", label: "Artistic", value: 95 },
    { type: "S", label: "Social", value: 70 },
    { type: "E", label: "Enterprising", value: 90 },
    { type: "C", label: "Conventional", value: 50 },
];

// Unique colors
const colorMap = {
    R: "#4F46E5",
    I: "#10B981",
    A: "#F59E0B",
    S: "#EC4899",
    E: "#3B82F6",
    C: "#8B5CF6",
};

// Suggestions based on top traits
const careerSuggestions = {
    RA: {
        title: "You are a Creative Doer!",
        careers: ["Architect", "Graphic Designer", "Engineer"],
    },
    AE: {
        title: "You are an Artistic Leader!",
        careers: ["Marketing Manager", "Entrepreneur", "Art Director"],
    },
    IS: {
        title: "You are an Analytical Helper!",
        careers: ["Psychologist", "Data Scientist", "Counselor"],
    },
};

const ResultScreen = () => {
    const topTwo = [...riasValues].sort((a, b) => b.value - a.value).slice(0, 2);
    const comboKey = topTwo
        .map((t) => t.type)
        .sort()
        .join("");

    const result = careerSuggestions[comboKey] || {
        title: "You have a Unique Personality Blend!",
        careers: ["Consultant", "Researcher", "Creative Strategist"],
    };

    const resultId = useAuthStore((state) => state?.user?.resultId);

    const getResult = async () => {
        try {
            if (resultId) {
                const res = await get(`${apiDetails.endPoint.result}/${resultId}`);

                if (res.status) {
                    return res;
                }
                throw new Error(res.data.message || "Something Went wrong!");
            }
        } catch (err) {
            throw new Error(err.message || "Something Went wrong!");
        }
    };

    const { data, isLoading, error } = useQuery({
        queryKey: ["result"],
        queryFn: getResult,
    });

    console.log(data);

    return (
        <>
            {isLoading ? (
                <div className="px-6 pb-4">
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
                <div className="mx-auto min-h-[424px] w-full">
                    <h2 className="mb-4 text-center text-lg font-semibold">Career Result</h2>

                    <div className="-ml-10 sm:-ml-8">
                        <ResponsiveContainer height={250}>
                            <BarChart data={riasValues}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis
                                    dataKey="type"
                                    tick={{ fontSize: 12 }}
                                />
                                <YAxis tick={{ fontSize: 12 }} />
                                <Tooltip
                                    formatter={(value, name, props) => [`${value}`, "Score"]}
                                    labelFormatter={(label) => `Type: ${label}`}
                                />
                                <Bar
                                    dataKey="value"
                                    label={{ position: "top", fontSize: 12 }}
                                >
                                    {riasValues.map((entry, index) => (
                                        <Cell
                                            key={`cell-${index}`}
                                            fill={colorMap[entry.type] || "#ccc"}
                                        />
                                    ))}
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </div>

                    <div className="mt-6 rounded-lg border border-indigo-200 bg-indigo-50 p-5 text-sm shadow-sm">
                        <h3 className="mb-2 text-lg font-bold text-indigo-800">{result.title}</h3>
                        <p className="mb-3 leading-relaxed text-gray-700">
                            Wow! Based on your top strengths — <strong>{topTwo[0].label}</strong> and <strong>{topTwo[1].label}</strong> — you have a
                            special mix of talents. This means you enjoy doing certain activities and might be really good at them too!
                        </p>
                        <p className="mb-3 leading-relaxed text-gray-700">
                            Here are some fun and exciting careers you might enjoy exploring when you grow up. Click on them to learn more!
                        </p>
                        <div className="flex flex-wrap gap-3">
                            {result.careers.map((career, idx) => (
                                <a
                                    key={idx}
                                    href={`https://www.google.com/search?q=how+to+become+a+${encodeURIComponent(career)}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="rounded-full bg-white px-4 py-1 text-xs font-semibold text-indigo-700 shadow transition hover:bg-indigo-100"
                                >
                                    {career}
                                </a>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default ResultScreen;
