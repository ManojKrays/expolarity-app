import React, { useEffect, useRef, useState } from "react";
import { Home } from "lucide-react";
import { InterestTest } from "../utils/data";
import { useMutation } from "@tanstack/react-query";
import { post } from "../config/network";
import apiDetails from "../config/apiDetails";
import { errorNotify, successNotify } from "../service/Messagebar";
import useAuthStore from "../store/authStore";
import hourGlass from "../assets/hourGlass.gif";

const InterestScreen = ({ onBackToWelcome, testData, setTestData }) => {
    const messagesEndRef = useRef(null);
    const scrollToBottom = () => messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });

    const user = useAuthStore((state) => state.user);

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
        if (!answer || typeof answer !== "object") return "Got it! Let’s keep moving and see what else we find.";

        const label = answer.label.toLowerCase();

        if (label.includes("practical")) return "You seem like someone who likes getting things done — that's a strong skill!";
        if (label.includes("intuitive")) return "Trusting your gut often leads to great insights. That’s a cool strength!";
        if (label.includes("scientific")) return "You’ve got a curious, thinking mind — science suits you well!";
        if (label.includes("insightful")) return "You think deeply — that kind of reflection is powerful.";
        if (label.includes("projects")) return "You love jumping into action — that energy can take you far!";
        if (label.includes("paper work")) return "You’ve got focus and patience — not many people enjoy the details like you do!";
        if (label.includes("write") || label.includes("poetry") || label.includes("music"))
            return "You've got a creative heart — that's something special!";
        if (label.includes("calculations")) return "Numbers and logic come naturally to you — that’s a strong foundation.";
        if (label.includes("tinker")) return "You like figuring things out hands-on — a real problem solver!";
        if (label.includes("help people")) return "You care about others — that’s a beautiful and powerful quality.";
        if (label.includes("leadership") || label.includes("sales")) return "You seem confident with people — a born leader, maybe!";
        if (label.includes("details")) return "You’ve got a sharp eye — that kind of focus is rare and important.";

        return "That tells me something interesting about you! Let’s keep going.";
    };

    const userId = useAuthStore((state) => state?.user?.id);
    const updateUser = useAuthStore((state) => state?.updateUser);

    const saveAnswers = async (ans) => {
        try {
            if (userId) {
                const headers = { assessment: 2, user: userId };
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
        onSuccess: (data) => {
            successNotify("Assessment Saved!");
            const resultId = data?.data?.result_id;
            if (resultId) {
                console.log(resultId);
                const currentAssessments = user?.assessments ? user.assessments.split(",") : [];
                currentAssessments.push("2");
                updateUser({ assessments: currentAssessments.join(",") });
            }
        },
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

                newMessages.push({
                    type: "bot",
                    content: `Well done${" "} ${user.name}! You’ve unlocked the next step. Go to Home to start the next test.`,
                });
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
        <div className="relative flex flex-col rounded-md bg-gray-100 font-mallanna">
            <div className="sticky top-0 z-30 flex justify-end pr-5 pt-2">
                <div className="absolute flex flex-col items-center">
                    <img
                        src={hourGlass}
                        alt="hourGlass"
                        className="h-10 w-10"
                    />
                    <span className="text-xs text-green-600">{formatTime(timer)}</span>
                </div>

                <div className="fixed right-0 top-1 flex items-center justify-between rounded-md bg-green-500 px-3 pb-2 pt-3 text-sm md:right-14 md:top-1.5">
                    <span className="text-white">
                        Question Set - {currentQuestionIndex + 1}/{questionBlocks.length}
                    </span>
                </div>
            </div>

            <div className="custom-scrollbar flex-1 space-y-3 overflow-y-auto px-4 pb-10 pr-1 pt-2 md:px-6">
                {currentData?.messages.map((msg, idx) => (
                    <div
                        key={idx}
                        className={`max-w-[75%] whitespace-pre-wrap break-words rounded-xl px-4 py-2 text-sm shadow-sm ${
                            msg.type === "user" ? "ml-auto rounded-br-none bg-sky-200" : "mr-auto rounded-bl-none bg-white text-gray-800"
                        }`}
                    >
                        {msg.content}
                    </div>
                ))}
                <div ref={messagesEndRef} />

                {typing && (
                    <div className="mt-2 pb-5">
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

                <div className="pb-10">
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
                </div>

                {currentData?.isCompleted && (
                    <div className="flex items-center justify-center pb-10">
                        <button
                            className="flex items-center justify-center gap-2 rounded-md bg-green-500 px-2 py-1 text-white"
                            onClick={() => onBackToWelcome()}
                        >
                            <Home size={14} />
                            Home
                        </button>
                    </div>
                )}
            </div>

            <div className="fixed bottom-2 w-full px-4 md:w-[80%] md:px-6 lg:w-[67%]">
                <input
                    type="text"
                    name=""
                    id=""
                    placeholder="Ask anything..."
                    className="w-full rounded-md border bg-white p-2 py-4 shadow-sm outline-none"
                    disabled={true}
                />
            </div>
        </div>
    );
};

export default InterestScreen;
