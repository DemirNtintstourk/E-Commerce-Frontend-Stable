import React, { useState } from 'react'
import './CSS/LoginSignup.css'
import { useNavigate } from 'react-router-dom'
import usersData from '../users.json'

export const Register = () => {
  const navigate = useNavigate()
  
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })

  const handleRegister = () => {
    navigate('/login')
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Form data:', formData)
    console.log('Users:', usersData)

    const user = usersData.find(u => 
      u.email.toLowerCase() === formData.email.toLowerCase() && 
      u.password === formData.password
    )

    console.log('Matched user:', user)

    if (user) {
      alert('Giriş başarılı!')
      localStorage.setItem('currentUser', JSON.stringify({ email: user.email }))
      window.dispatchEvent(new Event('storage'))
      navigate('/')
    } else {
      console.log('Login failed. No matching user found.')
      alert('Geçersiz e-posta veya şifre')
    }
  }

  return (
    <div className='loginsignup'>
      <div className="loginsignup-container">
        <h1>Giriş Yap</h1>
        <form onSubmit={handleSubmit}>
          <div className="loginsignup-fields">
            <input type="email" name="email" placeholder='E-posta Adresi' value={formData.email} onChange={handleChange} />
            <input type="password" name="password" placeholder='Şifre' value={formData.password} onChange={handleChange} />
          </div>
          <button type="submit">Giriş Yap</button>
        </form>
        <p className="loginsignup-login" onClick={handleRegister}>Hesabınız yok mu? <span >Buradan kayıt olun.</span></p>
      </div>
    </div>
  )
}






