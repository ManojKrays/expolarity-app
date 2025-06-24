import React from "react";
import { blogData } from "../../utils/data";
import { useNavigate } from "react-router-dom";

const BlogCards = () => {
    const navigate = useNavigate();

    return (
        <div className="mt-6 grid gap-6 font-mallanna sm:grid-cols-2 md:grid-cols-3">
            {blogData.map((blog, index) => (
                <div
                    key={index}
                    onClick={() => navigate(blog.path)}
                    className="cursor-pointer overflow-hidden rounded-lg border border-green-200 bg-white shadow-sm transition hover:shadow-md"
                >
                    <img
                        src={blog.image}
                        alt={blog.title}
                        className="w-full object-cover"
                    />
                    <div className="p-4">
                        <h3 className="text-lg font-semibold text-green-700">{blog.title}</h3>
                        <p className="mt-2 text-sm text-gray-600">{blog.description}</p>
                    </div>
                </div>
            ))}
        </div>
    );
};

const Blogs = () => {
    return (
        <div className="py-8 font-mallanna">
            <div className="mb-6 text-center">
                <p className="text-[30px] font-semibold text-green-500">Blogs</p>
                <p className="text-gray-600">Where Career Questions Meet Expert Answers.</p>
            </div>
            <div className="px-4 md:px-12">
                <BlogCards />
            </div>
        </div>
    );
};

export default Blogs;
