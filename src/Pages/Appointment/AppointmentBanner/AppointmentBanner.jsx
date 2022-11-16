import { format } from 'date-fns';
import React, { useState } from 'react';
import { DayPicker } from 'react-day-picker';
import PrimaryButton from '../../../assets/components/PrimaryButton/PrimaryButton';
import bg from '../../../assets/images/bg.png';
import chair from '../../../assets/images/chair.png';
const AppointmentBanner = () => {
    const date = new Date();
    const [selectedDate, setSelectedDate] = useState(date);
    return (
        <div className="hero mb-20">
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
                        <p className='text-center font-semibold'>You have selected {format(selectedDate, 'PP')}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AppointmentBanner;