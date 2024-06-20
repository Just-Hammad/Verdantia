import { useEffect } from "react";
import { useState } from "react";

export default function UserLogs({ changePage }) {

    const [SearchState, setSearchState] = useState("");
    const [logsState, setLogsState] = useState([]);
    const [isOn, setIsOn] = useState({
        deleted: false,
        updated: false,
        created: false,
    });

    const handleToggle = (e) => {
        const { id } = e.target;
        setIsOn((prev) => ({
            ...prev,
            [id]: !prev[id]
        }));
    };

    const userTypes = ["Null", "Admin", "Staff"];

    const fetchLogs = () => {
        fetch("http://localhost:5163/UserLogs")
            .then(res => res.json())
            .then(json => setLogsState(json))
            .catch(error => console.error("Error fetching logs:", error));
    };

    useEffect(() => {
        fetchLogs();
    }, []);

    const refreshLogs = () => {
        fetchLogs();
    };

    const filteredLogs = logsState.filter(user => {
        try {
            return (
                ((isOn.deleted && user.act.toLowerCase().includes("deleted")) ||
                    (isOn.updated && user.act.toLowerCase().includes("updated")) ||
                    (isOn.created && user.act.toLowerCase().includes("created")))
                && (
                    user.userId == SearchState.toLowerCase() ||
                    user.uName.toLowerCase().includes(SearchState.toLowerCase()) ||
                    user.userName.toLowerCase().includes(SearchState.toLowerCase()) ||
                    user.email.toLowerCase().includes(SearchState.toLowerCase()) ||
                    user.phone.toLowerCase().includes(SearchState.toLowerCase()) ||
                    user.updatedBy.toLowerCase().includes(SearchState.toLowerCase()) ||
                    userTypes[user.userTypeId].toLowerCase().includes(SearchState.toLowerCase()))
            );
        } catch (error) {
            console.error('Error accessing userTypes:', error);
            return false;
        }
    });

    return (
        <>
            <div className=" grid grid-cols-1 w-full">
                <div className="shadow-2xl h-[71vh] shadow-sky-700 flex flex-col rounded-lg bg-green-50 border border-green-400 transition-all outline-none px-2 py-2">
                    <div className="grid flex-row mb-4 grid-cols-12 gap-1">
                        <p className="col-span-3 hover:rounded-sm hover:text-[1.1vw] w-[10vw] text-center text-[1vw] px-[1vw] py-[1vh] border-2 border-blue-400 bg-blue-100 hover:bg-blue-200 transition-all duration-300 rounded-lg">Manage Logs</p>
                        <button id='deleted' onClick={handleToggle} className={` rounded ${isOn.deleted ? 'border-green-500 hover:border-red-600' : 'border-red-400 hover:border-green-700'} hover:rounded-sm hover:text-[1.1vw] text-center text-[1vw] border-2 border-blue-400 bg-blue-100 hover:bg-blue-200 transition-all duration-300 rounded-lg`}>
                        Deleted
                        </button>
                        <button id='updated'onClick={handleToggle} className={` rounded ${isOn.updated ? 'border-green-500 hover:border-red-600' : 'border-red-400 hover:border-green-700'} hover:rounded-sm hover:text-[1.1vw] text-center text-[1vw] border-2 border-blue-400 bg-blue-100 hover:bg-blue-200 transition-all duration-300 rounded-lg`}>
                        Updated
                        </button>
                        <button id='created'onClick={handleToggle} className={` rounded ${isOn.created ? 'border-green-500 hover:border-red-600' : 'border-red-400 hover:border-green-700'} hover:rounded-sm hover:text-[1.1vw] text-center text-[1vw] border-2 border-blue-400 bg-blue-100 hover:bg-blue-200 transition-all duration-300 rounded-lg`}>
                        Created
                        </button>  
                        <p className="col-span-3" />
                        <input onChange={(e) => setSearchState(e.target.value.toString())} type="text" placeholder=" Search" className="w-[14vw] text-[2vh] px-[1vw] py-[1vh] col-span-3 rounded-lg border-2 border-blue-200 hover:border-blue-400 transition-all duration-300 outline-none focus:border-blue-400 w-full" />
                    </div>
                    <div className="w-[58.5vw] grid grid-cols-3 ">
                        <div className="col-span-1 grid grid-cols-5 flex flex-row ">
                            <p className="col-span-1 bg-blue-500 font-medium text-white font-bold text-[1.3vw] py-[1vh] text-center border-right border-white ">Id</p>
                            <p className="col-span-2 bg-blue-500 font-medium text-white font-bold text-[1.3vw] py-[1vh] text-center border-x border-white ">Name</p>
                            <p className="col-span-2 bg-blue-500 font-medium text-white font-bold text-[1.3vw] py-[1vh] text-center border-x border-white ">Username</p>
                        </div>
                        <div className=" col-span-2 grid grid-cols-10 ">
                            <p className="col-span-2 bg-blue-500 font-medium text-white font-bold text-[1.3vw] py-[1vh] text-center border-x border-white ">Type</p>
                            <p className="col-span-2 bg-blue-500 font-medium text-white font-bold text-[1.3vw] py-[1vh] text-center border-x border-white ">Email</p>
                            <p className="col-span-2 bg-blue-500 font-medium text-white font-bold text-[1.3vw] py-[1vh] text-center border-x border-white ">Phone</p>
                            <p className="col-span-2 bg-blue-500 font-medium text-white font-bold text-[1.3vw] py-[1vh] text-center border-x border-white ">UpdatedBy</p>
                            <p className="col-span-2 bg-blue-500 font-medium text-white font-bold text-[1.3vw] py-[1vh] text-center border-x border-white ">Updated</p>
                        </div>
                    </div>
                    {/* list goes below */}
                    <div className="h-[60vh] overflow-auto overscroll-none">
                        {filteredLogs.map((log) => (
                            <div key={log.logId} className="w-full">
                                <div className="group grid grid-cols-3 flex flex-row border ">
                                    <div className="col-span-1 grid grid-cols-5">
                                        <p className="col-span-1 text-[1.1vw] group-hover:bg-slate-200 px-[1.5vw] flex items-center shadow-xl bg-slate-100 border-x border-white ">{log.userId}</p>
                                        <p className="col-span-2 text-[1.1vw] group-hover:bg-slate-200 px-[1.5vw] flex items-center shadow-xl bg-slate-100 border-x border-white">{log.uName}</p>
                                        <p className="col-span-2 text-[1.1vw] group-hover:bg-slate-200 px-[1.5vw] flex items-center shadow-xl bg-slate-100 border-x border-white">{log.userName}</p>
                                    </div>
                                    <div className="col-span-2 grid grid-cols-10">
                                        <p className="col-span-2 text-[1.1vw] group-hover:bg-slate-200 px-[1.5vw] flex items-center shadow-xl bg-slate-100 border-x border-white">{userTypes[log.userTypeId]}</p>
                                        <p className="col-span-2 text-[1.1vw] group-hover:bg-slate-200 px-[1.5vw] flex items-center shadow-xl bg-slate-100 border-x border-white">{log.email}</p>
                                        <p className="col-span-2 text-[1vw] group-hover:bg-slate-200 px-[1.5vw] flex items-center shadow-xl bg-slate-100 border-x border-white ">{log.phone}</p>
                                        <p className="col-span-2 text-[1vw] group-hover:bg-slate-200 px-[1.5vw] flex items-center shadow-xl bg-slate-100 border-x border-white ">{log.updatedBy}</p>
                                        <p className="col-span-2 text-[1vw] group-hover:bg-slate-200 px-[1.5vw] flex items-center shadow-xl bg-slate-100 justify-end border-x border-white">{log.updated}</p>
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