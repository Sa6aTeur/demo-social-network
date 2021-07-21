import React, { useState } from 'react'
import { Pagination } from 'antd'


let Paginator: React.FC<PropsType> = ({totalItemsCount,pageSize,currentPage, onCurrentPageChanged}) => {
 
  
  let pagesCount = Math.ceil(totalItemsCount/pageSize);
  

  let pages =[]
  for(let i=1; i<=pagesCount; i++) {
    pages.push(i);
  }
  
  
  let [portionNumber, setPortionNumber] = useState(1);


  return (
      <div>    
        <div>
          {portionNumber>1 && <button onClick={()=>{setPortionNumber(portionNumber-1)}} >PREV</button> } 

          {            
            <Pagination current={currentPage}
                        onChange={(page) => onCurrentPageChanged(page) } 
                        showSizeChanger={false} 
                        total={pagesCount} 
                        />                                                       
          }
        </div>     
      </div> 
  )
}

export default Paginator


////Types 
type PropsType ={
  totalItemsCount: number
  pageSize: number
  currentPage: number 
  onCurrentPageChanged: (p: number)=> void
  portionSize?: number
}
