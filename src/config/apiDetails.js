const apiDetails = {
    // baseUrl: "https://zurtle-rms-python-gtb9.onrender.com",
    baseUrl: "https://zurtle-rms-python.onrender.com",
    CareerBaseUrl: "https://engine.expolarity.ai/api/careers",

    endPoint: {
        register: "/register",
        verify: "/activate",
        sendVerification: "sendactivationlink",
        login: "/login",
        googleLogin: "/google-login",

        getAssessments: "/assessments",
        getQuestions: "/questions",
        saveTest: "/evaluate",
        saveBasics: "/students",
        result: "/result",
    },
};

export default apiDetails;
