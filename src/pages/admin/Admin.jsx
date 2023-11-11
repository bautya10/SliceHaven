import UserTable from '../../components/Specific/userTable/UserTable.jsx'

// eslint-disable-next-line react/prop-types
const Admin = ({user}) => {
  return (
    <>
      <UserTable user={user}/>
    </>
  )
}

export default Admin
