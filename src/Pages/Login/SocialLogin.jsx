import { GoogleAuthProvider } from 'firebase/auth';
import React, { useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthProvider/AuthProvider';

const SocialLogin = () => {
    const { googleSignIn } = useContext(AuthContext);
    const location = useLocation();
    const navigate = useNavigate();
    const from = location.state?.from?.pathname || '/';
    const provider = new GoogleAuthProvider();
    const handleGoogleSignIn = async () => {
        try {
            const res = await googleSignIn(provider);
            console.log(res.user);
            navigate(from, { replace: true })
        } catch (error) {
            console.error(error)
        }
    } 
    return (
        <div>
            <button onClick={handleGoogleSignIn} className="btn btn-outline w-full">CONTINUE WITH GOOGLE</button>
        </div>
    );
};

export default SocialLogin;