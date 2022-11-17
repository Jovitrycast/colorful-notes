// ant design imports
import { Input } from 'antd'
import { SearchOutlined } from '@ant-design/icons'

function Header() {
  return (
    <div className='w-100'>
        <section className='p-2 w-25'>
             <Input
                size='large'
                placeholder='Search Notes'
                prefix={<SearchOutlined/>}
                className='rounded-5 p-2 mb-2 w-100' 
            />
        </section>
       
        <section className="p-2">
            <h1 className="m-0">Notes</h1>
            <p>No saved notes yet.</p>
        </section>
    </div>
  )
}

export default Header