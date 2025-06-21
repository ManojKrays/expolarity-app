import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import bot from "../../assets/bot-logo1.png";
import WelcomeScreen from "../../Component/WelcomeScreen";
import QuestionScreen from "../../Component/QuestionScreen";
import InterestScreen from "../../Component/InterestTestScreen";
import { get } from "../../config/network";
import apiDetails from "../../config/apiDetails";
import ResultScreen from "../../Component/ResultScreen";
import { Home, LogOut, Settings, User, Menu } from "lucide-react";
import useAuthStore from "../../store/authStore";
import { useNavigate } from "react-router-dom";

const Assessment = () => {
    const navigate = useNavigate();
    const [currentScreen, setCurrentScreen] = useState("welcome");
    const [selectedQuestionType, setSelectedQuestionType] = useState(null);
    const [selectedCareer, setSelectedCareer] = useState(null);
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const fetchAssessment = async () => {
        try {
            const res = await get(apiDetails.endPoint.getAssessments);
            if (res.status) {
                const sectionColors = {
                    BIG5: { color: "bg-indigo-500" },
                    TIA: { color: "bg-pink-500" },
                    LNT: { color: "bg-teal-500" },
                    MIT: { color: "bg-yellow-500" },
                };
                return res.data.map((test) => ({
                    ...test,
                    color: sectionColors[test.section]?.color || "bg-gray-300",
                }));
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

    const { data, isLoading, error } = useQuery({
        queryKey: ["assments"],
        queryFn: fetchAssessment,
        refetchOnWindowFocus: false,
        staleTime: Infinity,
    });

    const [testData, setTestData] = useState({
        BIG5: { answers: {}, messages: [], currentIndex: 0, isCompleted: false },
        TIA: { answers: {}, messages: [], currentIndex: 0, isCompleted: false },
        LNT: { answers: {}, messages: [], currentIndex: 0, isCompleted: false },
        MIT: { answers: {}, messages: [], currentIndex: 0, isCompleted: false },
    });

    const menuItems = [
        { id: "welcome", label: "Home", icon: Home },
        { id: "mentor", label: "Talk To Mentor", icon: User },
        { id: "settings", label: "Settings", icon: Settings },
    ];

    const logout = useAuthStore((state) => state.logout);

    const handleLogout = () => {
        logout();
        localStorage.clear();
        navigate("/login");
    };

    return (
        <div className="relative min-h-screen w-full font-mallanna">
            <div className="fixed top-0 z-20 flex w-full items-center justify-between bg-green-500 p-3 md:hidden">
                <div className="flex items-center space-x-2 font-bold text-white">
                    <Menu
                        size={20}
                        onClick={() => setSidebarOpen(true)}
                        className="cursor-pointer"
                    />
                    <span>Xplora</span>
                </div>
            </div>

            <div className="flex">
                <div
                    className={`fixed z-50 h-screen max-w-xs bg-green-500 shadow-lg transition-transform duration-300 md:static md:flex md:w-[20%] md:translate-x-0 ${
                        sidebarOpen ? "translate-x-0" : "-translate-x-full"
                    }`}
                >
                    <div className="flex h-full w-full flex-col justify-between">
                        <div>
                            <div className="flex items-center space-x-3 p-4 pb-5 md:flex-col lg:flex-row">
                                <div
                                    onClick={() => {
                                        handleBackToWelcome();
                                        setSidebarOpen(false);
                                    }}
                                    className="flex h-12 w-12 items-center justify-center rounded-full bg-white"
                                >
                                    <img
                                        src={bot}
                                        alt="bot"
                                        className="h-10 cursor-pointer rounded-full object-cover"
                                    />
                                </div>
                                <div>
                                    <h1 className="text-lg font-bold text-white">Xplora</h1>
                                    <p className="text-xs text-indigo-100">Your Career Assistant!</p>
                                </div>
                            </div>

                            <div className="mb-3 border-t border-teal-200" />

                            {menuItems.map((item) => {
                                const Icon = item.icon;
                                return (
                                    <div
                                        key={item.id}
                                        onClick={() => {
                                            setCurrentScreen(item.id);
                                            setSidebarOpen(false);
                                        }}
                                        className={
                                            `flex cursor-pointer items-center gap-2 p-3 font-medium text-white duration-300 hover:bg-gray-100 hover:text-gray-700`
                                            //     ${
                                            //     currentScreen === item.id ? "bg-gray-100 text-gray-700" : "text-white"
                                            // }
                                        }
                                    >
                                        <Icon size={15} />
                                        {item.label}
                                    </div>
                                );
                            })}
                        </div>

                        <div
                            className="flex cursor-pointer items-center gap-2 p-3 text-white duration-300 hover:bg-green-300 hover:text-gray-700"
                            onClick={() => handleLogout()}
                        >
                            <LogOut size={15} />
                            Logout
                        </div>
                    </div>
                </div>

                {sidebarOpen && (
                    <div
                        className="fixed inset-0 z-40 bg-black bg-opacity-50 md:hidden"
                        onClick={() => setSidebarOpen(false)}
                    ></div>
                )}

                <div className="h-screen flex-1 overflow-y-auto bg-gray-100 pt-10 lg:px-20">
                    {currentScreen === "welcome" && (
                        <div className="w-full p-4 lg:p-0">
                            <WelcomeScreen
                                questionTypes={data}
                                testData={testData}
                                onQuestionTypeSelect={handleQuestionTypeSelect}
                                isLoading={isLoading}
                                error={error}
                                setCurrentScreen={setCurrentScreen}
                            />
                        </div>
                    )}

                    {currentScreen === "questions" && selectedQuestionType && (
                        <QuestionScreen
                            questionType={selectedQuestionType}
                            onBackToWelcome={handleBackToWelcome}
                            testData={testData}
                            setTestData={setTestData}
                        />
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
        </div>
    );
};

export default Assessment;
