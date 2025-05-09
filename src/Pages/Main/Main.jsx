import React from "react";
import Nav from "./Nav";
import Hero from "./Hero";
import WhyUs from "./WhyUs";
import Testimonials from "./Testimonials";
import Banner from "./Banner";
import Blogs from "./Blogs";
import Footer from "./Footer";

const Main = () => {
    return (
        <div>
            <Nav />
            <Hero />
            <WhyUs />
            <Testimonials />
            <Banner />
            <Blogs />
            <Footer />
        </div>
    );
};

export default Main;
