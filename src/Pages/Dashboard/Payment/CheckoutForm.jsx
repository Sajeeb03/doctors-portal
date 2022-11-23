import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React, { useEffect, useState } from 'react';



const CheckoutForm = ({ booking }) => {
    const [cardError, setCardError] = useState('')
    const stripe = useStripe();
    const [clientSecret, setClientSecret] = useState("");
    const [transactionId, setTransactionId] = useState("");
    const [message, setMessage] = useState("");
    const [processing, setProcessing] = useState(false);
    const elements = useElements();
    const { price, service, name, email, _id } = booking;


    useEffect(() => {
        // Create PaymentIntent as soon as the page loads
        fetch("http://localhost:5000/create-payment-intent", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                authorization: `Bearer ${localStorage.getItem('accessToken')}`
            },
            body: JSON.stringify({ price }),
        })
            .then((res) => res.json())
            .then((data) => setClientSecret(data.clientSecret));
    }, [price]);

    const handleSubmit = async e => {
        setProcessing(false)
        e.preventDefault();
        if (!stripe || !elements) {
            // Stripe.js has not loaded yet. Make sure to disable
            // form submission until Stripe.js has loaded.
            return;
        }

        const card = elements.getElement(CardElement);
        if (card === null) {
            return;
        }

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: "card",
            card,
        })

        if (error) {
            console.log(error);
            setCardError(error.message)
        }
        else {
            setCardError('')
            // console.log('[PaymentMethod]', paymentMethod);
        }
        setMessage("")
        setProcessing(true)
        const { paymentIntent, error: cardError } = await stripe.confirmCardPayment(
            clientSecret,
            {
                payment_method: {
                    card: card,
                    billing_details: {
                        name: name,
                        email: email
                    },
                },
            },
        );

        if (cardError) {
            setCardError(cardError.message);
            return;
        }
        if (paymentIntent.status === 'succeeded') {
            setTransactionId(paymentIntent.id);
            setMessage("Your Payment is successful enjoy!")
            setProcessing(false)
            const payment = {
                email,
                name,
                price,
                transactionId: paymentIntent.id,
                booking: _id,
                service
            }
            fetch('http://localhost:5000/payments', {
                method: "post",
                headers: {
                    "content-type": "application/json",
                    authorization: `Bearer ${localStorage.getItem("accessToken")}`
                },
                body: JSON.stringify(payment)
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data)
                    if (data.success) {
                        setTransactionId(paymentIntent.id);
                        setMessage("Your Payment is successful enjoy!")
                        setProcessing(false)
                    }
                    else { console.log(data) }
                })
        }
    }
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <CardElement
                    options={{
                        style: {
                            base: {
                                fontSize: '16px',
                                color: '#424770',
                                '::placeholder': {
                                    color: '#aab7c4',
                                },
                            },
                            invalid: {
                                color: '#9e2146',
                            },
                        },
                    }}
                />
                <button className='btn btn-sm mt-4' type="submit" disabled={!stripe || !clientSecret || processing}>
                    Pay
                </button>
            </form>
            {cardError && <p className='text-error'>{cardError}</p>}
            {
                message && transactionId && <div>
                    <p className="text-green-400">{message}</p>
                    <p className="font-bold">Your transaction id is: {transactionId}</p>
                </div>
            }
        </div>
    );
};

export default CheckoutForm;