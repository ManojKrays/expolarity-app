import { motion } from "framer-motion";
import { FaUsers, FaSatelliteDish, FaKey, FaStar } from "react-icons/fa";
import logoImg from "../../assets/logo.png";
import { TbBellSchool } from "react-icons/tb";
import { FaThumbsUp, FaTwitter, FaRss } from "react-icons/fa";
import fun from "../../assets/funImage.png";
import result from "../../assets/result.png";
import progress from "../../assets/progress.png";
import homebg from "../../assets/homebg.png";
import { IoIosArrowRoundForward } from "react-icons/io";
import { RxHamburgerMenu } from "react-icons/rx";

const HomePage = () => {
  return (
    <>
      <div className="font-golos w-full overflow-x-hidden">
        <div className="w-full min-h-screen bg-gradient-to-r from-teal-400 to-teal-300">
          {/* Navbar */}
          <nav className="absolute top-0 left-0 w-full flex items-center justify-between px-6 py-4">
            <div className="flex items-center gap-2">
              <img src={logoImg} alt="Logo" className="w-8 h-8" />
              <h1 className="text-2xl font-bold text-gray-900">
                Expolarity<span className="text-teal-700">.ai</span>
              </h1>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex space-x-6 items-center">
              <div className="flex items-center text-sm text-gray-900">
                <FaStar className="text-yellow-500 mr-1" /> REQUEST FOR DEMO
              </div>
              <a href="#" className="text-gray-900">
                REGISTER
              </a>
              <a href="#" className="text-gray-900">
                LOG IN
              </a>
            </div>

            {/* Mobile Menu Icon */}
            <div className="md:hidden">
              <RxHamburgerMenu className="w-6 h-6 cursor-pointer" />
            </div>
          </nav>

          {/* Hero Section */}
          <div className="flex flex-col items-center justify-center h-screen text-center px-6 sm:px-4">
            <motion.h2
              initial={{ opacity: 0, y: -30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 2 }}
              className="text-4xl lg:text-5xl md:text-3xl sm:text-2xl font-bold text-gray-900 max-w-[90%] md:max-w-[80%]"
            >
              INTELLIGENT GRADE BOOKS
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.3 }}
              className="text-gray-700 mt-2 text-lg md:text-base sm:text-sm max-w-[90%] md:max-w-[60%]"
            >
              A child's growth story told like never before
            </motion.p>
          </div>

          {/* Bottom Sections */}
          <div className="absolute bottom-0 w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 text-center text-white bg-teal-500">
            <div className="py-4 border-b sm:border-b-0 sm:border-r border-teal-600">
              PRODUCTS
            </div>
            <div className="py-4 border-b sm:border-b-0 sm:border-r border-teal-600">
              SCHOOLS
            </div>
            <div className="py-4 border-b sm:border-b-0 sm:border-r border-teal-600">
              PARTNERS
            </div>
            <div className="py-4">BIG DATA</div>
          </div>
        </div>

        {/* Advance Learning platform section */}
        <div
          className="flex flex-col items-center justify-center text-center p-6 md:p-10 pb-40 md:pb-60 bg-center bg-no-repeat bg-auto mx-auto w-full min-h-[80vh]"
          style={{ backgroundImage: `url(${homebg})` }}
        >
          <h1 className="text-[48px] font-semibold text-gray-900">
            Advance Learning Platform
          </h1>
          <p className="text-[16px] text-gray-600 p-4 w-[90%] md:w-[60%] lg:w-[40%]">
            We help students like you discover your strengths and areas for
            improvement through fun and interactive quizzes.
          </p>
          <button className="mt-4 px-6 py-2 bg-[#2EA748] text-white rounded-md cursor-pointer">
            Take a test
          </button>
        </div>

        <div className=" flex flex-col px-6 relative ">
          {/* Text Section */}
          <div className="w-full md:w-[30%] absolute  left-0 md:left-10 lg:left-60 text-center md:text-left">
            <p className="text-[28px] md:text-[32px]">
              a breakdown of strengths and areas for improvement
            </p>
          </div>

          {/* Card Layout */}
          <div className="flex flex-col md:flex-row items-center justify-center gap-10 md:gap-20 mt-40 md:mt-20">
            {/* Left Card */}
            <div className="flex md:items-center w-full md:w-auto">
              <Card
                title="Track Your Progress"
                description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
                image={progress}
              />
            </div>

            {/* Right Side */}
            <div className="flex flex-col gap-5 md:gap-10 w-full md:w-auto">
              <Card
                title="Personalized Results"
                description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
                image={result}
              />
              <Card
                title="Fun & Interactive"
                description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
                image={fun}
              />
            </div>
          </div>
        </div>

        <section className="flex flex-col md:flex-row flex-wrap items-center px-6 sm:px-12 md:px-20 py-10 md:py-20 gap-10">
          {/* Title and Description */}
          <motion.div
            className="text-center md:text-left md:w-1/2"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="flex justify-center md:justify-start items-center">
              <TbBellSchool className="text-teal-600 text-3xl mr-2" />
              <h2 className="text-3xl sm:text-4xl font-bold text-teal-600">
                SCHOOLS
              </h2>
            </div>
            <p className="text-gray-700 mt-2 mx-auto md:mx-0 max-w-lg">
              Many schools across the world use Expolarity.ai to transform the
              way they record and analyse data. Do you want to know how?
            </p>
            <motion.button
              className="mt-6 px-6 py-2 border border-teal-600 text-teal-600 rounded-md hover:bg-teal-600 hover:text-white transition"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              LEARN MORE...
            </motion.button>
          </motion.div>
          {/* <div className="relative flex justify-center items-center h-[300px] p-26 ">
  <motion.div
    className="hidden lg:flex w-40 h-40 md:w-52 md:h-52 border-4 border-red-900 rounded-full flex-col justify-center items-center text-red-900 absolute top-25 md:left-12 z-0"
    initial={{ opacity: 0, scale: 0.5 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.8, delay: 0.3 }}
  >
    <span className="text-sm font-semibold">#SCHOOLS</span>
    <span className="text-md ">384</span>
  </motion.div>

  <motion.div
    className="hidden lg:flex w-40 h-40 md:w-52 md:h-52 border-4 border-blue-900 rounded-full flex-col justify-center items-center text-blue-900 absolute top-25 right-26 z-0"
    initial={{ opacity: 0, scale: 0.5 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.8, delay: 0.5 }}
  >
    <span className="text-sm font-semibold">#TEACHERS</span>
    <span className="text-md ">7,231</span>
  </motion.div>

  <motion.div
    className="hidden lg:flex w-40 h-40 md:w-52 md:h-52 border-4 border-green-900 rounded-full flex-col justify-center items-center text-green-900 absolute top-44 z-0 left-0"
    initial={{ opacity: 0, scale: 0.5 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.8, delay: 0.7 }}
  >
    <span className="text-sm font-semibold">#STUDENTS</span>
    <span className="text-md ">3,68,641</span>
  </motion.div>
</div> */}
          {/* Customer Testimonials */}
          <motion.div
            className="md:w-1/2 text-center md:text-left"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.9 }}
          >
            <h3 className="text-teal-600 text-2xl sm:text-3xl font-bold">
              WHAT OUR CUSTOMERS HAVE TO SAY
            </h3>
            <p className="italic text-gray-700 mt-2 max-w-lg mx-auto md:mx-0">
              "On behalf of all the members of the Heritage Family, I wanted to
              congratulate Expolarity.ai on such a different and amazing
              website. We would like to convey our best regards to your team..."
            </p>
            <div className="flex flex-col sm:flex-row items-center gap-4 mt-4">
              <img
                src={logoImg}
                alt="Heritage School"
                className="w-12 h-12 rounded-md"
              />
              <div>
                <p className="font-semibold">S Mehta (Coordinator)</p>
                <p className="text-gray-600">The Heritage School, New Delhi.</p>
              </div>
            </div>
            <p className="text-green-700 font-semibold mt-4 cursor-pointer">
              VIEW MORE &gt;&gt;
            </p>
          </motion.div>
        </section>

        <section className="flex flex-col md:flex-row items-center justify-start p-6 sm:p-8 md:px-20">
          <div className="max-w-lg text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2">
              <FaUsers className="text-teal-700 text-2xl sm:text-3xl" />
              <h2 className="text-2xl sm:text-3xl font-bold text-teal-700">
                PARTNERS
              </h2>
            </div>
            <p className="text-gray-700 mt-4 text-sm sm:text-base">
              Expolarity.ai's deep focus on data and open architecture enables
              many organisations working in the education sector to integrate
              with the Expolarity.ai's application. Do you want to leverage the
              data analytics and reporting capabilities of Expolarity.ai?
            </p>
            <button className="mt-6 px-4 sm:px-6 py-2 border border-teal-600 text-teal-600 rounded-md hover:bg-teal-600 hover:text-white transition">
              LEARN MORE...
            </button>
          </div>
        </section>

        <div className="flex flex-col md:flex-row justify-between items-start p-6 sm:p-8 md:p-10 text-gray-900 sm:px-4 md:px-10 lg:px-20">
          {/* Left Section */}
          <div className="w-full md:w-2/3">
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
          </div>

          {/* Right Section */}
          <div className="w-full md:w-1/3 flex flex-col gap-4 sm:gap-6 mt-8 md:mt-0">
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
          </div>

          {/* Social Icons - Now visible on mobile */}
          <div className="flex md:flex-col flex-row md:border-l md:pl-6 gap-6 justify-center md:items-center mt-8 md:mt-0">
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
          </div>
        </div>
      </div>
    </>
  );
};
const Card = ({ title, description, image }) => {
  return (
    <div className="bg-white shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] rounded-lg w-full max-w-xs sm:max-w-sm md:max-w-md lg:w-80 flex flex-col items-center mx-auto">
      <img src={image} alt={title} className="w-40 h-40" />
      <div className="p-6 sm:p-8 md:p-10 ">
        <h3 className="text-[20px] font-semibold">{title}</h3>
        <p className="text-gray-500 text-sm pt-2 pb-4 sm:pb-6">{description}</p>
        <a
          href="#"
          className="text-blue-500 text-sm font-medium flex items-center gap-1 "
        >
          Learn more <IoIosArrowRoundForward className="text-lg" />
        </a>
      </div>
    </div>
  );
};

export default HomePage;
