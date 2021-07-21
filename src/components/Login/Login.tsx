import { Button, Col, Row } from 'antd';
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router';
import { InjectedFormProps, reduxForm } from 'redux-form'
import { login} from '../../redux/auth-reducer';
import { AppStateType } from '../../redux/redux-store';
import { maxLenghtCreator, required } from '../../utils/validators/validators'
import { Input,createField } from '../Common/FormControls/FormControls'
import style from '../Common/FormControls/FormControls.module.css'
const maxLenght = maxLenghtCreator(25);


const LoginForm: React.FC<InjectedFormProps<LoginFormValuesType>> = ({handleSubmit, error}) =>{
  return (
      <form onSubmit={handleSubmit}>
        {createField<LoginFormValuesKeys>("Email","email",[required,maxLenght],Input)}

        {createField<LoginFormValuesKeys>("Password","password",[required,maxLenght],Input,{type:"password"})}

        <Row >
            {createField<LoginFormValuesKeys>(undefined,"rememberMe",[maxLenght],Input,{type:"checkbox"})} 
            <span className={style.rememberMe}>Remember Me</span> 
        </Row>

        {error && 
        <div>
          <span className={style.formSummaryError} >{error}</span>
        </div> }

        <div><Button onClick={handleSubmit} >LOGIN</Button></div>
      </form>
  )
}
const LoginReduxForm = reduxForm<LoginFormValuesType>({ form:'login', })(LoginForm) 


//// JSX
export const LoginPage: React.FC = (props) => {
  
  const isAuth = useSelector((state: AppStateType) => state.auth.isAuth)


  const dispatch = useDispatch()


  const onSubmit = (formData: LoginFormValuesType) =>{ 
    dispatch(login(formData.email, formData.password, formData.rememberMe))
  }


  if (isAuth){
    return <Redirect to="/profile"/>
  }
  

  return (
    <div>
      <h1>LOGIN</h1>
      <LoginReduxForm onSubmit={onSubmit}/>
    </div>
  )
}


//Types
/////Keys From generic createField
export type LoginFormValuesType ={
  email: string
  password: string
  rememberMe: boolean
}
type LoginFormValuesKeys = Extract<keyof LoginFormValuesType, string>




