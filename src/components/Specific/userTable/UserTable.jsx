import axios from 'axios'
import { useEffect, useState } from 'react'
import {tableContainer} from "./table.module.css"
import { useForm } from "react-hook-form"
import {Cform, input} from '../loginForm/LoginForm.module.css'


const UserTable = ({user}) => {
  
  const [usersInfo, setUsersInfo] = useState([])

  const { register, handleSubmit, formState: { errors } } = useForm();

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
          setUsersInfo(users?.data.users);
        } catch (error) {
          console.error('Error al realizar la solicitud:', error);
        }
      };
      getUsers();
    }
    }, [tokenUser]);

    const onSubmit = handleSubmit(async (data) => {
      console.log(data)
    });


  return (<>
    <div className='text-center mt-3 ' >
      <h1 className='display-6'>Tabla de usuarios</h1>
    </div>
    <div className={`container ${tableContainer}`}>
    <table className="table table-bordered mt-4">
      <thead>
        <tr>
          <td scope="col">#</td>
          <th scope="col">userName</th>
          <th scope="col">email</th>
          <th scope="col">admin</th>
          <th scope="col">suspended</th>
          <th scope="col"></th>
        </tr>
      </thead>
      <tbody>
         {usersInfo?.map((user, index) => (
            <tr key={index}>
              <th scope="row">{index + 1}</th>
              <td>{user.userName}</td>
              <td>{user.email}</td>
              <td>{user.admin.toString()}</td>
              <td>{user.suspended.toString()}</td>
              <td className='text-center'>
                <button className='btn btn-danger mx-1'> <i className="bi bi-trash3"></i> </button> 
                <button className='btn btn-secondary mx-1' data-bs-toggle="modal" data-bs-target="#exampleModal" ><i className="bi bi-pencil-square"></i></button>
              </td>
            </tr>
          ))}
      </tbody>
    </table>
  </div>

{/* modal de edicion */}

  <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel"         aria-hidden="true">
    <div className="modal-dialog">
      <div className="modal-content">

        <form onSubmit={onSubmit} noValidate className={`col-12 ${Cform}`}>
          <div className='text-center mb-4 text-black'>
            <h2 className='display-6'>Editar</h2>
          </div>
          <div className='p-2'>
              <div className="mb-3">   
                <input type="text" className={`w-100 ${input} p-2 mb-3`} placeholder='Usuario'
                {...register("userName", {
                  required:{
                    value: true,
                    message: "Ingrese un nombre de usuario"
                  },
                  minLength:{
                    value: 2,
                    message: "El nombre de usuario debe contener al menos 2 caracteres"
                  }, maxLength:{
                    value: 40,
                    message: "El nombre de usuario debe contener no mas de 40 caracteres"
                  },
                  pattern: {
                    value: /^[a-zA-Z ]+$/,
                    message: "Ingrese solo letras, sin numeros ni caracteres especiales"
                  }
                  })}
                />
                {
                  errors.userName && <p className='text-danger'>{errors.userName.message}</p>
                }
              </div>
            </div>

            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
           <button type="submit" className="btn btn-primary">Save changes</button>
        </form>

      </div>
    </div>
  </div>
  
  </>
  )
}

export default UserTable