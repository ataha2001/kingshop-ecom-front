import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useState } from "react";

const CheckoutForm = () => {
    const stripe = useStripe();
    const elements = useElements();
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        if (!stripe || !elements) return;

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: "card",
            card: elements.getElement(CardElement),
        });

        if (error) {
            console.error(error);
            setLoading(false);
            return;
        }

        // Send paymentMethod.id to backend
        const res = await fetch("/api/checkout", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ paymentMethodId: paymentMethod.id }),
        });

        const data = await res.json();
        alert(data.message);
        setLoading(false);
    };

    return (
        <form onSubmit={handleSubmit} className="p-4 border">
            <CardElement className="border p-2" />
            <button 
                type="submit" 
                disabled={!stripe || loading} 
                className="bg-blue-500 text-white px-4 py-2 mt-4"
            >
                {loading ? "Processing..." : "Pay"}
            </button>
        </form>
    );
};

export default CheckoutForm;
