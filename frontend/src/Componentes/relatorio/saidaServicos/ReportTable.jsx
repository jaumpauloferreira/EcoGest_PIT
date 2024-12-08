/* eslint-disable react/display-name */
import React, { useState, useEffect, forwardRef } from 'react';
import { Table } from 'react-bootstrap';

const ReportTable = forwardRef((props, ref) => {
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

    function formatCPF(cpf) {
        if (!cpf) return ''; // Verifica se o CPF é válido
        return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
    }

    return (
        <Table striped bordered hover ref={ref} id="report-table">
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
                        <td>{realizaragserv.agserv_cpfSolicitante ? formatCPF(realizaragserv.agserv_cpfSolicitante) : '-'}</td>
                        <td>{realizaragserv.agserv_status}</td>
                        <td>{realizaragserv.tipo_servico}</td>
                    </tr>
                ))}
            </tbody>
        </Table>
    );
});

export default ReportTable;