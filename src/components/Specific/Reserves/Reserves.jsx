import React, { useState, useEffect } from 'react'
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { addMonths, setHours, setMinutes } from 'date-fns'; // Importa la función addMonths
import es from 'date-fns/locale/es';
import axios from 'axios';
registerLocale('es', es);

const Reserves = () => {
  // const a = [setHours(setMinutes(new Date(), 0), 11),setHours(setMinutes(new Date(), 0), 11),]
  const a = [new Date(2023,11,3,18,0,0), new Date(2023,11,3,19,0,0),new Date(2023,11,3,20,0,0)]
  // const b = ['Sun Dec 03 2023 18:00:00 GMT-0300 (hora estándar de Argentina)','Sun Dec 03 2023 19:00:00 GMT-0300 (hora estándar de Argentina)','Sun Dec 03 2023 20:00:00 GMT-0300 (hora estándar de Argentina)'];
 

  const [obtenerReservas, setObtenerReservas] = useState([])

  const [startDate, setStartDate] = useState(new Date());

  //las fechas que se excluyen se guardan en este formato dentro de un array
  const [excluirReservas, setExcluirReservas] = useState();

  // let handleColor = (time) => {
  //   return time.getHours() > 12 ? "text-success fw-bold" : "text-danger fw-bold";
  // };

  useEffect(() => {
    axios.get('https://slicenhaven-backend.onrender.com/reserves/654333303151c50d0efab6fa')
      .then((peticion) => {
        const data = peticion.data.result
        data.map(resultado => setObtenerReservas(prevState => [prevState, new Date(resultado)]))
        // setObtenerReservas(data)
      })
      .catch((error) => console.log(error))
    // .finally(() => console.log('---'));

    // console.log(startDate.getDate(), startDate.getMonth(), startDate)


  }, [startDate])
  
  console.log(obtenerReservas)
  console.log(a)
  console.log('---')
  // obtenerReservas.forEach(reservas => console.log(reservas) )
  // console.log(excluirReservas)
  
  return (
    <>
      <div className="container mt-5 d-flex justify-content-center">
        <DatePicker
          //poner en español
          locale="es"
          //meses a mostrar
          monthsShown={2}
          // modo calendario
          inline

          //dia de hoy
          todayButton="Día de hoy"

          selected={startDate} // fecha inicial
          onChange={(date) => setStartDate(date)} //funcion para cambiar fecha

          minDate={new Date()} //Fecha minima(fecha de hoy)
          maxDate={addMonths(new Date(), 2)} //Meses maximos

          // excludeDates={[new Date(2023, 9, num)]} // Excluir meses seleccionados

          //configuracion de horas y minutos

          //mostrar hora
          showTimeSelect
          //texto a mostrar
          timeCaption="Horas"
          //color de texto
          // timeClassName={}
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
          //Excluir horas
          excludeTimes={a}

          // timeFormat="p" //formato del la hora en pm y am
          timeIntervals={60}


        />
      </div>
    </>
  )
}

export default Reserves