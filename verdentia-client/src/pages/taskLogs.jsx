import { useEffect, useState, useContext } from "react";
import UserContext from "../UserContext";

export default function TaskLogs({ changePage }) {
    const { USER } = useContext(UserContext);
    const [SearchState, setSearchState] = useState("");
    const [logsState, setLogsState] = useState([]);
    const [userNames, setUserNames] = useState({});

    const fetchLogs = () => {
        fetch("http://localhost:5163/TaskLogs")
            .then(res => res.json())
            .then(json => setLogsState(json))
            .catch(error => console.error("Error fetching logs:", error));
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
            if (index < logsState.length) {
                fetchName(logsState[index].userId)
                    .then(name => {
                        names[logsState[index].userId] = name;
                        index++;
                        fetchNextName();
                    })
                    .catch(error => {
                        console.error("Error fetching names:", error);
                        names[logsState[index].userId] = null;
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

    useEffect(() => {
        fetchLogs();
    }, []);

    useEffect(() => {
        fetchUserNames();
    }, [logsState]);

    const filteredLogs = logsState.filter(log => {
        try {
            const userName = userNames[log.userId];
            return (
                (USER.userTypeID)
                && (
                    log.taskId == SearchState.toLowerCase() ||
                    log.task.toLowerCase().includes(SearchState.toLowerCase()) ||
                    log.treeId.toLowerCase().includes(SearchState.toLowerCase()) ||
                    log.scheduled.toLowerCase().includes(SearchState.toLowerCase()) ||
                    (userName && userName.toLowerCase().includes(SearchState.toLowerCase())) ||
                    log.taskStatus.toLowerCase().includes(SearchState.toLowerCase())
                ));
        } catch (error) {
            console.error('Error accessing userNames:', error);
            return false;
        }
    });

    const refreshLogs = () => {
        fetchLogs();
    };

    return (
        <>
            <div className=" grid grid-cols-1 w-full">
                <div className="shadow-2xl h-[70.5vh] shadow-sky-700 flex flex-col rounded-lg bg-green-50 border border-green-400 transition-all outline-none px-2 py-2">
                    <div className="grid flex-row mb-4 grid-cols-12">
                        <p className="col-span-2 hover:rounded-sm hover:text-[1.1vw] w-[10vw] text-center text-[1vw] px-[1vw] py-[1vh] border-2 border-blue-400 bg-blue-100 hover:bg-blue-200 transition-all duration-300 rounded-lg">Manage Logs</p>
                        <p className="col-span-7" />
                        <input onChange={(e) => setSearchState(e.target.value.toString())} type="text" placeholder=" Search" className="w-[14vw] text-[2vh] px-[1vw] py-[1vh] col-span-3 rounded-lg border-2 border-blue-200 hover:border-blue-400 transition-all duration-300 outline-none focus:border-blue-400 w-full" />
                    </div>
                    <div className="w-[58.5vw] grid grid-cols-3 ">
                        <div className="col-span-1 grid grid-cols-5 flex flex-row ">
                            <p className="col-span-1 bg-blue-500 font-medium text-white font-bold text-[1.3vw] py-[1vh] text-center border-right border-white ">Id</p>
                            <p className="col-span-2 bg-blue-500 font-medium text-white font-bold text-[1.3vw] py-[1vh] text-center border-x border-white ">Task</p>
                            <p className="col-span-2 bg-blue-500 font-medium text-white font-bold text-[1.3vw] py-[1vh] text-center border-x border-white ">Assigned</p>
                        </div>
                        <div className=" col-span-2 grid grid-cols-10">
                            <p className="col-span-2 bg-blue-500 font-medium text-white font-bold text-[1.3vw] py-[1vh] text-center border-x border-white ">Tree</p>
                            <p className="col-span-2 bg-blue-500 font-medium text-white font-bold text-[1.3vw] py-[1vh] text-center border-x border-white ">Status</p>
                            <p className="col-span-2 bg-blue-500 font-medium text-white font-bold text-[1.3vw] py-[1vh] text-center border-x border-white ">Creation</p>
                            <p className="col-span-2 bg-blue-500 font-medium text-white font-bold text-[1.3vw] py-[1vh] text-center border-x border-white ">Deletion</p>
                            <p className="col-span-2 bg-blue-500 font-medium text-white font-bold text-[1.3vw] py-[1vh] text-center border-x border-white ">Scheduled</p>
                        </div>
                    </div>
                    {/* list goes below */}
                    <div className="h-[60vh] overflow-auto overscroll-none bg-red-400">
                        {filteredLogs.map((log) => (
                            <div key={log.taskId} className="w-full">
                                <div className="group grid grid-cols-3 flex flex-row border ">
                                    <div className="col-span-1 grid grid-cols-5">
                                        <p className="col-span-1 text-[1.1vw] group-hover:bg-slate-200 px-[1.5vw] flex items-center shadow-xl bg-slate-100 border-x border-white ">{log.taskId}</p>
                                        <p className="col-span-2 text-[1.1vw] group-hover:bg-slate-200 px-[1.5vw] flex items-center shadow-xl bg-slate-100 border-x border-white">{log.task}</p>
                                        <p className="col-span-2 text-[1.1vw] group-hover:bg-slate-200 px-[1.5vw] flex items-center shadow-xl bg-slate-100 border-x border-white">{userNames[log.userId]}</p>
                                    </div>
                                    <div className="col-span-2 grid grid-cols-10">
                                        <p className="col-span-2 text-[1.1vw] group-hover:bg-slate-200 px-[1.5vw] flex items-center shadow-xl bg-slate-100 border-x border-white">{log.treeId}</p>
                                        <p className="col-span-2 text-[1.1vw] group-hover:bg-slate-200 px-[1.5vw] flex items-center shadow-xl bg-slate-100 border-x border-white">{log.taskStatus}</p>
                                        <p className="col-span-2 text-[1vw] group-hover:bg-slate-200 px-[1.5vw] flex items-center shadow-xl bg-slate-100 border-x border-white ">{log.creation}</p>
                                        <p className="col-span-2 text-[1vw] group-hover:bg-slate-200 px-[1.5vw] flex items-center shadow-xl bg-slate-100 border-x border-white ">{log.deletion}</p>
                                        <p className="col-span-2 text-[1vw] group-hover:bg-slate-200 px-[1.5vw] flex items-center shadow-xl bg-slate-100 justify-end border-x border-white">{log.scheduled}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}