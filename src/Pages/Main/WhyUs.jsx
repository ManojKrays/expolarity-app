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
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit. Hic vero officia iusto eum explicabo magni nobis alias vel a? Nam,
                    neque.
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
                        <p>
                            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ut asperiores, consequuntur nesciunt praesentium corporis ea
                            ducimus molestiae cumque. Quia, temporibus ex!
                        </p>
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
                            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Pariatur quae, impedit quam officiis eveniet tempora repudiandae
                            odio hic neque? Optio ducimus nesciunt similique.
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
                            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Distinctio officia excepturi doloribus consequuntur sapiente,
                            amet tenetur doloremque cupiditate rerum laboriosam ipsam.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WhyUs;
