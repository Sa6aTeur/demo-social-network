import { Button } from 'antd'
import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { sendMessage, startMsgListening, stopMsgListening } from '../../redux/chat-reduser'
import { AppStateType } from '../../redux/redux-store'


const ChatPage: React.FC  = () => {

  return (
    <div>
        <Chat/>
    </div>
  )
}


const Chat: React.FC = () => {

  const dispatch = useDispatch()

  const wsStatus = useSelector((state: AppStateType) => state.chat.wsStatus)

  useEffect(() => {
    dispatch(startMsgListening())
    return () => {
      dispatch(stopMsgListening())
    }

  }, [])
  
 
  return(
    <div>
      {wsStatus === 'error' && <div>Error</div>}
      <>  
      <Messages  />
      <AddMesagesForm  />     
      </>
    </div>
  )
}


const Messages: React.FC  = () => {
  
  
  const messagesAnchorRef = useRef<HTMLDivElement>(null)
  const messages = useSelector((state: AppStateType) => state.chat.messages)

  const [autoScroll, setAutoScroll] = useState(true)
  const scrollHandler = (e: React.UIEvent<HTMLDivElement>) =>{
    let element = e.currentTarget
    if(Math.abs(element.scrollHeight-element.scrollTop )<=10){
      !autoScroll && setAutoScroll(true)
    } else{
      autoScroll &&setAutoScroll(false)
    }
  }

  
  useEffect(() => {
    if(autoScroll){
      messagesAnchorRef.current?.scrollIntoView({behavior: 'smooth'})
    }   
  }, [messages])


  return (
    <div>
      <div style={{height: "470px", overflowY: "auto" }} onScroll={scrollHandler}>
       {messages.map((m: ChatMessageType) => <Message key={m.id} message = {m} /> )}
       <div ref={messagesAnchorRef}></div>
      </div> 
    </div>
  )
}


const Message: React.FC<{message: ChatMessageType}>  = React.memo(({message}) => {
  return (
    <div>
       <div>
          <img src={message.photo} style={{width: '40px'}} /> <b>{message.userName}</b>
       </div>
       <div>
          <span>{message.message}</span>
       </div>
        <hr/>
    </div>
  )
}) 


const AddMesagesForm: React.FC  = () => {

  const [message, setMessage] = useState('')
  const wsStatus = useSelector((state: AppStateType) => state.chat.wsStatus)

  const dispatch = useDispatch()

  const onSendMessage = () => {

    if(!message){
      return;
    }

    
   dispatch(sendMessage(message))
   setMessage('')
  }


  return (
    <div>
      <div>
          <textarea value={message} onChange={(e) => setMessage(e.currentTarget.value) } >  </textarea>
      </div>

      <div>
          <Button disabled={wsStatus !== 'ready'} onClick={onSendMessage} type="primary">Send</Button>
          
      </div> 
    </div>
  )
}


export default ChatPage

//Types
export type ChatMessageType =  {
  message: string
  photo: string
  userId: number
  userName: string
  id: string
}