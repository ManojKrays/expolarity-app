import React, { useEffect, useRef, useState } from "react";
import { ArrowLeft, Home } from "lucide-react";
import { post } from "../config/network";
import apiDetails from "../config/apiDetails";
import { useMutation } from "@tanstack/react-query";
import { successNotify, errorNotify } from "../service/Messagebar";

const QuestionScreen = ({ questionType, testData, setTestData, onBackToWelcome }) => {
    const messagesEndRef = useRef(null);
    const questionCode = questionType.code;
    const [typingState, setTypingState] = useState({});
    const isTyping = typingState[questionCode];

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        if (!testData[questionCode] || testData[questionCode].messages.length === 0) {
            const first = questionType.questions[0];
            setTestData({
                ...testData,
                [questionCode]: {
                    currentIndex: 0,
                    messages: [{ type: "bot", content: first.question }],
                    answers: {},
                    isCompleted: false,
                },
            });
        }
    }, []);

    useEffect(scrollToBottom, [testData[questionCode]?.messages]);

    const saveAnswers = async (ans) => {
        const endpointMap = {
            BIG5: apiDetails.endPoint.personalityTest,
            TIA: apiDetails.endPoint.intrestTest,
            LNT: apiDetails.endPoint.skillTest,
            MIT: apiDetails.endPoint.multipleInterest,
        };

        const apiEnd = endpointMap[questionCode];
        if (!apiEnd) return;

        const res = await post(`${apiEnd}?userId=25`, ans);
        return res;
    };

    const mutation = useMutation({
        mutationFn: saveAnswers,
        onSuccess: () => successNotify("Assessment Saved!"),
        onError: (err) => errorNotify(err.message),
    });

    const getBotReply = (answer) => {
        if (typeof answer === "string") {
            const ans = answer.toLowerCase();
            if (ans.includes("yes")) return "👍 Noted. Let’s explore further.";
            if (ans.includes("no")) return "🧠 Understood. Every perspective counts.";
            if (ans.includes("maybe")) return "🤔 Ambiguity is a part of self-awareness. Let’s continue.";
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

        if (nextIndex < questionType.questions.length) {
            const nextQ = { type: "bot", content: questionType.questions[nextIndex].question };
            setTestData({
                ...testData,
                [questionCode]: {
                    ...currentData,
                    messages: [...updatedMsgs, nextQ],
                    currentIndex: nextIndex,
                    answers: updatedAnswers,
                },
            });
        } else {
            setTestData({
                ...testData,
                [questionCode]: {
                    ...currentData,
                    messages: [...updatedMsgs, { type: "bot", content: "🎉 You've finished the questions!" }],
                    answers: updatedAnswers,
                    isCompleted: true,
                },
            });
            mutation.mutate(updatedAnswers);
        }
    };

    const handleAnswer = (answer) => {
        const currentData = testData[questionCode];
        const currentQuestion = questionType.questions[currentData.currentIndex];
        const isSingle = questionType.type === "single";

        const displayText = isSingle && typeof answer === "object" ? `${answer.label} (${answer.value})` : answer;
        const answerValue = isSingle && typeof answer === "object" ? answer.value : answer;

        const userMsg = { type: "user", content: displayText };
        const botReply = { type: "bot", content: getBotReply(answerValue) };
        const updatedAnswers = { ...currentData.answers, [currentQuestion.id]: answerValue };
        const updatedMsgs = [...currentData.messages, userMsg, botReply];

        setTestData({
            ...testData,
            [questionCode]: {
                ...currentData,
                answers: updatedAnswers,
                messages: updatedMsgs,
            },
        });

        setTypingState((prev) => ({ ...prev, [questionCode]: true }));

        setTimeout(() => {
            setTypingState((prev) => ({ ...prev, [questionCode]: false }));
            handleNext(updatedAnswers, updatedMsgs);
        }, 800);
    };

    const currentData = testData[questionCode];
    const currentQuestion = questionType.questions[currentData?.currentIndex || 0];
    const isRange = questionType.type === "range";
    const isSingle = questionType.type === "single";

    return (
        <div className="flex flex-col rounded-md bg-gray-100 shadow-sm">
            <div className="flex items-center justify-between border bg-green-500 px-3 pb-2 pt-3 text-sm">
                <button
                    onClick={onBackToWelcome}
                    className="flex items-center text-white duration-200 hover:underline"
                >
                    <Home
                        size={16}
                        className="mr-1"
                    />{" "}
                    Home
                </button>
            </div>

            <div className="custom-scrollbar flex-1 space-y-3 overflow-y-auto px-4 pr-1 pt-2 md:px-6">
                {currentData?.messages.map((msg, idx) => (
                    <div
                        key={idx}
                        className={`max-w-[75%] whitespace-pre-wrap break-words rounded-xl px-4 py-3 text-sm shadow-md ${
                            msg.type === "user" ? "ml-auto rounded-br-none bg-blue-500 text-white" : "mr-auto rounded-bl-none bg-white text-gray-800"
                        }`}
                    >
                        {msg.content}
                    </div>
                ))}
                <div ref={messagesEndRef} />
            </div>

            {!currentData?.isCompleted && (
                <div className="mt-4 px-4 pb-3">
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
                                <div className="space-y-3">
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
                                <div className="mt-4 space-y-2">
                                    {currentQuestion.options.map((option, index) => (
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

            <div className="flex items-center justify-between border bg-green-500 px-3 pb-2 pt-3 text-sm">
                <button
                    onClick={onBackToWelcome}
                    className={`flex items-center text-white duration-200 hover:underline ${mutation.isPending ? "cursor-not-allowed" : "cursor-pointer"}`}
                    disabled={mutation.isPending}
                >
                    <ArrowLeft
                        size={16}
                        className="mr-1"
                    />{" "}
                    Back
                </button>

                <span className="text-white">
                    {currentData?.currentIndex + 1}/{questionType.questions.length}
                </span>
            </div>
        </div>
    );
};

export default QuestionScreen;
