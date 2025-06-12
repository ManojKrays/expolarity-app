const apiDetails = {
    // baseUrl: "https://zurtle-rms-python-gtb9.onrender.com",
    baseUrl: "https://zurtle-rms-python.onrender.com",
    CareerBaseUrl: "https://engine.expolarity.ai/api/careers",

    endPoint: {
        register: "/students",
        login: "/login",
        googleLogin: "/google-login",
        getAssessment: "/questions",
        intrestTest: "/interest",
        skillTest: "/skills",
        personalityTest: "/personality",
        multipleInterest: "/multipleInterest",

        /*
        getAssessments: "/assessments",
        getQuestions: "/questions", //pass testid=2 in param
        saveTest: "/evaluate", //pass the assessment & user in header */
    },
};

export default apiDetails;
