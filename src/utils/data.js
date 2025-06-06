export const testimonialsData = [
    {
        name: "Aarav Mehta",
        text: "The career test helped me understand what I’m good at. I now know I want to be an engineer!",
        location: "Mumbai, India",
        photo: "https://randomuser.me/api/portraits/men/21.jpg",
    },
    {
        name: "Sneha Reddy",
        text: "As a parent, I found this platform extremely helpful in guiding my daughter’s career interest early on.",
        location: "Hyderabad, India",
        photo: "https://randomuser.me/api/portraits/women/44.jpg",
    },
    {
        name: "Karan Patel",
        text: "I used to be confused about my future, but after the test, I discovered my interest in creative fields.",
        location: "Ahmedabad, India",
        photo: "https://randomuser.me/api/portraits/men/36.jpg",
    },
    {
        name: "Priya Singh",
        text: "This tool gave us so much clarity. It’s a must-have for every student exploring career options.",
        location: "Delhi, India",
        photo: "https://randomuser.me/api/portraits/women/68.jpg",
    },
    {
        name: "Rahul Nair",
        text: "I was surprised at how accurate the suggestions were! I’m now focused on science and tech careers.",
        location: "Kochi, India",
        photo: "https://randomuser.me/api/portraits/men/52.jpg",
    },
    {
        name: "Megha Verma",
        text: "The test results gave my son a clear roadmap. He’s more confident about his future choices now.",
        location: "Pune, India",
        photo: "https://randomuser.me/api/portraits/women/29.jpg",
    },
    {
        name: "Ankit Sharma",
        text: "Very user-friendly and informative. Helped me identify my strengths and interests early.",
        location: "Jaipur, India",
        photo: "https://randomuser.me/api/portraits/men/42.jpg",
    },
    {
        name: "Divya Raj",
        text: "Thanks to this platform, my daughter discovered her passion for design. Truly a valuable tool.",
        location: "Chennai, India",
        photo: "https://randomuser.me/api/portraits/women/50.jpg",
    },
    {
        name: "Ishaan Dutta",
        text: "The career test helped me explore new fields I hadn’t considered before. I’m excited for the future!",
        location: "Kolkata, India",
        photo: "https://randomuser.me/api/portraits/men/60.jpg",
    },
    {
        name: "Ritika Malhotra",
        text: "As a teacher, I recommend this to all my students. It’s simple, insightful, and empowering.",
        location: "Bangalore, India",
        photo: "https://randomuser.me/api/portraits/women/61.jpg",
    },
];

