import React, { forwardRef } from 'react';
import { Table } from 'react-bootstrap';

const ReportTableT = forwardRef(({ dados }, ref) => {
    function formatCPF(cpf) {
        if (!cpf) return ''; 
        return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
    }

    return (
        <Table striped bordered hover responsive ref={ref} className="table-bordered table-striped table-hover">
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
                {dados.map((tramitarserv) => (
                    <tr key={tramitarserv.id}>
                        <td>{tramitarserv.id}</td>
                        <td>{new Date(tramitarserv.data_tramitacao).toLocaleDateString()}</td>
                        <td>{tramitarserv.nomeSolicitante}</td>
                        <td>{tramitarserv.cpfSolicitante ? formatCPF(tramitarserv.cpfSolicitante) : '-'}</td>
                        <td>{tramitarserv.status}</td>
                        <td>{tramitarserv.tipo_servico}</td>
                        <td>{tramitarserv.nome_secretaria}</td>
                    </tr>
                ))}
            </tbody>
        </Table>
    );
});

export default ReportTableT;