import { useState } from 'react';
import notesColorsSelection from '../commons/colors';

// ant design imports
import { Button, Tooltip, Space } from 'antd';
import { PlusOutlined, CloseOutlined } from '@ant-design/icons'
import Sider from "antd/lib/layout/Sider";

// Import note reducers // redux
import { useDispatch } from 'react-redux';
import { createNewNote } from '../features/notes/noteSlice';



function SideBar() {
	const [isShowColors, setIsShowColors] = useState(false);

	const dispatch = useDispatch();

	const handleToggleColorSelection = () => {
		setIsShowColors(!isShowColors);
	}

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
					icon={isShowColors ? <CloseOutlined/> : <PlusOutlined />}
					style={{
						height: 60,
						width: 60,
					}}
					onClick={handleToggleColorSelection}
				/>
			</Tooltip>
			{
				isShowColors  && (
			<Space
              direction="vertical"
              size="large"
              className="d-flex align-items-center mt-4"
            >
				{notesColorsSelection.map((color) => {
					
					const handleCreateNote = () => {
						dispatch(createNewNote(color.value));
					}

					return(
						<Button 
							type='primary'
							shape='circle'
							key={color.desc}
							size='small'
							style={{
								background: color.value,
								border: 'none'
							}}
							onClick = {handleCreateNote}
						>
							{" "}	
						</Button>
					)
				})}
			</Space>
				)
			}
		</Sider>
	)
}

export default SideBar