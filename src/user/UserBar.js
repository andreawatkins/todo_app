import Login from './Login'
import Logout from './Logout'
import Register from './Register'
import { useState } from 'react'


export default function UserBar({ user, dispatch}) {

if(user){
    return <Logout user = {user} dispatch = {dispatch}/>
} else{
    return(
        <>
        <Login dispatch = {dispatch} />
        <div/>
        <Register dispatch = {dispatch}/>
        </>
    )
}
}
