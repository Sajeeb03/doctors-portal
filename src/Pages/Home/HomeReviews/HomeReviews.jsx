import React from 'react';
import HomeReview from './HomeReview';
import people1 from "../../../assets/images/people1.png"
import quote from "../../../assets/icons/quote.svg"

const HomeReviews = () => {

    const patientsReview = [
        {
            id: 1,
            name: "Winson Herry",
            location: "California",
            review: "It is a long established fact that by the readable content of a lot layout. The point of using Lorem a more-or-less normal distribu to using Content here, content",
            img: people1
        },
        {
            id: 2,
            name: "Winson Herry",
            location: "California",
            review: "It is a long established fact that by the readable content of a lot layout. The point of using Lorem a more-or-less normal distribu to using Content here, content",
            img: people1
        },
        {
            id: 3,
            name: "Winson Herry",
            location: "California",
            review: "It is a long established fact that by the readable content of a lot layout. The point of using Lorem a more-or-less normal distribu to using Content here, content",
            img: people1
        },
    ]
    return (
        <div className='bg-white p-12'>
            <div className='flex justify-between'>
                <div>
                    <p className='text-lg font-semibold text-primary'>Testimonial</p>
                    <p className='text-2xl'>What Our Patients Says</p>
                </div>
                <img src={quote} className="w-[192px] h-[156px]" alt="" />
            </div>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-14 mt-20'>
                {
                    patientsReview.map(singleReview => <HomeReview
                        key={singleReview.id}
                        singleReview={singleReview}
                    ></HomeReview>)
                }
            </div>
        </div>
    );
};

export default HomeReviews;