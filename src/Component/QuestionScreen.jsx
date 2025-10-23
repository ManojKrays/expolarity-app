import React, { useEffect, useRef, useState } from "react";
import { CircleArrowLeft, Home } from "lucide-react";
import { get, post } from "../config/network";
import apiDetails from "../config/apiDetails";
import { useMutation, useQuery } from "@tanstack/react-query";
import { successNotify, errorNotify } from "../service/Messagebar";
import useAuthStore from "../store/authStore";
import hourGlass from "../assets/hourGlass.gif";
import useUnsavedChangesWarning from "../hooks/useUnsavedChangesWarning";
import userImg from "../assets/UserProfile.png";
import bot from "../assets/xpolar.png";

const QuestionScreen = ({ questionType, testData, setTestData, onBackToWelcome }) => {
    const user = useAuthStore((state) => state.user);
    const userId = useAuthStore((state) => state?.user?.id);

    const messagesEndRef = useRef(null);
    const questionCode = questionType?.section;
    const [typingState, setTypingState] = useState({});
    const isTyping = typingState[questionCode];

    const [timer, setTimer] = useState(0);
    const timerRef = useRef(null);

    const currentData = testData[questionCode];

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

        if (!currentData || currentData.messages.length === 0) {
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
                        elapsedTime: 0,
                    },
                };
            });
        } else {
            setTimer(currentData.elapsedTime || 0);
        }
    }, [questions, questionCode, setTestData]);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [testData[questionCode]?.messages]);

    useEffect(() => {
        if (!currentData?.isCompleted) {
            timerRef.current = setInterval(() => {
                setTimer((prev) => {
                    const updatedTime = prev + 1;
                    setTestData((prevData) => ({
                        ...prevData,
                        [questionCode]: {
                            ...prevData[questionCode],
                            elapsedTime: updatedTime,
                        },
                    }));
                    return updatedTime;
                });
            }, 1000);
        }

        return () => clearInterval(timerRef.current);
    }, [currentData?.isCompleted, questionCode, setTestData]);

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

    const updateUser = useAuthStore((state) => state?.updateUser);

    const mutation = useMutation({
        mutationFn: saveAnswers,
        onSuccess: () => {
            successNotify("Assessment Saved!");
            const currentAssessments = user?.assessments ? user.assessments.split(",") : [];
            if (!currentAssessments.includes(String(questionType.id))) {
                currentAssessments.push(String(questionType.id));
            }
            updateUser({ assessments: currentAssessments.join(",") });
        },
        onError: (err) => errorNotify(err.message),
    });

    const getBotReply = (answer) => {
        if (typeof answer === "string") {
            const lower = answer.toLowerCase();
            if (lower.includes("yes")) return "Great! I'm excited to learn more about you.";
            if (lower.includes("no")) return "No worries, everyone sees things differently. Let's keep going.";
            if (lower.includes("maybe")) return "That’s okay! Figuring things out is part of the journey.";
        } else if (typeof answer === "number") {
            return (
                [
                    "You really don’t agree — and that’s totally fine. It helps us understand you better.",
                    "You disagree — got it. Your opinion matters here.",
                    "You’re not sure — staying in the middle is completely okay.",
                    "You agree — thanks for being open with your thoughts.",
                    "You really agree — love that confidence! Let’s keep going.",
                ][answer - 1] || "Thanks for your answer! Let’s move to the next one."
            );
        }
        return "Thanks for sharing! Let's keep learning more about you.";
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
                    messages: [
                        ...updatedMsgs,
                        { type: "bot", content: `Well done${" "} ${user.name}! You’ve unlocked the next step. Go to Home to start the next test.` },
                    ],
                    answers: updatedAnswers,
                    isCompleted: true,
                },
            }));
            mutation.mutate(updatedAnswers);
            clearInterval(timerRef.current);
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

    const formatTime = (seconds) => `${Math.floor(seconds / 60)}:${String(seconds % 60).padStart(2, "0")}`;

    const currentQuestion = questions?.[currentData?.currentIndex || 0];
    const isRange = questionType.type === "RATING";
    const isSingle = questionType.type === "SINGLE";

    const isDirty = !currentData?.isCompleted;

    useUnsavedChangesWarning(isDirty);

    return (
        <>
            {isLoading ? (
                <div className="min-h-[424px] flex-col rounded-md px-6 pt-5 md:pt-0">
                    <div className="mt-2 flex items-center gap-3 pb-5">
                        <div className="h-8 w-8 flex-shrink-0 overflow-hidden rounded-full">
                            <img
                                src={bot}
                                alt="bot icon"
                                className="h-8 w-8"
                            />
                        </div>

                        <div className="inline-flex items-center space-x-2 rounded-r-lg rounded-tl-lg bg-white px-4 py-2 font-mallanna text-[15px] text-gray-500 shadow">
                            <span>Typing</span>
                            <span className="flex items-center space-x-1">
                                <span className="block h-1 w-1 animate-bounce rounded-full bg-gray-400 [animation-delay:0ms]"></span>
                                <span className="block h-1 w-1 animate-bounce rounded-full bg-gray-400 [animation-delay:150ms]"></span>
                                <span className="block h-1 w-1 animate-bounce rounded-full bg-gray-400 [animation-delay:300ms]"></span>
                            </span>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="bg- relative flex flex-col rounded-md pt-2 font-mallanna lg:pt-0">
                    <div>
                        <div className="fixed right-2 top-20 z-30 flex flex-col items-center">
                            <img
                                src={hourGlass}
                                alt="hourGlass"
                                className="h-10 w-10 hidden md:block"
                                />
                            <span className="text-xs text-[#12703C] hidden md:block">{formatTime(timer)}</span>
                        </div>

                        <div className="fixed left-0 right-0 flex justify-center md:left-40 md:top-0 lg:left-60 xl:left-80">
                            <div className="fixed w-full rounded-md border-b border-gray-200 bg-gray-50 px-6 py-4 md:w-[75%] lg:w-[70%] xl:w-[76%]">
                                <div className="mb-2 flex items-center justify-between">
                                    <span className="text-sm font-medium text-gray-800">
                                        Question {currentData?.currentIndex + 1} of {questions?.length}
                                    </span>
                                    <span className="text-sm text-gray-500">
                                        {Math.round(((currentData?.currentIndex + 1) / questions?.length) * 100)}% Complete
                                    </span>
                                </div>

                                <div className="h-2 w-full overflow-hidden rounded-full bg-gray-200">
                                    <div
                                        className="h-full bg-[#12703C] transition-all duration-300"
                                        style={{
                                            width: `${((currentData?.currentIndex + 1) / questions?.length) * 100}%`,
                                        }}
                                    ></div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="custom-scrollbar scrollable flex-1 space-y-3 overflow-y-auto px-4 pb-40 pr-1 pt-20 md:px-6">
                        {currentData?.messages.map((msg, idx) => {
                            const isBot = msg.type === "bot";
                            const isLastBot = isBot && (idx === currentData.messages.length - 1 || currentData.messages[idx + 1]?.type !== "bot");

                            return (
                                <div
                                    key={idx}
                                    className={`flex max-w-[75%] items-end space-x-2 ${msg.type === "user" ? "ml-auto flex-row-reverse space-x-reverse" : "mr-auto"}`}
                                >
                                    <div className="h-8 w-8 flex-shrink-0 overflow-hidden rounded-full">
                                        {isBot && isLastBot && (
                                            <img
                                                src={bot}
                                                alt="bot icon"
                                                className="h-8 w-8"
                                            />
                                        )}
                                        {msg.type === "user" && (
                                            <img
                                                src={userImg}
                                                alt="user icon"
                                                className="h-8 w-8"
                                            />
                                        )}
                                    </div>
                                    <div
                                        className={`whitespace-pre-wrap break-words rounded-xl px-4 py-2 text-[16px] shadow-sm ${
                                            msg.type === "user"
                                                ? "rounded-br-none bg-[#12703C] text-white"
                                                : "rounded-bl-none bg-[#C9E9CE] text-gray-800"
                                        }`}
                                    >
                                        {msg.content}
                                    </div>
                                </div>
                            );
                        })}

                        <div ref={messagesEndRef} />

                        {!currentData?.isCompleted && (
                            <div className="mt-4 pb-10">
                                {isTyping ? (
                                    <div className="mt-2 flex items-center gap-3 pb-5">
                                        <div className="h-8 w-8 flex-shrink-0 overflow-hidden rounded-full">
                                            <img
                                                src={bot}
                                                alt="bot icon"
                                                className="h-8 w-8"
                                            />
                                        </div>
                                        <div className="inline-flex items-center space-x-2 rounded-r-lg rounded-tl-lg bg-white px-4 py-2 text-[16px] text-gray-500 shadow">
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
                                        {isSingle && (
                                            <div className="ml-auto mt-4 max-w-[75%] space-y-2 px-3 pb-2">
                                                {currentQuestion?.options.map((option, index) => (
                                                    <button
                                                        key={index}
                                                        onClick={() => handleAnswer(option)}
                                                        className="w-full rounded-md border border-blue-300 bg-white px-4 py-2 text-left text-[15px] font-medium text-gray-800 shadow-sm transition-all duration-200 hover:bg-blue-100 hover:text-blue-700"
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

                        {currentData?.isCompleted && (
                            <div className="flex items-center justify-center pb-8">
                                <button
                                    className="flex items-center justify-center gap-2 rounded-md bg-green-500 px-2 py-1 text-white"
                                    onClick={() => onBackToWelcome()}
                                >
                                    <Home size={14} />
                                    Home
                                </button>
                            </div>
                        )}

                        <div className="fixed left-0 right-0 flex justify-center md:left-40 md:top-0 lg:left-60 xl:left-80">
                            <div className="fixed bottom-2 flex w- flex-col  md:w-[75%] lg:w-[70%] xl:w-[76%]">
                                {isRange && (
                                    <div className="w-full rounded-t-md border-2 border-gray-200 bg-gray-100 p-4 font-mallanna">
                                        <div className="mb-2 flex space-x-28 text-[14px] text-gray-600">
                                            <span>Strongly Disagree</span>
                                            <span>Strongly Agree</span>
                                        </div>
                                        <div className="flex items-center justify-start space-x-4 md:space-x-6">
                                            {[1, 2, 3, 4, 5].map((val) => (
                                                <button
                                                    key={val}
                                                    onClick={() => handleAnswer(val)}
                                                    className="h-10 w-10 rounded-full border-2 border-[#12703C] bg-white text-[14px] font-semibold transition-all duration-200 hover:scale-105 hover:border-gray-400"
                                                >
                                                    {val}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                <div className="w-full rounded-b-md border border-[#12703C] bg-white">
                                    <input
                                        type="text"
                                        placeholder="Ask anything..."
                                        className="w-full rounded-md bg-white p-2  shadow-sm outline-none"
                                        disabled={true}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default QuestionScreen;
