// ant design imports
import { Col, Input, Row } from 'antd'
import { SearchOutlined } from '@ant-design/icons'

function Header(props) {
  const displayedNotes  = props.notes;
  const count = displayedNotes.length;
  return (
    <div className='w-100 p-2'>
      <Row>
        <Col
            sm={24}
            md={16}
            lg={8}
            xl={8}
            xxl={8}
        >
            <Input
                size='large'
                placeholder='Search Notes'
                prefix={<SearchOutlined/>}
                className='rounded-5 p-2 my-2 w-100' 
            />
        </Col>
      </Row>
        <section className="p-2">
            <h1 className="m-0">Notes</h1>
            { count > 0 ? (<p>{count}{count === 1 ? " note" : " notes"} registered</p>) : (<p>No saved notes yet.</p>)}
        </section>
    </div>
  )
}

export default Header