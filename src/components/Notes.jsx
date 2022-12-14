import { useEffect, useState ,useRef } from 'react';
import notesColorsSelection from '../commons/colors';

// Import note reducers // redux
import { useDispatch, useSelector } from 'react-redux';
import { 
	SaveChanges, 
	discard,
	deleteNote,
	updateNoteColor,
	setIsDisabled
} from '../features/notes/noteSlice';

// Import ant Designs
import { Button, Space } from 'antd';
import { 
	CheckOutlined,
	 EllipsisOutlined, 
	 CloseOutlined,
	 DeleteOutlined,
	 EditOutlined
	} from '@ant-design/icons';


function Notes(props) {
	const { id, content, color, date, isOpen } = props.noteData;

	// Global States
  	const { noteColor, createdAt, addNew } = useSelector((state) => state.note);

	// Local states
	const [noteContent, setNoteContent] = useState(content);

	const [isMenu,setisMenu] = useState(false);
	const [isEdit, setIsEdit] = useState(false);
	const [openNote,setOpenNote] = useState(isOpen)
	const [isShowColors, setIsShowColors] = useState(false);

	const dispatch = useDispatch();
	const inputRef = useRef()

	useEffect(() => {
		if(isEdit) {
			inputRef.current.focus();
			let temp_value = inputRef.current.value
			inputRef.current.value = ''
			inputRef.current.value = temp_value
			dispatch(setIsDisabled(true))
			//close note menu
			setisMenu(false);
		}
		if(openNote) {
			setIsEdit(true);
		}
	},[isEdit, openNote])
	
	const handleSaveChanges = async() => {
		const newColor = color ? color : noteColor
		const updatedData = {
			id: id,
			content: noteContent,
			color: newColor,
			date: createdAt
		}
		dispatch(SaveChanges(updatedData))
		setIsEdit(false);
		setOpenNote(false);
		dispatch(setIsDisabled(false))
	}

	const handleMenuToggle = () => {
		setisMenu(!isMenu);
		setIsShowColors(false);
	}

	const handleEditNote = () => {
		setIsEdit(!isEdit);
	}

	const discardChanges = () => {
		dispatch(discard());
		setIsEdit(false);
	}

	const handleDeleteNote = () => {
		dispatch(deleteNote(id));
	}
  return (
        <section className='p-2'>
			<div 
				className='d-flex flex-column align-items-center rounded-4 p-3 fs-5' 
				style={{
					background: color ? color : noteColor,
					minHeight: '15rem'
					}}>
				{isEdit ? (
					
					<textarea 
						name="note" 
						id="note"
						placeholder='Type your note...'
						style={{
						background: noteColor ? noteColor : color ,
						border: 'none',
						outline: 'none',
						height: '11.4rem',
						width: '100%',
						resize: 'none',
						fontStyle: 'italic'
						}}
						value={noteContent}
						ref={inputRef}
						onChange={(e) => setNoteContent(e.target.value)}
					/>
					) : (
						<div 
							style={{
								height: '12rem',
								width: '100%',
								overflowY: 'auto'
							}}>
							<p
							style={{
								whiteSpace: "break-spaces",
								wordBreak: "break-word",
              				}}>
								{content}
							</p>
						</div>
					)
				}
				<div className='d-flex justify-content-between align-items-center w-100 position-relative'>
					<span className='fs-6'>{date}</span>
					{isEdit ? (
						<div className='d-flex gap-2'>
							<Button 
								type='primary' 
								shape='circle' 
								icon={ addNew ? <DeleteOutlined /> : <CloseOutlined/>}
								onClick={discardChanges}
								className="bg-dark border-0" 
							/>

							<Button 
								type='primary' 
								shape='circle' 
								icon={<CheckOutlined/>}
								onClick={handleSaveChanges}
								disabled={noteContent.trim().length === 0} 
							/>
						</div>
					) : (
						<div>
							{(
							<Button 
								type='primary' 
								shape='circle' 
								icon={isMenu? <CloseOutlined/> : <EllipsisOutlined/>}
								className="bg-dark border-0" 
								onClick={handleMenuToggle}
							/>
							)}
						</div>
					)}
					{isMenu ? (
						isShowColors ? (
							<Space
							  direction="vertical"
							  size="medium"
							  className="d-flex mt-1"
							  style={{
								position: 'absolute',
								right: 6,
								bottom: 32,
							  }}
							>
								{notesColorsSelection.map((color) => {
									
									const changeNoteColor = () => {
										dispatch(updateNoteColor({color: color.value, id}))
										setIsShowColors(false);
										setisMenu(false);
									}
				
									return(
									<Button
										type='primary'
										shape='circle'
										key={color.desc}
										style={{
											background: color.value,
											minHeight: 20,
											minWidth: 20,
											width: 20,
											height: 20,
											outline: '5px solid black',
											border: 'none'
										}}
										onClick = {changeNoteColor}
									>
										{" "}	
									</Button>
									)
								})}
							</Space>
						) : (
					<div
						className="d-flex flex-column"
						style={{
							position: 'absolute',
							right: 0,
							bottom: 32,
						}}>
						<Button 
							type='primary' 
							shape='circle' 
							icon={
								<Button
									type="primary"
									shape="circle"
									size="small"
									style={{
									background: color,
									minHeight: 20,
									minWidth: 20,
									width: 20,
									height: 20,
									}}
									className={"border-0 d-flex mx-auto"}
							  	>
									{" "}
                    			</Button>
							}
							className="bg-dark border-0"
							onClick={setIsShowColors}
						/>
						<Button 
							type='primary' 
							shape='circle' 
							icon={<EditOutlined/>}
							className="mt-1 bg-dark border-0"
							onClick={handleEditNote}
						/>
						<Button 
							type='primary' 
							shape='circle' 
							icon={<DeleteOutlined/>}
							className="my-1 bg-dark border-0"
							onClick={handleDeleteNote}
						/>
					</div>)) : (" ")
					}
				</div>
			</div>
        </section>
  )
}

export default Notes