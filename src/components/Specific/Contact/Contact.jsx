import React from 'react'
import {heightcontact} from './Contact.module.css'

const Contact = () => {
  return (
    <div className={`${heightcontact} container-fluid mt-4 p-3`}>
      <div className='row justify-content-center'>
        <form className='col-12 col-md-6 col-lg-4'>
          <div className='mb-3'>
            <h3>Contactanos</h3>
          </div>
          <div className='mb-3'>
            <label>Name</label>
            <input type="text" className='form-control'/>
          </div>
          <div className='mb-3'>
            <label>Email</label>
            <input type="email" className='form-control'/>
          </div>
          <div className='mb-3'>
            <label>Celular</label>
            <input type="number" className='form-control'/>
          </div>
          <div className="mb-3">
              <label for="Textarea" className="form-label">Comentario</label>
              <textarea className="form-control" rows="3"></textarea>
            </div>
        </form>
      </div>
    </div>
  )
}

export default Contact