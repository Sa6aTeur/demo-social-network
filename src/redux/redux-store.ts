import { Action, applyMiddleware, combineReducers, compose, createStore } from "redux";
import profileReducer from "./profile-reducer";
import dialogsReducer from "./dialogs-reducer";
import usersReducer from "./users-reduser";
import authReducer from "./auth-reducer";
import thunkMiddleware, { ThunkAction } from "redux-thunk"
import { reducer as formReducer } from 'redux-form'
import appReducer from "./app-reducer";
import chatReducer from "./chat-reduser";

let reducers = combineReducers({
 profilePage: profileReducer,
 dialogsPage: dialogsReducer,
 usersPage: usersReducer,
 auth: authReducer,
 form: formReducer,
 app: appReducer,
 chat: chatReducer
})


export type InferActionsTypes<T> = T extends {[key: string]: (...args: any[]) => infer U} ? U : never

type ReducersType = typeof reducers; /// (state: GLOBALSTATE) => GLOBALSTATE
export type AppStateType = ReturnType<ReducersType>

export type BaseThunkType<A extends Action, R = Promise<void>> = ThunkAction< R, AppStateType, unknown, A>

// @ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const store = createStore(reducers, composeEnhancers(applyMiddleware(thunkMiddleware)))

export default store