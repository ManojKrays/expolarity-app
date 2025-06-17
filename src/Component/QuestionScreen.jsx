import React, { useEffect, useRef, useState } from "react";
import { Home } from "lucide-react";
import { get, post } from "../config/network";
import apiDetails from "../config/apiDetails";
import { useMutation, useQuery } from "@tanstack/react-query";
import { successNotify, errorNotify } from "../service/Messagebar";
import useAuthStore from "../store/authStore";

const QuestionScreen = ({ questionType, testData, setTestData, onBackToWelcome }) => {
    const messagesEndRef = useRef(null);
    const timerRef = useRef(null);
    const questionCode = questionType?.section;
    const [typingState, setTypingState] = useState({});
    const isTyping = typingState[questionCode];

    const fetchQuestions = async () => {
        const res = await get(`${apiDetails.endPoint.getQuestions}?testid=${questionType.id}`);
        return res.data
            .map((q) => {
                if (q.type === "RATING") {
                    return { id: q.id, question: q.question };
                }
                if (q.type === "SINGLE") {
                    return {
                        id: q.id,
                        question: q.question,
                        options: [
                            q.option_a && { value: "A", label: q.option_a },
                            q.option_b && { value: "B", label: q.option_b },
                            q.option_c && { value: "C", label: q.option_c },
                            q.option_d && { value: "D", label: q.option_d },
                            q.option_e && { value: "E", label: q.option_e },
                        ].filter(Boolean),
                    };
                }
                return null;
            })
            .filter(Boolean);
    };

    const { data: questions, isLoading } = useQuery({
        queryKey: ["questions", questionType?.id],
        queryFn: fetchQuestions,
        enabled: !!questionType?.id,
    });

    useEffect(() => {
        if (!questions || !questionCode) return;

        setTestData((prev) => {
            const alreadyInitialized = prev[questionCode]?.messages?.length > 0;
            if (alreadyInitialized) return prev;

            return {
                ...prev,
                [questionCode]: {
                    currentIndex: 0,
                    messages: [{ type: "bot", content: questions[0]?.question || "No question found." }],
                    answers: {},
                    isCompleted: false,
                    timer: 0, // initialize timer
                },
            };
        });
    }, [questions, questionCode, setTestData]);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [testData[questionCode]?.messages]);

    // Timer logic
    useEffect(() => {
        if (!questionCode || !questions) return;
        const currentData = testData[questionCode];
        if (currentData?.isCompleted) return;

        timerRef.current = setInterval(() => {
            setTestData((prev) => {
                const currentTime = prev[questionCode]?.timer || 0;
                return {
                    ...prev,
                    [questionCode]: {
                        ...prev[questionCode],
                        timer: currentTime + 1,
                    },
                };
            });
        }, 1000);

        return () => {
            clearInterval(timerRef.current);
        };
    }, [questionCode, questions, setTestData]);

    const userId = useAuthStore((state) => state?.user?.id);

    const saveAnswers = async (ans) => {
        try {
            if (userId) {
                const headers = {
                    assessment: questionType.id,
                    user: userId,
                };
                const res = await post(`${apiDetails.endPoint.saveTest}`, ans, { headers });
                return res;
            }
        } catch (err) {
            console.log(err);
            throw err;
        }
    };

    const mutation = useMutation({
        mutationFn: saveAnswers,
        onSuccess: () => successNotify("Assessment Saved!"),
        onError: (err) => errorNotify(err.message),
    });

    const getBotReply = (answer) => {
        if (typeof answer === "string") {
            const lower = answer.toLowerCase();
            if (lower.includes("yes")) return "👍 Noted. Let’s explore further.";
            if (lower.includes("no")) return "🧠 Understood. Every perspective counts.";
            if (lower.includes("maybe")) return "🤔 Ambiguity is a part of self-awareness. Let’s continue.";
        } else if (typeof answer === "number") {
            return (
                [
                    "🟥 You strongly disagreed — thank you for your clarity.",
                    "🔵 You disagreed. Your self-awareness is appreciated.",
                    "🟡 A neutral stance — staying balanced is also insightful.",
                    "🟢 You agreed. Thanks for reflecting openly.",
                    "🟩 Strong agreement — your confidence is noted. Let’s continue.",
                ][answer - 1] || "📘 Thanks! Let’s keep going."
            );
        }
        return "📘 Thank you. Let’s proceed.";
    };

    const handleNext = (updatedAnswers, updatedMsgs) => {
        const currentData = testData[questionCode];
        const nextIndex = currentData.currentIndex + 1;

        if (nextIndex < questions.length) {
            const nextQ = { type: "bot", content: questions[nextIndex].question };
            setTestData((prev) => ({
                ...prev,
                [questionCode]: {
                    ...currentData,
                    messages: [...updatedMsgs, nextQ],
                    currentIndex: nextIndex,
                    answers: updatedAnswers,
                },
            }));
        } else {
            setTestData((prev) => ({
                ...prev,
                [questionCode]: {
                    ...currentData,
                    messages: [...updatedMsgs, { type: "bot", content: "🎉 You've finished the questions!" }],
                    answers: updatedAnswers,
                    isCompleted: true,
                },
            }));
            mutation.mutate(updatedAnswers);
        }
    };

    const handleAnswer = (answer) => {
        const currentData = testData[questionCode];
        const currentQuestion = questions[currentData.currentIndex];
        const isSingle = questionType.type === "SINGLE";

        const displayText = isSingle && typeof answer === "object" ? `${answer.label} (${answer.value})` : answer;
        const answerValue = isSingle && typeof answer === "object" ? answer.value : answer;

        const userMsg = { type: "user", content: displayText };
        const botReply = { type: "bot", content: getBotReply(answerValue) };
        const updatedAnswers = { ...currentData.answers, [currentQuestion.id]: answerValue };
        const updatedMsgs = [...currentData.messages, userMsg, botReply];

        setTestData((prev) => ({
            ...prev,
            [questionCode]: {
                ...currentData,
                answers: updatedAnswers,
                messages: updatedMsgs,
            },
        }));

        setTypingState((prev) => ({ ...prev, [questionCode]: true }));

        setTimeout(() => {
            setTypingState((prev) => ({ ...prev, [questionCode]: false }));
            handleNext(updatedAnswers, updatedMsgs);
        }, 800);
    };

    const currentData = testData[questionCode];
    const currentQuestion = questions?.[currentData?.currentIndex || 0];
    const isRange = questionType.type === "RATING";
    const isSingle = questionType.type === "SINGLE";

    const formatTime = (seconds) => {
        const m = Math.floor(seconds / 60)
            .toString()
            .padStart(2, "0");
        const s = (seconds % 60).toString().padStart(2, "0");
        return `${m}:${s}`;
    };

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
            ) : (
                <div className="flex min-h-[424px] flex-col rounded-md bg-gray-100 shadow-sm">
                    <div className="custom-scrollbar flex-1 space-y-3 overflow-y-auto px-4 pb-10 pr-1 pt-2 md:px-6">
                        {currentData?.messages.map((msg, idx) => (
                            <div
                                key={idx}
                                className={`max-w-[75%] whitespace-pre-wrap break-words rounded-xl px-4 py-3 text-sm shadow-md ${
                                    msg.type === "user"
                                        ? "ml-auto rounded-br-none bg-blue-500 text-white"
                                        : "mr-auto rounded-bl-none bg-white text-gray-800"
                                }`}
                            >
                                {msg.content}
                            </div>
                        ))}
                        <div ref={messagesEndRef} />

                        {!currentData?.isCompleted && (
                            <div className="mt-4 pb-10">
                                {isTyping ? (
                                    <div className="pb-4">
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
                                    <>
                                        {isRange && (
                                            <div className="space-y-3 px-4 pb-2">
                                                <div className="mb-2 flex justify-between text-xs text-gray-600">
                                                    <span>Strongly Disagree</span>
                                                    <span>Strongly Agree</span>
                                                </div>
                                                <div className="flex items-center justify-between space-x-2">
                                                    {[1, 2, 3, 4, 5].map((val) => (
                                                        <button
                                                            key={val}
                                                            onClick={() => handleAnswer(val)}
                                                            className="h-10 w-10 rounded-full border-2 bg-white text-xs font-semibold text-gray-600 transition-all duration-200 hover:scale-105 hover:border-gray-400"
                                                        >
                                                            {val}
                                                        </button>
                                                    ))}
                                                </div>
                                            </div>
                                        )}

                                        {isSingle && (
                                            <div className="mt-4 space-y-2 px-3 pb-2">
                                                {currentQuestion?.options.map((option, index) => (
                                                    <button
                                                        key={index}
                                                        onClick={() => handleAnswer(option)}
                                                        className="w-full rounded-md border border-blue-300 bg-white px-4 py-2 text-left text-sm font-medium text-gray-800 shadow-sm transition-all duration-200 hover:bg-blue-100 hover:text-blue-700"
                                                    >
                                                        {`${option.value}) ${option.label}`}
                                                    </button>
                                                ))}
                                            </div>
                                        )}
                                    </>
                                )}
                            </div>
                        )}
                    </div>

                    <div className="fixed bottom-4 flex w-72 items-center justify-between rounded-b-xl border bg-green-500 px-3 pb-2 pt-3 text-sm sm:w-96">
                        <span className="text-white">{formatTime(currentData?.timer || 0)}</span>
                        <span className="text-white">
                            {currentData?.currentIndex + 1}/{questions?.length || 0}
                        </span>
                    </div>
                </div>
            )}
        </>
    );
};

export default QuestionScreen;
