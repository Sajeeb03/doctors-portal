import { async } from '@firebase/util';
import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import ConfirmationModal from '../../Shared/ConfirmationModal/ConfirmationModal';
import Loader from '../../Shared/loader/Loader';

const Users = () => {
    const navigate = useNavigate();
    const [deletingUser, setDeletingUser] = useState(null)
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
    const closeModal = () => {
        setDeletingUser(null)
    }
    const handleDeleteUser = user => {
        // console.log(user);
        fetch(`http://localhost:5000/users/${user._id}`, {
            method: "delete",
            headers: {
                authorization: `Bearer ${localStorage.getItem('accessToken')}`
            }
        })
            .then(res => res.json())
            .then(data => {
                if (data.success) {
                    toast.success(`${user.name} deleted.`)
                    refetch();
                }
            })
            .catch(err => console.error(err))
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
                                <td><label
                                    htmlFor="confirmation-modal"
                                    className='btn btn-xs btn-error text-white'
                                    onClick={() => setDeletingUser(user)}
                                >Delete</label></td>
                            </tr>)
                        }

                    </tbody>
                </table>
            </div>
            <div>
                {
                    deletingUser && <ConfirmationModal
                        title={`Delete User`}
                        message={`Are you sure you want to delete ${deletingUser.name} ?`}
                        modalData={deletingUser}
                        successAction={handleDeleteUser}
                        closeModal={closeModal}
                    ></ConfirmationModal>
                }
            </div>
        </div>
    );
};

export default Users;