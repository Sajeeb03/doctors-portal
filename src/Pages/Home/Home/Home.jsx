import React from 'react';
import Banner from '../Banner/Banner';
import ContactUs from '../ContactUs/ContactUs';
import HomeReviews from '../HomeReviews/HomeReviews';
import InfoCards from '../InfoCards/InfoCards';
import MakeAppointment from '../MakeAppointment/MakeAppointment';
import ServicesCards from '../ServicesCard/ServicesCards';

const Home = () => {
    return (
        <div className='mx-5'>
            <Banner />
            <InfoCards />
            <ServicesCards />
            <MakeAppointment />
            <HomeReviews />
            <ContactUs />
        </div>
    );
};

export default Home;