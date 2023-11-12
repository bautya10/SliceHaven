import Reserves from "../../components/Specific/Reserves/Reserves"
const Reservas = ({user}) => {
  return (
    <div>
      <div className=" d-flex justify-content-md-center my-3  " id="reservas">
        <div>
          <Reserves user={user}/>
        </div>
      </div>
    </div>
  )
}

export default Reservas