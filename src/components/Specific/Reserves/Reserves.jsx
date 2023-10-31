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
  const excluir = [
    new Date('Tue Oct 31 2023 02:00'),
    new Date('Tue Oct 31 2023 03:00'),
    new Date('Tue Oct 31 2023 05:00'),
    
  ]

  return (
    <>
      <div className="container mx-auto">
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

          timeFormat="HH:mm"

          //Excluir horas
          excludeTimes={excluir}

          // timeFormat="p" //formato del la hora en pm y am
          timeIntervals={60}


        />
      </div>
    </>
  )
}

export default Reserves