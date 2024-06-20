import React, { useState, useEffect } from 'react';
import { v4 as idv4 } from 'uuid';

import handleTaskUpdate from './updateTask';

function DialogTask({ TriggerNode, task, refreshTasks }) {

    const [id] = useState(idv4());
    const [formData, setFormData] = useState({
        taskId: '',
        task1: '',
        treeId: '',
        userId: '',
        scheduled: ''
    });

    useEffect(() => {
        if (task) {
            setFormData({
                taskId: task.taskId,
                task1: task.task1,
                treeId: task.treeId,
                userId: task.userId,
                scheduled: task.scheduled
            });
        }
    }, [task]);

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
            <div id={`dialog${id}`} className='hidden fixed w-[40vw] h-[70vh] top-[50%] left-[50%] z-20 translate-x-[-50%] translate-y-[-50%] bg-slate-50 shadow-lg shadow-slate-800 p-8'>
                <div className='flex justify-between py-2 items-center'>
                    <span className='font-bold text-2xl'>Edit Task</span>
                    <span onClick={handleClose} className='cursor-pointer hover:bg-red-400 transition-all duration-300 px-2 font-black'>x</span>
                </div>
                <p className='text-sm font-medium'>Update the following details as required. <em>To create a task set TaskID to Zero</em></p>
                <form className='py-4 flex flex-col gap-3'>
                    {/* ID */}
                    <div className='grid grid-cols-3 items-center'>
                        <label htmlFor="taskId">Id: </label>
                        <input disabled={false} id="taskId" value={formData.taskId} onChange={handleChange} type="number" className='col-span-2 px-2 py-0.5 border-2 rounded-lg border-slate-400 outline-none hover:border-blue-700 focus:border-blue-700 transition-all duration-300' />
                    </div>

                    {/* TREE ID */}
                    <div className='grid grid-cols-3 items-center'>
                        <label htmlFor="treeId">Tree Id: </label>
                        <input id="treeId" value={formData.treeId} onChange={handleChange} type="text" className='col-span-2 px-2 py-0.5 border-2 rounded-lg border-slate-400 outline-none hover:border-blue-700 focus:border-blue-700 transition-all duration-300' />
                    </div>

                    {/* Task */}
                    <div className='grid grid-cols-3 items-center'>
                        <label htmlFor="task1">Task: </label>
                        <input id="task1" value={formData.task1} onChange={handleChange} type="text" className='col-span-2 px-2 py-0.5 border-2 rounded-lg border-slate-400 outline-none hover:border-blue-700 focus:border-blue-700 transition-all duration-300' />
                    </div>

                    {/* Assigned */}
                    <div className='grid grid-cols-3 items-center'>
                        <label htmlFor="userId">Assigned: </label>
                        <input id="userId" value={formData.userId} onChange={handleChange} type="text" className='col-span-2 px-2 py-0.5 border-2 rounded-lg border-slate-400 outline-none hover:border-blue-700 focus:border-blue-700 transition-all duration-300' />
                    </div>

                    {/* Scheduled */}
                    <div className='grid grid-cols-3 items-center'>
                        <label htmlFor="scheduled">Scheduled: </label>
                        <input id="scheduled" value={formData.scheduled} onChange={handleChange} type="date" className='col-span-2 px-2 py-0.5 border-2 rounded-lg border-slate-400 outline-none hover:border-blue-700 focus:border-blue-700 transition-all duration-300' />
                    </div>

                    <div className='flex flex-end gap-4'>
                        <button onClick={handleTaskUpdate("PUT", formData, refreshTasks, handleClose)} type="update" className='border-2 border-sky-200 hover:border-sky-500 px-2 py-1 rounded-lg'>Update</button>
                        <button onClick={handleTaskUpdate("POST", formData, refreshTasks, handleClose)} type="create" className='border-2 border-green-200 hover:border-green-500 px-2 py-1 rounded-lg'>Create</button>
                    </div>
                </form>
            </div>
        </>
    )
}

export default DialogTask;


//disabled:bg-slate-200 col-span-2 px-2 py-0.5 border-2 rounded-lg border-slate-400 outline-none transition-all duration-300