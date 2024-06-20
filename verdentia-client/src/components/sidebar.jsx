import { useUser } from "../UserContext";
import useDelay from "./useDelay";
import { useState } from "react";
import { toast } from "react-toastify";
export default function Sidebar({ changePage, currentPage }) {
    const { USER } = useUser();
    const [logoutTriggered, setLogoutTriggered] = useState(false);

    const handleLogOut = () => {
        if (USER.userId === 0) {
            toast('Please login to continue');
            return;
        }
        changePage('login');
        sessionStorage.clear();
        toast.error('Logged out');
        setLogoutTriggered(true);
    };

    useDelay(() => {
        if (logoutTriggered) {
            window.location.reload();
        }
    }, logoutTriggered ? 3000 : null);

    const handleHome = () => {
        if (USER.userId === 0) {
            toast('Please login to continue');
            changePage('login');
            return;
        }
        if (currentPage == 'home') {
            toast.info('You are already on the home page');
            return;
        }
        changePage('home');
    };

    return (
        <div className='flex flex-col items-center w-[7vw] py-[3vh] h-full rounded-lg bg-blue-200 border-2 border-blue-400'>
            <button onClick={handleHome} type='home' className='text-[1.2vw] h-[6vh] w-[5vw] bg-slate-50 border-2 border-slate-200 mt-[2vh] hover:bg-slate-200 hover:border-slate-50 transition-all duration-300 rounded-lg'>Home</button>
            <button onClick={handleLogOut} type='logout' className='text-[1.2vw] h-[6vh] w-[5vw] bg-slate-50 border-2 border-slate-200 mt-[2vh] hover:bg-slate-200 hover:border-slate-50 transition-all duration-300 rounded-lg'>Logout</button>
        </div>
    );
}