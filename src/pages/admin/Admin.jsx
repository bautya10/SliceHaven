import React from 'react'
import UserTable from '../../components/Specific/userTable/UserTable.jsx'

const Admin = ({user}) => {
  return (
    <>
     <UserTable user={user}/>
    </>
  )
}

export default Admin
