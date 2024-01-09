/* eslint-disable react/prop-types */
import axios from 'axios'
import { useEffect, useState } from 'react'
import {tableContainer} from "./table.module.css"
import { useForm } from "react-hook-form"
import {Cform, input} from '../../Specific/registerForm/registerForm.module.css'
import Pagination from '../pagination/Pagination'
import Search from '../search/Search'
import Swal from 'sweetalert2';

// eslint-disable-next-line react/prop-types
const UserTable = ({user, setTokenInvalid}) => {
  const { register, handleSubmit, formState: { errors }, reset} = useForm(); 
  const [usersInfo, setUsersInfo] = useState([]); 
  const [selectedUser, setSelectedUser] = useState(null);
  const [checkEmail, setCheckEmail] = useState(null);
  const [totalPages, setTotalPages] = useState("");
  const [page, setPage] = useState("");
  const [searching, setSearching] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false)
  const [loadingEdit, setLoadingEdit] = useState(false)
  const [loadingDelete, setLoadingDelete] = useState(false)
  // Autorizacion del token
  const tokenUser = user?.loguedUser.token
  const id = user?.loguedUser.userFounded._id
  useEffect(() => {
    if (tokenUser) {
      const getUsers = async () => {
        try {
          setLoading(true)
          const config = {
            headers: {
              'Authorization': `Bearer ${tokenUser}`,
            },
          };
          const {data} = await axios.get(`https://slicenhaven-backend.onrender.com/users?${page}${searching}`, config);

          const filteredUsers = data?.info.users.filter(user => user._id !== id);
          setUsersInfo(filteredUsers);
          setTotalPages(data.info.totalPages)
        } catch (error) {
          setError(true)
          if (error.response.data.message === "El token es invalido") {
            setTokenInvalid(true)
            localStorage.removeItem("user");
            setUser(null);
          }
        } finally {
          setLoading(false)
        }
      };
      getUsers();
    }
  }, [tokenUser, page, searching, error]);
  // Funcion para editar
  const selectUser = (user) => {
    setSelectedUser(user);
    reset();
  };
  // onSubmit del modalEditar
  const onSubmit = handleSubmit(async (data) => {
    try {
      setLoadingEdit(true)
      const filteredData = Object.fromEntries(
        Object.entries(data).filter(([key, value]) => value !== "")
      );
      await axios.patch(`https://slicenhaven-backend.onrender.com/users/${selectedUser?._id}`, filteredData);
      setUsersInfo(prevUsers => {
        const updatedUsers = prevUsers.map(u => (u._id === selectedUser._id ? { ...u, ...filteredData } : u));
        return updatedUsers;
      });
      setCheckEmail("")
      document.getElementById("btnCerrar").click()
      Swal.fire({
        title: '¡Datos guardados!',
        icon: 'success',
        showConfirmButton: false,
        timer: 1500
      });
    } catch (error) {
      setCheckEmail(error.response.data);
    } finally {
      setLoadingEdit(false)
    }
    
  });
  // Funcion para eliminar un usuario
  const deleteUser = async () => {
    try {
      setLoadingDelete(true)
      await axios.delete(`https://slicenhaven-backend.onrender.com/users/${selectedUser?._id}`);
      setUsersInfo(prevUsers => prevUsers.filter(u => u._id !== selectedUser._id));
      document.getElementById("cancelDelete").click()
    } catch (error){
      //Error
    } finally {
      setLoadingDelete(false)
    }
  };

  return (<>
  {/* Tabla de usuarios */}
  <div className='text-center' >
    <h1 className='display-6'>Tabla de usuarios</h1>
    <Search setPage={setPage} setSearching={setSearching} setError={setError}/>
  </div>
  {loading ? 
    <div className="spinner-border text-primary" role="status">
      <span className="visually-hidden">Loading...</span>
    </div> : 
      <> 
        {error ? (
                  <h1 className='py-5 my-5 text-center'>No hay resultados.</h1>
                ) : <>
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
                      <button onClick={() => selectUser(user)} className='btn btn-danger mx-1' data-bs-toggle="modal" data-bs-target="#deleteModal"> <i className="bi bi-trash3"></i> </button> 
                      <button  onClick={() => selectUser(user)} className='btn btn-secondary mx-1' data-bs-toggle="modal" data-bs-target="#editModal" ><i className="bi bi-pencil-square"></i></button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
            <Pagination totalPages={totalPages} setPage={setPage}/>
        </div>
        </>
      }
    </>
  }
 

{/* modal de edicion */}
  <div className="modal fade" id="editModal" aria-labelledby="editModalLabel" aria-hidden="true" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" >
    <div className="modal-dialog ">
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
                      if (value.trim() === "") return true; 
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
                    if (value.trim() === "") return true; 
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
                      if (value.trim() === "") return true; 
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
            <div className='d-flex justify-content-center'>
           {loadingEdit ? 
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
              :
              <button type="submit" className="btn btn-success mx-5">Guardar</button>
            }
              <button type="button" className="btn btn-danger mx-5" data-bs-dismiss="modal" id="btnCerrar" onClick={()=>{
              }}>Cerrar</button>
            </div>
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
            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" id="cancelDelete">Cancelar</button>
            {loadingDelete ? 
             <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
             </div>
             :
            <button type="button" onClick={deleteUser} className="btn btn-danger">Eliminar</button>
            }
          </div>
        </div>
      </div>
    </div>
  </>
  )
}

export default UserTable