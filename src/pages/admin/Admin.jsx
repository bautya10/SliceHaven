import { useState } from 'react'
import UserTable from '../../components/Specific/userTable/UserTable.jsx'
import {btn, active} from './admin.module.css'
import ReserveTable from '../../components/Specific/ReserveTable/ReserveTable.jsx'

// eslint-disable-next-line react/prop-types
const Admin = ({user, setTokenInvalid}) => {

  const [users, setUsers] = useState(true)
  const [reserves, setReserves] = useState(false)

  const showUsers = () => {
    setUsers(true)
    setReserves(false)
  }
  const showReserves = () => {
    setUsers(false)
    setReserves(true)
  }

  return (
    <div className='container mt-5 pt-5'>  
      <div className='d-flex justify-content-center mb-2'>
        <button className={`mx-2 ${btn} ${users ? active : ''}`} onClick={showUsers}>Usuarios</button>
        <button className={`${btn} ${reserves ? active : ''}`} onClick={showReserves}>Reservas</button>
      </div>
      {users && <UserTable user={user} setTokenInvalid={setTokenInvalid}/>}
      {reserves &&  <div className="container">
        <ReserveTable/>
      </div>}
    </div>
  )
}

export default Admin
