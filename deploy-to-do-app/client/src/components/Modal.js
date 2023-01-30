import {useState} from 'react'

function Modal({mode, setShowModal,getData,task}) {

  const editMode = mode === 'edit' ? true : false

  const [data, setData] = useState({
    user_email:editMode ? task.user_email:'abc@gmail.com' ,
    title: editMode ? task.title : null,
    progress:editMode ? task.progress : 50,
    date: editMode ? task.date : new Date()
  })

  const postData = async(e) =>{
    e.preventDefault()
    try{
      const respose =  await fetch('http://localhost:8000/todos/',{
        method: 'POST',
        headers:{'Content-Type': 'application/json'},
        body: JSON.stringify(data)
      })
      if(respose.status===200){
        console.log('worked')
        setShowModal(false)
        getData()
      }
    }catch(err){
      console.error(err)
    }
  }

  const editData = async(e) =>{
    e.preventDefault()
    try{
      const response = await fetch(`http://localhost:8000/todos/${task._id}`,{
        method: 'PUT',
        headers:{'Content-Type': 'application/json'},
        body: JSON.stringify(data)
      })
      if(response.status===200){
        setShowModal(false)
        getData()
      }
    }catch(err){
      console.error(err)
    }
  }


  const handleChange = (e) =>{
    console.log('changing!', e)
    const {name,value} = e.target
    setData(data=>({
      ...data,
      [name]:value
    }))
  }

  return (
    <div className="overlay">
      <div className="modal">
        <div className="form-title-container">
          <h3>let's {mode} your task</h3>
          <button onClick={()=> setShowModal(false)}>X</button>
        </div>

        <form>
          <input
            required
            maxLength={30}
            placeholder="Your task goes here"
            name="title"
            value={data.title}
            onChange={handleChange} />
          <br/>
          <label for="range">Drag to select your current progress</label>
          <input
            required
            type="range"
            id="range"
            min='0' 
            max='100'
            name="progress"
            value={data.progress}
            onChange={handleChange} />
          <input className={mode} type="submit" onClick={editMode? editData : postData} />

        </form>

      </div>
    </div>
  )
}

export default Modal
