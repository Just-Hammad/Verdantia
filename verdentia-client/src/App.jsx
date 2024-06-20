import { useState } from 'react';
import Header from './components/Header';
import Background from './components/background';
import Dialog from './shared/dialogTask';
import { ToastContainer } from 'react-toastify';
import Body from './components/body';
import Sidebar from './components/sidebar';
import TreeGrid from './pages/treeGrid';


function App() {

  const [currentPage, changePage] = useState('login');

  return (
    <>
      <ToastContainer />
      <Dialog></Dialog>
      <Background />
      <div className='grid grid-cols-12'>
        <Sidebar changePage={changePage} currentPage={currentPage} />
        <div className='col-span-11'>
          <Header currentPage={currentPage}/>
          <div className='w-full h-[83vh]'>
            {currentPage === 'treegrid' ? <TreeGrid className="col-span-3" /> : <Body changePage={changePage} currentPage={currentPage} />}
          </div>
        </div>
      </div>
    </>
  )
}

export default App
