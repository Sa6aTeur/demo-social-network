
let subscribers = {
  'message-received': [] as Array<MessagesReceivedSubscriberType>,
  'status-changed': [] as Array<StatusChangedSubscriberType>
} 
let ws: WebSocket | null = null


const closeHandler = () => {
 
  notifySubscribersAboutStatus('pending')

  setTimeout(() =>{ console.log('RESTART PAGE') 
                    createWs()}, 2500) 
}


const messageHandler = (e: MessageEvent) => { 

  let newMessages = JSON.parse(e.data)

  subscribers['message-received'].forEach(s => s(newMessages))
}


const openHandler = () => { 
  notifySubscribersAboutStatus('ready')
}


const errorHandler = () => {
  
  notifySubscribersAboutStatus('error')

  console.log('RESTART PAGE')
}


const cleanUp = () => {
  ws?.removeEventListener('message',messageHandler) 
  ws?.removeEventListener('close',closeHandler)
  ws?.removeEventListener('open',openHandler) 
  ws?.removeEventListener('error',errorHandler)
}


const notifySubscribersAboutStatus = (status: StatusType) =>{
  subscribers['status-changed'].forEach(s => s(status))
}


function createWs() {

  cleanUp()
  ws?.close()

  ws = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx') 
  notifySubscribersAboutStatus('pending')
  ws.addEventListener('close',closeHandler)
  ws.addEventListener('message',messageHandler)
  ws.addEventListener('open',openHandler)  
  ws.addEventListener('error',errorHandler)
}


export const chatAPI = {

  start(){
    createWs()
  },


  stop(){
    subscribers['message-received'] = []
    subscribers['status-changed'] = []
    cleanUp() 
    ws?.close()
  },

  
  subscribe(event: EventsNamesType,callback: MessagesReceivedSubscriberType | StatusChangedSubscriberType) {
    //@ts-ignore
    subscribers[event].push(callback)
    return () => {
      //@ts-ignore
      subscribers[event] = subscribers[event].filter(s => s!== callback)
    }   
  },

  unsubscribe(event: EventsNamesType ,callback: MessagesReceivedSubscriberType | StatusChangedSubscriberType) {
    //@ts-ignore
    subscribers[event] = subscribers[event].filter(s => s!== callback)
  },

  sendMessage(message:string){
    ws?.send(message)
  }
}


//Types
export type ChatMessageApiType =  {
  message: string
  photo: string
  userId: number
  userName: string
}

type MessagesReceivedSubscriberType = (messages: ChatMessageApiType[])=> void

type StatusChangedSubscriberType = (status: StatusType)=> void

type StatusType = 'pending' | 'ready' | 'error'

type EventsNamesType = 'message-received' | 'status-changed'