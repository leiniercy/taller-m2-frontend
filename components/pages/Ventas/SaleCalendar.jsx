

import { Calendar } from 'primereact/calendar';
import { addLocale } from 'primereact/api';

export default function SaleCalendar(props) {

    addLocale('es', {
        firstDayOfWeek: 1,
        dayNames: ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'],
        dayNamesShort: ['dom', 'lun', 'mar', 'mié', 'jue', 'vie', 'sáb'],
        dayNamesMin: ['D', 'L', 'M', 'X', 'J', 'V', 'S'],
        monthNames: ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'],
        monthNamesShort: ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'],
        today: 'Hoy',
        clear: 'Limpiar'
    });


    return (
        <div className="card w-full">
            <Calendar value={props.date}
                      onChange={(e) => props.onChangeCalendar(e)}
                      dateFormat="dd/mm/yy"
                      locale="es"
                      showIcon
                      showButtonBar
            />
        </div>
    )
}