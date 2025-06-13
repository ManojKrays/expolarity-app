import React, { useEffect, useRef, useState } from "react";
import { Home } from "lucide-react";
import { InterestTest } from "../utils/data";
import { useMutation } from "@tanstack/react-query";
import { post } from "../config/network";
import apiDetails from "../config/apiDetails";
import { errorNotify, successNotify } from "../service/Messagebar";

const InterestScreen = ({ onBackToWelcome, testData, setTestData }) => {
    const messagesEndRef = useRef(null);
    const scrollToBottom = () => messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });

    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [currentOptionIndex, setCurrentOptionIndex] = useState(0);
    const [typing, setTyping] = useState(false);
    const [timer, setTimer] = useState(0);

    const timerRef = useRef(null);
    const questionBlocks = InterestTest[0].questions;
    const currentQuestion = questionBlocks[currentQuestionIndex];
    const currentRow = currentQuestion.options[currentOptionIndex];

    const currentData = testData["TIA"];

    useEffect(() => {
        if (!currentData || currentData.messages.length === 0) {
            const firstQuestion = questionBlocks[0].options[0].question;
            setTestData((prev) => ({
                ...prev,
                TIA: {
                    currentIndex: 0,
                    currentOptionIndex: 0,
                    messages: [{ type: "bot", content: firstQuestion }],
                    answers: {},
                    isCompleted: false,
                    elapsedTime: 0,
                },
            }));
        } else {
            setCurrentQuestionIndex(currentData.currentIndex || 0);
            setCurrentOptionIndex(currentData.currentOptionIndex || 0);
            setTimer(currentData.elapsedTime || 0);
        }
    }, []);

    useEffect(scrollToBottom, [currentData?.messages]);

    useEffect(() => {
        if (!currentData?.isCompleted) {
            timerRef.current = setInterval(() => {
                setTimer((prev) => {
                    const updatedTime = prev + 1;
                    setTestData((prevData) => ({
                        ...prevData,
                        TIA: {
                            ...prevData.TIA,
                            elapsedTime: updatedTime,
                        },
                    }));
                    return updatedTime;
                });
            }, 1000);
        }

        return () => clearInterval(timerRef.current);
    }, [currentData?.isCompleted]);

    const getBotReply = (answer) => {
        if (!answer || typeof answer !== "object") return "🧠 Got it! Let's keep going.";
        const label = answer.label.toLowerCase();
        if (label.includes("practical")) return "🛠️ You seem hands-on and grounded — that’s great!";
        if (label.includes("intuitive")) return "🔮 Trusting intuition can be a powerful asset.";
        if (label.includes("scientific")) return "🧪 A curious and analytical mind — we like that!";
        if (label.includes("insightful")) return "🌟 Deep thinking brings deep understanding.";
        if (label.includes("projects")) return "🚀 A go-getter! You like to take initiative.";
        if (label.includes("paper work")) return "📄 Diligence in detail is a solid strength.";
        if (label.includes("write") || label.includes("poetry") || label.includes("music")) return "🎨 You’ve got a creative spirit!";
        if (label.includes("calculations")) return "🔢 Logic and numbers are your tools!";
        if (label.includes("tinker")) return "🔧 A builder at heart — love the hands-on approach.";
        if (label.includes("help people")) return "❤️ Empathy and support — the world needs more of that.";
        if (label.includes("leadership") || label.includes("sales")) return "🎯 A natural leader with people skills!";
        if (label.includes("details")) return "🧐 Precision and attention — a rare and valuable trait.";
        return "✨ Interesting choice! Let’s see what comes next.";
    };

    const saveAnswers = async (ans) => {
        try {
            const headers = { assessment: 2, user: 25 };
            const res = await post(`${apiDetails.endPoint.saveTest}`, ans, { headers });
            return res;
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

    const handleAnswer = (answer) => {
        if (!currentRow || !currentRow.id) return;

        const updatedAnswers = {
            ...currentData.answers,
            [`${currentRow.id}`]: answer,
        };

        const newMessages = [...currentData.messages, { type: "user", content: answer.label }, { type: "bot", content: getBotReply(answer) }];

        const isLastRow = currentOptionIndex + 1 >= currentQuestion.options.length;
        const isLastQuestion = currentQuestionIndex + 1 >= questionBlocks.length;

        setTyping(true);

        setTimeout(() => {
            let newQuestionIndex = currentQuestionIndex;
            let newOptionIndex = currentOptionIndex;

            if (!isLastRow) {
                newMessages.push({ type: "bot", content: currentQuestion.options[currentOptionIndex + 1].question });
                newOptionIndex++;
            } else if (!isLastQuestion) {
                newMessages.push({ type: "bot", content: questionBlocks[currentQuestionIndex + 1].options[0].question });
                newQuestionIndex++;
                newOptionIndex = 0;
            } else {
                const finalAnswer = Object.values(updatedAnswers).reduce((acc, item) => {
                    const code = item.code;
                    if (!item || !item.code || !item.label) return acc;
                    if (!acc[code]) acc[code] = item.label;
                    else acc[code] += `, ${item.label}`;
                    return acc;
                }, {});

                mutation.mutate(finalAnswer);

                newMessages.push({ type: "bot", content: "🎉 You've finished the questions! Great job exploring your interests." });
                clearInterval(timerRef.current);
            }

            setTestData((prev) => ({
                ...prev,
                TIA: {
                    ...prev.TIA,
                    answers: updatedAnswers,
                    messages: newMessages,
                    isCompleted: isLastRow && isLastQuestion,
                    currentIndex: newQuestionIndex,
                    currentOptionIndex: newOptionIndex,
                },
            }));

            setCurrentQuestionIndex(newQuestionIndex);
            setCurrentOptionIndex(newOptionIndex);
            setTyping(false);
        }, 800);
    };

    const formatTime = (seconds) => `${Math.floor(seconds / 60)}:${String(seconds % 60).padStart(2, "0")}`;

    return (
        <div className="relative flex min-h-[424px] flex-col rounded-md bg-gray-100 shadow-sm">
            <div className="custom-scrollbar flex-1 space-y-3 overflow-y-auto px-4 pb-10 pr-1 pt-2 md:px-6">
                {currentData?.messages.map((msg, idx) => (
                    <div
                        key={idx}
                        className={`max-w-[75%] whitespace-pre-wrap break-words rounded-xl px-4 py-2 text-sm shadow-sm ${
                            msg.type === "user" ? "ml-auto rounded-br-none bg-blue-500 text-white" : "mr-auto rounded-bl-none bg-white text-gray-800"
                        }`}
                    >
                        {msg.content}
                    </div>
                ))}
                <div ref={messagesEndRef} />

                {!currentData?.isCompleted && !typing && (
                    <div className="grid grid-cols-3 gap-2 px-4 py-3">
                        {currentRow?.data?.map((opt, idx) => (
                            <button
                                key={idx}
                                onClick={() => handleAnswer(opt)}
                                className="flex flex-col items-center justify-center rounded-lg border border-gray-200 bg-white px-2 py-2 text-[11px] text-gray-700 hover:bg-gray-100"
                            >
                                <img
                                    src={opt.image}
                                    alt={opt.label}
                                    className="mb-1 h-8 w-8 object-contain"
                                />
                                <span className="text-center leading-tight">{opt.label}</span>
                            </button>
                        ))}
                    </div>
                )}

                {typing && (
                    <div className="mt-2 pb-3">
                        <div className="inline-flex items-center space-x-2 rounded-r-lg rounded-tl-lg bg-white px-4 py-2 text-xs text-gray-500 shadow">
                            <span>Typing</span>
                            <span className="flex items-center space-x-1">
                                <span className="block h-1 w-1 animate-bounce rounded-full bg-gray-400 [animation-delay:0ms]" />
                                <span className="block h-1 w-1 animate-bounce rounded-full bg-gray-400 [animation-delay:150ms]" />
                                <span className="block h-1 w-1 animate-bounce rounded-full bg-gray-400 [animation-delay:300ms]" />
                            </span>
                        </div>
                    </div>
                )}
            </div>

            <div className="fixed bottom-4 flex w-72 items-center justify-between rounded-b-xl border bg-green-500 px-3 pb-2 pt-3 text-sm sm:w-96">
                <span className="text-white">{formatTime(timer)}</span>

                <span className="text-white">
                    {currentQuestionIndex + 1}/{questionBlocks.length}
                </span>
            </div>
        </div>
    );
};

export default InterestScreen;
