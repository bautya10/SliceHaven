import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useForm } from "react-hook-form"
import axios from 'axios'
import { useNavigate } from 'react-router-dom';


const LoginForm = () => {

  const [loginError, setLoginError] = useState(false);

  const navigate = useNavigate();

  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = handleSubmit((data) => {
    axios.post("http://localhost:8000/users/login", data)
      .then((response) => {
        console.log("Inicio de sesión exitoso:", response.data);
        navigate('/');
        })

      .catch((error) => {
        console.log("Error al iniciar sesión:", error.response.data);
        if (error.response.data === "credenciales incorrectas") {
          setLoginError(true);
        }
      })
  })

  return (
    <form noValidate onSubmit={onSubmit} className={`col-12 col-md-4 col-lg-4 col-xl-4`}>
      <div className='text-center mb-4 text-black'>
        <h2 className='display-6'>Iniciar Sesión</h2>
      </div>
      <div className='p-2'>
        <div className="mb-3">
          {loginError && (
            <p className='text-light bg-danger p-1'>Credenciales incorrectas. Por favor, inténtalo de nuevo.</p>
          )}
          <input type="text" className={`w-100 p-2 mb-3`} placeholder='Email'
            {...register("email", {
              required: {
                value: true,
                message: "Ingrese su email"
              },
            })}
          />
          {
            errors.userName && <p className='text-danger'>{errors.userName.message}</p>
          }
        </div>

        <div className="mb-3">
          <input type="password" className={`w-100 p-2 mb-3`} placeholder='Contraseña'
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
          <button type="submit" className={`mb-3`}>Iniciar Sesión</button>
        </div>

        <div className='text-center pt-2'>
          <Link to="/registrar">¿No tienes una cuenta? Regístrate</Link>
        </div>
      </div>
    </form>
  )
}

export default LoginForm
