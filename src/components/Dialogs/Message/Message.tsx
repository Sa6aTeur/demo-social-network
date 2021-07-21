import React from 'react'
import s from './Message.module.css'

const Message: React.FC<PropsType> = (props) => {
  
  return (
      <div className={s.message}>
        <p>{props.message}</p>
      </div>  
  )
}

export default Message
////Type
type PropsType = {
  message: string
}