import styles from '../Contact/formContact.module.css' ;
import {Cform, input, buttonCustom} from '../../Specific/registerForm/registerForm.module.css';
import {useForm} from 'react-hook-form'

const Contact = () => {
  
  const { register, handleSubmit, formState:{errors}, setValue
} = useForm();

  const onSubmit = handleSubmit((data) => {
    console.log(data)

    alert('Su comentario fue enviado')

    setValue('email', '')
    setValue('celular', '')
    setValue('nombre', '')
    setValue('comentario', '')
  });

  return (
    <div className={`${styles.HeightContact} p-2 my-3 d-flex justify-content-center`}>

    <form onSubmit={onSubmit} className={`${Cform} col-12 col-md-4 col-lg-4 col-xl-4 row`}>

      {/* Titulo */}
      <div className=' mb-4 text-black'>
        <h2 className='display-6'>Contactanos</h2>
      </div>

      {/* nombre */}
      <div>
      <label htmlFor="Nombre">Nombre</label>
      <input className={`w-100 ${input} p-2 mb-3`} type="text"
      {...register("nombre", {
        required: {
          value: true,
          message: "Ingrese su nombre"
        },
        minLength: {
          value: 2,
          message: "El nombre debe contener al menos 2 caracteres"
        },
        maxLength: {
          value:40,
          message: "El nombre debe contener no mas de 40 caracteres"
        }})}
      />
      {
        errors.nombre && <p className='text-danger'>{errors.nombre.message}</p>
      }
      </div>

      {/* email */}
      <div>
      <label htmlFor="Email">Email</label>
      <input className={`w-100 ${input} p-2 mb-3`} type="email"
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

      {/* Text Area */}
      <div>
      <label for="Textarea" className="form-label">Comentario</label>
      <textarea className="form-control" rows="3" maxLength="160" minLength="4"
      {...register("comentario",{
        required: true
      })}></textarea>
      {
         errors.comentario && <p className='text-danger'>Ingrese un comentario</p>
      }
      </div>

      {/* Button */}
      <div className='d-flex pt-3'>
            <button type="submit" className={`mb-3 ${buttonCustom}`}>Enviar</button>
          </div>

    </form>
    </div>
  )
}

export default Contact;
