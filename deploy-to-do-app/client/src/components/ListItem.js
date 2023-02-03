import {useState} from 'react'
import ProgressBar from './ProgressBar'
import TickIcon from './TickIcon'
import Modal from './Modal'

const ListItem = ({task,getData}) => {
  const [showModal,setShowModal] = useState(false)

  const deleteItem= async(e)=>{
    e.preventDefault()
    try {
      const response = await fetch(`http://localhost:5300/todos/${task._id}`, {
        method: "DELETE",
      });
       if (response.status === 200) {
         getData();
       }
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <li className="list-item">

      <div className="info-container">
        <TickIcon/>
        <p className="task-title">{task.title}</p>
        <ProgressBar progress={task.progress}/>
      </div>

      <div className="button-container">
        <button className='edit' onClick={()=> setShowModal(true)}>EDIT</button>
        <button className='delete' onClick={deleteItem} >DELETE</button>
      </div>
      {showModal && <Modal mode={'edit'} setShowModal={setShowModal} getData={getData} task={task}/> }
    </li>
  )
  
};

export default ListItem
