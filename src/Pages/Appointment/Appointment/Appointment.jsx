import React, { useState } from 'react';
import AppointmentBanner from '../AppointmentBanner/AppointmentBanner';
import AvailableAppointment from '../AvailableAppointment/AvailableAppointment';

const Appointment = () => {
    const date = new Date();
    const [selectedDate, setSelectedDate] = useState(date);
    return (
        <div>
            <AppointmentBanner
                selectedDate={selectedDate}
                setSelectedDate={setSelectedDate}
            />
            <AvailableAppointment selectedDate={selectedDate} />
        </div>
    );
};

export default Appointment;