import {
  FaUsers,
  FaSatelliteDish,
  FaGraduationCap,
  FaSchool,
  FaHandshake,
} from "react-icons/fa";
import logoImg from "../../assets/logo.png";
import { TbBellSchool } from "react-icons/tb";
import { FaThumbsUp, FaTwitter, FaRss } from "react-icons/fa";
import fun from "../../assets/funImage.png";
import result from "../../assets/result.png";
import progress from "../../assets/progress.png";
import homebg from "../../assets/homebg.png";
import { IoIosArrowRoundForward } from "react-icons/io";
import { RxHamburgerMenu } from "react-icons/rx";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import Home from "../../assets/home.jpeg";

const texts = [
  "Next-Gen Learning Analytics for a smarter, data-driven, and adaptive future.",
  "Transforming Education with AI to personalize and enhance learning.",
  "Precision Tracking for Success to monitor progress with accuracy.",
];

const HomePage = () => {
  const [index, setIndex] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % texts.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);
  return (
    <>
      <div className="font-golos w-full overflow-hidden bg-[#E8FDF7] ">
        <div
          className="w-full min-h-screen flex flex-col bg-no-repeat bg-cover sm:bg-[length:100%_100%] md:bg-[length:100%_93%]"
          style={{
            backgroundImage: `url(${Home})`,
          }}
        >
          {/* Navbar */}
          <nav className="w-full flex items-center justify-between px-6 py-4">
            <div className="flex items-center gap-2">
              <img src={logoImg} alt="Logo" className="w-8 h-8" />
              <h1 className="text-2xl font-bold text-white">Expolarity.Ai</h1>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex space-x-6 items-center">
              <a href="#" className="text-white">
                REGISTER
              </a>
              <a href="#" className="text-white">
                LOG IN
              </a>
            </div>

            {/* Mobile Menu Icon */}
            <div className="md:hidden">
              <RxHamburgerMenu
                className="w-6 h-6 cursor-pointer"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              />
            </div>
          </nav>
          {/* Mobile Menu  */}
          {isMobileMenuOpen && (
            <div className="md:hidden absolute top-16 right-6 bg-white shadow-lg rounded-md w-40 flex flex-col p-4  py-3">
              <a href="#" className="py-2 text-gray-900">
                REGISTER
              </a>
              <a href="#" className="py-2 text-gray-900">
                LOG IN
              </a>
            </div>
          )}

          {/* Hero Section */}
          <div className="flex flex-col items-center justify-center flex-grow text-center px-6 sm:px-4">
            <motion.h2
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
              className="text-2xl lg:text-4xl md:text-3xl sm:text-lg font-bold text-white max-w-[90%] md:max-w-[80%] "
            >
              {texts[index]}
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.3 }}
              className="text-white mt-2 text-lg max-w-[90%] font-semibold md:max-w-[60%] "
            >
              A child's growth story, beautifully captured with deeper insights
              and a fresh perspective.
            </motion.p>
            <motion.button
              className="mt-4 px-6 py-2 bg-[#1b721c] text-white rounded-md cursor-pointer"
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              onClick={() =>
                (window.location.href = "https://panel.expolarity.ai/")
              }
            >
              Take a test
            </motion.button>
          </div>

          {/* Bottom Sections */}
          <div className="w-full grid grid-cols-2 sm:grid-cols-2 text-center text-white bg-[#20db8a] shadow-lg">
            <div className="py-4 border-b sm:border-b-0 border-r border-teal-600 transition-transform transform hover:scale-105">
              <FaSchool className="inline-block mr-2" /> SCHOOLS
            </div>
            <div className="py-4 border-b sm:border-b-0 sm:border-r border-teal-600 transition-transform transform hover:scale-105">
              <FaHandshake className="inline-block mr-2" /> PARTNERS
            </div>
          </div>
        </div>
        {/* Advance Learning Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex flex-col items-center justify-center text-center p-6 md:p-10 pb-40 md:pb-60 bg-center bg-no-repeat bg-auto mx-auto w-full min-h-[80vh]"
          style={{ backgroundImage: `url(${homebg})` }}
        >
          <motion.h1
            className="text-[48px] font-semibold text-gray-900"
            initial={{ opacity: 0, y: -30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            Advance Learning Platform
          </motion.h1>
          <motion.p
            className="text-[16px] text-gray-600 p-4 w-[90%] md:w-[60%] lg:w-[40%]"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
          >
            We help students like you discover your strengths and areas for
            improvement through fun and interactive quizzes.
          </motion.p>
          <motion.button
            className="mt-4 px-6 py-2 bg-[#2EA748] text-white rounded-md cursor-pointer"
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            onClick={() =>
              (window.location.href = "https://panel.expolarity.ai/")
            }
          >
            Take a test
          </motion.button>
        </motion.div>

        {/* Card Section */}
        <div className="flex flex-col px-6 relative">
          {/* Text Section */}
          <motion.div
            className="w-full md:w-[30%] absolute left-0 md:left-10 lg:left-60 text-center md:text-left"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <p className="text-[28px] md:text-[32px]">
              A breakdown of strengths and areas for improvement
            </p>
          </motion.div>

          {/* Card Layout */}
          <div className="flex flex-col md:flex-row items-center justify-center gap-10 md:gap-20 mt-40 md:mt-20">
            {/* Left Card */}
            <motion.div
              className="flex md:items-center w-full md:w-auto"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.4 }}
            >
              <Card
                title="Track Your Progress"
                description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
                image={progress}
              />
            </motion.div>

            {/* Right Side Cards */}
            <div className="flex flex-col gap-5 md:gap-10 w-full md:w-auto">
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7, delay: 0.5 }}
              >
                <Card
                  title="Personalized Results"
                  description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
                  image={result}
                />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7, delay: 0.6 }}
              >
                <Card
                  title="Fun & Interactive"
                  description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
                  image={fun}
                />
              </motion.div>
            </div>
          </div>
        </div>
        {/* School Section */}
        <motion.section
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex flex-col md:flex-row items-center justify-between px-6 sm:px-12 md:px-20 py-14 md:py-20"
        >
          {/* Left Side - Text & Testimonial Section */}
          <div className="w-full lg:w-1/2 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start">
              <TbBellSchool className="text-teal-600 text-3xl mr-2" />
              <motion.h2
                initial={{ opacity: 0, y: -30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.2 }}
                className="text-3xl sm:text-4xl font-bold text-teal-600 uppercase tracking-wide"
              >
                Schools
              </motion.h2>
            </div>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="text-gray-700 mt-2 max-w-lg mx-auto md:mx-0"
            >
              Many schools across the world use Report Bee to transform the way
              they record and analyze data. Do you want to know how?
            </motion.p>
            <motion.button
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="mt-6 px-6 py-2 border border-teal-600 text-teal-600 rounded-md hover:bg-teal-600 hover:text-white transition"
            >
              LEARN MORE...
            </motion.button>

            {/* Testimonial Section */}
            <div className="mt-10">
              <h3 className="text-teal-600 text-2xl sm:text-3xl font-bold uppercase">
                What Our Customers Have To Say
              </h3>
              <p className="italic text-gray-700 mt-2 max-w-lg mx-auto md:mx-0">
                "On behalf of all the members of the Heritage Family, I wanted
                to congratulate Report Bee on such a different and amazing
                website. We would like to convey our best regards to your
                team..."
              </p>
              <div className="flex flex-col sm:flex-row items-center gap-4 mt-4">
                <img
                  src={logoImg}
                  alt="Heritage School"
                  className="w-12 h-12 rounded-md"
                />
                <div>
                  <p className="font-semibold">S Mehta (Coordinator)</p>
                  <p className="text-gray-600">
                    The Heritage School, New Delhi.
                  </p>
                </div>
              </div>
              <p className="text-green-700 font-semibold mt-4 cursor-pointer">
                VIEW MORE &gt;&gt;
              </p>
            </div>
          </div>

          {/* Right Side - Animated Stats */}
          <div className="relative flex justify-center items-center w-full lg:h-[60vh] h-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="hidden lg:flex absolute w-[180px] md:w-[220px] aspect-square border-[3px] border-blue-900 rounded-full flex-col justify-center items-center text-blue-900 left-[30%] top-[10%]"
            >
              <span className="text-sm pr-16">#SCHOOLS</span>
              <span className="text-xl pr-16">384</span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.5 }}
              className="hidden lg:flex absolute w-[180px] md:w-[220px] aspect-square border-[3px] border-red-900 rounded-full flex-col justify-center items-center text-red-900 left-[50%] top-[10%] z-20"
            >
              <span className="text-sm pl-24">#TEACHERS</span>
              <span className="text-xl pl-24">7,231</span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.7 }}
              className="hidden lg:flex absolute w-[200px] md:w-[240px] aspect-square border-[3px] border-green-900 rounded-full flex-col justify-center items-center text-green-900 left-[40%] top-[40%] z-30"
            >
              <FaGraduationCap size={20} className="mb-2 text-green-900" />
              <span className="text-sm font-semibold uppercase">#STUDENTS</span>
              <span className="text-2xl font-bold">3,68,641</span>
            </motion.div>
          </div>
        </motion.section>
        {/* Partner Section */}
        <motion.section
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex flex-col md:flex-row items-center justify-start p-6 sm:p-8 md:px-20"
        >
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="max-w-lg text-center md:text-left"
          >
            <div className="flex items-center justify-center md:justify-start gap-2">
              <FaUsers className="text-teal-700 text-2xl sm:text-3xl" />
              <h2 className="text-2xl sm:text-3xl font-bold text-teal-700">
                PARTNERS
              </h2>
            </div>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="text-gray-700 mt-4 text-sm sm:text-base"
            >
              Expolarity.ai's deep focus on data and open architecture enables
              many organisations working in the education sector to integrate
              with the Expolarity.ai's application. Do you want to leverage the
              data analytics and reporting capabilities of Expolarity.ai?
            </motion.p>
            <motion.button
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="mt-6 px-4 sm:px-6 py-2 border border-teal-600 text-teal-600 rounded-md hover:bg-teal-600 hover:text-white transition"
            >
              LEARN MORE...
            </motion.button>
          </motion.div>
        </motion.section>
        {/* Contact Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex flex-col md:flex-row justify-between items-start p-6 sm:p-8 md:p-10 text-gray-900 sm:px-4 md:px-10 lg:px-20"
        >
          {/* Left Section */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="w-full md:w-2/3"
          >
            <h2 className="text-2xl sm:text-3xl font-bold text-teal-700 flex items-center gap-2">
              <FaSatelliteDish className="text-3xl sm:text-4xl" /> CONNECT WITH
              US
            </h2>
            <p className="mt-4 text-base sm:text-lg">
              Are you a <strong>SCHOOL STAFF</strong> or <strong>PARENT</strong>{" "}
              of a <strong>CUSTOMER SCHOOL</strong> and looking for support?
            </p>
            <p className="mt-4 text-lg sm:text-xl font-semibold">
              Please reach us at
            </p>
            <p className="mt-2 text-lg sm:text-2xl font-bold text-black">
              support@expolarity.ai.com
            </p>
          </motion.div>

          {/* Right Section */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="w-full md:w-1/3 flex flex-col gap-4 sm:gap-6 mt-8 md:mt-0"
          >
            <div>
              <h3 className="text-base sm:text-lg font-bold text-teal-700">
                OFFICE
              </h3>
              <p className="text-gray-700 text-sm sm:text-base">
                123, abc Street, abc City, 999999, India.
              </p>
              <p className="text-gray-700 text-sm sm:text-base">
                Ph: +99 9999 999 999
              </p>
              <a href="#" className="text-teal-700 font-bold underline">
                Map
              </a>
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-teal-700">
                REGISTERED OFFICE
              </h3>
              <p className="text-gray-700 text-sm sm:text-base">
                No. 456, Avenue, Demo Town, 888888, India.
              </p>
            </div>
          </motion.div>

          {/* Social Icons */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex md:flex-col flex-row md:border-l md:pl-6 gap-6 justify-center md:items-center mt-8 md:mt-0"
          >
            <div className="flex flex-col items-center gap-2">
              <FaThumbsUp className="text-2xl sm:text-3xl text-gray-700" />
              <p className="text-xs sm:text-sm">Like us</p>
            </div>
            <div className="flex flex-col items-center gap-2">
              <FaTwitter className="text-2xl sm:text-3xl text-gray-700" />
              <p className="text-xs sm:text-sm">Tweet us</p>
            </div>
            <div className="flex flex-col items-center gap-2">
              <FaRss className="text-2xl sm:text-3xl text-gray-700" />
              <p className="text-xs sm:text-sm">Subscribe</p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </>
  );
};
const Card = ({ title, description, image }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="bg-white shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] rounded-lg w-full max-w-xs sm:max-w-sm md:max-w-md lg:w-80 flex flex-col items-center mx-auto"
    >
      <motion.img
        src={image}
        alt={title}
        className="w-40 h-40"
        initial={{ scale: 0.8, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.3 }}
      />
      <div className="p-6 sm:p-8 md:p-10">
        <motion.h3
          className="text-[20px] font-semibold"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          {title}
        </motion.h3>
        <motion.p
          className="text-gray-500 text-sm pt-2 pb-4 sm:pb-6"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          {description}
        </motion.p>
        <motion.a
          href="#"
          className="text-blue-500 text-sm font-medium flex items-center gap-1"
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          Learn more <IoIosArrowRoundForward className="text-lg" />
        </motion.a>
      </div>
    </motion.div>
  );
};

export default HomePage;
