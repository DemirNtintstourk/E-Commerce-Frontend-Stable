import React, { useState, useEffect } from 'react'
import './Navbar.css'
import { Link, useNavigate } from 'react-router-dom'
import logo from '../Assets/logo.png'
import cart_icon from '../Assets/cart_icon.png'

const Navbar = () => {
  const [menu, setMenu] = useState("shop");
  const [currentUser, setCurrentUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const checkUserStatus = () => {
      const user = JSON.parse(localStorage.getItem('currentUser'))
      setCurrentUser(user)
    }

    checkUserStatus()
    window.addEventListener('storage', checkUserStatus)

    return () => {
      window.removeEventListener('storage', checkUserStatus)
    }
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('currentUser')
    setCurrentUser(null)
    window.dispatchEvent(new Event('storage'))
    navigate('/')
  }

  return (
    <div className='navbar'>
      <div className="nav-logo">
        <img src={logo} alt=''/>
        <p>Demir Giyim</p>
      </div>
      <ul className="nav-menu">
        <li onClick={()=>{setMenu("shop")}}><Link style={{textDecoration : 'none'}} to='/'>Ana Sayfa</Link>{menu==="shop"?<hr/>:<></>}</li>
        <li onClick={()=>{setMenu("mens")}}><Link style={{textDecoration : 'none'}} to='/mens'>Erkek</Link>{menu==="mens"?<hr/>:<></>}</li>
        <li onClick={()=>{setMenu("womens")}}><Link style={{textDecoration : 'none'}} to='/womens'>Kadın</Link>{menu==="womens"?<hr/>:<></>}</li>
        <li onClick={()=>{setMenu("kids")}}><Link style={{textDecoration : 'none'}} to='/kids'>Çocuk</Link>{menu==="kids"?<hr/>:<></>}</li>
      </ul>
      <div className="nav-login-cart">
        {currentUser ? (
          <div className="user-menu">
            <span>{currentUser.email}</span>
            <button onClick={handleLogout}>Çıkış Yap</button>
          </div>
        ) : (
          <Link to='/login'><button>Giriş/Kayıt</button></Link>
        )}
        <Link to='/cart'><img src={cart_icon} alt="" /></Link>
        <div className="nav-cart-count"></div>
      </div>
    </div>
  )
}

export default Navbar;
