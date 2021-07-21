import { getAuthUserData } from "./auth-reducer";
import { InferActionsTypes } from "./redux-store";

let initialState = {
  initialazed: false
  } 

const appReducer = (state = initialState, action: ActionsType): InitialStateType => {
   
    switch(action.type){
  
      case 'SN/APP/INITIALAZED_SUCCESS':
        return{
          ...state,
          initialazed: true, 
        }

      default:
        return state; 
      }
  }

  
// ACTIONS CREATORS
  export const actions = {
    initialazedSuccess: () => ({type: 'SN/APP/INITIALAZED_SUCCESS'}as const)
  }
  

// Thunks Creators
  export const initializeApp = () => (dispatch: any) =>{
    dispatch(getAuthUserData()) 
    .then(()=>{    
      dispatch(actions.initialazedSuccess())
    })   
  }

export default appReducer;

//Types
type InitialStateType = typeof initialState
type ActionsType = InferActionsTypes<typeof actions>