import { useState } from 'react'
import {Cform, input, buttonCustom} from './LoginForm.module.css'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from "react-hook-form"
import axios from 'axios'

// eslint-disable-next-line react/prop-types
const LoginForm = ({setUser}) => {

  const [loading, setLoading] = useState(false);

  const [loginError, setLoginError] = useState(null);

  const navigate = useNavigate();

  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = handleSubmit(async (data) => {
    try {
      setLoading(true);
      const response = await axios.post("https://slicenhaven-backend.onrender.com/users/login", data);
      delete(response.data.loguedUser.userFounded.password)
      localStorage.setItem("user", JSON.stringify(response.data));
      setUser(response.data)
      navigate("/")
    } catch (error) {
      if(typeof error.response.data === "string") {
        setLoginError(error.response.data);
      }
      if(typeof error.response.data === "object") {
        setLoginError(error.response.data.error[0]);
      }
    }
    finally{
      setLoading(false);
    }
  });
  return (
    <form noValidate onSubmit={onSubmit} className={`col-12 col-md-4 col-lg-4 col-xl-4 mt-5 ${Cform}`}>
      <div className='text-center mb-4 text-black'>
        <h2 className='display-6'>Iniciar Sesión</h2>
      </div>
      <div className='p-2'>
        <div className="mb-3">
          {loginError && (
            <p className='text-light bg-danger p-1'>{loginError}</p>
          )}
          <input type="text" className={`w-100 ${input}  p-2 mb-3`} placeholder='Email'
            {...register("email", {
              required: {
                value: true,
                message: "Ingrese un email"
              },
            })}
          />
          {
            errors.email && <p className='text-danger'>{errors.email.message}</p>
          }
        </div>

        <div className="mb-3">
          <input type="password" className={`w-100 ${input}  p-2 mb-3`} placeholder='Contraseña'
            {...register("password", {
              required: {
                value: true,
                message: "Ingrese una contraseña"
              }
            })}
          />
          {
            errors.password && <p className='text-danger'>{errors.password.message}</p>
          }
        </div>
    <div className='d-flex justify-content-end pt-3'>
        {loading ? <div className="spinner-border" role="status">
    <span className="visually-hidden">Loading...</span>
    </div> :  
          <button type="submit" className={`btn mb-3 ${buttonCustom}`}>Iniciar Sesión</button>
        }
        </div>
        <div className='text-center pt-2'>
          <Link to="/register">¿No tienes una cuenta? Regístrate</Link>
        </div>
      </div>
    </form>
  )
}

export default LoginForm