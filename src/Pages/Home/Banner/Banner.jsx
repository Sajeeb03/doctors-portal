import React from 'react';
import chair from "../../../assets/images/chair.png";
import bg from "../../../assets/images/bg.png"
import PrimaryButton from '../../../assets/components/PrimaryButton/PrimaryButton';
const Banner = () => {
    return (
        <div className="hero">
            <div className="hero-content flex-col lg:flex-row-reverse">
                <img src={chair} className="w-full md:w-1/2 rounded-lg shadow-2xl" alt='' />
                <div className='relative'>
                    <div>
                        <img src={bg} alt="" />
                    </div>
                    <div className='absolute top-2 md:top-1/2 lg:top-1/4'>
                        <h1 className="text-2xl lg:text-5xl  font-bold">Your New Smile Starts Here</h1>
                        <p className="py-2 lg:py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
                        <PrimaryButton>Get Started</PrimaryButton>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Banner;