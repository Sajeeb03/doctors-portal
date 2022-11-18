import React from 'react';

const AppointmentOption = ({ appointment, setModalData }) => {
    const { name, slots } = appointment;
    return (
        <div className="card shadow-xl">
            <div className="card-body">
                <h2 className="text-2xl font-bold text-center text-secondary">{name}</h2>
                <p className='text-center'>{slots.length > 0 ? slots[0] : "Sorry No slots Available"}</p>
                <p className='text-center'>{slots.length} {slots.length > 1 ? "Spaces" : "Space"} available</p>
                <div className="card-actions justify-center">
                    <label
                        disabled={slots.length === 0}
                        htmlFor="app-modal"
                        className="btn btn-primary text-white"
                        onClick={() => setModalData(appointment)}
                    >Book Appointment</label>
                </div>
            </div>
        </div>
    );
};

export default AppointmentOption;