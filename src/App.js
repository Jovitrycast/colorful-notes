import React from 'react';
import Header from './components/Header';
import Notes from './components/Notes';
import SideBar from './components/SideBar';



function App() {
	return (
		<>
        <div className='d-flex'>
            <SideBar/>
            <div className='w-100'>
                <Header/>
                <Notes/>
            </div>
            
        </div>

		</>
	);
}

export default App;
