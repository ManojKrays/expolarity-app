import React, { useEffect } from "react";
import Nav from "../Main/Nav";

const Blog2 = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <>
            <Nav />
            <div className="mx-auto max-w-3xl space-y-6 p-4 pt-24 font-mallanna text-gray-800">
                <h1 className="text-center text-2xl font-bold sm:text-3xl">
                    How to Find Your Strengths<span className="text-green-500">(Even If You’re Still Figuring Things Out)</span>
                </h1>
                <hr />
                <p className="text-justify text-gray-600">
                    Have you ever wondered, “What am I actually good at?” or felt like everyone else has it all figured out except you? Don’t worry ,
                    you’re not alone. Discovering what you’re naturally good at is a <strong className="text-green-500">journey</strong>, and you can
                    start it right now.
                </p>

                <h2 className="mt-4 text-xl font-semibold text-gray-800 sm:text-2xl">1. Reflect on What You Enjoy</h2>
                <p className="text-justify text-gray-600">
                    Think about moments when you’re fully engaged and forget about the time. What activities make you feel energized? These passions
                    can give you a hint about your strengths.
                </p>

                <h2 className="mt-4 text-xl font-semibold text-gray-800 sm:text-2xl">2. Ask Others for Their Perspective</h2>
                <p className="text-justify text-gray-600">
                    We’re not always the best judges of ourselves. Ask friends, family, teachers, or mentors what they think you’re great at , you
                    might be surprised by their insights!
                </p>

                <h2 className="mt-4 text-xl font-semibold text-gray-800 sm:text-2xl">3. Try New Things</h2>
                <p className="text-justify text-gray-600">
                    Join a new club, try a hobby, or take an online class. Getting out of your comfort zone can reveal hidden talents and interests
                    you didn’t realize you had.
                </p>

                <h2 className="mt-4 text-xl font-semibold text-gray-800 sm:text-2xl">4. Make a List of What You’re Proud Of</h2>
                <p className="text-justify text-gray-600">
                    Think about moments when you felt proud , big or small. What were you doing? What skills were you using? These moments can point
                    you towards your strengths.
                </p>

                <h2 className="mt-4 text-xl font-semibold text-gray-800 sm:text-2xl">5. Take a Strengths or Personality Test</h2>
                <p className="text-justify text-gray-600">
                    Tests like the Myers-Briggs Type Indicator or CliftonStrengths can give you new ideas about your talents and help you understand
                    where you might excel.
                </p>

                <h2 className="mt-4 text-xl font-semibold text-gray-800 sm:text-2xl">6. Be Patient with Yourself</h2>
                <p className="text-justify text-gray-600">
                    Remember, finding your strengths doesn’t happen overnight. Stay open, stay curious, and keep trying new things. The more you learn
                    about yourself, the more confident you’ll feel about where your talents can take you.
                </p>

                <h2 className="mt-4 text-xl font-semibold text-gray-800 sm:text-2xl">Final Thoughts</h2>
                <p className="text-justify text-gray-600">
                    It’s okay if you’re still figuring things out , that’s part of the adventure! Stay open, stay curious, and keep exploring. Your
                    strengths will reveal themselves over time, and when they do, you’ll be ready to make the most of them.
                </p>
            </div>
        </>
    );
};

export default Blog2;
