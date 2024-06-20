import { useEffect, useState } from "react";
import { useUser } from "../UserContext"
import { v4 as idv4 } from 'uuid';
import '../pages/treeGrid.css';


function DialogTree({ TriggerNode, Tree }) {
    const [id] = useState(idv4());

    const [tree, setTree] = useState({});

    useEffect(() => {
        if (Tree) {
            setTree({
                treeId: Tree.treeId,
                typeId: Tree.typeId,
                age: Tree.age,
                task: Tree.task,
                assigned: Tree.assigned,
            })
        }
    }, [Tree]);

    const handleTriggerClick = () => {
        document.getElementById(`dialog${id}`).classList.remove('hidden');
    }

    const handleClose = () => {
        document.getElementById(`dialog${id}`).classList.add('hidden');
    }
    return (
        <>
            <div onClick={handleTriggerClick} className='w-full h-full'>
                {TriggerNode}
            </div>
            {/* overlay */}
            <div id={`dialog${id}`} className=' z-40 fixed hidden w-[15vw] h-[25vh] bg-blue-400 rounded-lg shadow-lg shadow-slate-800 p-2'>
                <div className='flex items-center justify-between w-full'>
                    <span className=' font-bold text-[2vw]'>{tree.treeId}</span>
                    <span onClick={handleClose} className='cursor-pointer hover:bg-red-400 transition-all duration-300 px-2 font-black'>x</span>
                </div>
                <div className="text-[0.8vw]">
                    <div className='grid grid-cols-2 gap-4'>
                        <div className='flex flex-col gap-4'>
                            <div className='flex flex-col'>
                                <span className='font-bold'>Task:</span>
                                <span>{tree.task}</span>
                            </div>
                            <div className='flex flex-col'>
                                <span className='font-bold'>Tree Type:</span>
                                <span>{tree.typeId}</span>
                            </div>
                        </div>
                        <div className='flex flex-col gap-4'>
                            <div className='flex flex-col'>
                                <span className='font-bold'>Assigned:</span>
                                <span>{tree.assigned}</span>
                            </div>
                            <div className='flex flex-col'>
                                <span className='font-bold'>Tree Age:</span>
                                <span>{tree.age}</span>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </>
    )
}

export default DialogTree;
