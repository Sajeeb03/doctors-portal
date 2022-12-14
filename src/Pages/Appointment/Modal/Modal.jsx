import { format } from 'date-fns';
import React, { useContext } from 'react';
import toast from 'react-hot-toast';
import { AuthContext } from '../../../context/AuthProvider/AuthProvider';

const Modal = ({ modalData, selectedDate, setModalData, refetch }) => {
    const date = format(selectedDate, "PP")
    const { name, slots, price } = modalData;
    const { user } = useContext(AuthContext);
    const handleBooking = async e => {
        e.preventDefault();
        const form = e.target;
        const name = form.name.value;
        const slot = form.slot.value;
        const email = form.email.value;
        const phone = form.phone.value;

        const patient = {
            service: modalData.name,
            name,
            price,
            email,
            slot,
            phone,
            selectedDate: date,
        }
        // console.log(patient);
        try {
            const res = await fetch("https://doctors-portal-server-sajeeb03.vercel.app/bookings", {
                method: "POST",
                headers: {
                    "content-type": "application/json",
                },
                body: JSON.stringify(patient)
            })
            const data = await res.json();
            if (data.success) {
                toast.success(data.message);
                refetch();
                setModalData(null)
            }
            else {
                toast.error(data.message)
                setModalData(null)
            }
        } catch (error) {
            toast.success(error.message);
        }
    }
    return (
        <>
            <input type="checkbox" id="app-modal" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box relative">
                    <label htmlFor="app-modal" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                    <h3 className="text-lg font-bold">{name}</h3>
                    <form onSubmit={handleBooking} className='grid grid-cols-1 gap-3 mt-3'>
                        <input type="text" disabled value={date} className="input input-bordered w-full" />
                        <select name='slot' className="select select-bordered w-full">
                            {slots.map((slot, idx) => <option
                                key={idx}
                                value={slot}
                            >{slot}</option>)}
                        </select>
                        <input name="name" defaultValue={user?.displayName} disabled type="text" placeholder="Your Name" className="input input-bordered w-full" />
                        <input name="email" defaultValue={user?.email} disabled type="email" placeholder="Your Email" className="input input-bordered w-full" />
                        <input name="phone" type="text" placeholder="Your Phone" className="input input-bordered w-full" />
                        <button className='btn btn-accent' type="submit">Submit</button>
                    </form>
                </div>
            </div>
        </>
    );
};

export default Modal;