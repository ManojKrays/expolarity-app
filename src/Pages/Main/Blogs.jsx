import React from "react";

const blogData = [
    {
        title: "How to Choose the Right Career Path as a Student",
        description: "Explore practical tips and guidance for students to identify their strengths and choose the right career track early in life.",
        image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=800&q=80",
    },
    {
        title: "Top 5 Skills Every Child Should Develop",
        description: "A breakdown of essential 21st-century skills that children should cultivate to thrive in any career field.",
        image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=800&q=80",
    },
    {
        title: "The Role of Aptitude Tests in Career Planning",
        description: "Understand how career assessments help identify the right career fit and how students can benefit from them.",
        image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=800&q=80",
    },
];

const BlogCards = () => {
    return (
        <div className="mt-6 grid gap-6 sm:grid-cols-2 md:grid-cols-3">
            {blogData.map((blog, index) => (
                <div
                    key={index}
                    className="overflow-hidden rounded-lg border border-green-200 bg-white shadow-sm transition hover:shadow-md"
                >
                    <img
                        src={blog.image}
                        alt={blog.title}
                        className="h-48 w-full object-cover"
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
