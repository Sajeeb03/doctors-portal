import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthProvider/AuthProvider';
import useToken from '../../Hooks/useToken';
import SocialLogin from './SocialLogin';

const Register = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [generalError, setGeneralError] = useState('')
    const { userRegistration, updateUser } = useContext(AuthContext);
    const [userEmail, setUserEmail] = useState('');
    const [token] = useToken(userEmail);
    const navigate = useNavigate();

    if (token) {
        navigate('/')
    }
    const handleSignUp = async data => {
        try {
            const res = await userRegistration(data.email, data.password)
            const update = await updateUser(data.name)
            saveUser(data.email, data.name)
            setGeneralError('')

        } catch (error) {
            setGeneralError(error.message)
        }
    }

    const saveUser = async (email, name) => {
        try {
            const user = { email, name }
            const res = await fetch('https://doctors-portal-server-woad.vercel.app/users', {
                method: "POST",
                headers: {
                    "content-type": "application/json",
                },
                body: JSON.stringify(user)
            })
            const data = await res.json();
            if (data.success) {
                toast.success("User updated");
                setUserEmail(email)
            }
        } catch (error) {
            console.error(error)
        }
    }
    return (
        <div className='h-screen flex items-center justify-center'>
            <div className='w-[385px] h-[556px] p-8 shadow-xl rounded-lg'>
                <h2 className='text-xl font-bold text-center'>Sign Up</h2>
                <form onSubmit={handleSubmit(handleSignUp)}>
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
                        <span className="label-text">Password</span>
                    </label>

                    <input type="password"
                        {...register("password", { required: "Password is required", minLength: { value: 6, message: "Password must be at least 6 characters" } })}
                        className="input input-bordered w-full" />
                    {
                        errors?.password && <p className="text-error">{errors?.password?.message}</p>
                    }
                    <input type="submit" value="Sign up" className='btn btn-accent w-full mt-6' />
                </form>
                {
                    generalError && <p className="text-error">{generalError}</p>
                }
                <p className='text-center'>Already have an account? <Link to="/login" className='text-secondary'>Login now</Link></p>
                <div className="divider divider-vertical">OR</div>
                <SocialLogin />
            </div>
        </div>
    );
};

export default Register;