
import React from 'react';
import { DayPicker } from 'react-day-picker';
import bg from '../../../assets/images/bg.png';
import chair from '../../../assets/images/chair.png';
const AppointmentBanner = ({ selectedDate, setSelectedDate }) => {

    return (
        <header className="hero mb-20">
            <div className="hero-content flex-col lg:flex-row-reverse">
                <img src={chair} className="w-full md:w-1/2 rounded-lg shadow-2xl" alt='' />
                <div className='relative'>
                    <img src={bg} alt="" />
                    <div className='absolute top-0 md:top-3 ml-3 md:ml-32'>
                        <DayPicker
                            mode='single'
                            selected={selectedDate}
                            onSelect={setSelectedDate}
                        ></DayPicker>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default AppointmentBanner;