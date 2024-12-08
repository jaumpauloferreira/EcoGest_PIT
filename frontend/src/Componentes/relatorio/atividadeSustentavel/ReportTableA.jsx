import { forwardRef } from 'react';
import { Table } from 'react-bootstrap';

const ReportTableA = forwardRef(({ dados }, ref) => {
    function formatCPF(cpf) {
        if (!cpf) return '';
        return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
    }

    return (
        <Table ref={ref}>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Data da Atividade</th>
                    <th>Nome do Solicitante</th>
                    <th>CPF do Solicitante</th>
                    <th>Atividade</th>
                    <th>Descrição</th>
                </tr>
            </thead>
            <tbody>
                {dados.map((criarativi) => (
                    <tr key={criarativi.criar_id}>
                        <td>{criarativi.criar_id}</td>
                        <td>{new Date(criarativi.criar_data).toLocaleDateString()}</td>
                        <td>{criarativi.criar_nome}</td>
                        <td>{criarativi.criar_cpf ? formatCPF(criarativi.criar_cpf) : '-'}</td>
                        <td>{criarativi.tipo_atividade}</td>
                        <td>{criarativi.criar_descricao}</td>
                    </tr>
                ))}
            </tbody>
        </Table>
    );
});

export default ReportTableA;