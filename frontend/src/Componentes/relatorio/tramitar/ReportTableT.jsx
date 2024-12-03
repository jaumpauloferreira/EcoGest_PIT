import  { useState, useEffect, forwardRef } from 'react';
import { Table } from 'react-bootstrap';

const ReportTableT = forwardRef((_, ref) => {
    const [relatorioTramitar, setRelatorioTramitar] = useState([]);


    useEffect(() => {
        const fetchRelatorioTramitar = async () => {
          try {
            const response = await fetch('http://localhost:3001/tramitarserv/');
            const data = await response.json();
            setRelatorioTramitar(data);
          } catch (error) {
            console.error('Erro ao buscar dados:', error);
          }
        };
    
        fetchRelatorioTramitar();
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
          <th>Tramitado para</th>
        </tr>
      </thead>
      <tbody>
        {relatorioTramitar.map((tramitarserv) => (
          <tr key={tramitarserv.id}>
            <td>{tramitarserv.id}</td>
            <td>{new Date(tramitarserv.data_tramitacao).toLocaleDateString()}</td>
            <td>{tramitarserv.nomeSolicitante}</td>
            <td>{tramitarserv.cpfSolicitante}</td>
            <td>{tramitarserv.status}</td>
            <td>{tramitarserv.tipo_servico}</td>
            <td>{tramitarserv.nome_secretaria}</td>
          </tr>
        ))}
      </tbody>

    </Table>

)

});

export default ReportTableT;