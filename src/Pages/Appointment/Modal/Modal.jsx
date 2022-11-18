import { format } from 'date-fns';
import React from 'react';

const Modal = ({ modalData, selectedDate, setModalData }) => {
    const date = format(selectedDate, "PP")
    const { name, slots } = modalData;
    const handleBooking = e => {
        e.preventDefault();
        const form = e.target;
        const name = form.name.value;
        const slot = form.slot.value;
        const email = form.email.value;
        const phone = form.phone.value;

        const patient = {
            service: modalData.name,
            name,
            email,
            slot,
            phone,
            selectedDate: date,
        }
        console.log(patient);
        setModalData(null)
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
                        <input name="name" type="text" placeholder="Your Name" className="input input-bordered w-full" />
                        <input name="email" type="email" placeholder="Your Email" className="input input-bordered w-full" />
                        <input name="phone" type="text" placeholder="Your Phone" className="input input-bordered w-full" />
                        <button className='btn btn-accent' type="submit">Submit</button>
                    </form>
                </div>
            </div>
        </>
    );
};

export default Modal;