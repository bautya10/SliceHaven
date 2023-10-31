import React, { useState, useEffect } from 'react'
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { addMonths, setHours, setMinutes } from 'date-fns'; // Importa la función addMonths
import es from 'date-fns/locale/es';
registerLocale('es', es);

const Reserves = () => {
  // const [startDate, setStartDate] = useState(new Date());

  const [startDate, setStartDate] = useState(new Date());
  // console.log(startDate)

  useEffect(() => {
    console.log(startDate.getDate(),startDate.getMonth(),startDate)
  }, [startDate])

  //las fechas que se excluyen se guardan en este formato dentro de un array
  const excluirReservas = [
    // new Date('Wed Nov 01 2023 00:00:00'),
  ]

  // let handleColor = (time) => {
  //   return time.getHours() > 12 ? "text-success fw-bold" : "text-danger fw-bold";
  // };

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
          timeCaption="Hora"
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
          excludeTimes={excluirReservas}

          // timeFormat="p" //formato del la hora en pm y am
          timeIntervals={60}


        />
      </div>
    </>
  )
}

export default Reserves