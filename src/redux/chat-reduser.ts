import { ChatMessageApiType } from './../api/chat-api';
import { ChatMessageType } from './../pages/Chat/ChatPage';
import { BaseThunkType, InferActionsTypes } from './redux-store';
import { stopSubmit } from "redux-form";
import { chatAPI } from '../api/chat-api';
import { Dispatch } from 'redux';
import {v1} from 'uuid'


let initialState = {
  messages: [] as Array<ChatMessageType>,
  wsStatus: 'pending' 
}   


const chatReducer = (state = initialState, action: ActionsType): InitialStateType  => {
  
  switch(action.type){
    case 'SN/CHAT/SET_MESSAGES':

      return{
        ...state,
        messages: [...state.messages, ... action.payload.messages.map(m => ({...m ,id: v1() }))].filter((m,index,array)=> index >= array.length -100)
            
      }
    case 'SN/CHAT/WS_STATUS_CHANGED':
    
      return{
        ...state,
        wsStatus: action.payload.status
            
      }  

    default:
      return state; 
    }
}
  

// ACTIONS CREATORS
export const actions = {

  setMessages: (messages: ChatMessageApiType[]) => (
    {type: 'SN/CHAT/SET_MESSAGES',
     payload:{messages}} as const),
  
  wsStatusChanged: (status: StatusType) => (
    {type: 'SN/CHAT/WS_STATUS_CHANGED',
     payload:{status}} as const),

}



let _newMessageHandler: ((messages: ChatMessageApiType[]) =>void) | null = null

const newMessageHandlerCreator = (dispatch: Dispatch) =>{
  if (_newMessageHandler===null) {
    _newMessageHandler = (messages) => { 
      dispatch(actions.setMessages(messages))
    }
  }
  return _newMessageHandler
} 


let _statusChangedHandler: ((status: StatusType) =>void) | null = null

const statusChangedHandlerCreator = (dispatch: Dispatch) =>{
  if (_statusChangedHandler===null) {
    _statusChangedHandler = (status: StatusType) => { 
      dispatch(actions.wsStatusChanged(status))
      console.log(status)
    }
  }
  return _statusChangedHandler
} 



// THUNKS CREATORS
export const startMsgListening = (): ThunkType => async (dispatch) =>{
  
  chatAPI.start()

  chatAPI.subscribe('message-received',newMessageHandlerCreator(dispatch))

  chatAPI.subscribe('status-changed',statusChangedHandlerCreator(dispatch))
}



export const stopMsgListening = (): ThunkType => async (dispatch) =>{
 
  chatAPI.unsubscribe('message-received',newMessageHandlerCreator(dispatch))
  
  chatAPI.unsubscribe('status-changed',statusChangedHandlerCreator(dispatch))

  chatAPI.stop()
}


export const sendMessage = (message: string): ThunkType => async (dispatch) =>{
  
  chatAPI.sendMessage(message) 
}


export default chatReducer;

//Types
export type InitialStateType =  typeof initialState 
type ActionsType = InferActionsTypes<typeof actions>
type ThunkType = BaseThunkType<ActionsType | ReturnType<typeof stopSubmit>>
type StatusType = 'pending' | 'ready' | 'error'