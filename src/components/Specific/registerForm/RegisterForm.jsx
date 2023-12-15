import { useState } from 'react'
import {Cform, input, buttonCustom} from '../../Specific/registerForm/registerForm.module.css'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from "react-hook-form"
import axios from 'axios'


const RegisterForm = () => {
  const navigate = useNavigate()

  const [checkEmail, setCheckEmail] = useState(null)
  const [loading, setLoading] = useState(false)

  const {register, handleSubmit, formState:{ errors }, watch} = useForm(); 

  const onSubmit = handleSubmit(async (data) => {
    try {
      setLoading(true)
      await axios.post("https://slicenhaven-backend.onrender.com/users/register", data);
      navigate("/login")
    } catch (error) {
      setCheckEmail(error.response.data);
    } finally {
      setLoading(false)
    }
  });
  
  return (
      <form noValidate onSubmit={onSubmit} className={`col-12 col-md-4 col-lg-4 col-xl-4 mt-5 ${Cform}`}>
        <div className='text-center mb-4 text-black'>
          <h2 className='display-6'>Registrarse</h2>
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

            <div className="mb-3">
            {checkEmail && (
                <p className='text-light bg-danger p-1'>{checkEmail}</p>
              )}
              <input type="email" className={`w-100 ${input} p-2 mb-3`} placeholder='Email'
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
              <input type="password" className={`w-100 ${input} p-2 mb-3`} placeholder='Contraseña'
                {...register("password", {
                required: {
                  value: true,
                  message: "Ingrese una contraseña"
                },
                pattern: {
                  value: /^(?=.*[A-Z])(?=.*\d).{6,}$/,
                  message: "La contraseña debe contener al menos 6 caracteres, una mayuscula y un numero"
                },
                maxLength:{
                  value: 40,
                  message: "La contraseña no debe contener mas de 40 caracteres"
                },
              })}
              />
              {
                errors.password && <p className='text-danger'>{errors.password.message}</p>
              }
            </div>

            <div className="mb-3">
              <input type="password" className={`w-100 ${input} p-2 mb-3`} placeholder='Repetir contraseña'
                  {...register("repeatPassword", {
                    required: {
                    value: true,
                    message: "Repita su contraseña"
                  },
                  validate: (value) => {
                    if (value === watch("password")) {
                      return true 
                    } else {
                      return "Las contraseñas no coinciden"
                    }
                  }
                
                })}
              />
                  {
                errors.repeatPassword && <p className='text-danger'>{errors.repeatPassword.message}</p>
              }
            </div>

            <div className="mb-3 form-check">
              <input type="checkbox" className="form-check-input border border-black"
                {...register("checkbox", {
                required: {
                  value: true,
                  message: "Debe aceptar los terminos y condiciones"
                }    
                })}
              />
              <label className="form-check-label" htmlFor="checkbox">Acepto los terminos y condiciones</label>
              {
                errors.checkbox && <p className='text-danger'>{errors.checkbox.message}</p>
              }
            </div>
            <div className='d-flex  justify-content-end pt-3'>
            {loading ? 
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
              :
                <button type="submit" className={`mb-3 ${buttonCustom}`}>Enviar</button>
              }
              </div>

            <div className='text-center pt-2'>
              <Link to="/login">Ya tenes cuenta? inicia sesion</Link>
            </div>
        </div>
      </form> 
  )
}

export default RegisterForm