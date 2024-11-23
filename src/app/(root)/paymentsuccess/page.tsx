"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import axiosInstance from "@/utils/axios";
import { useRouter } from "next/navigation";
import { axiosErrorCatch } from "@/utils/axiosErrorCatch";
import { isAxiosError } from "axios";
import Spinner from "@/components/ui/spinner/spinner";

interface PaymentDetails {
    id: string;
    currency: string;
    status: string;
    userId: string;
    subscription: string;
    clientSecret: string;
    createdAt: string;
    updatedAt: string;
}

const PaymentSuccess: React.FC = () => {
    const searchParams = useSearchParams();
    const [paymentDetails, setPaymentDetails] = useState<PaymentDetails | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>("");
    const router = useRouter()

    useEffect(() => {
        const fetchPaymentDetails = async () => {
            try {
                const session_id = searchParams.get("session_id");
                if (!session_id) {
                    setError("Session ID is missing.");
                    setLoading(false);
                    return;
                }

                const response = await axiosInstance.put(`/payment/success/${session_id}`);
                setPaymentDetails(response.data.data);
                setTimeout(() => {
                    router.push("/u/home")
                }, 3000);

            } catch (error) {
                if ((isAxiosError(error))) {
                    if (error.response?.data?.errorCode === "PAYMENT_ALREADY_PROCESSED") {
                        setTimeout(() => {

                            router.push("/u/home")
                        })
                    }
                    setError("Payment already processed, Redirecting to home page..");
                }
                else {

                    setError(axiosErrorCatch(error))
                }
            } finally {
                setLoading(false);
            }
        };

        fetchPaymentDetails();
    }, [searchParams]);

    if (loading) return <div>
        <Spinner />
    </div>;
    if (error) return <div> {error}</div>;

    return (
        <div className="p-8 bg-gray-100 min-h-screen flex flex-col items-center justify-center">
            {paymentDetails && (
                <div>
                    <h1 className="text-3xl text-center font-bold text-violet-900 mb-4 mt-10">Payment completed successfully</h1>
                    <Spinner />
                </div>
            )}
        </div>

    );
};

export default PaymentSuccess;
