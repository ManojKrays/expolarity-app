import React, { useState } from "react";
import { MessageCircle, X } from "lucide-react";
import WelcomeScreen from "./WelcomeScreen";
import QuestionScreen from "./QuestionScreen";
import { questionTypes } from "../utils/data";
import { get } from "../config/network";
import apiDetails from "../config/apiDetails";
import { useQuery } from "@tanstack/react-query";
import useAuthStore from "../store/authStore";

const ChatBot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [currentScreen, setCurrentScreen] = useState("welcome");
    const [selectedQuestionType, setSelectedQuestionType] = useState(null);
    const [testCompleted, setTestCompleted] = useState({ BIG5: false, LNT: false, MIT: false, TIA: false });

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

        const sections = res.data.reduce((acc, curr) => {
            const section = curr.section;
            if (!acc[section]) acc[section] = [];
            acc[section].push(curr);
            return acc;
        }, {});

        const formatQuestion = (q) => {
            if (q.type === "RATING") {
                return {
                    id: q.id,
                    // type: q.type.toLowerCase(),
                    question: q.question,
                };
            } else if (q.type === "SINGLE") {
                return {
                    id: q.id,
                    // type: q.type.toLowerCase(),
                    question: q.question,
                    options: [
                        q.option_a ? { value: "A", label: q.option_a } : null,
                        q.option_b ? { value: "B", label: q.option_b } : null,
                        q.option_c ? { value: "C", label: q.option_c } : null,
                        q.option_d ? { value: "D", label: q.option_d } : null,
                        q.option_e ? { value: "E", label: q.option_e } : null,
                    ].filter(Boolean),
                };
            } else if (q.type === "MULTI") {
                return {
                    id: q.id,
                    // type: q.type.toLowerCase(),
                    question: q.question,
                    options: [
                        q.artistic ? { artistic: q.artistic } : null,
                        q.conventional ? { conventional: q.conventional } : null,
                        q.enterprising ? { enterprising: q.enterprising } : null,
                        q.investigative ? { investigative: q.investigative } : null,
                        q.realistic ? { realistic: q.realistic } : null,
                        q.social ? { social: q.social } : null,
                    ].filter(Boolean),
                };
            }
            return null;
        };

        const sectionMeta = {
            BIG5: { title: "Big Five", emoji: "🧠", color: "bg-indigo-500", type: "range", code: "BIG5" },
            TIA: { title: "TIA", emoji: "🧩", color: "bg-pink-500", type: "multi", code: "TIA" },
            LNT: { title: "LNT", emoji: "📊", color: "bg-teal-500", type: "single", code: "LNT" },
            MIT: { title: "MIT", emoji: "🎯", color: "bg-yellow-500", type: "range", code: "MIT" },
        };

        const final = Object.entries(sections).map(([sectionName, questions]) => {
            const formattedQuestions = questions.map(formatQuestion).filter(Boolean);

            return {
                id: sectionName.toLowerCase(),
                title: sectionMeta[sectionName]?.title || sectionName,
                emoji: sectionMeta[sectionName]?.emoji || "📝",
                color: sectionMeta[sectionName]?.color || "bg-gray-300",
                type: sectionMeta[sectionName]?.type,
                code: sectionMeta[sectionName]?.code,
                questions: formattedQuestions,
            };
        });

        return final;
    };

    const { data, isLoading, error, refetch } = useQuery({
        queryKey: ["questions"],
        queryFn: fetchAssessment,
        enabled: false,
    });

    if (error) return <p>Error: {error.message}</p>;
    console.log(testCompleted);

    const authorized = useAuthStore((state) => state.authorized);

    return (
        <div className="fixed bottom-4 right-4 z-50">
            {authorized && !isOpen && (
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
                <div className="flex h-[500px] w-72 flex-col overflow-hidden rounded-2xl bg-white shadow-2xl sm:w-96">
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
                                testCompleted={testCompleted}
                                onQuestionTypeSelect={handleQuestionTypeSelect}
                                isLoading={isLoading}
                            />
                        ) : (
                            selectedQuestionType && (
                                <>
                                    <QuestionScreen
                                        testCompleted={testCompleted}
                                        questionType={selectedQuestionType}
                                        onBackToWelcome={handleBackToWelcome}
                                        setTestCompleted={setTestCompleted}
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
