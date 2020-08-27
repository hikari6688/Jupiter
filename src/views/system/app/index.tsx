import React from 'react'
import { Button } from 'antd'
import { AuthWrap} from '../../../components/AuthWrap/index.jsx'
export const App=()=>{
  return (
    <div> 
    <p>app</p>
    <AuthWrap auth={ 'app:add' }>
     <Button>删除</Button>
    </AuthWrap>
    <AuthWrap auth={ 'app:update' }>
     <Button>编辑</Button>
    </AuthWrap>
       </div>

  )
}