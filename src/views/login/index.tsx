import React from 'react';
import { Button  } from 'antd'
import { router } from '../../store/router.store'
import { useHistory } from 'react-router'
import { auth } from '../../store/auth.store'
export const Login=()=>{
  const history=useHistory();
  const login=()=>{
    router.getRoutes().then(r=>{
        localStorage.setItem('TOKEN','THISISTHETOKENKEY')
        history.push('/system/app')
    }).catch(err=>{

    })
  }
 return (
   <div>
      <Button onClick={ login }>登陆</Button>
   </div>
 ) 
}