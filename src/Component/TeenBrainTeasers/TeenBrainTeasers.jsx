import React from "react";
import assessment1 from "../../assets/assessment1.png";
import assessment2 from "../../assets/assessment2.png";
import assessment3 from "../../assets/assessment3.png";
import questionImage from "../../assets/question.png";
import backgroundImg from "../../assets/backgroundImg.png";

const TeenBrainTeasers = () => {
  const assessments = [
    { id: 1, image: assessment1, title: "Assessment 1" },
    { id: 2, image: assessment2, title: "Assessment 2" },
    { id: 3, image: assessment3, title: "Assessment 3" },
  ];

  return (
    <div className="bg-lightBlue p-6 flex flex-col items-center font-kite relative min-h-screen">
      {/* Header Section */}
      <div className="bg-primary w-full p-2 rounded-2xl flex flex-col sm:flex-row items-center justify-between relative">
        <h1 className="text-2xl sm:text-4xl text-lightBlack px-10 sm:px-10 text-center sm:text-left">
          More than just a tool
        </h1>
        <div className="p-4 lg:pr-32">
          <img src={questionImage} alt="Question Mark" className="w-24 sm:w-32" />
        </div>
      </div>

      {/* Description */}
      <p className="text-[24px] p-4 text-lightBlack text-center">
        Teen Brain Teasers
      </p>
      <p className="text-[15px] text-lightGray text-center">
        A fun and engaging quiz designed to test the knowledge of teens aged 12-20. How much do you really know?
      </p>

      {/* Assessment Cards */}
      <div className="flex flex-wrap gap-8 justify-center py-10 relative z-10">
        {assessments.map((assessment) => (
          <div
            key={assessment.id}
            className="bg-white rounded-2xl shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] p-6 w-full sm:w-[320px] min-w-[280px] text-center border border-gray-200 flex-grow"
          >
            <img
              src={assessment.image}
              alt={assessment.title}
              className="mx-auto"
            />
            <h3 className="font-semibold text-lg mt-2 font-mallanna">
              {assessment.title}
            </h3>
            <p className="text-gray-500 text-sm sm:text-[14px] py-4 font-mallanna">
              "This test predicts communication styles and how people respond in different situations."
            </p>
            <div className="p-4">
              <button className="font-mallanna border border-black text-black px-6 py-2 rounded-full hover:bg-black hover:text-white transition duration-300">
                Take a Test
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Background Icons */}
      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-full max-w-[500px] z-0 hidden sm:block">
        <img src={backgroundImg} alt="Background Icons" className="object-contain w-full" />
      </div>
    </div>
  );
};

export default TeenBrainTeasers;
