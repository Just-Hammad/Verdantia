import { useEffect, useState, useContext } from "react";
import DialogTask from "../shared/dialogTask";
import handleTaskUpdate from "../shared/updateTask";
import UserContext from "../UserContext";
export default function Tasks({ changePage}) {

    const {USER} = useContext(UserContext);
    const [SearchState, setSearchState] = useState("");
    const [tasksState, setTasksState] = useState([]);
    const [userNames, setUserNames] = useState({});

    const fetchTasks = () => {
        fetch("http://localhost:5163/Tasks")
            .then(res => res.json())
            .then(json => setTasksState(json))
            .catch(error => console.error("Error fetching tasks:", error));
    };

    const fetchName = (Id) => {
        return fetch(`http://localhost:5163/Users/${Id}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.text();
            })
            .catch(error => {
                console.error('Error fetching name:', error);
                return null;
            });
    };

    const fetchUserNames = () => {
        const names = {};
        let index = 0;
        const fetchNextName = () => {
            if (index < tasksState.length) {
                fetchName(tasksState[index].userId)
                    .then(name => {
                        names[tasksState[index].userId] = name;
                        index++;
                        fetchNextName();
                    })
                    .catch(error => {
                        console.error("Error fetching names:", error);
                        names[tasksState[index].userId] = null;
                        index++;
                        fetchNextName();
                    });
            } else {
                setUserNames(names);
                console.log("User names fetched:", names);
            }
        };
        fetchNextName();
    };
    
    const refreshTasks = () => {
        fetchTasks();
    };

    useEffect(() => {
        fetchTasks();
    }, []);

    useEffect(() => {
        fetchUserNames();
    }, [tasksState]);

    const filteredTasks = tasksState.filter(task => {
        try {
            const userName = userNames[task.userId];
            if (userName == null) {
                return true;
            }
            return (
                (userName.toLowerCase().includes(USER?.uName?.toLowerCase()) || USER?.userTypeID === 1)
                && (
                    task.taskId == SearchState.toLowerCase() ||
                    task.task1.toLowerCase().includes(SearchState.toLowerCase()) ||
                    task.treeId.toLowerCase().includes(SearchState.toLowerCase()) ||
                    (userName && userName.toLowerCase().includes(SearchState.toLowerCase()))
                ));
        } catch (error) {
            console.error('Error accessing userNames:', error);
            return false;
        }
    });
    

    const doneIcon = (
        <svg className=" cursor-pointer py-2 w-[10vw] h-[10vh]" viewBox="-4.73 0 72.44 72.44" xmlns="http://www.w3.org/2000/svg" fill="#000000"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <g id="Group_11" data-name="Group 11" transform="translate(-482.502 -412.731)"> <path id="Path_25" data-name="Path 25" d="M533.566,429.163l-25.9,25.9-8.182-8.182" fill="none" stroke="#38a810" strokeMiterlimit="10" strokeWidth="3"></path> <g id="Group_9" data-name="Group 9" opacity="0.15"> <circle id="Ellipse_17" data-name="Ellipse 17" cx="29.992" cy="29.992" r="29.992" transform="translate(484.002 423.686)" fill="none" stroke="#1f73c1" strokeLinecap="round" strokeMiterlimit="10" strokeWidth="3"></circle> </g> <g id="Group_10" data-name="Group 10"> <circle id="Ellipse_18" data-name="Ellipse 18" cx="29.992" cy="29.992" r="29.992" transform="translate(484.002 414.231)" fill="none" stroke="#1f73c1" strokeMiterlimit="10" strokeWidth="3"></circle> </g> </g> </g></svg>
    );


    return (
        <>
            <div className="grid grid-cols-1 w-full h-[75vh] px-8">
                <div className="shadow-2xl shadow-sky-700 flex flex-col gap-4 rounded-lg bg-green-50 border border-green-400 transition-all outline-none px-2 py-2">
                    <div className="grid grid-cols-11">
                        <p className="col-span-2 w-[10vw] text-center text-[1vw] px-[1vw] py-[1vh] border-2 border-blue-400 bg-blue-100 hover:bg-blue-200 transition-all duration-300 rounded-lg">Manage Tasks</p>
                        <p className="col-span-6" />
                        <input onChange={(e) => setSearchState(e.target.value.toString())} type="text" placeholder=" Search" className="w-[14vw] text-[2vh] px-[1vw] py-[1vh] col-span-3 rounded-lg border-2 border-blue-200 hover:border-blue-400 transition-all duration-300 outline-none active:border-blue-400 w-full" />
                    </div>
                    <div className="h-[66vh] ">
                        <div className="grid grid-cols-11">
                            <p className="bg-blue-500 font-medium text-white font-bold text-[1.3vw] py-[1vh] text-center border-right border-white ">Id</p>
                            <p className="bg-blue-500 font-medium text-white font-bold text-[1.3vw] py-[1vh] text-center border-x border-white col-span-2">Task</p>
                            <p className="bg-blue-500 font-medium text-white font-bold text-[1.3vw] py-[1vh] text-center border-x border-white col-span-2">Assigned</p>
                            <p className="bg-blue-500 font-medium text-white font-bold text-[1.3vw] py-[1vh] text-center border-x border-white col-span-2">Tree</p>
                            <p className="bg-blue-500 font-medium text-white font-bold text-[1.3vw] py-[1vh] text-center border-x border-white col-span-2">Due</p>
                        </div>
                        {/* list goes below */}
                        <div className="h-[60vh] overflow-auto">
                            {filteredTasks.map((task) => (
                                <div key={task.taskId} className="w-full grid grid-cols-11">
                                    <div className="group w-[44.8vw] col-span-9 border ">
                                        <DialogTask className='w-full col-span-9 '
                                            TriggerNode={
                                                <div className="grid grid-cols-9 h-full w-full">
                                                    <div className="text-[1.1vw] group-hover:bg-slate-200 px-[1.5vw] flex items-center shadow-xl bg-slate-100 border-x border-white ">{task.taskId}</div>
                                                    <p className="text-[1.1vw] group-hover:bg-slate-200 px-[1.5vw] flex items-center shadow-xl bg-slate-100 border-x border-white col-span-2">{task.task1}</p>
                                                    <p className="text-[1.1vw] group-hover:bg-slate-200 px-[1.5vw] flex items-center shadow-xl bg-slate-100 border-x border-white col-span-2">{userNames[task.userId]}</p>
                                                    <p className="text-[1.1vw] group-hover:bg-slate-200 px-[1.5vw] flex items-center shadow-xl bg-slate-100 border-x border-white col-span-2">{task.treeId}</p>
                                                    <p className="text-[1.1vw] group-hover:bg-slate-200 px-[1.5vw] flex items-center shadow-xl bg-slate-100 justify-end border-x border-white col-span-2">{task.scheduled}</p>
                                                </div>
                                            }
                                            task={task}
                                            refreshTasks={refreshTasks}
                                        >
                                        </DialogTask>
                                    </div>
                                    <div onClick={handleTaskUpdate("DELETE", task, refreshTasks)} className='col-span-2 justify-start text-[1.1vw] flex items-center justify-start border-x border-white' >{doneIcon}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}