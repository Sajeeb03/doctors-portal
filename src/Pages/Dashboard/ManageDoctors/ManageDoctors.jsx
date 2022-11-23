import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import ConfirmationModal from '../../Shared/ConfirmationModal/ConfirmationModal';
import Loader from '../../Shared/loader/Loader';

const ManageDoctors = () => {
    const [doctorsData, setDoctorsData] = useState(null)
    const closeModal = () => {
        setDoctorsData(null)
    }
    const { data: doctors = [], isLoading, refetch } = useQuery({
        queryKey: ['doctors'],
        queryFn: async () => {
            try {
                const res = await fetch('https://doctors-portal-server-woad.vercel.app/doctors', {
                    headers: {
                        authorization: `Bearer ${localStorage.getItem("accessToken")}`
                    }
                })
                const data = await res.json();
                return data.data
            } catch (error) {
                console.error(error)
            }
        }
    });

    const handleDelete = async doctor => {
        // console.log(doctor, doctor._id);
        try {
            const res = await fetch(`https://doctors-portal-server-woad.vercel.app/doctors/${doctor._id}`, {
                method: "DELETE",
                headers: {
                    authorization: `Bearer ${localStorage.getItem("accessToken")}`
                }
            })
            const data = await res.json();
            if (data.success) {
                toast.success(`${doctor.name} deleted successfully.`);
                refetch();
            }
            else {
                toast.error(data.message)
            }
        } catch (error) {
            console.error(error)
        }

    }

    if (isLoading) {
        return <Loader />
    }
    return (
        <div>
            <h3 className="text-3xl font-bold mb-2">Manage Doctors {doctors.length}</h3>
            <div className="overflow-x-auto">
                <table className="table w-full">

                    <thead>
                        <tr>
                            <th></th>
                            <th>Avatar</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Specialty</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            doctors.map((doctor, i) => <tr key={doctor._id}>
                                <th>{i + 1}</th>
                                <td><div className="avatar">
                                    <div className="w-24 rounded-full">
                                        <img src={doctor.img} />
                                    </div>
                                </div></td>
                                <td>{doctor.name}</td>
                                <td>{doctor.email}</td>
                                <td>{doctor.specialty}</td>
                                <td>
                                    <label onClick={() => setDoctorsData(doctor)} htmlFor="confirmation-modal" className="btn btn-sm btn-error">Delete</label>
                                </td>
                            </tr>)

                        }
                    </tbody>
                </table>
            </div>
            {
                doctorsData && <ConfirmationModal
                    title={`Are You Sure?`}
                    message={`If you remove ${doctorsData.name} it can't be undone.`}
                    modalData={doctorsData}
                    successAction={handleDelete}
                    closeModal={closeModal}
                />
            }
        </div>
    );
};

export default ManageDoctors;