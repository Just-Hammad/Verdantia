import React, { useState, useEffect } from 'react';
import { v4 as idv4 } from 'uuid';

import handleTreeUpdate from './updateTree';

function DialogAddTree({ TriggerNode, callback }) {

    const [id] = useState(idv4());
    const [formData, setFormData] = useState({
        TreeID: '',
        TColumn: '',
        TRow: '',
        FarmID: '',
        TypeID: '',
        AGE: '',
        LastWatered: '',
        LastFertilized: '',
        LastPesticide: ''
    });

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
            <div id={`dialog-overlay${id}`} className='hidden inset-0 fixed h-[100vh] w-[100vw] bg-black opacity-75 z-30'></div>
            <div id={`dialog${id}`} className='hidden fixed w-[40vw] h-[70vh] top-[50%] left-[50%] z-50 translate-x-[-50%] translate-y-[-50%] bg-slate-50 shadow-lg shadow-slate-800 p-8'>
                <div className='flex justify-between  items-center'>
                    <span className='font-bold text-2xl'>Edit Task</span>
                    <span onClick={handleClose} className='cursor-pointer hover:bg-red-400 transition-all duration-300 px-2 font-black'>x</span>
                </div>
                <p className='text-sm font-medium'>Update the following details as required. <em>To create a task set TaskID to Zero</em></p>
                <form className='py-4 flex flex-col gap-3'>
        <div className='grid grid-cols-2'>

                    <div>
                        {/* ID */}
                        <div className='grid grid-cols-3 items-center'>
                            <label htmlFor="TreeID">TreeID: </label>
                            <input id="TreeID" value={formData.TreeID} onChange={handleChange} type="text" className='w-[80%] col-span-2 px-2 py-0.5 border-2 rounded-lg border-slate-400 outline-none hover:border-blue-700 focus:border-blue-700 transition-all duration-300' />
                        </div>

                        {/* TColumn */}
                        <div className='grid grid-cols-3 items-center'>
                            <label htmlFor="TColumn">TColumn: </label>
                            <input id="TColumn" value={formData.TColumn} onChange={handleChange} type="number" className='w-[80%] col-span-2 px-2 py-0.5 border-2 rounded-lg border-slate-400 outline-none hover:border-blue-700 focus:border-blue-700 transition-all duration-300' />
                        </div>

                        {/* TRow */}
                        <div className='grid grid-cols-3 items-center'>
                            <label htmlFor="TRow">TRow: </label>
                            <input id="TRow" value={formData.TRow} onChange={handleChange} type="number" className='w-[80%] col-span-2 px-2 py-0.5 border-2 rounded-lg border-slate-400 outline-none hover:border-blue-700 focus:border-blue-700 transition-all duration-300' />
                        </div>
                    </div>


                    <div>
                        {/* FarmID */}
                        <div className='grid grid-cols-3 items-center'>
                            <label htmlFor="FarmID">FarmID: </label>
                            <input id="FarmID" value={formData.FarmID} onChange={handleChange} type="number" className='w-[80%] col-span-2 px-2 py-0.5 border-2 rounded-lg border-slate-400 outline-none hover:border-blue-700 focus:border-blue-700 transition-all duration-300' />
                        </div>

                        {/* TypeID */}
                        <div className='grid grid-cols-3 items-center'>
                            <label htmlFor="TypeID">TypeID: </label>
                            <input id="TypeID" value={formData.TypeID} onChange={handleChange} type="number" className='w-[80%] col-span-2 px-2 py-0.5 border-2 rounded-lg border-slate-400 outline-none hover:border-blue-700 focus:border-blue-700 transition-all duration-300' />
                        </div>

                        {/* AGE */}
                        <div className='grid grid-cols-3 items-center'>
                            <label htmlFor="AGE">AGE: </label>
                            <input id="AGE" value={formData.AGE} onChange={handleChange} type="number" className='w-[80%] col-span-2 px-2 py-0.5 border-2 rounded-lg border-slate-400 outline-none hover:border-blue-700 focus:border-blue-700 transition-all duration-300' />
                        </div>


                    </div>
        </div>

                    {/* LastWatered */}
                    <div className='grid grid-cols-3 items-center'>
                        <label htmlFor="LastWatered">LastWatered: </label>
                        <input id="LastWatered" value={formData.LastWatered} onChange={handleChange} type="date" className='col-span-2 px-2 py-0.5 border-2 rounded-lg border-slate-400 outline-none hover:border-blue-700 focus:border-blue-700 transition-all duration-300' />
                    </div>

                    {/* LastFertilized */}
                    <div className='grid grid-cols-3 items-center'>
                        <label htmlFor="LastFertilized">LastFertilized: </label>
                        <input id="LastFertilized" value={formData.LastFertilized} onChange={handleChange} type="date" className='col-span-2 px-2 py-0.5 border-2 rounded-lg border-slate-400 outline-none hover:border-blue-700 focus:border-blue-700 transition-all duration-300' />
                    </div>

                    {/* LastPesticide */}
                    <div className='grid grid-cols-3 items-center'>
                        <label htmlFor="LastPesticide">LastPesticide: </label>
                        <input id="LastPesticide" value={formData.LastPesticide} onChange={handleChange} type="date" className='col-span-2 px-2 py-0.5 border-2 rounded-lg border-slate-400 outline-none hover:border-blue-700 focus:border-blue-700 transition-all duration-300' />
                    </div>
                    <div className='flex flex-end gap-4'>
                        <button onClick={handleTreeUpdate("PUT", formData, callback, handleClose)} type="update" className='border-2 border-sky-200 hover:border-sky-500 px-2 py-1 rounded-lg'>Update</button>
                        <button onClick={handleTreeUpdate("POST", formData, callback, handleClose)} type="create" className='border-2 border-green-200 hover:border-green-500 px-2 py-1 rounded-lg'>Create</button>
                    </div>
                </form>
            </div>
        </>
    )
}

export default DialogAddTree;