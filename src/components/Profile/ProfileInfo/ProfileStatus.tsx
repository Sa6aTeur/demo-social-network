import { Col, Input } from 'antd'
import React, { useState, useEffect, ChangeEvent } from 'react'
import s from './ProfileStatus.module.css'


const ProfileStatusWithHook: React.FC<PropsType> = (props) => {


    const [editMode, seteditMode] = useState(false)
    const [status, setstatus] = useState(props.status)
    

    useEffect(()=> {
      setstatus(props.status)
    }, [props.status])


    const activateEditMode = () =>{
      if(props.isOwner){
        seteditMode(true);
      }  
    }


    const deactivateEditMode = () =>{
      seteditMode(false);
      props.updateUserStatus(status)
    }


    const onStatusChange = (e: ChangeEvent<HTMLInputElement>) =>{
      setstatus(e.currentTarget.value);  
    }
    

    return(
        <Col span={6}>
          { !editMode &&     
            <div className={s.statusWrap} style={{marginTop:'5px',marginBottom:'5px'}}>
              <span  className={s.status} onClick={activateEditMode}>{status? status : "..."}</span>
            </div>          
          }
          {editMode && 
            <div>
              <Input maxLength={20} style={{marginBottom:'5px',marginTop:'5px'}} onChange={onStatusChange} autoFocus={true} onBlur={deactivateEditMode} value={status}/>
            </div>
          }
        </Col>
    
    )
    
}


export default ProfileStatusWithHook

////Types
type PropsType = {
  status: string
  isOwner: boolean
  updateUserStatus: (status: string) => void
}
