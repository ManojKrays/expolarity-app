import React, { useEffect, useRef, useState } from "react";
import { Home } from "lucide-react";

const QuestionScreen = ({ questionType, onBackToWelcome }) => {
    const [messages, setMessages] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [showOptions, setShowOptions] = useState(true);
    const [answers, setAnswers] = useState({});
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        const first = questionType.questions[0];
        setMessages([{ type: "bot", content: first.question }]);
    }, []);

    useEffect(scrollToBottom, [messages]);

    const getBotReply = (answer) => {
        if (typeof answer === "string") {
            const ans = answer.toLowerCase();
            if (ans.includes("yes")) return "👍 Noted. Let’s explore further.";
            if (ans.includes("no")) return "🧠 Understood. Every perspective counts.";
            if (ans.includes("maybe")) return "🤔 Ambiguity is a part of self-awareness. Let’s continue.";
        } else if (typeof answer === "number") {
            switch (answer) {
                case 1:
                    return "🟥 You strongly disagreed — thank you for your clarity. Let’s move on.";
                case 2:
                    return "🔵 You disagreed. Your self-awareness is appreciated.";
                case 3:
                    return "🟡 A neutral stance — staying balanced is also insightful.";
                case 4:
                    return "🟢 You agreed. Thanks for reflecting openly.";
                case 5:
                    return "🟩 Strong agreement — your confidence is noted. Let’s continue.";
                default:
                    return "📘 Thanks! Let’s keep going.";
            }
        }
        return "📘 Thank you. Let’s proceed.";
    };

    const handleAnswer = (answer) => {
        const currentQuestion = questionType.questions[currentIndex];
        const userMsg = { type: "user", content: answer };
        const botReply = { type: "bot", content: getBotReply(answer) };

        const updatedAnswers = { ...answers, [currentQuestion.id]: answer };
        setAnswers(updatedAnswers);

        const updatedMsgs = [...messages, userMsg, botReply];
        setMessages(updatedMsgs);
        setShowOptions(false);

        setTimeout(() => {
            const nextIndex = currentIndex + 1;
            if (nextIndex < questionType.questions.length) {
                const nextQ = {
                    type: "bot",
                    content: questionType.questions[nextIndex].question,
                };
                setMessages([...updatedMsgs, nextQ]);
                setCurrentIndex(nextIndex);
                setShowOptions(true);
            } else {
                setMessages([...updatedMsgs, { type: "bot", content: "🎉 You've finished the questions!" }]);
                setTimeout(() => {
                    console.log("Final Answers:", updatedAnswers); // ✅ Contains all 20 answers
                    onBackToWelcome();
                }, 2000);
            }
        }, 1000);
    };

    const currentQuestion = questionType.questions[currentIndex];
    const isRange = questionType.type === "range";

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
                    />
                    Home
                </button>
                <span className="text-white">
                    {currentIndex + 1}/{questionType.questions.length}
                </span>
            </div>

            <div className="custom-scrollbar flex-1 space-y-3 overflow-y-auto px-4 pr-1 pt-2 md:px-6">
                {messages.map((msg, idx) => (
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

            {showOptions && (
                <div className="mt-4 px-4 pb-3">
                    {isRange ? (
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
                    ) : (
                        <div className="space-y-2">
                            {currentQuestion.options.map((option, index) => (
                                <button
                                    key={index}
                                    onClick={() => handleAnswer(option)}
                                    className="w-full rounded-lg border border-gray-300 bg-white p-3 text-left text-sm font-medium text-gray-800 hover:bg-gray-100"
                                >
                                    {option}
                                </button>
                            ))}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default QuestionScreen;
