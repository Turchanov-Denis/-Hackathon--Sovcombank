import { useState,useEffect } from 'react'
import LoginPage from './LoginPage'
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux'
function App() {
  
let navigate = useNavigate();
  const authed = useSelector((state)=>state.main.authed)
  const admin = useSelector((state)=>state.main.admin)
useEffect(() => {
  console.log(authed)
    if (admin) {
      return navigate("/admin");
    }
   if (!authed){
      return navigate("/login");
   }
},[]);

  return (
    <div className="App">
      <div className='wrapper'>
      </div>
    </div>
  )
}

export default App
