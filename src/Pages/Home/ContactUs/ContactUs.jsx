import React from 'react';
import PrimaryButton from '../../../assets/components/PrimaryButton/PrimaryButton';
import appointment from '../../../assets/images/appointment.png';

const ContactUs = () => {
    return (
        <section style={{
            background: `url(${appointment})`
        }}>
            <div className='md:w-[450px] md:h-[468px] m-auto p-2 md:py-14'>
                <div className=''>
                    <div>
                        <p className='text-lg font-semibold text-primary text-center'>Contact Us</p>
                        <p className='text-2xl text-white text-center'>Stay connected with us</p>
                    </div>
                    <div className='mt-9'>
                        <input type="email" placeholder="Email Address" className="input input-bordered input-md w-full mt-3" /> <br />
                        <input type="text" placeholder="Subject" className="input input-bordered input-md w-full my-3" /><br />

                        <input type="text" placeholder="Your message" className="input input-bordered input-lg w-full" />

                    </div>
                    <div className='mt-3 w-1/4 m-auto'>
                        <PrimaryButton>Submit</PrimaryButton>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ContactUs;