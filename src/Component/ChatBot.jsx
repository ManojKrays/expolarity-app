import React, { useState } from "react";
import { MessageCircle, X } from "lucide-react";
import WelcomeScreen from "./WelcomeScreen";
import QuestionScreen from "./QuestionScreen";
import ProgressIndicator from "./ProgressIndicator";
import { questionTypes } from "../utils/data";

const ChatBot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [currentScreen, setCurrentScreen] = useState("welcome");
    const [selectedQuestionType, setSelectedQuestionType] = useState(null);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

    const [personalityAnswers, setPersonalityAnswers] = useState({});
    const [agreementAnswers, setAgreementAnswers] = useState({});
    const [scenarioAnswers, setScenarioAnswers] = useState({});
    const [completedSections, setCompletedSections] = useState({});

    const handleQuestionTypeSelect = (questionType) => {
        setSelectedQuestionType(questionType);
        setCurrentQuestionIndex(0);
        setCurrentScreen("questions");
    };

    const handleAnswerSubmit = (answer) => {
        if (!selectedQuestionType) return;

        const typeId = selectedQuestionType.id;
        const questionNumber = currentQuestionIndex + 1;

        if (typeId === "personality") {
            setPersonalityAnswers((prev) => ({
                ...prev,
                [questionNumber]: answer,
            }));
        } else if (typeId === "agreement") {
            setAgreementAnswers((prev) => ({
                ...prev,
                [questionNumber]: answer,
            }));
        } else if (typeId === "scenarios") {
            const optionIndex = selectedQuestionType.questions[currentQuestionIndex].options.indexOf(answer);
            const optionLetter = String.fromCharCode(65 + optionIndex); // A, B, C, D
            setScenarioAnswers((prev) => ({
                ...prev,
                [questionNumber]: optionLetter,
            }));
        }

        if (currentQuestionIndex < selectedQuestionType.questions.length - 1) {
            setCurrentQuestionIndex((prev) => prev + 1);
        } else {
            console.log(`${selectedQuestionType.title} completed:`);

            if (typeId === "personality") {
                const updatedAnswers = { ...personalityAnswers, [questionNumber]: answer };
                console.log("Personality Answers:", updatedAnswers);
            } else if (typeId === "agreement") {
                const updatedAnswers = { ...agreementAnswers, [questionNumber]: answer };
                console.log("Agreement Answers:", updatedAnswers);
            } else if (typeId === "scenarios") {
                const optionIndex = selectedQuestionType.questions[currentQuestionIndex].options.indexOf(answer);
                const optionLetter = String.fromCharCode(65 + optionIndex);
                const updatedAnswers = { ...scenarioAnswers, [questionNumber]: optionLetter };
                console.log("Scenario Answers:", updatedAnswers);
            }

            setCompletedSections((prev) => ({
                ...prev,
                [typeId]: true,
            }));

            setCurrentScreen("welcome");
            setSelectedQuestionType(null);
            setCurrentQuestionIndex(0);
        }
    };

    const handlePreviousQuestion = () => {
        if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex((prev) => prev - 1);
        }
    };

    const handleNextQuestion = () => {
        if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex((prev) => prev + 1);
        }
    };

    const handleBackToWelcome = () => {
        setCurrentScreen("welcome");
        setSelectedQuestionType(null);
        setCurrentQuestionIndex(0);
    };

    const getCurrentAnswer = () => {
        if (!selectedQuestionType) return "";

        const typeId = selectedQuestionType.id;
        const questionNumber = currentQuestionIndex + 1;

        if (typeId === "personality") {
            return personalityAnswers[questionNumber] || "";
        } else if (typeId === "agreement") {
            return agreementAnswers[questionNumber] || "";
        } else if (typeId === "scenarios") {
            const optionLetter = scenarioAnswers[questionNumber];
            if (optionLetter) {
                const optionIndex = optionLetter.charCodeAt(0) - 65; // Convert A,B,C,D back to 0,1,2,3
                return selectedQuestionType.questions[currentQuestionIndex].options[optionIndex] || "";
            }
        }
        return "";
    };

    const getCompletedCount = () => {
        return Object.keys(completedSections).length;
    };

    return (
        <div className="fixed bottom-4 right-4 z-50">
            {!isOpen && (
                <button
                    onClick={() => setIsOpen(true)}
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
                            {getCompletedCount() > 0 && (
                                <div className="text-right">
                                    <div className="text-xs text-indigo-100">Completed</div>
                                    <div className="text-sm font-bold">{getCompletedCount()}/3</div>
                                </div>
                            )}
                            <button
                                onClick={() => setIsOpen(false)}
                                className="text-white/80 transition-colors hover:text-white"
                            >
                                <X size={20} />
                            </button>
                        </div>
                    </div>

                    <div className="min-h-0 overflow-y-auto p-4">
                        {currentScreen === "welcome" ? (
                            <WelcomeScreen
                                questionTypes={questionTypes}
                                completedSections={completedSections}
                                onQuestionTypeSelect={handleQuestionTypeSelect}
                            />
                        ) : (
                            selectedQuestionType && (
                                <>
                                    {/* <ProgressIndicator
                                        current={currentQuestionIndex + 1}
                                        total={selectedQuestionType.questions.length}
                                        questionType={selectedQuestionType}
                                    /> */}
                                    <QuestionScreen
                                        questionType={selectedQuestionType}
                                        currentQuestionIndex={currentQuestionIndex}
                                        currentAnswer={getCurrentAnswer()}
                                        onAnswerSubmit={handleAnswerSubmit}
                                        onPreviousQuestion={handlePreviousQuestion}
                                        onBackToWelcome={handleBackToWelcome}
                                        canGoPrevious={currentQuestionIndex > 0}
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
