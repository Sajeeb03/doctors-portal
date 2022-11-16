import React from 'react';
import clock from "../../../assets/icons/clock.svg"
import marker from "../../../assets/icons/marker.svg"
import phone from "../../../assets/icons/phone.svg"
import InfoCard from './InfoCard';
const InfoCards = () => {
    const cardsInfo = [
        {
            id: 1,
            title: "Opening Hours",
            description: "Open at 09.00 to 05.00 pm",
            bgClass: "bg-gradient-to-r from-primary to-secondary",
            img: clock
        },
        {
            id: 2,
            title: "Visit Our Location",
            description: "Brooklyn, NY 10036, United States",
            bgClass: "bg-accent",
            img: marker
        },
        {
            id: 3,
            title: "Contact us now",
            description: "+000 123 456789",
            bgClass: "bg-gradient-to-r from-primary to-secondary",
            img: phone
        },
    ]
    return (
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-20 lg:mt-8'>
            {cardsInfo.map(card => <InfoCard
                key={card.id}
                card={card}
            />)}
        </div>
    );
};

export default InfoCards;