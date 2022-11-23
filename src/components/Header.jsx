// ant design imports
import { Button, Col, Input, Row } from 'antd'
import { SearchOutlined } from '@ant-design/icons'

import { useSelector } from 'react-redux';

function Header(props) {
  
  const displayedNotes  = props.notes;
  const {handleSearch,searchResultCount, handleClearSearch, searchNote} = props

  const result = searchResultCount.length
  const count = displayedNotes.length;
  const { isDarkMode } = useSelector((state) => state.note);

  return (
    <div className='w-100 p-2'>
      <Row>
        <Col
            xs={24}
            sm={24}
            md={16}
            lg={8}
            xl={8}
            xxl={8}
        >
            <Input
                size='large'
                value={searchNote}
                placeholder='Search Notes'
                prefix={<SearchOutlined/>}
                className='rounded-5 p-2 my-2 w-100' 
                onChange={handleSearch}
            />
        </Col>
      </Row>
        <section 
          className="p-2"
          style={{
            color: isDarkMode ? '#F9F9F9' : '',
          }}
        >
            <h1 
              className="m-0"  
              style={{
              color: isDarkMode ? '#F9F9F9' : '',
          }}
          >Notes</h1>
            {!props.searchNote.trim().length > 0 ? 
              (
                count > 0 ? (<p>{count}{count === 1 ? " note" : " notes"} registered</p>) : (<p>No saved notes yet.</p>)
              ) : (
                <>
                  {result === 0 ? (<p>No result found</p>) : (<p>{result}{result === 1 ? " note" : " notes"} found.</p>)}
                  <Button type='primary' onClick={handleClearSearch}>Clear search filter</Button>
                </>
              )
            }
        </section>
    </div>
  )
}

export default Header