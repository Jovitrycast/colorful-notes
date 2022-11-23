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
    const { listedNotes, addNew, createdAt, isDarkMode } = useSelector((state) => state.note);
    const [displayedNotes, setDisplayedNotes] = useState(listedNotes);
    const [searchNote, setSearchNote] = useState("");
    const [searchResultCount, setSearchResultCount] = useState([]);
    const [isDisabled, setIsDisabled] =  useState(false)
    useEffect(() => {
      if(addNew){
        handleAddNote();
      }

      searchNote.length > 0 ? setIsDisabled(true) : setIsDisabled(false); 

      },[addNew, searchNote])

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

      const handleSearch = (e) => {
        const searchedNote = e.target.value
        setSearchNote(searchedNote)
        setSearchResultCount(displayedNotes.filter((note) => note.content.includes(searchedNote)))
      }

      const handleClearSearch = () => {
        setSearchNote('');
      }
  return (
    <>
    <Layout
      style={{
        minHeight: "100vh",
        width: "100%",
        height: "100vh",
      }}>
      <SideBar isDisabled = {isDisabled} />
      <Layout>
        <Content 
        style={{
            background: isDarkMode ? '#111d2c' : '',
            minWidth: '100%',             
            overflowY: "auto",
            overflowX: "hidden",
        }}>
            <Header 
              notes = {displayedNotes} 
              searchNote = {searchNote}
              handleSearch={handleSearch}
              handleClearSearch = {handleClearSearch}
              searchResultCount= {searchResultCount}
            />
            <div className='ant-row d-flex flex-wrap p-2 w-100 h-50'>
              {displayedNotes?.map((note) => {  
                const isSearchResult = note.content.includes(searchNote.trim());

                return(
                isSearchResult && <Col  
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
              )})}
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