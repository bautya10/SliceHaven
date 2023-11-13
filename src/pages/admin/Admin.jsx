import UserTable from '../../components/Specific/userTable/UserTable.jsx'

// eslint-disable-next-line react/prop-types
const Admin = ({user, setTokenInvalid}) => {
  return (
    <>
      <UserTable user={user} setTokenInvalid={setTokenInvalid}/>
    </>
  )
}

export default Admin
