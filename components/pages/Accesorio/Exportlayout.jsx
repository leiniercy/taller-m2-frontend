
import {Button} from 'primereact/button';

export default function Exportlayout(props) {


    const columns = [
        {field: 'name', header: 'Nombre', filterPlaceholder: "Buscar por nombre"},
        {field: 'price', header: 'Precio', filterPlaceholder: "Buscar por precio"},
        {field: 'cant', header: 'Cantidad', filterPlaceholder: "Buscar por cantidad"}
    ];

    const exportColumns = columns.map((col) => ({title: col.header, dataKey: col.field}));

    /*Exportar informacion*/
    const exportExcel = () => {
        import('xlsx').then((xlsx) => {
            const worksheet = xlsx.utils.json_to_sheet(props.accesorios);
            const workbook = {Sheets: {data: worksheet}, SheetNames: ['data']};
            const excelBuffer = xlsx.write(workbook, {
                bookType: 'xlsx',
                type: 'array'
            });

            saveAsExcelFile(excelBuffer, 'accesorios');
        });
    };

    const saveAsExcelFile = (buffer, fileName) => {
        import('file-saver').then((module) => {
            if (module && module.default) {
                let EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
                let EXCEL_EXTENSION = '.xlsx';
                const data = new Blob([buffer], {
                    type: EXCEL_TYPE
                });

                module.default.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
            }
        });
    };

    const exportPdf = () => {
        import('jspdf').then((jsPDF) => {
            import('jspdf-autotable').then(() => {
                const doc = new jsPDF.default(0, 0);
                doc.autoTable(exportColumns, props.accesorios);
                doc.save('accesorios.pdf');
            });
        });
    };

    const exportCSV = () => {
        props.dt.current.exportCSV();
    };  /*Exportar informacion*/

    return (
        <div className="flex flex-row gap-2 justify-content-around">
            <Button type="button" icon="pi pi-file" severity="info"
                    rounded
                    onClick={exportCSV}
                    data-pr-tooltip="CSV"/>
            <Button type="button" icon="pi pi-file-excel"
                    severity="success"
                    rounded
                    onClick={exportExcel}
                    data-pr-tooltip="XLS"/>
            <Button type="button" icon="pi pi-file-pdf"
                    severity="warning"
                    rounded
                    onClick={exportPdf}
                    data-pr-tooltip="PDF"/>
        </div>
    )

}