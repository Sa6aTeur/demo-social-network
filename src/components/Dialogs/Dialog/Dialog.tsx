import React from 'react'
import { NavLink } from 'react-router-dom'
import s from './Dialog.module.css'


const Dialog: React.FC<PropsType> = (props) => {
  return (
   
    <div className={s.dialogsItems}>
  
    <div className={s.dialog+' '+s.active}>
            <NavLink to={'/dialogs/'+ props.id}>
               {props.name}
            </NavLink> 
    </div>
   
    </div>
  )
}

export default Dialog

////Types 
type PropsType = { 
  name: string
  id: number
}