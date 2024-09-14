import React from 'react'
import './Footer.css'
import footer_logo from '../Assets/logo_big.png'
import instagram_icon from '../Assets/instagram_icon.png'
import whatsapp_icon from '../Assets/whatsapp_icon.png'

export const Footer = () => {
  return (
    <div className='footer'>
      <div className="footer-logo">
        <img src={footer_logo} alt="" />
        <p>Demir Giyim</p>
      </div>
      <ul className="footer-links">
        <li>Hakkında: Demir Dinçtürk E-ticaret Bitirme projesi </li>
        
      </ul>
      <div className="footer-social-icon">
        <div className="footer-icons-container-ig">
          <a href="https://www.instagram.com/demir._.n/" target='_blank'>
          <img  src={instagram_icon}  alt=""/>
          </a>
        </div>
        <div className="footer-icons-container">
        <a href="https://github.com/DemirNtintstourk" target='_blank'>
          <img  src={whatsapp_icon}  alt=""/>
          </a>
        </div>
      </div>
      <div className="footer-copyright">
        <hr />
        <p>Developed by Demir Dinçtürk</p>
      </div>
    </div>
  )
}
