import React, { useEffect, useState } from "react";
import { CheckCircle } from "lucide-react";
import useAuthStore from "../store/authStore";
import userImg from "../assets/UserProfile.png";
import bot from "../assets/xpolar.png";

const WelcomeScreen = ({ questionTypes, onQuestionTypeSelect, isLoading, testData, error, setCurrentScreen }) => {
    const user = useAuthStore((state) => state.user);

    const [messages, setMessages] = useState([]);

    useEffect(() => {
        setMessages([
            { type: "bot", content: `Welcome! 👋 ${user?.name}` },
            {
                type: "bot",
                content: `Take 4 simple tests to explore your personality, skills, and interests and see which careers fit you perfectly.`,
            },
        ]);
    }, []);

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
                <div className="px-6 pb-4 pt-5 font-mallanna md:pt-0">
                    <div className="mt-2 flex items-center gap-3">
                        <div className="h-8 w-8 flex-shrink-0 overflow-hidden rounded-full">
                            <img
                                src={bot}
                                alt="bot icon"
                                className="h-8 w-8"
                            />
                        </div>
                        <div className="inline-flex items-center space-x-2 rounded-r-lg rounded-tl-lg bg-white px-4 py-2 text-[15px] text-gray-500 shadow">
                            <span>Typing</span>
                            <span className="flex items-center space-x-1">
                                <span className="block h-1 w-1 animate-bounce rounded-full bg-gray-400 [animation-delay:0ms]"></span>
                                <span className="block h-1 w-1 animate-bounce rounded-full bg-gray-400 [animation-delay:150ms]"></span>
                                <span className="block h-1 w-1 animate-bounce rounded-full bg-gray-400 [animation-delay:300ms]"></span>
                            </span>
                        </div>
                    </div>
                </div>
            ) : error ? (
                <div className="mb-2 rounded bg-red-100 p-2 text-sm text-red-700">⚠️ {error.message}</div>
            ) : (
                <div className="scrollable relative flex h-full flex-col space-y-4 overflow-y-auto pt-5 font-mallanna md:pt-0">
                    {messages.map((msg, idx) => {
                        const isBot = msg.type === "bot";
                        const isLastBot = isBot && (idx === messages.length - 1 || messages[idx + 1]?.type !== "bot");

                        return (
                            <div
                                key={idx}
                                className={`flex max-w-[75%] items-end space-x-2 ${
                                    msg.type === "user" ? "ml-auto flex-row-reverse space-x-reverse" : "mr-auto"
                                }`}
                            >
                                <div className="h-8 w-8 flex-shrink-0 overflow-hidden rounded-full">
                                    {isBot && isLastBot ? (
                                        <img
                                            src={bot}
                                            alt="bot icon"
                                            className="h-8 w-8"
                                        />
                                    ) : isBot ? (
                                        <div className="h-8 w-8" />
                                    ) : msg.type === "user" ? (
                                        <img
                                            src={userImg}
                                            alt="user icon"
                                            className="h-8 w-8"
                                        />
                                    ) : null}
                                </div>

                                <div
                                    className={`whitespace-pre-wrap break-words rounded-xl px-4 py-2 text-[16px] shadow-sm ${
                                        msg.type === "user" ? "rounded-br-none bg-sky-200 text-gray-800" : "rounded-bl-none bg-white text-gray-800"
                                    }`}
                                >
                                    {msg.content}
                                </div>
                            </div>
                        );
                    })}

                    <div className="flex flex-col gap-2 sm:pl-10 md:w-[50%]">
                        {questionTypes &&
                            questionTypes.map((type) => {
                                const isCompleted = Boolean(testData?.[type.section]?.isCompleted);
                                const alreadyCompleted = completedIds.includes(type.id.toString());
                                const isTestDone = isCompleted || alreadyCompleted;

                                return (
                                    <button
                                        key={type.id}
                                        onClick={() => onQuestionTypeSelect(type)}
                                        className={`rounded-lg border-2 p-3 transition-all duration-300 hover:shadow-md ${
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
                                                    <h3 className="text-[14px] font-semibold text-gray-800">{type.title}</h3>
                                                    <p className="text-[14px] text-gray-400">
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
                        <div className="pb-5 md:w-[50%]">
                            <div className="flex items-center gap-3">
                                <div className="h-8 w-8 flex-shrink-0 overflow-hidden rounded-full">
                                    <img
                                        src={bot}
                                        alt="bot icon"
                                        className="h-8 w-8"
                                    />
                                </div>

                                <div
                                    className={`text-gray-800" mr-auto whitespace-pre-wrap break-words rounded-xl rounded-bl-none bg-white px-4 py-2 text-[15px] shadow-sm`}
                                >
                                    You’ve completed all the tests. Click on 'Get Career Results' to see the careers that match your personality,
                                    skills, and interests.
                                </div>
                            </div>

                            <div className="flex gap-3 pl-10 pt-4">
                                <button
                                    className="flex-1 rounded-lg bg-[#EAB308] px-3 py-2.5 text-center font-mallanna text-[16px] text-white"
                                    onClick={() => setCurrentScreen("result")}
                                >
                                    Get Career Results
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            )}
        </>
    );
};

export default WelcomeScreen;
