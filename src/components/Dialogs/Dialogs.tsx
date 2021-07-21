import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { InjectedFormProps, reduxForm } from 'redux-form';
import { InitialStateType } from '../../redux/dialogs-reducer';
import { maxLenghtCreator, required } from '../../utils/validators/validators';
import Textarea, { createField } from '../Common/FormControls/FormControls';
import Dialog from './Dialog/Dialog'
import s from './Dilogs.module.css'
import Message from './Message/Message'
import { AppStateType } from '../../redux/redux-store'
import {actions} from '../../redux/dialogs-reducer';


const maxLength = maxLenghtCreator(25);


const Dialogs: React.FC = React.memo(
  () => {

    const dialogsElements = useSelector((state: AppStateType) => state.dialogsPage.dialogs).map(p => <Dialog  id={p.id} key={p.id} name={p.name} />)
  
    const messagesElements = useSelector((state: AppStateType) => state.dialogsPage.messages).map((m,index) => <Message key={index} message={m.message} /> )
  
  
    const dispatch = useDispatch()
  
  
    const addNewMessage = (values: DialogsFormValuesType) =>{
      dispatch(actions.sendMessage(values.newMessageText));
    }
  
  
    return (
      <div className={s.dialogs}>
          <div className={s.dialogsElements}>
            {dialogsElements}
          </div>
        <div className={s.messages}>
          <div>{messagesElements}</div>
            <ReduxAddMessageForm onSubmit={addNewMessage}/>
          </div>            
      </div>
    )
  }
) 


let AddMessageForm = (props: InjectedFormProps<DialogsFormValuesType>) =>{ 
  return(
    <form onSubmit={props.handleSubmit}>               
          <div>
            <div className={s.messages}>
              {createField<DialogsFormValuesKeys>("Enter your message","newMessageText",[maxLength],Textarea)}
            </div>
            <div className={s.messages}>
              <button > Send </button>
            </div>
          </div>     
    </form>
  )
}
const ReduxAddMessageForm = reduxForm<DialogsFormValuesType>({ form: "message"})(AddMessageForm)


export default Dialogs


///Types
export type DialogsFormValuesType ={
  newMessageText: string
}
type DialogsFormValuesKeys = Extract<keyof DialogsFormValuesType, string>