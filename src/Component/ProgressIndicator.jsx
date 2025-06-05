import React from "react";

const ProgressIndicator = ({ current, total, questionType }) => {
    const percentage = (current / total) * 100;

    return (
        <div className="mb-4">
            <div className="mb-2 flex items-center justify-between">
                <span className="text-xs font-medium text-gray-600">
                    Question {current} of {total}
                </span>
                <span className="text-xs font-medium text-gray-600">{Math.round(percentage)}%</span>
            </div>

            <div className="h-2 w-full overflow-hidden rounded-full bg-gray-200">
                <div
                    className={`h-full rounded-full transition-all duration-500 ease-out ${questionType.color}`}
                    style={{ width: `${percentage}%` }}
                >
                    <div className="h-full animate-pulse bg-white/20"></div>
                </div>
            </div>

            <div className="mt-2 flex justify-between">
                {Array.from({ length: total }, (_, index) => (
                    <div
                        key={index}
                        className={`h-1 w-1 rounded-full transition-colors duration-300 ${
                            index < current ? questionType.color.replace("bg-", "bg-") + " opacity-100" : "bg-gray-300"
                        }`}
                    />
                ))}
            </div>
        </div>
    );
};

export default ProgressIndicator;
