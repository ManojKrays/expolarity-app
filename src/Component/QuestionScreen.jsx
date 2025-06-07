import React, { useEffect, useRef, useState } from "react";
import { ArrowLeft, Home } from "lucide-react";

const QuestionScreen = ({ questionType, onBackToWelcome, isLoading }) => {
    const [messages, setMessages] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [showOptions, setShowOptions] = useState(true);
    const [answers, setAnswers] = useState({});
    const [isCompleted, setIsCompleted] = useState(false);
    const messagesEndRef = useRef(null);
    const [multiSelections, setMultiSelections] = useState({});

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
        const isSingle = questionType.type === "single";

        // Determine message content and stored value
        const displayText = isSingle && typeof answer === "object" ? `${answer.label} (${answer.value})` : answer;

        const answerValue = isSingle && typeof answer === "object" ? answer.value : answer;

        const userMsg = { type: "user", content: displayText };
        const botReply = { type: "bot", content: getBotReply(answerValue) };

        const updatedAnswers = { ...answers, [currentQuestion.id]: answerValue };
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
                setIsCompleted(true);
                setTimeout(() => {
                    console.log("Final Answers:", updatedAnswers);
                    onBackToWelcome();
                }, 2000);
            }
        }, 1000);
    };

    const currentQuestion = questionType.questions[currentIndex];
    const isRange = questionType.type === "range";
    const isSingle = questionType.type === "single";
    const isMulti = questionType.type === "multi";

    const handleMultiSelect = (rowIndex, label) => {
        const updatedSelections = { ...multiSelections, [rowIndex]: label };
        setMultiSelections(updatedSelections);

        // Check if all rows for this question have a selection
        const current = questionType.questions[currentIndex];
        if (Object.keys(updatedSelections).length === current.options.length) {
            // Small delay so UI updates before submit
            setTimeout(() => {
                handleMultiSubmit(updatedSelections);
            }, 200);
        }
    };

    const handleMultiSubmit = (selections = multiSelections) => {
        const allAnswers = Object.values(selections).join(", ");
        const currentQuestion = questionType.questions[currentIndex];
        const userMsg = { type: "user", content: allAnswers };
        const botReply = { type: "bot", content: getBotReply(allAnswers) };

        const updatedAnswers = { ...answers, [currentQuestion.id]: allAnswers };
        setAnswers(updatedAnswers);
        setMessages([...messages, userMsg, botReply]);
        setMultiSelections({});
        setShowOptions(false);

        setTimeout(() => {
            const nextIndex = currentIndex + 1;
            if (nextIndex < questionType.questions.length) {
                const nextQ = { type: "bot", content: questionType.questions[nextIndex].question };
                setMessages((prev) => [...prev, nextQ]);
                setCurrentIndex(nextIndex);
                setShowOptions(true);
            } else {
                // All questions completed — print all Q&A in console
                console.log("All questions completed. Answers:", updatedAnswers);

                setMessages((prev) => [...prev, { type: "bot", content: "🎉 You've completed all questions!" }]);
                setIsCompleted(true);
            }
        }, 500);
    };

    const chunkArray = (arr, size = 4) => {
        const chunks = [];
        for (let i = 0; i < arr.length; i += size) {
            chunks.push(arr.slice(i, i + size));
        }
        return chunks;
    };

    const renderMultiRows = () => {
        const current = questionType.questions[currentIndex];
        return (
            <div className="space-y-4 text-sm text-gray-700">
                {current.options.map((group, groupIndex) => {
                    const [key, values] = Object.entries(group)[0];
                    const options = values.split(",\n");

                    // split options into chunks of 4
                    const optionChunks = chunkArray(options, 4);

                    return (
                        <div key={groupIndex}>
                            {optionChunks.map((chunk, rowIndex) => (
                                <div
                                    key={rowIndex}
                                    className="mb-3"
                                >
                                    {/* Row label */}
                                    <div className="mb-1 select-none font-medium text-blue-600">{groupIndex + 1}:</div>

                                    {/* Pills row */}
                                    <div className="flex flex-wrap gap-2">
                                        {chunk.map((label, i) => (
                                            <button
                                                key={i}
                                                className={`cursor-pointer rounded-full border px-4 py-1.5 text-xs transition sm:text-sm ${
                                                    multiSelections[groupIndex] === label
                                                        ? "border-blue-600 bg-blue-600 text-white"
                                                        : "border-gray-300 bg-white text-gray-700 hover:bg-blue-100"
                                                } `}
                                                onClick={() => handleMultiSelect(groupIndex, label)}
                                                style={{ minWidth: "70px", textAlign: "center" }}
                                            >
                                                {label}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    );
                })}

                {/* {Object.keys(multiSelections).length === current.options.length && (
                    <button
                        className="mt-4 rounded bg-green-600 px-5 py-2 font-semibold text-white transition hover:bg-green-700"
                        onClick={handleMultiSubmit}
                    >
                        Submit
                    </button>
                )} */}
            </div>
        );
    };

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

            {showOptions ? (
                <div className="mt-4 px-4 pb-3">
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
                                    {`${option.value})
                                    ${option.label}`}
                                </button>
                            ))}
                        </div>
                    )}

                    {isMulti ? (
                        renderMultiRows()
                    ) : (
                        <div className="space-x-2">
                            {currentQuestion.options.map((option, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => handleAnswer(option)}
                                    className="rounded border bg-white px-4 py-2 hover:bg-gray-100"
                                >
                                    {option.label || option}
                                </button>
                            ))}
                        </div>
                    )}
                </div>
            ) : (
                !isCompleted && (
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
                )
            )}

            <div className="flex items-center justify-between border bg-green-500 px-3 pb-2 pt-3 text-sm">
                <button
                    onClick={onBackToWelcome}
                    className="flex items-center text-white duration-200 hover:underline"
                >
                    <ArrowLeft
                        size={16}
                        className="mr-1"
                    />
                    Back
                </button>
            </div>
        </div>
    );
};

export default QuestionScreen;
