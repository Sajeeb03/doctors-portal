import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import React from 'react';
import { useLoaderData } from 'react-router-dom';

import CheckoutForm from './CheckoutForm';
const stripePromise = loadStripe(import.meta.env.VITE_PK);
// console.log(stripePromise);
const Payment = () => {
    const booking = useLoaderData().data;
    const { service, slot, price, selectedDate } = booking;
    return (
        <div>
            <h3 className="text-3xl font-bold">
                Payment
            </h3>
            <p>Please pay <strong>${price}</strong> for {service} on {selectedDate} at {slot}</p>
            <div className='w-96 mt-4 p-3 border-2 border-gray-400'>
                <Elements stripe={stripePromise}>
                    <CheckoutForm booking={booking} />
                </Elements>
            </div>
        </div>
    );
};

export default Payment;