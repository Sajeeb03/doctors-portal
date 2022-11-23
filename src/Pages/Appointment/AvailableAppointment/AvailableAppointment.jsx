import { useQuery } from '@tanstack/react-query';
import { format } from 'date-fns';
import React, { useEffect, useState } from 'react';
import Loader from '../../Shared/loader/Loader';
import Modal from '../Modal/Modal';
import AppointmentOption from './AppointmentOption';

const AvailableAppointment = ({ selectedDate }) => {
    // const [availableAppointment, setAvailableAppointment] = useState([]);
    const [modalData, setModalData] = useState(null);
    const date = format(selectedDate, "PP")
    const { data: availableAppointment = [], refetch, isLoading } = useQuery({
        queryKey: ["appointments", date],
        queryFn: async () => {
            const res = await fetch(`https://doctors-portal-server-woad.vercel.app/appointments?date=${date}`)
            const data = await res.json();
            return data.data
        }
    })

    if (isLoading) {
        return <Loader />
    }
    // useEffect(() => {
    //     fetch('https://doctors-portal-server-woad.vercel.app/appointments')
    //         .then(res => res.json())
    //         .then(data => setAvailableAppointment(data.data))
    // }, [])
    return (
        <section className='py-12'>
            <p className='text-center font-bold text-secondary'>Available Appointments on {format(selectedDate, "PP")}</p>
            <div className='grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-8'>
                {availableAppointment?.map(appointment => <AppointmentOption
                    key={appointment._id}
                    appointment={appointment}
                    setModalData={setModalData}
                ></AppointmentOption>)}
            </div>
            {modalData && <Modal
                modalData={modalData}
                selectedDate={selectedDate}
                setModalData={setModalData}
                refetch={refetch}
            />}
        </section>
    );
};

export default AvailableAppointment;