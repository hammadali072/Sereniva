import React, { useState } from 'react';
import { X, CreditCard, ShieldCheck, ArrowRight, Warning, CheckCircle } from 'phosphor-react';
import ThemeButton from '../themeButton/themeButton';
import { loadStripe } from '@stripe/stripe-js';

// Initialize Stripe Publishable Key from .env
const STRIPE_PK = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY;

if (!STRIPE_PK) {
    console.error("VITE_STRIPE_PUBLISHABLE_KEY is missing from your .env file. Stripe will not function.");
}

const stripePromise = loadStripe(STRIPE_PK || "");

const PaymentModal = ({ isOpen, onClose, appointment }) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleProceedToPayment = async () => {
        setLoading(true);
        setError(null);

        try {
            // STEP 1: Create a real Checkout Session on the server
            const response = await fetch('/api/create-checkout-session', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    amount: appointment.servicePrice,
                    name: appointment.customerName,
                    service: appointment.serviceName,
                    appointmentId: appointment.id,
                    userId: appointment.userId
                }),
            });

            if (!response.ok) {
                const errData = await response.json();
                throw new Error(errData.error || "Failed to initiate payment session");
            }

            const { url } = await response.json();

            // STEP 2: Redirect the user to the Stripe-hosted checkout page
            window.location.href = url;
        } catch (err) {
            console.error("Payment Flow Error:", err);
            setError(err.message || "An unexpected error occurred. Please try again.");
            setLoading(false);
        }
    };

    if (!isOpen || !appointment) return null;

    return (
        <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4">
            <div
                className="absolute inset-0 bg-black/70 backdrop-blur-md animate-fade-in"
                onClick={onClose}
            ></div>

            <div className="relative bg-white w-full max-w-md rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.3)] overflow-hidden animate-scale-up">
                <div className="h-2.5 bg-gradient-to-r from-primary via-primaryDark to-primary" />

                <div className="p-8 pb-10">
                    <div className="flex justify-between items-start mb-10">
                        <div className="w-14 h-14 bg-primary/10 rounded-lg flex items-center justify-center text-primary shadow-sm border border-primary/5">
                            <CreditCard size={32} weight="fill" />
                        </div>
                        <button
                            onClick={onClose}
                            className="p-2.5 hover:bg-gray-100 rounded-lg text-gray-300 hover:text-gray-600"
                        >
                            <X size={24} weight="bold" />
                        </button>
                    </div>

                    <div className="mb-10">
                        <h2 className="text-3xl font-bold text-gray-900 mb-2 leading-tight">Secure Checkout</h2>
                        <p className="text-sm text-gray-500 font-medium tracking-tight">You will be redirected to Stripe's secure portal to enter your details.</p>
                    </div>

                    <div className="bg-gray-50 rounded-lg p-6 border border-gray-100 mb-8">
                        <div className="flex justify-between items-center">
                            <div>
                                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Session Amount</p>
                                <h3 className="text-3xl font-bold text-primaryDark">${appointment.servicePrice}</h3>
                            </div>
                            <div className="px-3 py-1 bg-primary/10 rounded-full">
                                <span className="text-[10px] font-bold text-primary uppercase">{appointment.serviceName}</span>
                            </div>
                        </div>
                    </div>

                    {error && (
                        <div className="mb-6 p-4 bg-red-50 border border-red-100 rounded-lg text-red-600 text-[11px] font-bold flex items-center gap-3 animate-shake">
                            <Warning size={18} weight="fill" />
                            <p>{error}</p>
                        </div>
                    )}

                    <ThemeButton
                        variant="primary"
                        onClick={handleProceedToPayment}
                        disabled={loading}
                        className="w-full !py-4.5 shadow-xl shadow-primary/20 flex items-center justify-center gap-2.5 text-base"
                    >
                        {loading ? (
                            <>
                                <div className="w-5 h-5 border-3 border-white/30 border-t-white rounded-full animate-spin" />
                                Connecting to Stripe...
                            </>
                        ) : (
                            <>
                                <ShieldCheck size={22} weight="fill" />
                                Proceed to Stripe Payment
                                <ArrowRight size={20} weight="bold" />
                            </>
                        )}
                    </ThemeButton>
                </div>

                <div className="bg-gray-50 px-8 py-5 border-t border-gray-100 flex items-center justify-center gap-3 text-[10px] text-gray-400 font-bold uppercase tracking-widest   italic">
                    <CheckCircle size={14} weight="fill" className="text-green-500" />
                    Encrypted & Secure Transaction
                </div>
            </div>
        </div>
    );
};

export default PaymentModal;
