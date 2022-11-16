import React from 'react';

const InfoCard = ({ card }) => {
    const { title, description, img, bgClass } = card;
    return (
        <div className={`card lg:card-side shadow-xl text-white p-6 ${bgClass}`}>
            <figure><img src={img} alt="Movie" /></figure>
            <div className="card-body">
                <h2 className="card-title">{title}</h2>
                <p>{description}</p>

            </div>
        </div>
    );
};

export default InfoCard;