import React from 'react'
import './Welcome.css'
import hero_image from '../Assets/hero_image.png'

//Ana sayfa

export const Welcome = () => {
  return (
    <div className='welcome'>
      <div className="welcome-left">
            
            <div>
                <div className="hand-icon">
                    <p>Herkes için
                      Yeni Koleksiyonlar</p>                 
                    <p></p>
                    <p></p>
                </div>
            </div>
            <img src={hero_image} alt=""/>
        </div>
      </div>
  )
}
