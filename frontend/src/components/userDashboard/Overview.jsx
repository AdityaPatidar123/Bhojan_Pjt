import React from 'react'
import { useAuth } from '../../context/AuthContext'
const Overview = () => {
  const { user } = useAuth();
  console.log("Overview Rendered",user);
  
  return (
    <div>Overview</div>
  )
}

export default Overview