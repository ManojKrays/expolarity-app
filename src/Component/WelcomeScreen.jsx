import React, { useEffect, useState } from "react";
import { CheckCircle } from "lucide-react";
import useAuthStore from "../store/authStore";
import userImg from "../assets/UserProfile.png";
import bot from "../assets/xpolar.png";
import { Brain, Heart, Sparkles, TrendingUp, Rocket } from "lucide-react";

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

                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
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
                                                ? "border-green-800 bg-white hover:bg-green-200"
                                                : "border-green-800 bg-white hover:border-indigo-400 hover:bg-indigo-50"
                                        }`}
                                    >
                                        <div className="mx-auto flex items-center justify-center rounded-xl p-4 transition-all hover:shadow-md">
                                            <div className="flex flex-col items-center space-y-2 text-center">
                                                <div className={`flex h-20 w-20 items-center justify-center rounded-full shadow-md ${type.color}`}>
                                                    <span className="text-5xl">{type.emoji}</span>
                                                </div>

                                                <h3 className="text-[20px] font-bold tracking-wide">{type.title}</h3>
                                                <div className="mt-2 flex justify-center">
                                                    {isTestDone ? (
                                                            <button className="flex rounded-md bg-green-800 px-3 py-1 text-[16px] text-white shadow-sm transition-colors hover:bg-green-600">
                                                            <CheckCircle className=" text-white h-6 w-6 pr-2" />

                                                                Completed
                                                            </button>
                                                    ) : (
                                                        <p className="text-[16px] font-bold text-green-900">{`${parseInt(type.duration.split(":")[1])} min`}</p>
                                                    )}
                                                </div>
                                            </div>

                                            {/* {isTestDone && (
                                                <CheckCircle
                                                    className="text-green-500"
                                                    size={20}
                                                />
                                            )} */}
                                        </div>
                                    </button>
                                );
                            })}
                    </div>

                    {allCompleted && (
                        <div className="pb-5">
                            <div
                                className="shadow-float animate-fade-in rounded-3xl border border-purple-100 bg-white/80 p-8 backdrop-blur-sm"
                                style={{ animationDelay: "400ms" }}
                            >
                                <div className="mb-6 flex items-start gap-4">
                                    <div>
                                        <h2 className="text-foreground mb-2 text-2xl font-bold">Amazing Progress!</h2>
                                        <p className="text-foreground/70 text-lg">
                                            You've completed all the tests. Click on 'Get Career Results' to see the careers that match your
                                            personality, skills, and interests.
                                        </p>
                                    </div>
                                </div>

                                <button
                                    size="lg"
                                    onClick={() => setCurrentScreen("result")}
                                    className="shadow-float h-12 w-full rounded-2xl border-0 bg-gradient-to-r from-yellow-400 via-orange-400 to-yellow-500 text-xl font-bold text-white transition-all hover:scale-105 hover:from-yellow-500 hover:via-orange-500 hover:to-yellow-600 hover:shadow-xl"
                                >
                                    <div className="flex items-center justify-center">
                                        <Rocket className="mr-3 h-6 w-6" />
                                        Get Career Results
                                        <Sparkles className="ml-3 h-6 w-6" />
                                    </div>
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
