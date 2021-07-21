import { Field, Formik } from 'formik';
import { FilterType } from '../../redux/users-reduser';
import React from 'react'
import { useSelector } from 'react-redux';
import { getUsersFilter } from '../../redux/users-selectors';
import { Button, Col, Row } from 'antd';
import { Option } from 'antd/lib/mentions';
import { Form, Input, Select } from 'formik-antd'



const usersSearchFormValidate = (values: UsersSearcgObjType) => {
  const errors = {};
  if (!values.term) {
 
  } else if (
    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.term)
  ) {
   
  }
  return errors;
}


//Form
const UsersSearchForm: React.FC<UserSearchPropsType> = React.memo(
  (props) =>{ 

    const filter = useSelector(getUsersFilter)


    const submit = (values: FilterFormType, { setSubmitting }: {setSubmitting: (isSubmitting: boolean) => void}) => {

      const filter: FilterType = {
        term: values.term,
        friend: values.friend === "null" ? null : values.friend === "true" ? true : false 
      }

      props.onFilterChanged(filter)
      setSubmitting(false)
    }
  
  
    return <div>
        <div>
       <Formik
         enableReinitialize
         initialValues={{ term: filter.term, friend: String(filter.friend) as FriendFormType}}
         validate={usersSearchFormValidate}
         onSubmit={submit}
       >
         {({ isSubmitting }) => (
           <Form>
             <Row>

              <Col span={12}>            
                  <Input type="text" name="term" placeholder="Here you can find users" />
              </Col>

              <Col span={12}>            
                <Select  name="friend" defaultValue={"null"} style={{ width: 120 }}>
                    <Option value="null">All</Option>
                    <Option value="true">Only Friends</Option>
                    <Option value="false">Only Unfollowed</Option>
                </Select> 

                <Button disabled={isSubmitting} htmlType="submit" type="primary">Find</Button>

              </Col>       
             </Row>            
           </Form>
         )}
       </Formik>
     </div>
    </div>
  }
) 


export default UsersSearchForm
////Types
type UserSearchPropsType ={
  onFilterChanged: (filter: FilterType) => void
}
type UsersSearcgObjType = {
  term: string
}
type FriendFormType = "null" | "true" | "false"

type FilterFormType ={
  term: string
  friend: FriendFormType
}









{/* <Field type="text" name="term" />
             <Field name="friend" as="select">
              <option value="null">All</option>
              <option value="true">Only Friends</option>
              <option value="false">Only Unfollowed</option>
            </Field>
             <button type="submit" disabled={isSubmitting}>
               Find
             </button> */}