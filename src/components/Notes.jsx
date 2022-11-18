import { useEffect,useState } from 'react';

// Import note reducers // redux
import { useDispatch, useSelector } from 'react-redux';
import { addNote } from '../features/notes/noteSlice';

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
	const { content, color, date } = props.noteData;
  	const { noteColor, createdAt } = useSelector((state) => state.note);
	const [noteContent, setNoteContent] = useState(content);
	const [isMenu,setisMenu] = useState(false);
	const [isEdit, setIsEdit] = useState(false);
	const dispatch = useDispatch();

	// const [currentNoteData,setCurrentNoteData] = useState({content, color, date})
	
	console.log('current note', currentNoteData);
	const handleAddNote = () => {
		dispatch(addNote({
			content: noteContent,
			color: noteColor,
			date: createdAt
		}));
	}

	const handleMenuToggle = () => {
		setisMenu(!isMenu);
	}
	const handleEditNote = () => {
		setIsEdit(!isEdit);
	}
  return (
        <section className='p-2'>
			<div className='d-flex flex-column align-items-center rounded p-3 fs-4' style={{background: color}}>
				{isEdit ? (
					
					<textarea 
						name="note" 
						id="note" c
						placeholder='Type your note...'
						style={{
						background: noteColor ? noteColor : color ,
						border: 'none',
						outline: 'none',
						height: '15rem',
						width: '15rem',
						resize: 'none',
						fontStyle: 'italic'
						}}
						value={noteContent}
						onChange={(e) => setNoteContent(e.target.value)}
					/>
					) : (
						<div 
							style={{
								height: '15rem',
							}}>
							<pre>
								{content}
							</pre>
						</div>
					)
				}
				<div className='d-flex justify-content-between align-items-center w-100 position-relative'>
					<span className='fs-6'>{date}</span>
					{isEdit ? (
						<>
							<Button 
							type='primary' 
							shape='circle' 
							icon={<CheckOutlined/>}
							onClick={handleAddNote} 
							/>
						</>
					) : (
						<div>
							{(
							<Button 
								type='primary' 
								shape='circle' 
								icon={isMenu? <CloseOutlined/> : <EllipsisOutlined/>}
								style={{
									background: '#000',
									border: 'none'
								}}
								onClick={handleMenuToggle}
							/>
							)}
						</div>
					)}
					{isMenu ? (
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
							style={{
								background: '#000',
								border: 'none',
							}}
							className="mt-1"
							onClick={handleMenuToggle}
						/>
						<Button 
							type='primary' 
							shape='circle' 
							icon={<EditOutlined/>}
							style={{
								background: '#000',
								border: isEdit ? '2px solid red' : 'none',
							}}
							className="mt-1"
							onClick={handleEditNote}
						/>
						<Button 
							type='primary' 
							shape='circle' 
							icon={<DeleteOutlined/>}
							style={{
								background: '#000',
								border: 'none',
							}}
							className="my-1"
							onClick={handleMenuToggle}
						/>
					</div>) : (" ")
					}
				</div>
			</div>
        </section>
  )
}

export default Notes