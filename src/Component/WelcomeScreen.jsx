import React from "react";
import { CheckCircle } from "lucide-react";
import useAuthStore from "../store/authStore";

const WelcomeScreen = ({ questionTypes, onQuestionTypeSelect, isLoading, testData, error, setCurrentScreen }) => {
    const user = useAuthStore((state) => state.user);

    const navigateToMentor = () => {
        window.open("https://mentorboosters.com/", "_blank");
    };

    const completedIds = user?.assessments?.split(",") || [];

    const allCompleted =
        questionTypes?.every((type) => {
            const isCompleted = Boolean(testData?.[type.section]?.isCompleted);
            const alreadyCompleted = completedIds.includes(type.id.toString());
            return isCompleted || alreadyCompleted;
        }) || false;

    return (
        <>
            {isLoading ? (
                <div className="px-6 pb-4 font-mallanna">
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
                <div className="flex h-full flex-col space-y-4 overflow-y-auto font-mallanna">
                    <div className="mb-4 flex-shrink-0 text-center">
                        <h2 className="mb-2 text-lg font-bold text-gray-800">Welcome! 👋 {user.name}</h2>
                        <p className="text-xs text-gray-600">
                            Take 4 simple tests to explore your personality, skills, and interests and see which careers fit you perfectly.
                        </p>
                    </div>

                    <div className="flex w-full flex-wrap items-center justify-center gap-3">
                        {questionTypes &&
                            questionTypes.map((type) => {
                                const isCompleted = Boolean(testData?.[type.section]?.isCompleted);
                                const alreadyCompleted = completedIds.includes(type.id.toString());
                                const isTestDone = isCompleted || alreadyCompleted;

                                return (
                                    <button
                                        key={type.id}
                                        onClick={() => onQuestionTypeSelect(type)}
                                        className={`w-full rounded-lg border-2 p-3 transition-all duration-300 hover:shadow-md sm:w-[48%] ${
                                            isTestDone
                                                ? "border-green-200 bg-green-50 hover:bg-green-100"
                                                : "border-gray-200 hover:border-indigo-300 hover:bg-indigo-50"
                                        }`}
                                    >
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center space-x-3">
                                                <div
                                                    className={`flex h-8 w-8 items-center justify-center rounded-full text-sm text-white ${type.color}`}
                                                >
                                                    {type.emoji}
                                                </div>
                                                <div className="text-left">
                                                    <h3 className="text-xs font-semibold text-gray-800">{type.title}</h3>
                                                    <p className="text-xs text-gray-400">
                                                        {isTestDone ? "Completed" : `${parseInt(type.duration.split(":")[1])} minutes`}
                                                    </p>
                                                </div>
                                            </div>

                                            {isTestDone && (
                                                <CheckCircle
                                                    className="text-green-500"
                                                    size={16}
                                                />
                                            )}
                                        </div>
                                    </button>
                                );
                            })}
                    </div>

                    {allCompleted && (
                        <>
                            <p className="text-xs text-gray-600">
                                You’ve completed all the tests. Click on 'Get Career Results' to see the careers that match your personality, skills,
                                and interests.
                            </p>
                            <div className="flex gap-3">
                                <button
                                    className="flex-1 rounded-lg bg-[#EAB308] px-3 py-2.5 text-center font-mallanna text-sm text-white"
                                    onClick={() => setCurrentScreen("result")}
                                >
                                    Get Career Results
                                </button>

                                <button
                                    onClick={navigateToMentor}
                                    className="flex-1 rounded-lg bg-[#EAB308] px-3 py-2.5 text-center font-mallanna text-sm text-white"
                                >
                                    Talk to a mentor
                                </button>
                            </div>
                        </>
                    )}

                    <div className="absolute bottom-0 mx-auto w-[90%] text-center">
                        <p className="text-[9px] text-gray-600">Note: You can retake any test anytime. Your results will be updated automatically.</p>
                    </div>
                </div>
            )}
        </>
    );
};

export default WelcomeScreen;