export const questionTypes = [
    {
        id: "agreement",
        title: "Range Question",
        emoji: "📊",
        color: "bg-green-500",
        type: "range",
        questions: [
            { id: "q1", question: "I enjoy meeting new people and making friends." },
            { id: "q2", question: "I prefer to work alone rather than in a team." },
            { id: "q3", question: "I am comfortable taking risks in my personal life." },
            { id: "q4", question: "I believe that hard work always pays off." },
            { id: "q5", question: "I often worry about things that might go wrong." },
            { id: "q6", question: "I enjoy being the center of attention." },
            { id: "q7", question: "I prefer to stick to routines rather than try new things." },
            { id: "q8", question: "I find it easy to express my emotions to others." },
            { id: "q9", question: "I believe that people are generally trustworthy." },
            { id: "q10", question: "I enjoy solving complex problems and puzzles." },
            { id: "q11", question: "I prefer to avoid conflicts and disagreements." },
            { id: "q12", question: "I am motivated by competition with others." },
            { id: "q13", question: "I enjoy helping others even when there is no benefit to me." },
            { id: "q14", question: "I prefer to make decisions quickly rather than deliberate." },
            { id: "q15", question: "I believe that success is mostly due to luck." },
            { id: "q16", question: "I enjoy public speaking and presentations." },
            { id: "q17", question: "I prefer to have a few close friends rather than many acquaintances." },
            { id: "q18", question: "I am comfortable with uncertainty and change." },
            { id: "q19", question: "I believe that traditions and customs are important." },
            { id: "q20", question: "I enjoy creative activities and artistic expression." },
        ],
    },

    {
        id: "personality",
        title: "Personality Test",
        emoji: "👤",
        color: "bg-gray-400",
        type: "multiple-choice",
        questions: [
            {
                id: "q21",
                question: "How do you prefer to spend your free time?",
                options: ["Reading a book", "Going to a party", "Exercising outdoors", "Learning new skills"],
            },
            {
                id: "q22",
                question: "When making decisions, you usually:",
                options: ["Think it through carefully", "Go with your gut feeling", "Ask others for advice", "Research all options"],
            },
            {
                id: "q23",
                question: "In a group setting, you tend to:",
                options: ["Lead the conversation", "Listen and contribute when asked", "Mediate conflicts", "Share interesting stories"],
            },
            {
                id: "q24",
                question: "Your ideal vacation would be:",
                options: ["Relaxing on a beach", "Exploring a new city", "Adventure sports", "Cultural immersion"],
            },
            {
                id: "q25",
                question: "When facing a challenge, you:",
                options: ["Break it down into steps", "Dive right in", "Seek help from others", "Look for creative solutions"],
            },
            {
                id: "q26",
                question: "Your communication style is:",
                options: ["Direct and to the point", "Warm and friendly", "Analytical and detailed", "Diplomatic and tactful"],
            },
            {
                id: "q27",
                question: "You prefer work environments that are:",
                options: ["Structured and organized", "Flexible and dynamic", "Collaborative and social", "Quiet and focused"],
            },
            {
                id: "q28",
                question: "When learning something new, you:",
                options: ["Practice hands-on", "Read about it first", "Watch demonstrations", "Discuss with others"],
            },
            {
                id: "q29",
                question: "Your approach to deadlines is:",
                options: ["Plan well in advance", "Work steadily toward the goal", "Work best under pressure", "Collaborate with others"],
            },
            {
                id: "q30",
                question: "In conflicts, you typically:",
                options: ["Address it directly", "Avoid confrontation", "Find a compromise", "Seek to understand all sides"],
            },
            {
                id: "q31",
                question: "Your energy comes from:",
                options: ["Being around people", "Having alone time", "Achieving goals", "Creating new things"],
            },
            {
                id: "q32",
                question: "You make friends by:",
                options: ["Being outgoing and social", "Finding common interests", "Being helpful and supportive", "Sharing experiences"],
            },
            {
                id: "q33",
                question: "Your ideal work pace is:",
                options: ["Fast and efficient", "Steady and consistent", "Flexible as needed", "Intense bursts with breaks"],
            },
            {
                id: "q34",
                question: "When planning events, you:",
                options: ["Love organizing details", "Prefer spontaneous gatherings", "Focus on who to invite", "Think about the experience"],
            },
            {
                id: "q35",
                question: "Your motivation comes from:",
                options: ["Personal achievement", "Helping others", "Learning and growth", "Recognition and success"],
            },
            {
                id: "q36",
                question: "In stressful situations, you:",
                options: ["Stay calm and logical", "Seek emotional support", "Take action immediately", "Step back and reflect"],
            },
            {
                id: "q37",
                question: "Your leadership style is:",
                options: ["Authoritative and clear", "Collaborative and inclusive", "Supportive and encouraging", "Innovative and inspiring"],
            },
            {
                id: "q38",
                question: "You prefer feedback that is:",
                options: ["Direct and specific", "Constructive and kind", "Detailed and comprehensive", "Encouraging and positive"],
            },
            {
                id: "q39",
                question: "Your problem-solving approach is:",
                options: ["Systematic and methodical", "Creative and innovative", "Collaborative and inclusive", "Quick and decisive"],
            },
            {
                id: "40",
                question: "What drives you most in life?",
                options: ["Achievement and success", "Relationships and connection", "Knowledge and understanding", "Freedom and independence"],
            },
        ],
    },

    /* 

    {
        id: "scenarios",
        title: "Scenario-Based Questions",
        emoji: "🎯",
        color: "bg-purple-500",
        type: "multiple-choice",
        questions: [
            {
        id: "41",
                question: "You are assigned a project with a tight deadline. Your approach would be to:",
                options: [
                    "Create a detailed plan and timeline",
                    "Start working immediately on the hardest parts",
                    "Delegate tasks to team members",
                    "Break it into smaller manageable tasks",
                ],
            },
            {
            id: "42",
                question: "Your colleague takes credit for your idea in a meeting. You would:",
                options: [
                    "Confront them privately after the meeting",
                    "Speak up immediately in the meeting",
                    "Let it go and focus on future projects",
                    "Discuss it with your supervisor",
                ],
            },
            {id: "43",
                question: "You discover a mistake in a report that has already been submitted. You would:",
                options: [
                    "Immediately inform your supervisor",
                    "Fix it quietly and mention it later",
                    "Wait to see if anyone notices",
                    "Prepare a correction document",
                ],
            },
            {
            id: "44",
                question: "You are leading a team where two members are in conflict. You would:",
                options: [
                    "Mediate a discussion between them",
                    "Address each person individually",
                    "Set clear rules for professional behavior",
                    "Reassign them to different tasks",
                ],
            },
            {
            id: "45",
                question: "You receive feedback that your work style is too detailed. You would:",
                options: [
                    "Ask for specific examples and adjust",
                    "Explain why detail is important",
                    "Gradually reduce the level of detail",
                    "Seek a second opinion from others",
                ],
            },
            {
            id: "46",
                question: "A client is unhappy with the service provided. You would:",
                options: [
                    "Listen to their concerns and apologize",
                    "Investigate what went wrong",
                    "Offer immediate solutions",
                    "Involve your supervisor in the discussion",
                ],
            },
            {
            id: "47",
                question: "You are offered a promotion that requires relocating. You would:",
                options: [
                    "Accept immediately for career growth",
                    "Decline to stay with family/friends",
                    "Negotiate for remote work options",
                    "Take time to weigh pros and cons",
                ],
            },
            {
            id: "48",
                question: "Your team misses an important deadline due to poor planning. You would:",
                options: [
                    "Take responsibility as the team leader",
                    "Analyze what went wrong to prevent it",
                    "Focus on completing the work quickly",
                    "Communicate transparently with stakeholders",
                ],
            },
            {
            id: "49",
                question: "You notice a coworker seems stressed and overwhelmed. You would:",
                options: [
                    "Offer to help with their workload",
                    "Suggest they speak to their supervisor",
                    "Listen and provide emotional support",
                    "Give them space unless they ask for help",
                ],
            },
            {
            id: "50",
                question: "You are asked to work on a project outside your expertise. You would:",
                options: [
                    "Accept the challenge and learn as you go",
                    "Decline and suggest someone more qualified",
                    "Accept but ask for training or support",
                    "Propose collaborating with an expert",
                ],
            },
            {
            id: "51",
                question: "During a team brainstorming session, ideas are not flowing. You would:",
                options: [
                    "Suggest a different brainstorming technique",
                    "Share your own ideas to get things started",
                    "Ask specific questions to guide thinking",
                    "Propose taking a break and reconvening",
                ],
            },
            {
            id: "52",
                question: "You disagree with a decision made by upper management. You would:",
                options: [
                    "Voice your concerns through proper channels",
                    "Accept the decision and implement it",
                    "Seek to understand the reasoning behind it",
                    "Discuss concerns with trusted colleagues first",
                ],
            },
            {
            id: "53",
                question: "A new team member is struggling to adapt to your work culture. You would:",
                options: [
                    "Mentor them personally",
                    "Suggest formal training programs",
                    "Include them in social activities",
                    "Give them time to adjust naturally",
                ],
            },
            {
            id: "54",
                question: "You are asked to present to senior executives with little preparation time. You would:",
                options: [
                    "Focus on key points and speak confidently",
                    "Request more time to prepare properly",
                    "Prepare extensively in the time available",
                    "Ask a colleague to co-present with you",
                ],
            },
            {
            id: "55",
                question: "Your department is facing budget cuts affecting your team. You would:",
                options: [
                    "Look for creative cost-saving solutions",
                    "Communicate transparently with your team",
                    "Prioritize the most critical projects",
                    "Advocate for your team with upper management",
                ],
            },
            {
            id: "56",
                question: "You receive conflicting instructions from two different supervisors. You would:",
                options: [
                    "Clarify priorities with both supervisors",
                    "Follow the most recent instruction",
                    "Document everything and seek clarification",
                    "Choose the instruction that makes most sense",
                ],
            },
            {
            id: "57",
                question: "A project you managed failed to meet its objectives. You would:",
                options: [
                    "Conduct a thorough post-mortem analysis",
                    "Take full responsibility for the failure",
                    "Focus on salvaging what can be saved",
                    "Learn from mistakes and apply to future projects",
                ],
            },
            {
            id: "58",
                question: "You discover your company is not following industry best practices. You would:",
                options: [
                    "Research and propose better practices",
                    "Raise concerns with management",
                    "Implement improvements in your own work",
                    "Seek external guidance or consultation",
                ],
            },
            {
            id: "59",
                question: "You are working with a difficult client who is never satisfied. You would:",
                options: [
                    "Set clear expectations and boundaries",
                    "Try to understand their underlying concerns",
                    "Document all interactions carefully",
                    "Involve your supervisor in client management",
                ],
            },
            {id: "60",
                question: "Your team consistently works overtime to meet deadlines. You would:",
                options: [
                    "Analyze workflows to improve efficiency",
                    "Hire additional team members if possible",
                    "Negotiate more realistic deadlines",
                    "Recognize and reward the team's dedication",
                ],
            },
        ],
    },

    */

    ,
];
