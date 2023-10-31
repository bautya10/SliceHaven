import React from 'react'
import {Cform, input, buttonCustom} from '../../Specific/registerForm/registerForm.module.css'
import { Link } from 'react-router-dom'


const RegisterForm = () => {
  return (
      <form className={`col-12 col-md-4 col-lg-4 col-xl-4  ${Cform}`}>
        <div className='text-center mb-4 text-black'>
          <h2 className='display-6'>Registrarse</h2>
        </div>
        <div className='p-2'>
            <div className="mb-3">   
              <input type="text" className={`w-100 ${input} p-2 mb-3`}  id="username" placeholder='Usuario'/>
            </div>
            <div className="mb-3">
              <input type="email" className={`w-100 ${input} p-2 mb-3`}  id="email" placeholder='Email'/>
            </div>
            <div className="mb-3">
              <input type="password" className={`w-100 ${input} p-2 mb-3`}  id="password" placeholder='Contraseña'/>
            </div>
            <div className="mb-3">
              <input type="password" className={`w-100 ${input} p-2 mb-3`}  id="passwordConfirm" placeholder='Repetir contraseña'/>
            </div>
            <div className="mb-3 form-check">
              <input type="checkbox" className="form-check-input border border-black" id="checkbox"/>
              <label className="form-check-label" for="checkbox">Acepto los terminos y condiciones</label>
            </div>
          <div className='d-flex  justify-content-end pt-3'>
            <button type="submit" className={`mb-3 ${buttonCustom}`}>Enviar</button>
          </div>
          <div className='text-center pt-2'>
            <Link to="/">Ya tenes cuenta? inicia sesion</Link>
          </div>
        </div>
      </form> 
  )
}

export default RegisterForm