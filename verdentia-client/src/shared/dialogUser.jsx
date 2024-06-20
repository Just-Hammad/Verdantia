import React, { useState, useEffect } from 'react';
import { v4 as idv4 } from 'uuid';
import { useContext } from 'react';
import UserContext from '../UserContext';

import handleUserUpdate from './updateUser';

function DialogUser({ TriggerNode, user, refreshTasks}) {
    const { USER } = useContext(UserContext);

    const [id] = useState(idv4());
    const [formData, setFormData] = useState({
        userId: '',
        uName: '',
        userName: '',
        uPassword: '',
        userTypeId: '',
        act: '',
    });

    useEffect(() => {
        if (user) {
            setFormData({
                userId: user.userId,
                uName: user.uName,
                userName: user.userName,
                uPassword: user.uPassword,
                userTypeId: user.userTypeId,
                email: user.email,
                phone: user.phone,
            });
        }
    }, [user]);

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [id]: value
        }));
    };

    const handleTriggerClick = () => {
        document.getElementById(`dialog-overlay${id}`).classList.remove('hidden');
        document.getElementById(`dialog${id}`).classList.remove('hidden');
    }

    const handleClose = () => {
        document.getElementById(`dialog-overlay${id}`).classList.add('hidden');
        document.getElementById(`dialog${id}`).classList.add('hidden');
    }

    return (
        <>
            <div onClick={handleTriggerClick} className='w-full h-full'>
                {TriggerNode}
            </div>
            {/* overlay */}
            <div id={`dialog-overlay${id}`} className='hidden inset-0 fixed h-[100vh] w-[100vw] bg-black opacity-75 z-10'></div>
            <div id={`dialog${id}`} className='hidden fixed w-[40vw] h-[75vh] top-[50%] left-[50%] z-20 translate-x-[-50%] translate-y-[-50%] bg-slate-50 shadow-lg shadow-slate-800 p-8'>
                <div className='flex justify-between items-center'>
                    <span className='font-bold text-2xl'>Edit User</span>
                    <span onClick={handleClose} className='cursor-pointer hover:bg-red-400 transition-all duration-300 px-2 font-black'>x</span>
                </div>
                <p className='text-sm font-medium'>Update the following details as required. <em>To create a user set UserID to Zero</em></p>
                <form className='py-4 flex flex-col gap-3'>
                    {/* ID */}
                    <div className='grid grid-cols-3 items-center'>
                        <label htmlFor="userId">Id: </label>
                        <input disabled={false} id="userId" value={formData.userId} onChange={handleChange} type="number" className='col-span-2 px-2 py-0.5 border-2 rounded-lg border-slate-400 outline-none hover:border-blue-700 focus:border-blue-700 transition-all duration-300' />
                    </div>

                    {/* Username */}
                    <div className='grid grid-cols-3 items-center'>
                        <label htmlFor="userName">Username: </label>
                        <input id="userName" value={formData.userName} onChange={handleChange} type="text" className='col-span-2 px-2 py-0.5 border-2 rounded-lg border-slate-400 outline-none hover:border-blue-700 focus:border-blue-700 transition-all duration-300' />
                    </div>

                    {/* Name */}
                    <div className='grid grid-cols-3 items-center'>
                        <label htmlFor="uName">Name: </label>
                        <input id="uName" value={formData.uName} onChange={handleChange} type="text" className='col-span-2 px-2 py-0.5 border-2 rounded-lg border-slate-400 outline-none hover:border-blue-700 focus:border-blue-700 transition-all duration-300' />
                    </div>

                    {/* Password */}
                    <div className='grid grid-cols-3 items-center'>
                        <label htmlFor="uPassword">Password: </label>
                        <input id="uPassword" value={formData.uPassword} onChange={handleChange} type="text" className='col-span-2 px-2 py-0.5 border-2 rounded-lg border-slate-400 outline-none hover:border-blue-700 focus:border-blue-700 transition-all duration-300' />
                    </div>

                    {/* UserTypeID */}
                    <div className='grid grid-cols-3 items-center'>
                        <label htmlFor="userTypeId">User Type: </label>
                        <input id="userTypeId" value={formData.userTypeId} onChange={handleChange} type="number" className='col-span-2 px-2 py-0.5 border-2 rounded-lg border-slate-400 outline-none hover:border-blue-700 focus:border-blue-700 transition-all duration-300' />
                    </div>

                    {/* Action */}
                    <div className='grid grid-cols-3 items-center'>
                        <label htmlFor="act">Action: </label>
                        <input id="act" value={formData.act} onChange={handleChange} type="text" className='col-span-2 px-2 py-0.5 border-2 rounded-lg border-slate-400 outline-none hover:border-blue-700 focus:border-blue-700 transition-all duration-300' />
                    </div>

                    <div className='flex flex-end gap-4'>
                        {USER.userId != 0 && (<button id="Update" onClick={handleUserUpdate("PUT", formData, refreshTasks, USER, handleClose)} type="update" className='border-2 border-sky-200 hover:border-sky-500 px-2 py-1 rounded-lg'>Update</button>)}
                        <button onClick={handleUserUpdate("POST", formData, refreshTasks, USER, handleClose)} type="create" className='border-2 border-green-200 hover:border-green-500 px-2 py-1 rounded-lg'>Create</button>
                    </div>

                </form>
            </div>
        </>
    )
}

export default DialogUser;


//disabled:bg-slate-200 col-span-2 px-2 py-0.5 border-2 rounded-lg border-slate-400 outline-none transition-all duration-300