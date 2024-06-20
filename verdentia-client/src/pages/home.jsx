import { useUser } from "../UserContext"
import { toast } from "react-toastify";

export default function Home({ changePage }) {
    const { USER } = useUser();

    const handleUsersButton = () => {
        if (USER.userTypeID != 1) {
            toast.error("Insufficient Privilleges");
            return;
        }
        changePage("users");
    }

    const handleUserLogsButton = () => {
        if (USER.userTypeID != 1) {
            console.log(USER.userTypeID);
            toast.error("Insufficient Privilleges");
            return;
        }
        changePage("userlogs");
    }

    return (
        <>
            <div className="h-[70vh] grid grid-rows-4">
                <span></span>
                <div className="flex self-center justify-center translate-x-[-8%] items-center">
                    <button onClick={() => changePage("treegrid")} className="duration-300 transition-all hover:rounded-sm hover:text-[1.7vw] shadow-lg text-center text-[1.5vw] px-[2vw] py-[1vh] border-2 border-green-400 bg-green-100 hover:bg-green-200 w-[20vw] rounded-lg">Orchard Map</button>
                </div>
                <div className="grid grid-cols-2">
                    <div className="flex flex-col justify-center items gap-4">
                        <button onClick={() => changePage("tasks")} className="duration-300 transition-all hover:rounded-sm hover:text-[1.7vw] shadow-lg text-center text-[1.5vw] px-[2vw] py-[1vh] border-2 border-green-400 bg-green-100 hover:bg-green-200 w-[20vw] rounded-lg">Manage Tasks</button>
                        <button className="duration-300 transition-all hover:rounded-sm hover:text-[1.7vw] shadow-lg text-center text-[1.5vw] px-[2vw] py-[1vh] border-2 border-green-400 bg-green-100 hover:bg-green-200 w-[20vw] rounded-lg">Manage Inventory</button>
                        <button onClick={handleUsersButton} className="duration-300 transition-all hover:rounded-sm hover:text-[1.7vw] shadow-lg text-center text-[1.5vw] px-[2vw] py-[1vh] border-2 border-green-400 bg-green-100 hover:bg-green-200 w-[20vw] rounded-lg">Manage Users</button>
                    </div>
                    <div className="flex flex-col justify-center items gap-4">
                        <button onClick={() => changePage("tasklogs")} className="duration-300 transition-all hover:rounded-sm hover:text-[1.7vw] shadow-lg text-center text-[1.5vw] px-[2vw] py-[1vh] border-2 border-green-400 bg-green-100 hover:bg-green-200 w-[20vw] rounded-lg">Task Logs</button>
                        <button className="duration-300 transition-all hover:rounded-sm hover:text-[1.7vw] shadow-lg text-center text-[1.5vw] px-[2vw] py-[1vh] border-2 border-green-400 bg-green-100 hover:bg-green-200 w-[20vw] rounded-lg">Inventory Logs</button>
                        <button onClick={handleUserLogsButton} className="duration-300 transition-all hover:rounded-sm hover:text-[1.7vw] shadow-lg text-center text-[1.5vw] px-[2vw] py-[1vh] border-2 border-green-400 bg-green-100 hover:bg-green-200 w-[20vw] rounded-lg">User Logs</button>
                    </div>
                </div>
            </div>
        </>
    )
}
