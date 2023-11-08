import React, { useState, useEffect } from 'react'
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { addMonths, setHours, setMinutes } from 'date-fns'; // Importa la función addMonths
import es from 'date-fns/locale/es';
import axios from 'axios';
registerLocale('es', es);

const Reserves = () => {
  const [startDate, setStartDate] = useState(new Date());

  let D =startDate.getDate();
  let M =startDate.getMonth();
  let Y =startDate.getFullYear();

  //las fechas que se excluyen se guardan en este formato dentro de un array
  const [excluirReservas, setExcluirReservas] = useState([]);
  // console.log(excluirReservas)

  // let handleColor = (time) => {
  //   return time.getHours() > 12 ? "text-success fw-bold" : "text-danger fw-bold";
  // };

  useEffect(() => {
   const funcion = async () =>{
    try {
      const result  = await axios.get(`https://slicenhaven-backend.onrender.com/reserves/reserveDate/${D}-${M}-${Y}`)
      setExcluirReservas(result.data.result)
    } catch (error) {
      console.log(error)
    }
   }
    funcion();
  }, [startDate])
  
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
          excludeTimes={excluirReservas.map(reservas => new Date(reservas))}

          // timeFormat="p" //formato del la hora en pm y am
          timeIntervals={60}


        />
      </div>
    </>
  )
}

export default Reserves