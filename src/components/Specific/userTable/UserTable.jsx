import axios from 'axios'
import { useEffect, useState } from 'react'
import {tableContainer} from "./table.module.css"


// eslint-disable-next-line react/prop-types
const UserTable = ({user}) => {
  const [personas, setPersonas] = useState([])

  // eslint-disable-next-line react/prop-types
  const tokenUser = user?.loguedUser.token

  useEffect(() => {
    if (tokenUser) {
      const getUsers = async () => {
        try {  
          const token = tokenUser; // Autorizamos el token
          const config = {
            headers: {
              'Authorization': `Bearer ${token}`,
            },
          };
          const users = await axios.get('http://localhost:8000/users', config);
          setPersonas(users?.data.users);
        } catch (error) {
          console.error('Error al realizar la solicitud:', error);
        }
      };
      getUsers();
    }
    }, [tokenUser]);

  return (<>
    <div className='text-center mt-3 ' >
      <h1 className='display-6'>Tabla de usuarios</h1>
    </div>
    <div className={`container ${tableContainer}`}>
    <table className="table mt-4">
      <thead>
        <tr>
          <td scope="col">#</td>
          <th scope="col">userName</th>
          <th scope="col">email</th>
          <th scope="col">admin</th>
          <th scope="col">suspended</th>
        </tr>
      </thead>
      <tbody>
        {personas?.map((persona, index) => (
            <tr key={index}>
              <th scope="row">{index + 1}</th>
              <td>{persona.userName}</td>
              <td>{persona.email}</td>
              <td>{persona.admin.toString()}</td>
              <td>{persona.suspended.toString()}</td>
            </tr>
          ))}
      </tbody>
    </table>
  </div>
  </>
  )
}

export default UserTable