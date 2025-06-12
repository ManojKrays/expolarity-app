import React, { useEffect, useRef, useState } from "react";
import { ArrowLeft, Home } from "lucide-react";
import { InterestTest } from "../utils/data";

const InterestScreen = ({ onBackToWelcome, testData, setTestData }) => {
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });

    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [currentOptionIndex, setCurrentOptionIndex] = useState(0);
    const [typing, setTyping] = useState(false);

    const questionBlocks = InterestTest[0].questions;
    const currentQuestion = questionBlocks[currentQuestionIndex];
    const currentRow = currentQuestion.options[currentOptionIndex];

    const currentData = testData["TIA"];

    useEffect(() => {
        if (!currentData || currentData.messages.length === 0) {
            setTestData((prev) => ({
                ...prev,
                TIA: {
                    currentIndex: 0,
                    messages: [{ type: "bot", content: currentQuestion.options[0].question }],
                    answers: {},
                    isCompleted: false,
                },
            }));
        } else {
            setCurrentQuestionIndex(currentData.currentIndex || 0);
        }
    }, []);

    useEffect(scrollToBottom, [currentData?.messages]);

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

    const handleAnswer = (answer) => {
        const updatedAnswers = {
            ...currentData.answers,
            [`${currentRow.id}`]: answer,
        };

        const newMessages = [...currentData.messages, { type: "user", content: answer.label }, { type: "bot", content: getBotReply(answer) }];

        const isLastRow = currentOptionIndex + 1 >= currentQuestion.options.length;
        const isLastQuestion = currentQuestionIndex + 1 >= questionBlocks.length;

        setTyping(true);

        setTimeout(() => {
            if (!isLastRow) {
                newMessages.push({
                    type: "bot",
                    content: currentQuestion.options[currentOptionIndex + 1].question,
                });

                setCurrentOptionIndex((prev) => prev + 1);
            } else if (!isLastQuestion) {
                newMessages.push({
                    type: "bot",
                    content: questionBlocks[currentQuestionIndex + 1].options[0].question,
                });

                setCurrentQuestionIndex((prev) => prev + 1);
                setCurrentOptionIndex(0);
            } else {
                const finalAnswer = Object.values(updatedAnswers).reduce((acc, item) => {
                    const code = item.code;
                    if (!acc[code]) {
                        acc[code] = [];
                    }
                    acc[code].push(item.label);
                    return acc;
                }, {});

                console.log("🎯 Final Answers:", finalAnswer);
                newMessages.push({
                    type: "bot",
                    content: "🎉 You've finished the questions! Great job exploring your interests.",
                });
                setTyping(false);
            }

            setTestData((prev) => ({
                ...prev,
                TIA: {
                    ...prev.TIA,
                    answers: updatedAnswers,
                    messages: newMessages,
                    isCompleted: isLastRow && isLastQuestion,
                    currentIndex: currentQuestionIndex,
                },
            }));

            setTyping(false);
        }, 800);
    };

    return (
        <div className="flex h-full flex-col rounded-md bg-gray-100 shadow-sm">
            <div className="flex items-center justify-between border bg-green-500 px-3 pb-2 pt-3 text-sm">
                <button
                    onClick={onBackToWelcome}
                    className="flex items-center text-white duration-200 hover:underline"
                >
                    <Home
                        size={16}
                        className="mr-1"
                    />
                    Home
                </button>
            </div>

            <div className="custom-scrollbar flex-1 space-y-3 overflow-y-auto px-4 pr-1 pt-2 md:px-6">
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

            <div className="flex items-center justify-between border bg-green-500 px-3 pb-2 pt-3 text-sm">
                <button
                    onClick={onBackToWelcome}
                    className={`flex cursor-pointer items-center text-white duration-200 hover:underline`}
                >
                    <ArrowLeft
                        size={16}
                        className="mr-1"
                    />
                    Back
                </button>
                <span className="text-white">
                    {currentQuestionIndex + 1}/{InterestTest[0].questions.length}
                </span>
            </div>
        </div>
    );
};

export default InterestScreen;
