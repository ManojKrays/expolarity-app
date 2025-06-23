import { CheckCircle } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { post } from "../config/network";
import apiDetails from "../config/apiDetails";
import { errorNotify, successNotify } from "../service/Messagebar";

const EmailVerify = () => {
    const [searchParams] = useSearchParams();
    const id = searchParams.get("id");
    const code = searchParams.get("code");
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const verifyEmail = async () => {
        setLoading(true);
        try {
            if (id && code) {
                const data = {
                    id,
                    code,
                };

                const res = await post(apiDetails.endPoint.verify, data);
                if (res.status === 200) {
                    successNotify("Email Verified Sucessfully!");
                    setTimeout(() => {
                        navigate("/login");
                    }, 500);
                    setLoading(false);
                }
            }
        } catch (err) {
            errorNotify("Something went wrong!");
            console.log(err);
            setLoading(false);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        verifyEmail();
    }, []);

    return (
        <div className="flex min-h-[100dvh] items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 px-4 font-mallanna">
            <div className="w-full max-w-md rounded-2xl bg-white p-8 text-center shadow-xl">
                <div className="mb-6">
                    <CheckCircle className="mx-auto mb-4 h-20 w-20 text-green-500" />
                    <h1 className="mb-2 text-3xl font-bold text-gray-800">Email Verified!</h1>
                    <p className="text-lg leading-relaxed text-gray-600">
                        You have successfully verified your email address. You can now access your account.
                    </p>
                </div>

                <div className="space-y-4">
                    <button
                        onClick={() => navigate("/login")}
                        className="w-full transform rounded-lg bg-green-500 px-6 py-3 font-semibold text-white transition-colors duration-200 hover:bg-green-600"
                    >
                        Go to Login
                    </button>

                    <p className="text-sm text-gray-500">Ready to sign in to your account</p>
                </div>
            </div>
        </div>
    );
};

export default EmailVerify;
