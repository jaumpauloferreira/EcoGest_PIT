import React from 'react';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const TableExportButtons = ({ tableRef }) => {

    const exportToXLS = () => {
        const table = tableRef.current;
        if (table) {
            const workbook = XLSX.utils.table_to_book(table);
            XLSX.writeFile(workbook, 'relatorio_servicos.xlsx');
        }
    };

    const exportToPDF = () => {
        const table = tableRef.current;
        if (table) {
            const pdf = new jsPDF('landscape', 'mm', 'a4');
            
            html2canvas(table, { 
                scale: 2,
                useCORS: true 
            }).then(canvas => {
                const imgData = canvas.toDataURL('image/png');
                const pdfWidth = pdf.internal.pageSize.getWidth();
                
                const imageWidth = pdfWidth;
                const imageHeight = (canvas.height * imageWidth) / canvas.width;
                
                pdf.addImage(imgData, 'PNG', 0, 10, imageWidth, imageHeight);
                pdf.save('relatorio_servicos.pdf');
            });
        }
    };

    return (
        <div>
            <div style={{ marginBottom: '10px' }}>
                <button 
                    className='btn btn-primary me-2' 
                    onClick={exportToXLS} 
                    type='button'
                >
                    Exportar XLSX
                </button>
                <button 
                    className='btn btn-primary' 
                    onClick={exportToPDF} 
                    type='button'
                >
                    Exportar PDF
                </button>
            </div>
        </div>
    );
};

export default TableExportButtons;