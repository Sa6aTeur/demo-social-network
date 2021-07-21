import React from 'react'
import preloader from '../../../assets/img/Preloader.png'
import s from './Preloader.module.css'


const Preloader: React.FC = () => {
  return (
    <div className={s.overlay}>
       <div className={s.preloader}>
         <img src={preloader} className={s.preloader__image_animate}/>
      </div>
    </div>
  )
}

export default Preloader
