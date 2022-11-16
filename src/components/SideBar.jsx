// ant design imports
import { Button, Tooltip } from 'antd';
import { PlusOutlined } from '@ant-design/icons'
import Sider from "antd/lib/layout/Sider";
function SideBar() {
  return (

    <Sider
    collapsed={true}
        className="bg-secondary d-flex justify-content-center p-2" 
        style={{
            height: '100vh',
        }}
    >
        <Tooltip title="Add Notes">
            <Button 
                type="primary" 
                shape="circle" 
                size='large'
                icon={<PlusOutlined />}
                style={{
                    height: 60,
                    width: 60,
                  }}
            />
        </Tooltip>
    </Sider>
  )
}

export default SideBar