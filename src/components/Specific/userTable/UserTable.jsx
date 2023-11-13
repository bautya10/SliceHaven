import axios from 'axios'
import { useEffect, useState } from 'react'
import {tableContainer} from "./table.module.css"
import { useForm } from "react-hook-form"
import {Cform, input} from '../../Specific/registerForm/registerForm.module.css'


// eslint-disable-next-line react/prop-types
const UserTable = ({user}) => {
  const { register, handleSubmit, formState: { errors }, setValue} = useForm(); // React hookForm
  
  const [usersInfo, setUsersInfo] = useState([])
  const [selectedUser, setSelectedUser] = useState(null);

  // Autorizacion del token
  const tokenUser = user?.loguedUser.token
  const id = user?.loguedUser.userFounded._id
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
          const users = await axios.get('https://slicenhaven-backend.onrender.com/users', config);
          // Filtramos la lista de usuarios para excluir al usuario actual
          const filteredUsers = users?.data.users.filter(u => u._id !== id);
          setUsersInfo(filteredUsers);
        } catch (error) {
          console.error('Error al realizar la solicitud:', error);
        }
      };

      getUsers();
    }
  }, [tokenUser]);

  // Funcion para editar
  const handleEditClick = (user) => {
    setSelectedUser(user);
  };
  // Funcion para asignar a los inputs el usuario seleccionado
  useEffect(() => {
    setValue("userName", selectedUser?.userName);
    setValue("email", selectedUser?.email);
  }, [selectedUser, setValue]);

  // Funcion para enviar formulario
  const onSubmit = handleSubmit(async (data) => {
    try {
      
      if (data.password === "") {
        delete data.password
      }
      if (data.admin === "") {
        delete data.admin
      }
      if (data.suspended === "") {
        delete data.suspended
      }
      await axios.patch(`https://slicenhaven-backend.onrender.com/users/${selectedUser?._id}`, data);

      globalThis.location.reload();
    } catch (error) {
      console.log(error);
    }
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
                  <button  onClick={() => handleEditClick(user)} className='btn btn-secondary mx-1' data-bs-toggle="modal" data-bs-target="#exampleModal" ><i className="bi bi-pencil-square"></i></button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>

{/* modal de edicion */}
  <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div className="modal-dialog">
      <div className="modal-content">

        <form onSubmit={onSubmit} noValidate className={`col-12 ${Cform}`}>
          <div className='text-center mb-4 text-black'>
            <h2 className='display-6'>Editar</h2>
          </div>
          <div className='p-2'>
          <div className="mb-3">   
                <input type="text" className={`w-100 ${input} p-2 mb-3`} placeholder={selectedUser?.userName}
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
                  },
                  })}
                />
                {
                  errors.userName && <p className='text-danger'>{errors.userName.message}</p>
                }
              </div>

              <div className="mb-3">
              <input type="email" className={`w-100 ${input} p-2 mb-3`} placeholder={selectedUser?.email}
              {...register("email", {
                required: {
                  value: true,
                  message: "Ingrese un correo"
                },
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[\w.-]+\.[a-zA-Z]{2,}$/,
                  message: "ingrese un correo valido"
                }
              })}

              />
        
              {
                errors.email && <p className='text-danger'>{errors.email.message}</p>
              }
            </div>

            <div className="mb-3">
              <input
                type="password"
                className={`w-100 ${input} p-2 mb-3`}
                placeholder="Contraseña"
                {...register("password", {
                  validate: {
                    noValue: (value) => {
                      if (value.trim() === "") return true; // No aplica validaciones si no se ingresa un carácter
                      return (
                        /^(?=.*[A-Z])(?=.*\d).{6,}$/.test(value) ||
                        "La contraseña debe contener al menos 6 caracteres, una mayúscula y un número"
                      );
                    },
                    maxLength: (value) =>
                      value.trim() === "" || value.length <= 40 || "La contraseña no debe contener más de 40 caracteres",
                  },
                })}
              />
              {errors.password && <p className="text-danger">{errors.password.message}</p>}
            </div>

            <div className="mb-3 w-50">
              <label className='text-primary' htmlFor="admin">Admin: {selectedUser?.admin.toString()}</label>
              <select className={`w-100 ${input} p-2 mb-3`} {...register("admin")} >
                <option value="">Seleccione un valor</option>
                <option value={true}>True</option>
                <option value={false}>False</option>
              </select>

              {errors.admin && <p className='text-danger'>{errors.admin.message}</p>}
            </div>

              <div className="mb-3 w-50">
                <label className='text-primary' htmlFor="suspended">suspended: {selectedUser?.suspended.toString()}</label>
                <select className={`w-100 ${input} p-2 mb-3`} {...register("suspended")} >
                  <option value="">Seleccione un valor</option>
                  <option value={true}>True</option>
                  <option value={false}>False</option>
                </select>

                {errors.suspended && <p className='text-danger'>{errors.suspended.message}</p>}
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