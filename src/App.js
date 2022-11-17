import React from 'react';
import Header from './components/Header';
import NoteLists from './components/NoteLists';
import Notes from './components/Notes';
import SideBar from './components/SideBar';



function App() {
	return (
		<>
        <div className='d-flex'>
            <SideBar/>
            <div className='w-100'>
                <Header/>
                <NoteLists/>
            </div>
            
        </div>

		</>
	);
}

export default App;
