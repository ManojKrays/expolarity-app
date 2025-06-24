import React, { useEffect } from "react";
import Nav from "../Main/Nav";

const Blog3 = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <>
            <Nav />
            <div className="mx-auto max-w-3xl space-y-6 p-4 pt-24 font-mallanna text-gray-800">
                <h1 className="text-center text-2xl font-bold sm:text-3xl">
                    5 Things to Do Now That Will Help Your <span className="text-green-500">Future Career</span>
                </h1>
                <hr />
                <p className="text-justify text-gray-600">
                    It’s never too early to start thinking about your future career. The habits you build and the steps you take now can have a huge
                    impact later. Here are five things you can do right now to set yourself up for success!
                </p>

                <h2 className="mt-4 text-xl font-semibold text-gray-800 sm:text-2xl">Build Good Study Habits</h2>
                <p className="text-justify text-gray-600">
                    Develop a routine that allows you to focus, stay organized, and balance your workload. These habits will benefit you in school,
                    college, and beyond!
                </p>

                <h2 className="mt-4 text-xl font-semibold text-gray-800 sm:text-2xl">Explore New Interests</h2>
                <p className="text-justify text-gray-600">
                    Try joining a club, volunteering, or pursuing a hobby. The more interests you explore, the more you’ll understand your passions
                    and strengths ,and how they can shape your future career.
                </p>

                <h2 className="mt-4 text-xl font-semibold text-gray-800 sm:text-2xl">Practice Communication Skills</h2>
                <p className="text-justify text-gray-600">
                    Communication is one of the most valuable skills in any career. Practice speaking clearly, writing well, and listening
                    effectively. These abilities will open doors throughout your professional life!
                </p>

                <h2 className="mt-4 text-xl font-semibold text-gray-800 sm:text-2xl">Get Comfortable with Challenges</h2>
                <p className="text-justify text-gray-600">
                    Learning to adapt and overcome setbacks is vital. Try new things that stretch your abilities, learn from mistakes, and build
                    resilience ,these traits are highly valued by employers in every field!
                </p>

                <h2 className="mt-4 text-xl font-semibold text-gray-800 sm:text-2xl">Stay Curious and Keep Learning</h2>
                <p className="text-justify text-gray-600">
                    The best way to stay prepared for the future is to remain a lifelong learner. Read books, watch documentaries, and stay open to
                    new ideas and technologies. The more you learn, the more opportunities you’ll have later on!
                </p>

                <h2 className="mt-4 text-xl font-semibold text-gray-800 sm:text-2xl">Final Thoughts</h2>
                <p className="text-justify text-gray-600">
                    Remember, it’s okay if you don’t have it all figured out right now. What matters is that you’re starting to build a strong
                    foundation for your future. Stay open, stay committed, and trust that every step you take today will help shape the career you’re
                    dreaming of tomorrow!
                </p>
            </div>
        </>
    );
};

export default Blog3;
