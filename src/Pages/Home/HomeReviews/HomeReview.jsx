import React from 'react';

const HomeReview = ({ singleReview }) => {
    const { name, review, location, img } = singleReview;
    return (
        <div className='shadow-2xl rounded-lg p-8'>
            <p>{review}</p>
            <div className='flex items-center gap-2 mt-9'>
                <img src={img} className="h-14 border-4 border-primary rounded-full w-14" alt="" />
                <div>
                    <p className='text-lg font-semibold'>{name}</p>
                    <p>{location}</p>
                </div>
            </div>
        </div>
    );
};

export default HomeReview;