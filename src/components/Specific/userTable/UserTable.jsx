import axios from 'axios'
import { useEffect, useState } from 'react'
import {tableContainer} from "./table.module.css"
import { useForm } from "react-hook-form"
import {Cform, input} from '../../Specific/registerForm/registerForm.module.css'
import ReserveTable from '../ReserveTable/ReserveTable'

// eslint-disable-next-line react/prop-types
const UserTable = ({user, setTokenInvalid}) => {
  // React hookForm
  const { register, handleSubmit, formState: { errors }, reset} = useForm(); 
  //Usuarios filtrados
  const [usersInfo, setUsersInfo] = useState([]) 
  //Usuario seleccionado en la tabla
  const [selectedUser, setSelectedUser] = useState(null);
  //validaciones modalEdit
  const [checkEmail, setCheckEmail] = useState(null)
  const [saveChanges, setSaveChanges] = useState(false)
  
  const [userReserves, setUserReserves] = useState(false)

  // Autorizacion del token
  const tokenUser = user?.loguedUser.token
  const id = user?.loguedUser.userFounded._id
  useEffect(() => {
    if (tokenUser) {
      const getUsers = async () => {
        try {
          const config = {
            headers: {
              'Authorization': `Bearer ${tokenUser}`,
            },
          };
          const users = await axios.get('https://slicenhaven-backend.onrender.com/users', config);
          // Filtramos la lista de usuarios para excluir al usuario actual
          const filteredUsers = users?.data.users.filter(u => u._id !== id);
          setUsersInfo(filteredUsers);
        } catch (error) {
          if (error.response.data.message === "El token es invalido") {
            setTokenInvalid(true)
          }
        }
      };
      getUsers();
    }
  }, [tokenUser]);

  // Funcion para editar
  const handleEditClick = (user) => {
    reset()
    setSelectedUser(user);
  };
  // onSubmit del modalEditar
  const onSubmit = handleSubmit(async (data) => {
    try {
      // Filtramos los campos vacíos
      const filteredData = Object.fromEntries(
        Object.entries(data).filter(([key, value]) => value !== "")
      );
  
      await axios.patch(`http://localhost:8000/users/${selectedUser?._id}`, filteredData);
  
      setUsersInfo(prevUsers => {
        const updatedUsers = prevUsers.map(u => (u._id === selectedUser._id ? { ...u, ...filteredData } : u));
        return updatedUsers;
      });
      setCheckEmail("")
      setSaveChanges(true)
      reset();
    } catch (error) {
      console.log(error)
      setCheckEmail(error.response.data);
    }
    
  });

  // Funcion para eliminar un usuario
  const deleteUser = async () => {
    try {
      await axios.delete(`http://localhost:8000/users/${selectedUser?._id}`);
      // Actualizar el estado local eliminando el usuario de la lista
      setUsersInfo(prevUsers => prevUsers.filter(u => u._id !== selectedUser._id));
    } catch (error) {
      console.log(error);
    }
  };


  return (<>
    <div className='text-center mt-5 pt-5' >
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
                  <button onClick={() => handleEditClick(user)} className='btn btn-danger mx-1' data-bs-toggle="modal" data-bs-target="#deleteModal"> <i className="bi bi-trash3"></i> </button> 
                  <button  onClick={() => handleEditClick(user)} className='btn btn-secondary mx-1' data-bs-toggle="modal" data-bs-target="#editModal" ><i className="bi bi-pencil-square"></i></button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
    <div className="container">
      <ReserveTable/>
    </div>
{/* modal de edicion */}
  <div className="modal fade" id="editModal" aria-labelledby="editModalLabel" aria-hidden="true" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" >
    <div className="modal-dialog modal-xl">
      <div className="modal-content">
        <form onSubmit={onSubmit} noValidate className={`col-12 ${Cform}`}>
          <div className='text-center mb-4 text-black'>
            <h2 className='display-6'>Editar</h2>
          </div>
          <div className='p-2'>
            <div className="mb-3">   
                <input type="text" className={`w-100 ${input} p-2 mb-3`} placeholder={selectedUser?.userName}
                {...register("userName", {
                  validate:{
                    noValue: (value) => {
                      if (value.trim() === "") return true; // No aplica validaciones si no se ingresa un carácter
                      return (
                       /^[a-zA-Z ]+$/.test(value) ||
                       "Ingrese solo letras, sin numeros ni caracteres especiales"
                     );    
                    },
                    maxLength: (value) => 
                    value.trim() === "" || value.length <= 40 || "El usuario no debe contener más de 40 caracteres",   
                    minLength: (value) =>
                    value.trim() === "" || value.length > 2 || "El usuario debe contener al menos 2 caracteres",  

                  }
                  })}
                />
                {
                  errors.userName && <p className='text-danger'>{errors.userName.message}</p>
                }
            </div>

            <div className="mb-3">
              {checkEmail && (
                <p className='text-light bg-danger p-1'>{checkEmail}</p>
              )}
              <input type="email" className={`w-100 ${input} p-2 mb-3`} placeholder={selectedUser?.email}
              {...register("email", {
                validate:{
                  noValue: (value) => {
                    if (value.trim() === "") return true; // No aplica validaciones si no se ingresa un carácter
                    return (
                      /^[a-zA-Z0-9._%+-]+@[\w.-]+\.[a-zA-Z]{2,}$/.test(value) ||
                      "Ingrese un correo valido"
                    );            
                  }
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

            {/*reservas*/}     
            <div className='text-center mt-3 ' >
              <h1 className='display-6'>Reservas</h1>
            </div>
            <div className={`container ${tableContainer}`}>
              <table className="table table-bordered mt-4">
                <thead>
                  <tr>
                    <td scope="col">#</td>
                    <th scope="col">Dia</th>
                    <th scope="col">Hora</th>
                    <th scope="col">Personas</th>
                    <th scope="col"></th>
                  </tr>
                </thead>
                <tbody>
                  {selectedUser?.reserves.map((reserve, index) => (
                  <tr key={index}>
                    <th scope="row">{index + 1}</th>
                    <td>{reserve.date}</td>
                    <td>{reserve.hour}</td>
                    <td>{reserve.people}</td>
                    <td className='text-center'>
                      <button onClick={() => console.log(user.reserves)} className='btn btn-danger mx-1' data-bs-toggle="modal" data-bs-target="#deleteModal"> <i className="bi bi-trash3"></i> </button> 
                      <button  onClick={() => console.log(user.reserves)} className='btn btn-secondary mx-1' data-bs-toggle="modal" data-bs-target="#editModal" ><i className="bi bi-pencil-square"></i></button>
                    </td>
                  </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
            <div className='d-flex justify-content-center'>
              <button type="submit" className="btn btn-success mx-5">Guardar</button>
              <button type="button" className="btn btn-danger mx-5" data-bs-dismiss="modal" onClick={()=>{
                setSaveChanges(false);
              }}>Cerrar</button>
            </div>

           {saveChanges && (
                <div className='d-flex justify-content-center mt-3 text-center'><p className='text-light w-50 bg-success p-2'>Guardado</p></div>
              )}
        </form>
      </div>
    </div>
  </div>
  
{/* modal para eliminar */}
    <div className="modal fade" id="deleteModal" tabIndex="-1" aria-labelledby="deleteModalLabel" aria-hidden="true">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h4>Eliminar cuenta</h4>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div className="modal-body">
            <p className=' font-monospace'>Esta acción eliminara la cuenta definitivamente.</p>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
            <button type="button" onClick={deleteUser} className="btn btn-danger" data-bs-dismiss="modal">Eliminar</button>
          </div>
        </div>
      </div>
    </div>
  </>
  )
}

export default UserTable