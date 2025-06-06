import React, { useState } from "react";
import { MessageCircle, X } from "lucide-react";
import WelcomeScreen from "./WelcomeScreen";
import QuestionScreen from "./QuestionScreen";
import { questionTypes } from "../utils/data";
import { get } from "../config/network";
import apiDetails from "../config/apiDetails";
import { useQuery } from "@tanstack/react-query";

const ChatBot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [currentScreen, setCurrentScreen] = useState("welcome");
    const [selectedQuestionType, setSelectedQuestionType] = useState(null);
    const [isCompleted, setIsCompleted] = useState([{ personality: false, intrest: false, career: false }]);

    const handleQuestionTypeSelect = (questionType) => {
        setSelectedQuestionType(questionType);
        setCurrentScreen("questions");
    };

    const handleBackToWelcome = () => {
        setCurrentScreen("welcome");
        setSelectedQuestionType(null);
    };

    const fetchAssessment = async () => {
        const res = await get(apiDetails.endPoint.getAssessment);

        const grouped = res.data.reduce((acc, curr) => {
            if (!acc[curr.type]) acc[curr.type] = [];
            acc[curr.type].push(curr);
            return acc;
        }, {});

        // === RANGE (RATING) ===
        const rangeQuestions = (grouped.RATING || []).map((q) => ({
            id: q.id,
            question: q.question,
        }));

        // === SINGLE ===
        const singleQuestions = (grouped.SINGLE || []).map((q) => ({
            id: q.id,
            question: q.question,
            options: [
                q.option_a ? { value: "A", label: q.option_a } : null,
                q.option_b ? { value: "B", label: q.option_b } : null,
                q.option_c ? { value: "C", label: q.option_c } : null,
                q.option_d ? { value: "D", label: q.option_d } : null,
                q.option_e ? { value: "E", label: q.option_e } : null,
            ].filter(Boolean),
        }));

        // === MULTI ===
        const multiQuestions = (grouped.MULTI || []).map((q) => {
            const optionObjects = [
                q.artistic ? { artistic: q.artistic } : null,
                q.conventional ? { conventional: q.conventional } : null,
                q.enterprising ? { enterprising: q.enterprising } : null,
                q.investigative ? { investigative: q.investigative } : null,
                q.realistic ? { realistic: q.realistic } : null,
                q.social ? { social: q.social } : null,
            ].filter(Boolean);

            return {
                id: q.id,
                question: q.question,
                options: optionObjects,
            };
        });

        return [
            {
                id: "agreement",
                title: "Range Question",
                emoji: "📊",
                color: "bg-green-500",
                type: "range",
                questions: rangeQuestions,
            },
            {
                id: "personality",
                title: "Single Questions",
                emoji: "🧠",
                color: "bg-gray-400",
                type: "single",
                questions: singleQuestions,
            },
            {
                id: "preference",
                title: "Multi Questions",
                emoji: "🔘",
                color: "bg-blue-400",
                type: "multi",
                questions: multiQuestions,
            },
        ];
    };

    const { data, isLoading, error, refetch } = useQuery({
        queryKey: ["questions"],
        queryFn: fetchAssessment,
        enabled: false,
    });

    if (error) return <p>Error: {error.message}</p>;

    return (
        <div className="fixed bottom-4 right-4 z-50">
            {!isOpen && (
                <button
                    onClick={() => {
                        setIsOpen(true);
                        refetch();
                    }}
                    className="rounded-full bg-green-500 p-4 text-white shadow-lg transition-all duration-300 hover:scale-110 hover:shadow-xl"
                >
                    <MessageCircle size={24} />
                </button>
            )}

            {isOpen && (
                <div className="flex h-[500px] w-80 flex-col overflow-hidden rounded-2xl bg-white shadow-2xl sm:w-96">
                    <div className="flex flex-shrink-0 items-center justify-between bg-green-500 p-4 text-white">
                        <div className="flex items-center space-x-3">
                            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20">🤖</div>
                            <div>
                                <h1 className="text-lg font-bold">TestBot</h1>
                                <p className="text-xs text-indigo-100">Your's Test Assistent!</p>
                            </div>
                        </div>
                        <div className="flex items-center space-x-2">
                            <button
                                onClick={() => {
                                    setIsOpen(false);
                                    handleBackToWelcome();
                                }}
                                className="text-white/80 transition-colors hover:text-white"
                            >
                                <X size={20} />
                            </button>
                        </div>
                    </div>

                    <div className="min-h-0 overflow-y-auto p-4">
                        {currentScreen === "welcome" ? (
                            <WelcomeScreen
                                questionTypes={data}
                                isCompleted={isCompleted}
                                onQuestionTypeSelect={handleQuestionTypeSelect}
                                isLoading={isLoading}
                            />
                        ) : (
                            selectedQuestionType && (
                                <>
                                    <QuestionScreen
                                        questionType={selectedQuestionType}
                                        onBackToWelcome={handleBackToWelcome}
                                        setIsCompleted={setIsCompleted}
                                    />
                                </>
                            )
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default ChatBot;
