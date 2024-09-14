import React, { useState } from 'react'
import './CSS/LoginSignup.css'
import { useNavigate } from 'react-router-dom';

export const LoginSignup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  })

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    
    if (!formData.email.trim()) {
      alert('E-posta alanı boş bırakılamaz!.')
      return
    }

    if (!formData.name.trim()) {
      alert('İsim alanı boş bırakılamaz!.')
      return
    }

    if (!formData.password.trim()) {
      alert('Şifre alanı boş bırakılamaz!.')
      return
    }

    try {
      console.log('Gönderilen form verileri:', formData)

      
      const checkEmailResponse = await fetch(`http://localhost:5000/api/check-email?email=${formData.email}`)
      const checkEmailResult = await checkEmailResponse.json()
      console.log('E-posta kontrol sonucu:', checkEmailResult)

      if (checkEmailResult.exists) {
        alert('Bu e-posta adresi zaten kullanılıyor.')
        return
      }

      
      const response = await fetch('http://localhost:5000/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })
      console.log('Kayıt yanıtı:', response)

      if (response.ok) {
        const result = await response.json()
        console.log('Kayıt sonucu:', result)
        alert('Kayıt başarılı!')
        setFormData({ name: '', email: '', password: '' })
        navigate('/register') 
      } else {
        const errorData = await response.json()
        console.error('Kayıt hatası:', errorData)
        alert(`Kayıt sırasında bir hata oluştu: ${errorData.message || 'Bilinmeyen hata'}`)
      }
    } catch (error) {
      console.error('Kayıt hatası:', error)
      alert('Kayıt sırasında bir hata oluştu.')
    }
  }
  const handleLogin = () => {
    navigate('/register');
  }

  return (
    <div className='loginsignup'>
      <div className="loginsignup-container">
        <h1>Kayıt Ol</h1>
        <form onSubmit={handleSubmit}>
          <div className="loginsignup-fields">
            <input type="text" name="name" placeholder='Adınız' value={formData.name} onChange={handleChange} />
            <input type="email" name="email" placeholder='E-posta Adresi' value={formData.email} onChange={handleChange} />
            <input type="password" name="password" placeholder='Şifre' value={formData.password} onChange={handleChange} />
          </div>
          <button type="submit">Kayıt Ol</button>
        </form>
        <p className="loginsignup-login" onClick={handleLogin}>Zaten bir hesabın var mı?<span> Buradan giriş yapın.</span></p>
      </div>
    </div>
  )
}
