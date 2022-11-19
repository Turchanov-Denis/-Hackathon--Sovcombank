import { useState, useEffect } from 'react'
import LoginPage from './LoginPage'
import LeftBar from '../components/Home/LeftBar';
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux'
import '../scss/home.scss'
import NavBar from '../components/Home/NavBar';
import BalanceContent from '../components/Home/BalanceContent';
function App() {

  let navigate = useNavigate();
  const authed = useSelector((state) => state.main.authed)
  const admin = useSelector((state) => state.main.admin)
  useEffect(() => {
    console.log(authed)
    if (admin) {
      return navigate("/admin");
    }
    if (!authed) {
      return navigate("/login");
    }
  }, []);

  return (
    <div className="App">
      <div className='wrapper'>
        <div className='left-bar'> <LeftBar></LeftBar></div>
        <div style={{
          'width': '100%'
        }}>
          <div style={{
            'width': '100%'
          }}><NavBar></NavBar></div>
          <div className='content'>
            <BalanceContent />
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
