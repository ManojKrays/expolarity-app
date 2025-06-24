import React from "react";
import bulb from "../../assets/bulb.png";
import message from "../../assets/message.png";
import secure from "../../assets/secure.png";

const WhyUs = () => {
    return (
        <div className="bg-[#EDFCF5] px-[5%] py-8 font-mallanna">
            <div className="mx-auto text-center md:w-[50%]">
                <h2 className="text-center text-[30px] font-semibold text-green-500">Why Choose Expolarity.AI</h2>
                <p className="">
                    Expolarity.AI offers science-backed, personalized career guidance using AI-driven psychometrics to match skills, interests, and
                    potential effectively.
                </p>
            </div>

            <div className="flex flex-col flex-wrap items-center justify-center gap-10 pt-[20px] md:flex-row">
                <div className="flex flex-col items-center justify-center text-center md:w-[330px]">
                    <img
                        src={bulb}
                        alt="bulb-idea"
                        className="w-[40%]"
                    />
                    <div className="py-2">
                        <p className="text-2xl font-semibold">Proven Methods</p>
                        <p>Expolarity.AI uses proven psychometric science and AI to guide students toward careers that fit their true potential.</p>
                    </div>
                </div>

                <div className="flex flex-col items-center justify-center text-center md:w-[330px]">
                    <img
                        src={message}
                        alt="message"
                        className="w-[40%]"
                    />
                    <div className="py-2">
                        <p className="text-2xl font-semibold">Quick and Easy</p>
                        <p>
                            Taking our tests is quick and easy, engaging, chat-based questions guide you through personalized assessments in just a
                            few minutes.
                        </p>
                    </div>
                </div>

                <div className="flex flex-col items-center justify-center text-center md:w-[330px]">
                    <img
                        src={secure}
                        alt="security"
                        className="w-[40%]"
                    />
                    <div className="py-2">
                        <p className="text-2xl font-semibold">Secure & Confidentials</p>
                        <p>
                            We prioritize your privacy, every test and personal detail is securely stored, confidential, and never shared. Your data
                            belongs only to you.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WhyUs;
