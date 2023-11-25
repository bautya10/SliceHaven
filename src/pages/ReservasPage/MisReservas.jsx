/* eslint-disable react/prop-types */
import ReservasUsuario from "../../components/Specific/reservasUsuario/reservasUsuario"

const MisReservas = ({user}) => {
  return (
    <div className="container">
      <div className=" d-flex justify-content-md-center my-3  " id="reservas">
        <div>
          <ReservasUsuario user={user}/>
        </div>
      </div>
    </div>
  )
}

export default MisReservas
