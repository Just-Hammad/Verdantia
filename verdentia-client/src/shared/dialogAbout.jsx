
import { useUser } from "../UserContext"

function DialogAbout({ TriggerNode, refreshTasks }) {
    const { USER } = useUser()

    const handleTriggerClick = () => {
        document.getElementById(`dialog-overlay`).classList.remove('hidden');
        document.getElementById(`dialog`).classList.remove('hidden');
    }

    const handleClose = () => {
        document.getElementById(`dialog-overlay`).classList.add('hidden');
        document.getElementById(`dialog`).classList.add('hidden');
    }

    return (
        <>
            <div onClick={handleTriggerClick} className='w-full h-full'>
                {TriggerNode}
            </div>
            {/* overlay */}
            <div id={`dialog-overlay`} className='hidden inset-0 fixed h-[100vh] w-[100vw] bg-black opacity-75 z-10'></div>
            <div id={`dialog`} className='items-center justify-center items-center rounded-lg hidden fixed w-[40vw] h-[75vh] top-[50%] left-[50%] z-20 translate-x-[-50%] translate-y-[-50%] bg-slate-500 shadow-lg shadow-slate-800 p-8'>
                <div className='flex items-center justify-center'>
                    <span className='text-center font-bold text-2xl'>Boo Hoo!</span>
                    <span onClick={handleClose} className='cursor-pointer hover:bg-red-400 transition-all duration-300 px-2 font-black'>x</span>
                </div>
                <div className='transition-all duration-1000 flex self-center items-center justify-center h-full w-full hover:w-[0.5vw] hover:h-[0.5vh]'>
                <svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" class="iconify iconify--emojione" preserveAspectRatio="xMidYMid meet" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M32 3C20.5 3 10.8 14.5 11.4 27.1c.2 3.4.9 28.9 3.9 33c2.4 3.3 5.3-3.4 9.1-3.4s3.8 4.2 7.6 4.2s3.8-4.2 7.6-4.2s6.7 6.7 9.1 3.4c3-4.1 3.7-29.6 3.9-33C53.2 14.5 43.5 3 32 3" fill="#6adbc6"> </path> <path d="M47.2 62c-1.3 0-2.5-1-3.7-2.1c-1.3-1.1-2.6-2.2-3.9-2.2c-1.5 0-2.2.8-3.1 1.8c-1 1.1-2.2 2.4-4.5 2.4s-3.6-1.3-4.5-2.4c-.9-1-1.6-1.8-3.1-1.8c-1.3 0-2.6 1.1-3.9 2.2c-1.2 1.1-2.4 2.1-3.7 2.1c-.9 0-1.6-.4-2.3-1.3c-1.9-2.7-3.2-12.8-4-31.9c0-.7-.1-1.3-.1-1.7c-.4-6.8 2.1-13.5 6.8-18.4C21.3 4.4 26.6 2 32 2s10.7 2.4 14.8 6.7c4.7 4.9 7.2 11.6 6.8 18.4c0 .3 0 .9-.1 1.6c-.8 19.1-2.1 29.3-4 32c-.6.9-1.4 1.3-2.3 1.3m-7.6-6.3c2 0 3.7 1.4 5.2 2.7c.9.8 1.9 1.6 2.4 1.6c.1 0 .3 0 .7-.5c1.1-1.6 2.7-8.2 3.6-30.9c0-.7.1-1.3.1-1.6c.3-6.2-2-12.4-6.3-16.9C41.6 6.2 36.9 4 32 4s-9.6 2.2-13.3 6.1c-4.3 4.5-6.6 10.7-6.3 16.9c0 .3 0 .9.1 1.7c.9 22.6 2.5 29.3 3.6 30.8c.4.5.6.5.7.5c.6 0 1.6-.9 2.4-1.6c1.5-1.3 3.1-2.7 5.2-2.7c2.3 0 3.6 1.3 4.5 2.4c.9 1 1.6 1.8 3.1 1.8s2.2-.8 3.1-1.8c.9-1.1 2.2-2.4 4.5-2.4" fill="#50ffdd"> </path> <path d="M48.8 34.2c10.8 2.6 8.7-3.1 11.4.1c2.5 2.9-1 9.1-12.1 11.5" fill="#6adbc6"> </path> <path d="M48.2 46.8c-.5 0-.9-.3-1-.8c-.1-.5.2-1.1.8-1.2c7.5-1.6 11.1-4.9 11.9-7.3c.2-.7.4-1.7-.3-2.5c-.3-.4-.5-.5-.6-.6c-.1 0-.2.1-.3.2c-1.2.8-3.3 2.3-10.1.7c-.5-.1-.9-.7-.7-1.2c.1-.5.7-.9 1.2-.7c5.9 1.4 7.6.2 8.5-.4c1.3-.9 2.2-.7 3.5.8c1 1.2 1.3 2.8.7 4.5c-1 3-5 6.8-13.3 8.6c-.2-.1-.3-.1-.3-.1" fill="#50ffdd"> </path> <path d="M15.3 34.2c-10.9 2.6-8.7-3.1-11.5.1c-2.5 2.9.9 9.1 12.1 11.5" fill="#6adbc6"> </path> <path d="M15.8 46.8h-.2c-7-1.5-12-4.7-13.3-8.6c-.6-1.7-.3-3.3.7-4.5c1.3-1.5 2.2-1.7 3.5-.8c.9.6 2.6 1.8 8.5.3c.5-.1 1.1.2 1.2.7s-.2 1.1-.7 1.2c-6.8 1.6-8.9.2-10.1-.6c-.1-.1-.2-.1-.3-.2c-.1.1-.2.3-.6.7c-.7.8-.6 1.9-.3 2.6c.8 2.3 4.4 5.6 11.8 7.2c.5.1.9.6.8 1.2c-.1.5-.5.8-1 .8" fill="#50ffdd"> </path> <ellipse cx="41.4" cy="24.3" rx="6.1" ry="6.9" fill="#ffffff"> </ellipse> <ellipse cx="41.4" cy="24.3" rx="4" ry="4.5" fill="#308776"> </ellipse> <path d="M33.5 22.3c0 5-3.8 9.1-8.5 9.1s-8.5-4.1-8.5-9.1s3.8-9.1 8.5-9.1c4.7-.1 8.5 4 8.5 9.1" fill="#ffffff"> </path> <g fill="#308776"> <path d="M30.6 22.3c0 3.3-2.5 6-5.6 6s-5.6-2.7-5.6-6s2.5-6 5.6-6s5.6 2.7 5.6 6"> </path> <path d="M44.8 35.4c0 4.4-5.4 8.1-12.1 8.1c-6.7 0-12.1-3.7-12.1-8.1c0 0 5.8 1.3 12.1 1.3s12.1-1.3 12.1-1.3"> </path> </g> <path d="M25 43.8c0-5.5 0-3.8 7.7-3.8s7.7-1.7 7.7 3.8s-3.5 8.3-7.7 8.3c-4.3 0-7.7-2.8-7.7-8.3" fill="#ff717f"> </path> <path fill="#e2596c" d="M34 40l-1.3 9.5l-1.2-9.5z"> </path> </g></svg>
            </div>
            </div>
        </>
    )
}

export default DialogAbout;


//disabled:bg-slate-200 col-span-2 px-2 py-0.5 border-2 rounded-lg border-slate-400 outline-none transition-all duration-300