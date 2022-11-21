import { useState, useEffect } from 'react';
import notesColorsSelection from '../commons/colors';

// ant design imports
import { 
	Button, 
	Tooltip, 
	Space, 
	Switch 
} from 'antd';
import { 
	PlusOutlined, CloseOutlined } from '@ant-design/icons'
import Sider from "antd/lib/layout/Sider";

// Import note reducers // redux
import { useDispatch, useSelector } from 'react-redux';
import { createNewNote, setTheme } from '../features/notes/noteSlice';



function SideBar() {
	const dispatch = useDispatch();
	const { isDarkMode } = useSelector((state) => state.note);

	const [isShowColors, setIsShowColors] = useState(false);
	const [colorMode,setColorMode] = useState(isDarkMode ? 'Dark' : 'Light')

	useEffect(() => {
		setColorMode(isDarkMode ? 'Dark' : 'Light')
	},[isDarkMode])

	const handleToggleColorSelection = () => {
		setIsShowColors(!isShowColors);
	}

	const handleTheme = () => {
		dispatch(setTheme())
	}
	return (

		<Sider
		collapsed={true}
			className="d-flex justify-content-center p-3" 
			style={{
				height: '100vh',
				background: isDarkMode ? '#112a45' : '#7e7e7e',
				color: isDarkMode ? '#F9F9F9' : '',
			}}
		>
			<div className='h-100 d-flex flex-column align-items-center justify-content-between'>
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
				{
					isShowColors  && (
				<Space
				direction="vertical"
				size="large"
				className="d-flex align-items-center"
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
				<div className='d-flex flex-column align-items-center gap-1'>
					<Switch onChange={handleTheme}/>
					<span>{colorMode}</span>
				</div>
			</div>
		</Sider>
	)
}

export default SideBar