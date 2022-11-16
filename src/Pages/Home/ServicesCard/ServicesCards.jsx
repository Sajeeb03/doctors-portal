import React from 'react';

import fluoride from "../../../assets/images/fluoride.png";
import cavity from "../../../assets/images/cavity.png";
import whitening from "../../../assets/images/whitening.png";
import baby from "../../../assets/images/treatment.png"
import ServiceCard from './ServiceCard';
import PrimaryButton from '../../../assets/components/PrimaryButton/PrimaryButton';

const ServicesCards = () => {
    const services = [
        {
            id: 1,
            title: "Fluoride Treatment",
            description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi sed voluptatem obcaecati.",
            img: fluoride
        },
        {
            id: 2,
            title: "Cavity Filling",
            description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi sed voluptatem obcaecati.",
            img: cavity
        },
        {
            id: 3,
            title: "Teeth Whitening",
            description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi sed voluptatem obcaecati.",
            img: whitening
        },
    ]
    return (
        <div className='my-16'>
            <div className='text-center'>
                <p className='text-lg font-semibold text-primary'>OUR SERVICES</p>
                <p className='text-2xl'>Services We Provide</p>
            </div>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-9 mt-16'>
                {
                    services.map(service => <ServiceCard
                        key={service.id}
                        service={service}
                    />)
                }
            </div>
            <div className='md:mx-56 mt-3 md:mt-48 flex flex-col md:flex-row justify-center items-center'>
                <img src={baby} className="h-[458px] w-[576px]" alt="" />
                <div className='md:ml-24'>
                    <h3 className='text-4xl font-bold'>Exceptional Dental Care, on Your Terms</h3>
                    <p className='my-2'>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsumis that it has a more-or-less normal distribution of letters,as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page</p>
                    <PrimaryButton>Getting Started</PrimaryButton>
                </div>
            </div>
        </div>
    );
};

export default ServicesCards;