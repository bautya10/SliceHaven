import { useState, useEffect } from 'react'
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { addMonths, setHours, setMinutes } from 'date-fns'; // Importa la función addMonths
import es from 'date-fns/locale/es';
import axios from 'axios';
import Alert from "../Alert/Alert"
registerLocale('es', es);

const Reserves = ({ editar, idUser, idReserva }) => {
  // funcion para borrar las alertas
  const borrarAlerta = () => {
    setTimeout(() => {
      setAlerta()
    }, 3000);
  }
  // Estado para una alerta
  const [alerta, setAlerta] = useState()

  const [deshabilitado, setDeshabilitado] = useState(true)

  //estado para la cantidad de personas
  const [personas, setPersonas] = useState('0')

  // Estado que cambiará la fecha selecionada, por defecto es la fecha de hoy
  const [startDate, setStartDate] = useState(new Date());

  //estado que almacenara los dias ocupados, por defecto la fecha de hoy
  const [diasOcupados, setDiasOcupados] = useState([]);

  // almacenamos en el estado crear reserva el id del usuario si es que se logeo 
  const [crearReserva, setCrearReserva] = useState({
    user: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')).loguedUser.userFounded._id : '', // Obtén el ID de usuario desde localStorage
  });

  const timesToCompare = [
    { hour: 11, minute: 0, second: 0 },
    { hour: 12, minute: 0, second: 0 },
    { hour: 13, minute: 0, second: 0 },
    { hour: 14, minute: 0, second: 0 },
    { hour: 19, minute: 0, second: 0 },
    { hour: 20, minute: 0, second: 0 },
    { hour: 21, minute: 0, second: 0 },
    { hour: 22, minute: 0, second: 0 },
    { hour: 23, minute: 0, second: 0 },
    { hour: 0, minute: 0, second: 0 }
  ];

  // Obtenemos el día, mes y año de la fecha actual
  let D = startDate.getDate();
  let M = startDate.getMonth();
  let Y = startDate.getFullYear();

  const [actualizar, setActualizar] = useState(false)

  //estado para excluir las fechas, por defecto es un array
  const [excluirReservas, setExcluirReservas] = useState([]);

  const cantidadPersonas = (event) => {
    // Obtener el valor seleccionado del evento
    const valorSeleccionado = event.target.value;

    // Actualizar el estado con el nuevo valor seleccionado
    setPersonas(valorSeleccionado);
  };

  useEffect(() => {
    const obtenerTodasLasReservas = async () => {
      try {
        const result = await axios.get(`https://slicenhaven-backend.onrender.com/reserves/reservesAll`)
        diasDisponibles(result.data);
      } catch (error){
        //Error
      }
    }
    //ejecuto la funcion
    obtenerTodasLasReservas();
  }, [actualizar])

  useEffect(() => {
    // Agrego los datos actuales por cada cambio que haya en la fecha selecionada
    setCrearReserva({
      ...crearReserva,
      date: startDate,
      day: startDate.getDate(),
      month: startDate.getMonth(),
      year: startDate.getFullYear(),
      people: personas,
    })

    //peticion para obtener las reservas ocuapdas del dia seleccionado 
    const obtenerReservasExcluidas = async () => {
      try {
        const result = await axios.get(`https://slicenhaven-backend.onrender.com/reserves/reserveDate/${D}-${M}-${Y}`)
        setExcluirReservas(result.data.result)
      } catch (error){
        //Editarrror
      }
    }
    obtenerReservasExcluidas();
    setActualizar(false)
  }, [startDate, actualizar, personas])


  const diasDisponibles = (diasOcupados) => {
    const reservasPorDia = {};

    diasOcupados.forEach((reserva) => {
      const fecha = `${reserva.year}-${reserva.month}-${reserva.day}`;
      if (!reservasPorDia[fecha]) {
        reservasPorDia[fecha] = [];
      }
      reservasPorDia[fecha].push(reserva);
    });
    const fechasOcupadas = Object.keys(reservasPorDia).filter(
      (fecha) => reservasPorDia[fecha].length >= 10
    );
    setDiasOcupados(fechasOcupadas)
  }

  useEffect(() => {
    function isMatchingTime(date, targetHour, targetMinute, targetSecond) {
      return (
        date.getHours() === targetHour &&
        date.getMinutes() === targetMinute &&
        date.getSeconds() === targetSecond
      );
    }

    if (timesToCompare.some(time => isMatchingTime(startDate, time.hour, time.minute, time.second) && personas != '0')) {
      setDeshabilitado(false)
    } else {
      setDeshabilitado(true)
    }

  }, [personas, startDate])


  // esta funcion siver para guardar la reserva
  const guardar = async () => {
    //consulta si de crearReserva existe usuario, si no existe pide logear y si sí hace la peticion
    if (crearReserva.user) {
      try {

        function isMatchingTime(date, targetHour, targetMinute, targetSecond) {
          return (
            date.getHours() === targetHour &&
            date.getMinutes() === targetMinute &&
            date.getSeconds() === targetSecond
          );
        }


        let reservaOcupada = false;

        if (excluirReservas.length > 0) {
          // Recorre el array y compara las fechas y horas completas
          excluirReservas.forEach(element => {
            const fecha = new Date(element);

            // Verifica si la fecha y hora de startDate coincide con la reserva existente
            if (
              fecha.getHours() === startDate.getHours() &&
              fecha.getMinutes() === startDate.getMinutes() &&
              fecha.getSeconds() === startDate.getSeconds()
            ) {
              reservaOcupada = true;
            }
          });
        }

        // Verifica si hay una reserva ocupada
        if (reservaOcupada) {
          setAlerta(
            <Alert
              texto={'Reserva ya ocupada'}
              color={'warning'}
              icon={'bi bi-exclamation-triangle-fill'}
            />
          );
          borrarAlerta();
        } else if (
          !timesToCompare.some(time => isMatchingTime(startDate, time.hour, time.minute, time.second))
        ) {
          // Verifica si la hora, minutos y segundos de startDate no coinciden con ninguna de las horas, minutos y segundos específicos
          setAlerta(
            <Alert
              texto={'Seleccione una hora'}
              color={'warning'}
              icon={'bi bi-exclamation-triangle-fill'}
            />
          );
          borrarAlerta();
        } else if (crearReserva.people === '0') {
          setAlerta(
            <Alert
              texto={'Seleccionar cantidad de personas'}
              color={'warning'}
              icon={'bi bi-exclamation-triangle-fill'}
            />
          );
          borrarAlerta();
        } else if (editar) {
          crearReserva.user = idUser;
          await axios.patch(`https://slicenhaven-backend.onrender.com/reserves/${idReserva}`, crearReserva);
          setAlerta(
            <Alert
              texto={'Reserva actualizada correctamente'}
              color={'success'}
              icon={'bi bi-check-circle-fill'}
            />
          );
          borrarAlerta();
        } else {
          // Caso contrario, realiza la petición
          await axios.post('https://slicenhaven-backend.onrender.com/reserves/reservesCreate', crearReserva);
          setAlerta(
            <Alert
              texto={'Reserva tomada correctamente'}
              color={'success'}
              icon={'bi bi-check-circle-fill'}
            />
          );
          borrarAlerta();
        }
      } catch (error) {
        //Error
      }
    } else {
      //introducimos una alerta avisando que tienen que iniciar sesion
      setAlerta(<Alert

        texto={'Debes iniciar sesion para tomar una reserva'}
        color={'danger'}
        icon={'bi bi-exclamation-triangle-fill'}
      />)
      borrarAlerta();
    }
    setActualizar(true)
  };

  const filterPassedTime = (time) => {
    const currentDate = new Date();
    const selectedDate = new Date(time);

    return currentDate.getTime() < selectedDate.getTime();
  };



  return (
    <>
      <div className="input-group mb-3">
        <label className="input-group-text" htmlFor="personas"><i className="bi bi-person-fill"></i></label>
        <select className="form-select" id="personas" onChange={cantidadPersonas} value={personas}>
          <option value={0}>Cantidad de Personas</option>
          <option value={1}>1</option>
          <option value={2}>2</option>
          <option value={4}>4</option>
          <option value={6}>6</option>
          <option value={8}>8</option>
        </select>
      </div>
      <DatePicker
        //poner en español
        locale="es"
        //meses a mostrar
        // monthsShown={2}
        // modo calendario
        inline
        //excluimos fechas
        // excludeDates={[new Date(2023,10,10)]}

        selected={startDate} // fecha inicial
        onChange={(date) => setStartDate(date)} //funcion para cambiar fecha

        minDate={new Date()} //Fecha minima(fecha de hoy)
        maxDate={addMonths(new Date(), 2)} //Meses maximos

        //mostrar hora
        showTimeSelect
        Time
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
        excludeDates={
          diasOcupados.map(fecha => {
            // Convierte cada fecha al formato deseado
            const fechaSinGuiones = fecha.split('-');
            let year = parseInt(fechaSinGuiones[0])
            let month = parseInt(fechaSinGuiones[1])
            let day = parseInt(fechaSinGuiones[2])
            return new Date(year, month, day)
          })
        }
        // timeFormat="p" //formato del la hora en pm y aM
        timeIntervals={60}

        filterTime={filterPassedTime}

      />
      <button onClick={guardar} className='btn btn-outline-success w-100 mt-3 ' disabled={deshabilitado ? true : false} id='botonGuardar'>{editar ? 'Editar Reseva' : 'Hacer Reserva'}</button>
      <div>{alerta}</div>
    </>
  )
}

export default Reserves