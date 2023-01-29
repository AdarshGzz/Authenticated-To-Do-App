const Modal = () => {
 
  const mode = 'edit'

  const handleChange = () => {
    console.log('changing')
  }

  return (
    <div className="overlay">
      <div className="modal">
        <div className="form-title-container">
          <h3>let's {mode} you task</h3>
          <button>X</button>
        </div>

        <form>
          <input
            required
            maxLength={30}
            placeholder="Your task goes here"
            name="title"
            value={""}
            onChange={handleChange}
          />
          <input
            required
            type="range"
            min='0'
            max='100'
            name= "progress"
            value={""}
            onChange={handleChange}
          />
          <input className={mode} type="submit"/>
        
        </form>

      </div>
    </div>
  )
}

export default Modal
