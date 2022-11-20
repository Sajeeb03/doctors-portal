import { async } from '@firebase/util';
import { useQuery } from '@tanstack/react-query';
import React from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import Loader from '../../Shared/loader/Loader';

const Users = () => {
    const navigate = useNavigate();
    const { data: users = [], isLoading, refetch } = useQuery({
        queryKey: ["users"],
        queryFn: async () => {
            const res = await fetch("http://localhost:5000/users", {
                headers: {
                    authorization: `Bearer ${localStorage.getItem("accessToken")}`
                }
            });
            const data = await res.json();
            return data.data;
        }
    })

    const handleAdmin = async id => {
        try {
            const res = await fetch(`http://localhost:5000/users/admin/${id}`, {
                method: "PUT",
                headers: {
                    authorization: `Bearer ${localStorage.getItem("accessToken")}`
                }
            });
            const data = await res.json();
            if (!data.success) {
                return toast.error(data.message)
            }

            if (data.success) {
                toast.success(data.message)
                refetch();
            }
        } catch (error) {
            console.error(error);
        }
    }

    if (isLoading) {
        return <Loader />
    }
    return (
        <div>
            <h3 className="text-3xl font-bold mb-5">Users</h3>
            <div className="overflow-x-auto">
                <table className="table w-full">

                    <thead>
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th>Job</th>
                            <th>Admin</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            users.map((user, i) => <tr key={user._id} className='hover'>
                                <th>{i + 1}</th>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>{!user?.role && <button onClick={() => handleAdmin(user._id)} className='btn btn-xs btn-primary text-white'>Make Admin</button>}</td>
                                <td><button className='btn btn-xs btn-error text-white'>Delete</button></td>
                            </tr>)
                        }

                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Users;