import React, { useEffect, useState } from "react";
import { MessageCircle, X } from "lucide-react";
import WelcomeScreen from "./WelcomeScreen";
import QuestionScreen from "./QuestionScreen";
import { get } from "../config/network";
import apiDetails from "../config/apiDetails";
import { useQuery } from "@tanstack/react-query";
import useAuthStore from "../store/authStore";
import InterestScreen from "./InterestTestScreen";
import ResultScreen from "./ResultScreen";
import BasicDetails from "./BasicDetails";
import CareerPathScreen from "./CareerPathScreen";
import bot from "../assets/bot-logo1.png";
import { useNavigate } from "react-router-dom";

const ChatBot = ({ setIsOpen, isOpen }) => {
    const [currentScreen, setCurrentScreen] = useState("welcome");
    const [selectedQuestionType, setSelectedQuestionType] = useState(null);
    const [basicForm, setBasicForm] = useState(false);
    const [selectedCareer, setSelectedCareer] = useState(null);

    const authorized = useAuthStore((state) => state?.user?.id);
    const navigate = useNavigate();

    const fetchAssessment = async () => {
        try {
            const res = await get(apiDetails.endPoint.getAssessments);

            if (res.status) {
                const sectionColors = {
                    BIG5: { color: "bg-indigo-500", code: "BIG5" },
                    TIA: { color: "bg-pink-500", code: "TIA" },
                    LNT: { color: "bg-teal-500", code: "LNT" },
                    MIT: { color: "bg-yellow-500", code: "MIT" },
                };

                const final = res.data.map((test) => ({
                    ...test,
                    color: sectionColors[test.section]?.color || "bg-gray-300",
                }));
                return final;
            }

            return null;
        } catch (err) {
            console.log(err.error);
            throw new Error(err?.error || "Failed to fetch assessments");
        }
    };

    const handleQuestionTypeSelect = (questionType) => {
        if (questionType.section === "TIA") {
            setCurrentScreen("interest");
        } else {
            setCurrentScreen("questions");
            setSelectedQuestionType(questionType);
        }
    };

    const handleBackToWelcome = () => {
        setCurrentScreen("welcome");
        setSelectedQuestionType(null);
    };

    const { data, isLoading, error, refetch } = useQuery({
        queryKey: ["assments"],
        queryFn: fetchAssessment,
        enabled: false,
    });

    const [testData, setTestData] = useState({
        BIG5: {
            answers: {},
            messages: [],
            currentIndex: 0,
            isCompleted: false,
        },
        TIA: {
            answers: {},
            messages: [],
            currentIndex: 0,
            isCompleted: false,
        },
        LNT: {
            answers: {},
            messages: [],
            currentIndex: 0,
            isCompleted: false,
        },
        MIT: {
            answers: {},
            messages: [],
            currentIndex: 0,
            isCompleted: false,
        },
    });

    useEffect(() => {
        refetch();
    }, [isOpen]);

    return (
        <div className="fixed bottom-4 right-2 z-40 font-mallanna sm:right-4">
            {!isOpen && (
                <button
                    onClick={() => {
                        if (authorized) {
                            refetch();
                            setIsOpen(true);
                        } else {
                            navigate("/login");
                        }
                    }}
                    className="rounded-full bg-green-500 p-4 text-white shadow-lg transition-all duration-300 hover:scale-110 hover:shadow-xl"
                >
                    <MessageCircle size={24} />
                </button>
            )}

            {isOpen && (
                <div className="flex h-[500px] w-[300px] flex-col overflow-hidden rounded-2xl bg-white shadow-2xl sm:w-96">
                    <div className="flex flex-shrink-0 items-center justify-between bg-green-500 p-4 text-white">
                        <div className="flex items-center space-x-3">
                            <div
                                onClick={() => handleBackToWelcome()}
                                className="flex h-12 w-12 items-center rounded-full bg-white"
                            >
                                <img
                                    src={bot}
                                    alt="bot"
                                    className="h-10 cursor-pointer rounded-full object-cover"
                                />
                            </div>
                            <div>
                                <h1 className="text-lg font-bold">Xplora</h1>
                                <p className="text-xs text-indigo-100">Your Career Assistant!</p>
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

                    <div className="min-h-0 overflow-y-auto">
                        {currentScreen === "welcome" ? (
                            <div className="overflow-y-auto p-4">
                                <WelcomeScreen
                                    questionTypes={data}
                                    testData={testData}
                                    onQuestionTypeSelect={handleQuestionTypeSelect}
                                    isLoading={isLoading}
                                    error={error}
                                    setCurrentScreen={setCurrentScreen}
                                />
                            </div>
                        ) : (
                            selectedQuestionType && (
                                <>
                                    <QuestionScreen
                                        questionType={selectedQuestionType}
                                        onBackToWelcome={handleBackToWelcome}
                                        testData={testData}
                                        setTestData={setTestData}
                                    />
                                </>
                            )
                        )}

                        {currentScreen === "result" && (
                            <ResultScreen
                                setSelectedCareer={setSelectedCareer}
                                setCurrentScreen={setCurrentScreen}
                            />
                        )}

                        {currentScreen === "career" && <CareerPathScreen selectedCareer={selectedCareer} />}

                        {currentScreen === "interest" && (
                            <InterestScreen
                                onBackToWelcome={handleBackToWelcome}
                                testData={testData}
                                setTestData={setTestData}
                            />
                        )}
                    </div>
                </div>
            )}

            {basicForm && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center bg-gray-400/30 backdrop-blur-sm">
                    <BasicDetails />
                </div>
            )}
        </div>
    );
};

export default ChatBot;
