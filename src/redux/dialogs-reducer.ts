import { InferActionsTypes } from "./redux-store"


let initialState = {
  dialogs: [
    {id: 1, name: "Vitya"},
    {id: 2, name: "Vika"},
    {id: 3, name: "Viktot"},
    {id: 4, name: "Vasya"},
    {id: 5, name: "Vanya"},
    {id: 6, name: "Vova"},
  ] as Array<DialogType>,

  messages: [
    { message: "Hi"},
    { message: "Priv"},
    { message: "kak dela"},
    { message: "norm"},
    { message: "toje"},
    { message: "poka"},
  ] as Array<{message: string}>
}


const dialogsReducer = (state = initialState, action: ActionsType):InitialStateType => {  
  switch(action.type){
    
    case 'SN/DIALOGS/SEND_MESSAGE': {
      return {
        ...state,
        messages: [...state.messages,{message: action.newMessageText}],
      }
    }
    
    default:
      return state
    }
}

///////// Actions
export const actions = {
  sendMessage: (newMessageText: string) => ({ 
      type: 'SN/DIALOGS/SEND_MESSAGE',
      newMessageText
  } as const)
}


export default dialogsReducer

//Types
export type InitialStateType = typeof initialState
type ActionsType = InferActionsTypes<typeof actions>
type DialogType ={
  id: number,
  name: string
}