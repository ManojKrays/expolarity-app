import React from "react";
import { CheckCircle } from "lucide-react";

const WelcomeScreen = ({ questionTypes, onQuestionTypeSelect, isLoading, testData, error, setCurrentScreen }) => {
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
                <div className="flex h-full flex-col space-y-4 overflow-y-auto">
                    <div className="mb-4 flex-shrink-0 text-center">
                        <h2 className="mb-2 text-lg font-bold text-gray-800">Welcome! 👋</h2>
                        <p className="text-xs text-gray-600">I'm here to help you get started. Choose a category below to begin:</p>
                    </div>

                    <div className="flex w-full flex-wrap items-center justify-center gap-3">
                        {questionTypes &&
                            questionTypes.map((type) => {
                                const isCompleted = testData?.[type.section]?.isCompleted === true;

                                return (
                                    <button
                                        key={type.id}
                                        onClick={() => {
                                            onQuestionTypeSelect(type);
                                        }}
                                        className={`w-full rounded-lg border-2 p-3 transition-all duration-300 hover:shadow-md sm:w-[48%] ${
                                            isCompleted
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
                                                        {isCompleted ? "Completed ✓" : `${parseInt(type.duration.split(":")[1])} minutes`}
                                                    </p>
                                                </div>
                                            </div>

                                            {/* {isCompleted && (
                                            <CheckCircle
                                                className="text-green-500"
                                                size={16}
                                            />
                                        )} */}
                                        </div>
                                    </button>
                                );
                            })}
                    </div>

                    <div className="mt-4 flex-shrink-0 rounded-lg bg-gray-50 p-3">
                        <p className="text-center text-xs text-gray-600">
                            Complete all sections to see your{" "}
                            <span
                                className="cursor-pointer text-indigo-400 underline"
                                onClick={() => setCurrentScreen("result")}
                            >
                                Career Path!
                            </span>
                        </p>
                    </div>

                    <div>
                        {testData && Object.values(testData).every((type) => type.isCompleted) && (
                            <button onClick={() => setCurrentScreen("result")}>Result</button>
                        )}
                    </div>
                </div>
            )}
        </>
    );
};

export default WelcomeScreen;
