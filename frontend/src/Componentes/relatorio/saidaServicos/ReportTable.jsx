/* eslint-disable react/display-name */
import  { useState, useEffect, forwardRef } from 'react';
import { Table } from 'react-bootstrap';

const ReportTable = forwardRef((_, ref) => {
    const [relatorioCiclo, setRelatorioCiclo] = useState([]);


    useEffect(() => {
        const fetchRelatioCiclo = async () => {
          try {
            const response = await fetch('http://localhost:3001/realizaragserv/');
            const data = await response.json();
            setRelatorioCiclo(data);
          } catch (error) {
            console.error('Erro ao buscar dados:', error);
          }
        };
    
        fetchRelatioCiclo();
      }, []);

return (
   
    <Table ref={ref} >
     <thead>
        <tr>
          <th>ID</th>
          <th>Data do Serviço</th>
          <th>Nome do Solicitante</th>
          <th>CPF do Solicitante</th>
          <th>Status do Serviço</th>
          <th>Tipo de Serviço</th>
        </tr>
      </thead>
      <tbody>
        {relatorioCiclo.map((realizaragserv) => (
          <tr key={realizaragserv.agserv_id}>
            <td>{realizaragserv.agserv_id}</td>
            <td>{new Date(realizaragserv.agserv_data).toLocaleDateString()}</td>
            <td>{realizaragserv.agserv_nomeSolicitante}</td>
            <td>{realizaragserv.agserv_cpfSolicitante}</td>
            <td>{realizaragserv.agserv_status}</td>
            <td>{realizaragserv.tipo_servico}</td>
          </tr>
        ))}
      </tbody>

    </Table>

)

});

export default ReportTable;