import { generateRandomId } from '../commons/functions';

// Import note reducers // redux
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setListedNotes } from '../features/notes/noteSlice';
import Notes from './Notes';
import SideBar from './SideBar';
import Header from './Header';

// Import Ant Design
import Layout, { Content, Footer } from "antd/lib/layout/layout";
import { Col } from 'antd';

function NoteLists() {
    const dispatch = useDispatch();
    const { listedNotes, addNew, createdAt, isDarkMode} = useSelector((state) => state.note);
    const [displayedNotes, setDisplayedNotes] = useState(listedNotes);
    useEffect(() => {
      if(addNew){
        handleAddNote();
      }
      },[addNew])

    useEffect(() => {
      setDisplayedNotes(listedNotes)
      },[listedNotes,addNew])

     const handleAddNote = () => {
        const noteId = generateRandomId();

        const newNote = {
            id: noteId,
            content: "",
            date: createdAt,
            isOpen: true
          }
          dispatch(setListedNotes(newNote));
      }

      // const handleSearch = () => {

      // }

  return (
    <>
    <Layout
      style={{
        minHeight: "100vh",
        width: "100%",
        height: "100vh",
      }}>
      <SideBar />
      <Layout>
        <Content 
        style={{
            background: isDarkMode ? '#111d2c' : '',
            minWidth: '100%',             
            overflowY: "auto",
            overflowX: "hidden",
        }}>
            <Header notes = {displayedNotes}/>
            <div className='ant-row d-flex flex-wrap p-2 w-100 h-50'>
              {displayedNotes?.map((note) => (  
                <Col  
                key={note.id} 
                sm={24}
                md={12}
                lg={8}
                xl={6}
                xxl={4}
                className="w-100 mb-3"
              >
                <Notes
                  noteData={note}
                />
              </Col>
              ))}
            </div>
        </Content>
        <Footer 
          className='text-center'
          style={{
            background: isDarkMode ? '#111d2c' : '',
            color: isDarkMode ? '#F9F9F9' : '',
          }}
          >Colorful Notes by <span className='text-primary fw-bold'>Jovit Castillo</span></Footer>
      </Layout>
    </Layout>
    </>
  )
}

export default NoteLists