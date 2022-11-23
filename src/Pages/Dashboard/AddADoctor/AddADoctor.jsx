import { async } from '@firebase/util';
import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const AddADoctor = () => {
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { data: specialties = [] } = useQuery({
        queryKey: ["specialty"],
        queryFn: async () => {
            const res = await fetch('https://doctors-portal-server-woad.vercel.app/specialty')
            const data = await res.json();
            return data.data;
        }
    })
    const handleAddDoctor = data => {

        const image = data.img[0];
        const formData = new FormData;
        formData.append('image', image)
        const imageHostKey = import.meta.env.VITE_IMAGE_HOSTING_KEY;
        const url = `https://api.imgbb.com/1/upload?key=${imageHostKey}`
        fetch(url, {
            method: 'POST',
            body: formData
        })
            .then(res => res.json())
            .then(imgData => {
                if (imgData.success) {

                    const doctor = {
                        name: data.name,
                        email: data.email,
                        specialty: data.specialty,
                        img: imgData.data.url
                    }
                    console.log(doctor)
                    fetch('https://doctors-portal-server-woad.vercel.app/doctors', {
                        method: "POST",
                        headers: {
                            "content-type": "application/json",
                            authorization: `Bearer ${localStorage.getItem("accessToken")}`
                        },
                        body: JSON.stringify(doctor)
                    })
                        .then(res => res.json())
                        .then(response => {
                            console.log(response)
                            if (response.success) {
                                toast.success(response.message);
                                navigate('/dashboard/managedoctors');
                            }
                        })
                }
            })
    }
    return (
        <div>
            <h3 className="text-3xl font-bold ml-4">Add A Doctor</h3>

            <div className='w-[385px] h-[556px] p-8 shadow-2xl rounded-lg ml-4'>
                <form onSubmit={handleSubmit(handleAddDoctor)}>
                    <label className="label">
                        <span className="label-text">Name</span>
                    </label>
                    <input type="text" {...register("name", { required: "Name field is required" })} className="input input-bordered w-full" />
                    {
                        errors?.name && <p className="text-error">{errors?.name?.message}</p>
                    }
                    <label className="label">
                        <span className="label-text">Email</span>
                    </label>

                    <input type="email"
                        {...register("email", { required: "Email field is required" })}
                        className="input input-bordered w-full" />
                    {
                        errors?.email && <p className="text-error">{errors?.email?.message}</p>
                    }
                    <label className="label">
                        <span className="label-text">Specialty</span>
                    </label>
                    <select className="select select-bordered w-full max-w-xs" {...register("specialty")}>
                        {
                            specialties.map(specialty => <option key={specialty._id} selected={specialty[0]} value={specialty.name}>{specialty.name}</option>)
                        }
                    </select>
                    <label className="label">
                        <span className="label-text">Image</span>
                    </label>
                    <input type="file" {...register("img", { required: "Name field is required" })} className="input input-bordered p-2 w-full" />
                    {
                        errors?.img && <p className="text-error">{errors?.img?.message}</p>
                    }


                    <input type="submit" value="Add doctor" className='btn btn-accent w-full mt-6' />
                </form>
            </div>
        </div>
    );
};

export default AddADoctor;