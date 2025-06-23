import React, { useRef, useState } from "react";
import Nav from "./Nav";
import Hero from "./Hero";
import WhyUs from "./WhyUs";
import Testimonials from "./Testimonials";
import Banner from "./Banner";
import Blogs from "./Blogs";
import Footer from "./Footer";
import ChatBot from "../../Component/ChatBot";

const Main = () => {
    const refs = {
        Home: useRef(null),
        "Why Us": useRef(null),
        Testimonials: useRef(null),
        Blogs: useRef(null),
    };

    const scrollToSection = (section) => {
        refs[section]?.current?.scrollIntoView({ behavior: "smooth" });
    };

    return (
        <div>
            <Nav scrollToSection={scrollToSection} />
            {/* <ChatBot
                setIsOpen={setIsOpen}
                isOpen={isOpen}
            /> */}
            <div ref={refs.Home}>
                <Hero />
            </div>
            <div ref={refs["Why Us"]}>
                <WhyUs />
            </div>
            <div ref={refs.Testimonials}>
                <Testimonials />
            </div>
            <Banner />
            <div ref={refs.Blogs}>
                <Blogs />
            </div>
            <Footer />
        </div>
    );
};

export default Main;
