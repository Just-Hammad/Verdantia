import { useEffect, useState, useTransition } from 'react';
import { useUser } from '../UserContext';
import { toast } from 'react-toastify';
import DialogUser from '../shared/dialogUser';
import DialogAbout from '../shared/dialogAbout';

export default function Login({ changePage }) {
    const { setUser } = useUser();

    const [request, setRequest] = useState({
        userName: '',
        UPassword: ''
    });

    const handleLoginSuccess = (data) => {
        console.log('Logged in as:', data.userName);
        setUser(data);
        sessionStorage.setItem('user', JSON.stringify(data));
        changePage('home');
    };

    const handleLogin = async (e) => {
        e.preventDefault();

        fetch('http://localhost:5163/Users/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(request)
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error(response.text());
                }
                return response.json();
            }).then(data => {
                toast.success(data.message);
                handleLoginSuccess({
                    userId: data.userId,
                    userName: data.userName,
                    uName: data.uName,
                    userTypeID: data.usertypeID,
                });
                changePage('home');
            })
            .catch(error => {
                console.error('Error updating data:', error);
                toast.error("Invalid Username or Password");
            });
    };

    const handleChange = (e) => {
        const { id, value } = e.target;
        setRequest(prevData => ({
            ...prevData,
            [id]: value
        }));
    };


    return (
        <>
            <div className="grid grid-cols-2 w-full h-full">
                <div className="flex flex-rows px-10 justify-start items-center w-full h-full">
                    <div className="flex flex-col justify-center items gap-4">
                        <DialogAbout 
                            TriggerNode={
                                <p className="cursor-pointer duration-300 transition-all hover:rounded-sm hover:text-[1.7vw] shadow-lg text-center text-[1.5vw] px-[2vw] py-[1vh] border-2 border-green-400 bg-green-100 hover:bg-green-200 w-[20vw] rounded-lg">Plant DataBase</p>
                            }
                        />
                        <DialogUser
                            TriggerNode={
                                <p className="cursor-pointer duration-300 transition-all hover:rounded-sm hover:text-[1.7vw] shadow-lg text-center text-[1.5vw] px-[2vw] py-[1vh] border-2 border-green-400 bg-green-100 hover:bg-green-200 w-[20vw] rounded-lg">Register</p>
                            }
                        />
                        <DialogAbout
                            TriggerNode={
                                <p className="cursor-pointer duration-300 transition-all hover:rounded-sm hover:text-[1.7vw] shadow-lg text-center text-[1.5vw] px-[2vw] py-[1vh] border-2 border-green-400 bg-green-100 hover:bg-green-200 w-[20vw] rounded-lg">About Us</p>
                            }
                        />
                    </div>
                </div>
                <div className="w-full h-full flex justify-center">
                    <form className="shadow-xl shadow-sky-800 rounded-lg flex flex-col gap-4 w-[25vw] h-[70vh] bg-green-100 border-2 px-4 py-8 border-green-400 items-center">
                        <svg className="" width="60" height="60" viewBox="0 0 144 144" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M72 73.125C79.5999 73.125 86.1854 70.6016 90.8494 65.5774C95.4874 60.5813 97.875 53.4918 97.875 45C97.875 36.5 95.477 29.856 90.679 25.3767C85.9234 20.937 79.3427 19.125 72 19.125C64.6573 19.125 58.0766 20.937 53.321 25.3767C48.523 29.856 46.125 36.5 46.125 45C46.125 53.4918 48.5126 60.5813 53.1506 65.5774C57.8146 70.6016 64.4001 73.125 72 73.125Z" fill="#699BF7" stroke="black" strokeWidth="6.75" />
                            <path d="M72 73.125H72L71.8815 73.125C62.8402 73.1248 48.534 73.1245 34.1329 82.6885C21.4617 91.1036 19.5113 103.396 19.1893 114.654C19.0259 120.366 23.7066 124.875 29.25 124.875H114.82C120.332 124.875 124.959 120.434 124.934 114.806C124.911 109.225 124.555 103.268 122.469 97.6647C120.339 91.9441 116.473 86.7661 109.773 82.6285C94.385 73.1249 81.1668 73.125 72.0468 73.125H72H72Z" fill="#699BF7" stroke="black" strokeWidth="6.75" />
                            <path d="M63 43.875V45C63 52.0325 65.25 56.25 72 56.25C78.75 56.25 81 52.0325 81 45V43.875" stroke="black" strokeWidth="6.75" strokeLinecap="round" />
                        </svg>

                        <p className="text-blue-600 font-black text-2xl">Login</p>
                        <div className="flex flex-row gap-1 rounded-lg border border-green-400 px-2 py-2">
                            <div className="items-center rounded-lg border-2 border-blue-300 w-[40px]">
                                <svg className="w-[2vw] h-[5vh] hover:w-[2.3vw] hover:h-[4.5vh]" xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 48 48" fill="none">
                                    <path d="M8.625 8.25C8.625 6.38604 10.136 4.875 12 4.875H38.25C38.8713 4.875 39.375 5.37868 39.375 6V37.125H8.625V8.25Z" fill="#FF7051" stroke="black" strokeWidth="2.25" />
                                    <path d="M8.625 38.625C8.625 36.1397 10.6397 34.125 13.125 34.125H38.25C38.8713 34.125 39.375 34.6287 39.375 35.25V42C39.375 42.6213 38.8713 43.125 38.25 43.125H13.125C10.6397 43.125 8.625 41.1103 8.625 38.625Z" fill="#FFF4D9" stroke="black" strokeWidth="2.25" />
                                    <path d="M28.125 38.625H38.625" stroke="black" strokeWidth="2.25" strokeLinecap="round" />
                                    <path d="M16.125 38.625H21.375" stroke="black" strokeWidth="2.25" strokeLinecap="round" />
                                    <rect x="16.875" y="10.875" width="14.25" height="8.25" rx="1.125" fill="#FFF4D9" stroke="black" strokeWidth="2.25" />
                                </svg>
                            </div>
                            <input onChange={handleChange} id="userName" type="text" placeholder=" Username" className="rounded-lg border-2 border-blue-200 hover:border-blue-700 transition-all duration-300 outline-none focus:border-blue-700 py-1 w-full" />
                        </div>
                        <div className="flex flex-row gap-1 rounded-lg border border-green-400 px-2 py-2">
                            <div className="rounded-lg flex items-center border-2 border-blue-300 transition-all outline-none w-[40px]">
                                <svg className="hover:w-[2.3vw] hover:h-[4.5vh] " xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 48 48" fill="none">
                                    <path d="M17.78 41.7801C17.7343 42.8885 17.2787 43.9639 16.4658 44.7768L14.5607 46.682C13.7167 47.5259 12.5721 48 11.3787 48H6C3.51472 48 1.5 45.9853 1.5 43.5V35.1213C1.5 33.9279 1.9741 32.7833 2.81802 31.9393L15.0299 19.7274C15.0101 19.4039 15 19.078 15 18.75V15.75C15 7.05152 22.0515 0 30.75 0C39.4485 0 46.5 7.05151 46.5 15.75V18.75C46.5 27.4485 39.4485 34.5 30.75 34.5C29.5163 34.5 28.3124 34.3576 27.1554 34.0872L25.2768 35.9658C24.4644 36.7782 23.3896 37.2342 22.28 37.2801C22.2342 38.3887 21.7787 39.4639 20.9658 40.2768L20.7769 40.4658C19.9644 41.2782 18.8896 41.7342 17.78 41.7801Z" fill="#815C13" />
                                    <path d="M19.125 33.375L19.2068 33.6205C19.2585 33.7754 19.2837 33.9349 19.2839 34.093V37.0957C19.2836 37.4869 19.1301 37.8699 18.8445 38.1555L18.6555 38.3445C18.2538 38.7462 17.6595 38.8865 17.1205 38.7068L14.625 37.875L14.7068 38.1205C14.7613 38.284 14.7864 38.4525 14.7837 38.6192V41.6192C14.7774 42.0023 14.6244 42.3756 14.3445 42.6555L12.4393 44.5607C12.158 44.842 11.7765 45 11.3787 45H6C5.17157 45 4.5 44.3284 4.5 43.5V35.1213C4.5 34.7235 4.65804 34.342 4.93934 34.0607L18.1172 20.8828C18.1349 20.8651 18.152 20.8471 18.1686 20.8287C18.0577 20.1523 18 19.4579 18 18.75V15.75C18 8.70837 23.7084 3 30.75 3C37.7916 3 43.5 8.70837 43.5 15.75V18.75C43.5 25.7916 37.7916 31.5 30.75 31.5C29.523 31.5 28.3364 31.3267 27.2135 31.0032C26.6494 30.8406 26.0323 30.9677 25.6172 31.3828L23.1555 33.8445C22.7538 34.2462 22.1595 34.3865 21.6205 34.2068L19.125 33.375Z" fill="#FEAA01" />
                                    <path d="M30.75 28.5C37.7916 28.5 43.5 22.7916 43.5 15.75C43.5 8.70837 37.7916 3 30.75 3C23.7084 3 18 8.70837 18 15.75C18 16.977 18.1733 18.1636 18.4968 19.2865C18.6594 19.8506 18.5323 20.4677 18.1172 20.8828L4.93934 34.0607C4.65804 34.342 4.5 34.7235 4.5 35.1213V40.5C4.5 41.3284 5.17157 42 6 42H11.3787C11.7765 42 12.158 41.842 12.4393 41.5607L14.3445 39.6555C14.7462 39.2538 14.8865 38.6595 14.7068 38.1205L13.7372 35.2115C13.6395 34.9184 13.9184 34.6395 14.2115 34.7372L17.1205 35.7068C17.6595 35.8865 18.2538 35.7462 18.6555 35.3445L18.8445 35.1555C19.2462 34.7538 19.3865 34.1595 19.2068 33.6205L18.2372 30.7115C18.1395 30.4184 18.4184 30.1395 18.7115 30.2372L21.6205 31.2068C22.1595 31.3865 22.7538 31.2462 23.1555 30.8445L25.6172 28.3828C26.0323 27.9677 26.6494 27.8406 27.2135 28.0032C28.3364 28.3267 29.523 28.5 30.75 28.5Z" fill="url(#paint0_linear_1_54)" />
                                    <circle cx="33" cy="13.5" r="4.5" fill="#815C13" />
                                    <path d="M37.2439 15C37.4098 14.5308 37.5 14.026 37.5 13.5C37.5 11.0147 35.4853 9 33 9C30.5147 9 28.5 11.0147 28.5 13.5C28.5 14.026 28.5902 14.5308 28.7561 15C29.3738 13.2522 31.0407 12 33 12C34.9593 12 36.6262 13.2522 37.2439 15Z" fill="#FEAA01" />
                                    <defs>
                                        <linearGradient id="paint0_linear_1_54" x1="24" y1="3" x2="24" y2="42" gradientUnits="userSpaceOnUse">
                                            <stop stopColor="#FFE7B8" />
                                            <stop offset="1" stopColor="#FFD175" />
                                        </linearGradient>
                                    </defs>
                                </svg>
                            </div>
                            <input onChange={handleChange} id="UPassword" type="password" placeholder=" Password" className="rounded-lg border-2 border-blue-200 hover:border-blue-700 transition-all duration-300 outline-none focus:border-blue-700 py-1 w-full" />
                        </div>

                        <button onClick={handleLogin} type="submit" className="hover:text-[1.2vw] bg-green-100 border-2 border-green-400 mt-4 hover:bg-green-200 transition-all duration-300 px-4 py-1.5 rounded-lg">Submit</button>
                    </form>
                </div>
            </div>
        </>
    )
}