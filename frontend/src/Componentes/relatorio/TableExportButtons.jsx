import  { useRef } from 'react';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import ReportTable from './ReportTable';

const TableExportButtons = () => {
    const   tableRef= useRef()
   const exportToXLS =()=>{

    const workbook = XLSX.utils.table_to_book(tableRef.current);
    XLSX.writeFile(workbook,'report.xlsx')
   }

   const exportToPDF =()=>{
     
    const unit='pt'
    const size='A4';
    const orientation="portrait";

       const pdf =new jsPDF(orientation,unit,size)

       pdf.text('Orders',10,10)
       pdf.html(tableRef.current,{

        callback:function(pdf){
            pdf.save('report.pdf')
        }
       })

   }
    
    return (

        <div>
             <button className='btn btn-primary' onClick={exportToXLS} type='button' >Exportar XLSX</button>
             <button className='btn btn-primary' onClick={exportToPDF} type='button' >Exportar PDF</button>
             <ReportTable ref={tableRef} />
        </div>
    )
}

export default TableExportButtons;