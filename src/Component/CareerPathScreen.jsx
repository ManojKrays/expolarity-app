import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import useAuthStore from "../store/authStore";
import axios from "axios";

const CareerPathScreen = ({ selectedCareer }) => {
    const user = useAuthStore((state) => state.user);
    const [resultData, setResultData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const getCareerPath = async () => {
        setIsLoading(true);
        try {
            if (selectedCareer) {
                const studentdetails = {
                    student_id: user.id,
                    grade: user.grade,
                    country: user.country,
                    assessment_result: selectedCareer,
                };
                const res = await axios.post("https://expolarity-ai.onrender.com/api/careers/generate", studentdetails);
                // const res = await axios.post("http://localhost:5000/api/careers/generate", studentdetails);
                setResultData(res.data.data);
                setIsLoading(false);
            }
        } catch (err) {
            setIsLoading(false);
            console.log(err);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        getCareerPath();
    }, []);

    const CareerSuggestionCard = ({ data }) => {
        if (!data) return <div className="text-center text-gray-500">No data available.</div>;

        return (
            <div className="mx-auto max-w-4xl space-y-6 rounded-2xl bg-white p-6 text-gray-800 shadow-md">
                <h1 className="text-3xl font-bold text-blue-600">{data.career}</h1>

                <section>
                    <p className="text-justify text-lg italic">{data.introduction}</p>
                    <p className="mt-2 text-justify">{data.whyThisCareerIsGreat}</p>
                </section>

                <section>
                    <h2 className="mb-2 mt-4 text-xl font-semibold text-purple-600">🚀 How To Start</h2>
                    <div className="grid grid-cols-1 gap-4">
                        <div>
                            <h3 className="text-sm font-semibold">📘 Subjects to Focus</h3>
                            <ul className="list-disc pl-5 text-sm">
                                {data.howToStart.subjectsToFocus.map((sub, i) => (
                                    <li key={i}>{sub}</li>
                                ))}
                            </ul>
                        </div>
                        <div>
                            <h3 className="text-sm font-semibold">🧪 Activities to Try</h3>
                            <ul className="list-disc pl-5 text-sm">
                                {data.howToStart.activitiesToTry.map((act, i) => (
                                    <li key={i}>{act}</li>
                                ))}
                            </ul>
                        </div>
                        <div>
                            <h3 className="text-sm font-semibold">🎨 Useful Hobbies</h3>
                            <ul className="list-disc pl-5 text-sm">
                                {data.howToStart.usefulHobbies.map((hob, i) => (
                                    <li key={i}>{hob}</li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </section>

                <section>
                    <h2 className="text-xl font-semibold text-purple-600">📚 Education Path</h2>
                    <p className="mt-1 text-sm">
                        <strong>High School:</strong> {data.educationPath.highSchool}
                    </p>
                    <p className="mt-2">
                        <strong>Degrees:</strong> {data.educationPath.afterSchoolOptions.degrees.join(", ")}
                    </p>
                    <p>
                        <strong>Certifications:</strong> {data.educationPath.afterSchoolOptions.certifications.join(", ")}
                    </p>
                </section>

                <section>
                    <h2 className="text-xl font-semibold text-purple-600">💼 Skills to Develop</h2>
                    <p>
                        <strong>Hard Skills:</strong> {data.skillsToDevelop.hardSkills.join(", ")}
                    </p>
                    <p>
                        <strong>Soft Skills:</strong> {data.skillsToDevelop.softSkills.join(", ")}
                    </p>
                </section>

                <section>
                    <h2 className="text-xl font-semibold text-purple-600">📈 Career Progression</h2>
                    <p>
                        <strong>Entry Level:</strong> {data.careerProgression.entryLevel.roles.join(", ")}
                    </p>
                    <p>
                        <strong>Mid Level:</strong> {data.careerProgression.midLevel.join(", ")}
                    </p>
                    <p>
                        <strong>Senior Level:</strong> {data.careerProgression.seniorLevel.positions.join(", ")}
                    </p>
                </section>

                <section>
                    <h2 className="text-xl font-semibold text-purple-600">🏫 Top Colleges</h2>
                    <ul className="list-disc pl-5 text-sm">
                        {data.topColleges.map((col, i) => (
                            <li key={i}>{col}</li>
                        ))}
                    </ul>
                </section>

                <section>
                    <h2 className="text-xl font-semibold text-purple-600">📊 Job Market Insight</h2>
                    <p className="text-justify">
                        <strong>Demand:</strong> {data.jobMarketInsight.demand}
                    </p>
                    <p className="text-justify">
                        <strong>Future Scope:</strong> {data.jobMarketInsight.futureScope}
                    </p>
                </section>

                <section>
                    <h2 className="text-xl font-semibold text-purple-600">🔄 Related Careers</h2>
                    <p>{data.relatedCareers.join(", ")}</p>
                </section>

                <section className="mt-4 rounded-lg bg-yellow-50 p-4">
                    <h2 className="text-xl font-semibold text-yellow-600">🌟 Motivational Tips</h2>
                    <ul className="mt-2 list-disc pl-5 text-sm text-gray-700">
                        {data.motivationalTips.map((tip, i) => (
                            <li key={i}>{tip}</li>
                        ))}
                    </ul>
                </section>

                <img
                    src={data.roadmapImage || data.roadmapImageUrl}
                    alt="Career Roadmap"
                    className="mt-4 w-full rounded-lg shadow"
                />
            </div>
        );
    };

    return (
        <>
            {isLoading ? (
                <div className="mt-5 px-6 pb-4">
                    <div className="inline-flex items-center space-x-2 rounded-r-lg rounded-tl-lg bg-white px-4 py-2 text-xs text-gray-500 shadow">
                        <span>Typing</span>
                        <span className="flex items-center space-x-1">
                            <span className="block h-1 w-1 animate-bounce rounded-full bg-gray-400 [animation-delay:0ms]"></span>
                            <span className="block h-1 w-1 animate-bounce rounded-full bg-gray-400 [animation-delay:150ms]"></span>
                            <span className="block h-1 w-1 animate-bounce rounded-full bg-gray-400 [animation-delay:300ms]"></span>
                        </span>
                    </div>
                </div>
            ) : (
                <div className="career-content">
                    <CareerSuggestionCard data={resultData && resultData} />
                </div>
            )}
        </>
    );
};

export default CareerPathScreen;
