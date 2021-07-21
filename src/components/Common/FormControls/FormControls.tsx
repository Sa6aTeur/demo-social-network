import React from 'react'
import { Field, submit, WrappedFieldMetaProps, WrappedFieldProps } from 'redux-form';
import { FieldValidatorType } from '../../../utils/validators/validators';
import styles from './FormControls.module.css'


type FormControlPropsType ={
  meta: WrappedFieldMetaProps
  children: React.ReactNode
}


const FormControl: React.FC<FormControlPropsType> =({ meta: {touched,error}, children}) => {
  const hasError = touched && error;
  return <div className = {styles.formControl + " " + (hasError && styles.error)}>
  {children}
  <div>
    {hasError && <span>{error}</span>}
  </div>
</div>  
}


export  const Textarea: React.FC<WrappedFieldProps> = (props) => {
  //const {input, meta,elemen, ...restProps} = props;
  const {input, meta, ...restProps} = props;
  return (
    <FormControl {...props}><textarea {...input}  {...restProps}/></FormControl>
  )
}


export  const Input: React.FC<WrappedFieldProps> = (props) => {
  const {input, meta, ...restProps} = props;
  return (
    <FormControl {...props}><input  {...input}  {...restProps}/></FormControl>
  )
}


export  function createField<Keys extends string>(placeholder: string|undefined="",
                             name: Keys ,
                             validators: Array<FieldValidatorType>,
                             component: string | React.Component| React.FC<WrappedFieldProps>,
                             props = {},
                             text = "" ) {
  return(<div><Field 
    placeholder={placeholder} 
    name={name} 
    component={component} 
    validate={validators}
    {...props} /> <span>{text}</span>
    </div>  )                            
                             }


export default Textarea
