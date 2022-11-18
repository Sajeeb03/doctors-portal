import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import SocialLogin from './SocialLogin';

const Login = () => {
    const { handleSubmit, formState: { errors }, register } = useForm();

    const handleLogin = data => {


        console.log(data)
    };


    return (
        <div className='h-screen flex items-center justify-center'>
            <div className='w-[385px] h-[480px] p-8 shadow-xl rounded-lg'>
                <h2 className='text-xl font-bold text-center'>Login</h2>
                <form onSubmit={handleSubmit(handleLogin)}>

                    <label className="label">
                        <span className="label-text">Email</span>
                    </label>

                    <input type="email"
                        {...register("email", { required: "Email address is required" })}
                        className="input input-bordered w-full" />
                    {errors.email && <p className='text-orange-700'>{errors.email.message}</p>}

                    <label className="label">
                        <span className="label-text">Password</span>
                    </label>
                    <input type="password" {...register("password",
                        { required: "Password is required", minLength: { value: 6, message: "Password must be at least 6 characters." } })}
                        className="input input-bordered w-full" />
                    {errors?.password && <p className='text-orange-700'>{errors?.password?.message}</p>}
                    <label className="label">
                        <span className="label-text">Forgot password?</span>
                    </label>
                    <input type="submit" value="Login" className='btn btn-accent w-full' />
                </form>
                <p className='text-center'>New to Doctors Portal? <Link to="/register" className='text-secondary'>Create an account</Link></p>
                <div className="divider divider-vertical">OR</div>
                <SocialLogin />
            </div>
        </div>
    );
};

export default Login;