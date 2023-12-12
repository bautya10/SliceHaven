import { useEffect, useState } from 'react'
import axios from 'axios';
import Alert from '../Alert/Alert';
import Reserves from '../Reserves/Reserves';

const ReserveTable = () => {
  // funcion para borrar las alertas
  const borrarAlerta = () => {
    setTimeout(() => {
      setAlerta()
    }, 3000);
  }
  const [actualizar, setActualizar] = useState(0);
  const [reservas, setReservas] = useState([]);
  const [alerta, setAlerta] = useState([]);
  const [editarReserva, setEditarReserva] = useState(false);
  const [idUser, setIdUser] = useState(false);
  const [idReserva, setIdReserva] = useState();


  useEffect(() => {
    const obtenerTodasLasReservas = async () => {
      try {
        const result = await axios.get(`https://slicenhaven-backend.onrender.com/reserves/reservesAll`)
        setReservas(result.data.sort((a, b) => {
          return a.month - b.month || a.day - b.day
        }))
      } catch (error) {
        //Error
      }
    }
    //ejecuto la funcion
    obtenerTodasLasReservas();
  }, [actualizar])

  const eliminar = async (id) => {
    if (!id) {
      setAlerta(
        <Alert
          texto={'error al eliminar la reserva'}
          color={'danger'}
          icon={'bi bi-exclamation-triangle-fill'}
        />)
      borrarAlerta();
    } else {
      try {
        const resut = await axios.delete(`https://slicenhaven-backend.onrender.com/reserves/${id}`)
        setActualizar(actualizar + 1)
        setAlerta(
          <Alert
            texto={'Recerva eliminada correctamente'}
            color={'success'}
            icon={'bi bi-check-circle-fill'}
          />)
        borrarAlerta();
      } catch (error){
        //Error
      }
    }

  }

  const editar = async (idUser,idReserva) => {
    setEditarReserva(true);
    setIdUser(idUser);
    setIdReserva(idReserva);
  }

  return (
    <>
      <h1 className='text-center'>Reservas</h1>
      {alerta}

      <div className="row">
        
        {reservas?.map(element => (
          <div className="col-12 col-md-3 mb-3" key={element._id}>
            <div className="card">
              <div className="card-body text-center">
                <h5 className="card-title">Usuario: {element.user?.userName} </h5>
                <h5 className="card-title">Fecha: {`${new Date(element.date).getDate()}-${new Date(element.date).getMonth()}-${new Date(element.date).getFullYear()} a ${new Date(element.date).getHours()}:${new Date(element.date).getMinutes()}${new Date(element.date).getMinutes()} hs.`}</h5>
                <h5 className="card-text">Personas: {element.people}</h5>
                <div className="d-flex justify-content-around mt-3">
                  <button className="btn btn-danger" onClick={() => eliminar(element._id)}><i className="bi bi-trash3"></i></button>
                  <button className="btn btn-secondary" onClick={() => editar(element.user._id,element._id)} data-bs-toggle="modal" data-bs-target="#staticModalReserva"><i className="bi bi-pencil-square"></i></button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* modal para editar reservas */}
      <div className="modal fade" id="staticModalReserva" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticModalReservaLabel" aria-hidden="true">
        <div className="modal-dialog ">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="staticModalReservaLabel">Editar Reserva</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <Reserves editar={editarReserva} idUser={idUser} idReserva={idReserva}/>
            </div>
            <div className="modal-footer">
              <button type="button" onClick={()=> setActualizar(actualizar + 1)} className="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
            </div>
          </div>
        </div>
      </div>

    </>
  )
}

export default ReserveTable