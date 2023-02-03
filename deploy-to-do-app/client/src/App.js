import ListHeader from './components/ListHeader'
import ListItem from './components/ListItem'
import Auth from './components/Auth'
import {useEffect, useState} from 'react'
import { useCookies } from "react-cookie";

const App = () => {
  const [cookies, setCookies, removeCookies] = useCookies(null)

  const authToken = cookies.AuthToken

  const userEmail = cookies.Email

  const [tasks,setTasks] = useState(null)

  const getData = async() =>{
    try{
      const response = await fetch(`http://localhost:5300/todos/${userEmail}`);
      const json = await response.json()
      setTasks(json)
    }catch(err){
      console.error(err)
    }
  }
   
  useEffect(()=> {
    if(authToken){
       getData()
    }},
  [])

  // sort by date
  const sortedTasks = tasks?.sort((a,b)=> new Date(a.date) - new Date(b.date))


  return (
    <div className="app">
      {!authToken && <Auth/>}
      { authToken &&
        <>
        <ListHeader listName={`🥳 Holiday tick list`} getData={getData} />
        <p className="user-email">Welcome back {userEmail}</p>
      {sortedTasks?.map((task) => (
        <ListItem key={task.id} task={task} getData={getData} />
      ))}
        </>
      }
      <p className="copyright"> Created by @AdarshGzz <a> https://github.com/AdarshGzz </a> </p>
    </div>
  );
}

export default App
