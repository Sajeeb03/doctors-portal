import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import { AuthContext } from '../../../context/AuthProvider/AuthProvider';
import Loader from '../../Shared/loader/Loader';

const MyAppointment = () => {
    const { user } = useContext(AuthContext);
    // console.log(user?.email);
    const url = `http://localhost:5000/bookings?email=${user?.email}`;
    const { data: appointments = [], isLoading } = useQuery({
        queryKey: ["appointments", user?.email],
        queryFn: async () => {
            const res = await fetch(url, {
                headers: {
                    authorization: `Bearer ${localStorage.getItem("accessToken")}`
                }
            })
            const data = await res.json();
            return data.data;
        }
    })

    if (isLoading) {
        return <Loader />
    }
    return (
        <div className=''>
            <h3 className="text-3xl font-bold mb-4">My Appointment</h3>
            <div className="overflow-x-auto">
                <table className="table w-full">

                    <thead>
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th>Service</th>
                            <th>Time</th>
                            <th>Date</th>
                        </tr>
                    </thead>
                    <tbody>


                        {appointments?.map((appointment, idx) => <tr key={idx} className="hover">
                            <th>{idx + 1}</th>
                            <td>{appointment.name}</td>
                            <td>{appointment.service}</td>
                            <td>{appointment.slot}</td>
                            <td>{appointment.selectedDate}</td>
                        </tr>)}



                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MyAppointment;