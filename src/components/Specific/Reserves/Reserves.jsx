import { useState, useEffect } from 'react'
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { addMonths, setHours, setMinutes } from 'date-fns'; // Importa la función addMonths
import es from 'date-fns/locale/es';
import axios from 'axios';
import Alert from "../Alert/Alert"
registerLocale('es', es);

const Reserves = () => {
  // Función para borrar las alertas
  const borrarAlerta = () =>{
    setTimeout(() => {
      setAlerta()
    }, 3000);
  }
  // Estado para una alerta
  const [alerta, setAlerta] = useState()

  // Estado que cambiará la fecha selecionada, por defecto es la fecha de hoy
  const [startDate, setStartDate] = useState(new Date());
  
  // Estado que almacenará los dias ocupados, por defecto la fecha de hoy
  const [diasOcupados, setDiasOcupados] = useState();

 // Almacenamos en el estado crear reserva el id del usuario si es que se logeo 
  const [crearReserva, setCrearReserva] = useState({
    user: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')).loguedUser.userFounded._id : '', // Obtén el ID de usuario desde localStorage
  });

  // Obtenemos el día, mes y año de la fecha actual
  let D = startDate.getDate();
  let M = startDate.getMonth();
  let Y = startDate.getFullYear();

  // Estado para excluir las fechas, por defecto es un array
  const [excluirReservas, setExcluirReservas] = useState([]);

  

  useEffect(() => {
    // Agrego los datos actuales por cada cambio que haya en la fecha selecionada
    setCrearReserva({
      // Obtengo el valor anterior a este estado (el id del usuario) y actualizo con los cambios
      ...crearReserva,
      date: startDate,
      day: startDate.getDate(),
      month: startDate.getMonth(),
      year: startDate.getFullYear(),
      people: 1,
    })

    // Petición para obtener las reservas ocupadas del día seleccionado 
    const obtenerReservas = async () => {
      try {
        // Paso día, mes y año como parámetro
        const result = await axios.get(`https://slicenhaven-backend.onrender.com/reserves/reserveDate/${D}-${M}-${Y}`)
        // Almacena el resultado en el estado excluir reservas
        setExcluirReservas(result.data.result)
      } catch (error) {
        console.log(error)
      }
    }
    // Ejecuto la funcion
    obtenerReservas();
  }, [startDate])
    
  // Esta funcion sirve para guardar la reserva
  const guardar = async () => {
    // Consulta si de crearReserva existe usuario, si no existe pide logear caso contrario hace la peticion
    if(crearReserva.user){
      try {
        // Boolean para saber si esta ocuapada la reserva
        let reservaOcupada = false;
        // Pregunto si la longitud es mayor a 0
        if(excluirReservas.length > 0){
          // Recorro el array y comparo las horas
          excluirReservas.forEach(element => {
            const fecha = new Date(element)
            if(fecha.getHours() == startDate.getHours() ){
              // Cambio de estado a verdadero
              reservaOcupada = true
            }
          });
        }

        // Pregunto, si reserva ocupada es verdadero
        if(reservaOcupada){
          // Muestro una alerta
          setAlerta(
            <Alert
              texto={'Reserva ya ocupada'}
              color={'warning'}
              icon={'bi bi-exclamation-triangle-fill'}
            />)
          borrarAlerta();
        }else{
          // Caso contrario, realizo la petición
          await axios.post('http://localhost:8000/reserves/reservesCreate', crearReserva);
          setAlerta(
            <Alert
              texto={'Recerva tomada correctamente'}
              color={'success'}
              icon={'bi bi-check-circle-fill'}
            />)
          borrarAlerta();
        }
      } catch (error) {
        console.log(error);
      }
    }else{
      // Introducimos una alerta avisando que tienen que iniciar sesión
      setAlerta(<Alert
        texto={'Debes iniciar sesion para tomar una reserva'}
        color={'danger'}
        icon={'bi bi-exclamation-triangle-fill'}
      />)
      borrarAlerta();
    }
  };

  return (
    <>
      <div className=" d-flex justify-content-md-center mb-3  ">
        <div>
          <DatePicker
          // Cambiar idioma a español
          locale="es"
          //meses a mostrar
          // monthsShown={2}
          // modo calendario
          inline
          //excluimos fechas
          // excludeDates={[new Date(2023,10,10)]}
          //dia de hoy
          todayButton="Día de hoy"

          selected={startDate} // fecha inicial
          onChange={(date) => setStartDate(date)} //funcion para cambiar fecha

          minDate={new Date()} //Fecha minima(fecha de hoy)
          maxDate={addMonths(new Date(), 2)} //Meses maximos

          //mostrar hora
          showTimeSelect
          //texto a mostrar
          timeCaption="Horas"

          timeFormat="HH:mm"

          //Incluidas horas
          includeTimes={[
            setHours(setMinutes(new Date(), 0), 11),
            setHours(setMinutes(new Date(), 0), 12),
            setHours(setMinutes(new Date(), 0), 13),
            setHours(setMinutes(new Date(), 0), 14),
            setHours(setMinutes(new Date(), 0), 19),
            setHours(setMinutes(new Date(), 0), 20),
            setHours(setMinutes(new Date(), 0), 21),
            setHours(setMinutes(new Date(), 0), 22),
            setHours(setMinutes(new Date(), 0), 23),
            setHours(setMinutes(new Date(), 0), 0),
          ]}

          //Excluir horas | hacemos un map al array de las reservas ya hechas y le ejecutamos la funcion new Date
          excludeTimes={excluirReservas.map(reservas => new Date(reservas))}

          // timeFormat="p" //formato del la hora en pm y aM
          timeIntervals={60}


        />
          <button onClick={guardar} className='btn btn-outline-success w-100 mt-3'>Hacer Reserva</button>
          <div>{alerta}</div>
        </div>
      </div>
    </>
  )
}

export default Reserves