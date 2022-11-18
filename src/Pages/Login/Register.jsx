import React from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import SocialLogin from './SocialLogin';

const Register = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();

    const handleSignUp = data => {
        console.log(data)
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
                        {...register("password", { required: "Password is required" })}
                        className="input input-bordered w-full" />
                    {
                        errors?.password && <p className="text-error">{errors?.password?.message}</p>
                    }
                    <input type="submit" value="Sign up" className='btn btn-accent w-full mt-6' />
                </form>
                <p className='text-center'>Already have an account? <Link to="/login" className='text-secondary'>Login now</Link></p>
                <div className="divider divider-vertical">OR</div>
                <SocialLogin />
            </div>
        </div>
    );
};

export default Register;