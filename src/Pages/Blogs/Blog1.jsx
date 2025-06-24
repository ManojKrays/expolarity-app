import React, { useEffect } from "react";
import Nav from "../Main/Nav";

const Blog1 = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <>
            <Nav />
            <div className="mx-auto max-w-3xl space-y-6 p-4 pt-24 font-mallanna text-gray-800">
                <h1 className="text-center text-2xl font-bold leading-[1.1] text-gray-700 sm:text-3xl">
                    Why Taking a <span className="text-green-500">Career Test </span>Is Like Using a Map for Life
                </h1>
                <hr />
                <p className="text-justify text-gray-600">
                    Have you ever felt lost when thinking about your future? You’re not alone! Choosing a career can be confusing, especially when
                    you’re not sure where to start. But here’s some good news: <strong className="text-green-500">a career test</strong> can help, and
                    it works a lot like a map.
                </p>

                <h2 className="mt-4 text-xl font-semibold text-gray-800 sm:text-2xl">A Career Test Shows You Where to Begin</h2>
                <p className="text-justify text-gray-600">
                    Imagine going on a trip to a new city with no map or GPS. You wouldn’t know which way to go! A career test is like a map for your
                    future , it shows you where your interests, strengths, and talents can take you, making it easier to find a path that suits you
                    best.
                </p>

                <h2 className="mt-4 text-xl font-semibold text-gray-800 sm:text-2xl">It Points You in the Right Direction</h2>
                <p className="text-justify text-gray-600">
                    We all have many interests, but not every interest leads to a successful career. A career test acts like a compass , it guides you
                    toward careers that match your <strong className="text-green-500">personality, interests, and skills</strong>, allowing you to
                    focus on careers you’ll enjoy and do well in.
                </p>

                <h2 className="mt-4 text-xl font-semibold text-gray-800 sm:text-2xl">It Shows You Different Routes</h2>
                <p className="text-justify text-gray-600">
                    Life doesn’t always move in a straight line. Sometimes interests or priorities change, and that’s okay! A career test gives you
                    different options, so if one path doesn’t work out, you already have alternatives to explore.
                </p>

                <h2 className="mt-4 text-xl font-semibold text-gray-800 sm:text-2xl">It Shows Your Strengths and Weaknesses</h2>
                <p className="text-justify text-gray-600">
                    Just like a map can warn you about mountains or valleys, a career test can show you your natural strengths and areas where you
                    might need more practice, making it easier to build a future that plays to your talents.
                </p>

                <h2 className="mt-4 text-xl font-semibold text-gray-800 sm:text-2xl">It Saves Time and Energy</h2>
                <p className="text-justify text-gray-600">
                    Without a map, you might wander in circles for a long time. Similarly, trying every job to "see if you like it" can waste a lot of
                    time and effort. A career test can save both by focusing your energy on careers that suit you best.
                </p>

                <h2 className="mt-4 text-xl font-semibold text-gray-800 sm:text-2xl">Final Thoughts</h2>
                <p className="text-justify text-gray-600">
                    Choosing a career is one of the biggest decisions you’ll make in life, and it’s okay to ask for help! A career test is like a map
                    for your future ,it doesn’t make the decisions for you, but it gives you the tools and information you need to find a path that
                    feels right. If you’re feeling lost or unsure about your future, try a career test. It might be the best first step you can take!
                </p>
            </div>
        </>
    );
};

export default Blog1;
