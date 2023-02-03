import { useState } from "react"
import {useCookies} from "react-cookie"

const Auth = () => {
  const[cookies, setCookies, removeCookies] = useCookies(null)

  const [isLogIn,setIsLogin] = useState(true)

  const[email,setEmail] = useState(null)

  const [password,setPassword] = useState(null)

  const [confirmPassword,setConfirmPassword] = useState(null)
   
  const [error,setError] = useState(null)

  const viewLogin = (status) =>{
    setError(null)
    setIsLogin(status)
  }
 
  const handleSubmit = async(e , endpoint) =>{
    e.preventDefault()
    if(!isLogIn && password!==confirmPassword){
      setError('Make sure Passwards match!')
      return 
    }
    // console.log(endpoint)
    const response = await fetch(`http://localhost:5300/users/${endpoint}/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({email,password})
    })
    const data = await response.json()
    if(data.detail){
      setError(data.detail);
    }else{
      setCookies('Email',data.email)
      setCookies('AuthToken',data.token)

      window.location.reload(true)
    }
  }

  return (
    <div className="auth-container">
      <div className="auth-container-box">
        <form>
          <h2>{isLogIn ? "Please Login" : "Please Sign Up!"}</h2>
          <input
            type="email"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          {!isLogIn && (
            <input
              type="password"
              placeholder="Confirm Passward"
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          )}
          <input
            type="submit"
            className="create"
            onClick={(e) => handleSubmit(e, isLogIn ? "login" : "signup")}
          />
          {error && <p>{error}</p>}
        </form>
        <div className="auth-options">
          <button
            onClick={() => viewLogin(false)}
            style={{
              backgroundColor: !isLogIn
                ? "rgb(255,255,255)"
                : "rgb(188,188,188)",
            }}
          >
            SignUp
          </button>
          <button
            onClick={() => viewLogin(true)}
            style={{
              backgroundColor: isLogIn
                ? "rgb(255,255,255)"
                : "rgb(188,188,188)",
            }}
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
}

export default Auth
