import React from 'react'
import { useAuth } from '../../context/AuthContext';

const Orders = () => {
  const{user,setUser}=useAuth();
  console.log(user);
  
  return (
   <>
    <div>Orders</div>
    
   </>
  )
}

export default Orders