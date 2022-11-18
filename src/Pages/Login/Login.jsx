import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthProvider/AuthProvider';
import SocialLogin from './SocialLogin';

const Login = () => {
    const { handleSubmit, formState: { errors }, register } = useForm();
    const [generalError, setGeneralError] = useState('')
    const { logIn, resetPassword } = useContext(AuthContext);
    const location = useLocation();
    const navigate = useNavigate();
    const from = location.state?.from?.pathname || '/';
    const handleLogin = async data => {
        try {
            const res = await logIn(data.email, data.password)
            setGeneralError("")
            navigate(from, { replace: true })
        } catch (error) {
            setGeneralError(error.message)
        }

    };
    const handleResetPassword = async (e) => {
        try {
            const res = await resetPassword(e.target.value)
            setGeneralError('')
            toast.success("Check your inbox/spam folder.")
        } catch (error) {
            setGeneralError(error.message)
        }
    }

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
                    <label htmlFor="my-modal-6" className="label">
                        <span className="label-text">Forgot password?</span>
                    </label>
                    <input type="submit" value="Login" className='btn btn-accent w-full mt-3' />
                </form>
                {
                    generalError && <p className="text-error">{generalError}</p>
                }
                <p className='text-center'>New to Doctors Portal? <Link to="/register" className='text-secondary'>Create an account</Link></p>
                <div className="divider divider-vertical">OR</div>
                <SocialLogin />
            </div>
            <div>
                <input type="checkbox" id="my-modal-6" className="modal-toggle" />
                <div className="modal modal-bottom sm:modal-middle">
                    <div className="modal-box">
                        <form>
                            <input onBlur={handleResetPassword} type="email" placeholder="Your email" className="input input-bordered w-full" />
                        </form>
                        <div className="modal-action">
                            <label htmlFor="my-modal-6" className="btn">Reset Password</label>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;