import React from "react";
import { testimonialsData } from "../../utils/data";

const TestimonialsCard = ({ name, text, location, photo }) => {
    return (
        <div className="rounded-lg border border-green-200 bg-white p-4 shadow-sm transition duration-300 hover:shadow-md">
            <div className="mb-3 flex items-center gap-4">
                <img
                    src={photo}
                    alt={name}
                    className="h-12 w-12 rounded-full border border-green-300 object-cover"
                />
                <div>
                    <div className="text-sm font-semibold text-green-700">{name}</div>
                    <div className="text-xs text-gray-500">{location}</div>
                </div>
            </div>
            <p className="text-sm italic text-gray-700">"{text}"</p>
        </div>
    );
};

const Testimonials = () => {
    return (
        <div className="px-[9%] py-8 font-mallanna">
            <div className="text-center">
                <p className="text-[30px] font-semibold text-green-500">Testimonials</p>
                <p>What our students are saying about us.</p>
            </div>

            <div className="grid grid-cols-1 gap-6 px-4 pt-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {testimonialsData.slice(0, 8).map((testimonial, index) => (
                    <TestimonialsCard
                        key={index}
                        name={testimonial.name}
                        text={testimonial.text}
                        location={testimonial.location}
                        photo={testimonial.photo}
                    />
                ))}
            </div>
        </div>
    );
};

export default Testimonials;
