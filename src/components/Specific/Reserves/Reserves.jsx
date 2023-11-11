import React, { useState, useEffect } from 'react'
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { addMonths, setHours, setMinutes } from 'date-fns'; // Importa la función addMonths
import es from 'date-fns/locale/es';
import axios from 'axios';
import Alert from "../Alert/Alert"
registerLocale('es', es);

const Reserves = () => {


  // funcion para borrar las alertas
  const borrarAlerta = () => {
    setTimeout(() => {
      setAlerta()
    }, 3000);
  }
  //estado para una alerta
  const [alerta, setAlerta] = useState()

  //estado que cambiara la fecha selecionada, por defecto es la fecha de hoy
  const [startDate, setStartDate] = useState(new Date());

  //estado que almacenara los dias ocupados, por defecto la fecha de hoy
  const [diasOcupados, setDiasOcupados] = useState([]);

  // almacenamos en el estado crear reserva el id del usuario si es que se logeo 
  const [crearReserva, setCrearReserva] = useState({
    user: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')).loguedUser.userFounded._id : '', // Obtén el ID de usuario desde localStorage
  });

  //obtenemos el dia, mes y año de la fecha actual
  let D = startDate.getDate();
  let M = startDate.getMonth();
  let Y = startDate.getFullYear();

  const [actualizar, setActualizar] = useState(false)
  //estado para excluir las fechas, por defecto es un array
  const [excluirReservas, setExcluirReservas] = useState([]);

  useEffect(() => {
    const obtenerTodasLasReservas = async () => {
      try {
        const result = await axios.get(`https://slicenhaven-backend.onrender.com/reserves/reservesAll`)
        diasDisponibles(result.data);
      } catch (error) {
        console.log(error)
      }
    }
    //ejecuto la funcion
    obtenerTodasLasReservas();
  }, [actualizar])

  useEffect(() => {
    //agrego los datos actuales por cada cambio que haya en la fecha selecionada
    setCrearReserva({
      //obtengo el valor anterior a este estado (el id del usuario) y actualizo con los cambios
      ...crearReserva,
      date: startDate,
      day: startDate.getDate(),
      month: startDate.getMonth(),
      year: startDate.getFullYear(),
      people: 1,
    })

    //peticion para obtener las reservas ocuapdas del dia seleccionado 
    const obtenerReservasExcluidas = async () => {
      try {
        // paso dia,mes y año como parametro
        const result = await axios.get(`https://slicenhaven-backend.onrender.com/reserves/reserveDate/${D}-${M}-${Y}`)
        // almaceno el resultado en el estado excluir reservas
        setExcluirReservas(result.data.result)
      } catch (error) {
        console.log(error)
      }
    }
    //ejecuto la funcion
    obtenerReservasExcluidas();
    setActualizar(false)
    // console.log(actualizar)
  }, [startDate, actualizar])


  const diasDisponibles = (diasOcupados) => {
    const reservasPorDia = {};

    diasOcupados.forEach((reserva) => {
      const fecha = `${reserva.year}-${reserva.month}-${reserva.day}`;
      // console.log(fecha)
      if (!reservasPorDia[fecha]) {
        reservasPorDia[fecha] = [];
      }
      reservasPorDia[fecha].push(reserva);
      // console.log(reservasPorDia)
    });
    const fechasOcupadas = Object.keys(reservasPorDia).filter(
      (fecha) => reservasPorDia[fecha].length >= 10
    );

    // console.log(fechasOcupadas.map(element => element.split('-')))
    setDiasOcupados(fechasOcupadas)
  }



  // esta funcion siver para guardar la reserva
  const guardar = async () => {
    //consulta si de crearReserva existe usuario, si no existe pide logear y si sí hace la peticion
    if (crearReserva.user) {
      try {
        //un boolean para saber si esta ocuapada la reserva
        let reservaOcupada = false;
        //preguinto si la longitud es mayor a 0
        if (excluirReservas.length > 0) {
          //recorro el array y comparo las horas
          excluirReservas.forEach(element => {
            const fecha = new Date(element)
            if (fecha.getHours() == startDate.getHours()) {
              // cambio de estado a verdedo
              reservaOcupada = true
            }
          });
        }

        // prefunto, si reserva ocuada es verdador
        if (reservaOcupada) {
          //muestro una alerta
          setAlerta(
            <Alert
              texto={'Reserva ya ocupada'}
              color={'warning'}
              icon={'bi bi-exclamation-triangle-fill'}
            />)
          borrarAlerta();
        } else {
          //caso contrario, realizo la peticion
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

  return (
    <>

      <div className=" d-flex justify-content-md-center mb-3  ">
        <div>
          <DatePicker
            //poner en español
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


          />
          <button onClick={guardar} className='btn btn-outline-success w-100 mt-3'>Hacer Reserva</button>
          <div>{alerta}</div>
        </div>
      </div>
    </>
  )
}

export default Reserves