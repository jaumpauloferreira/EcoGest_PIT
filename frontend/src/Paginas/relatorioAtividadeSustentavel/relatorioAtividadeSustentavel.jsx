import React, { useState, useEffect, useRef } from 'react';
import { Button, Card, Col, Row, Form, Container } from 'react-bootstrap';
import { FaListAlt, FaBackspace } from 'react-icons/fa';
import DashboardA from '../../Componentes/relatorio/atividadeSustentavel/DashboardA.jsx';
import ReportTableA from '../../Componentes/relatorio/atividadeSustentavel/ReportTableA.jsx';
import TableExportButtons from '../../Componentes/relatorio/TableExportButtons.jsx';

function RelatorioAtividades() {
    const [termoBusca, setTermoBusca] = useState(''); 
    const [dadosServico, setDadosServico] = useState([]);
    const [dadosFiltrados, setDadosFiltrados] = useState([]);
    const tableRef = useRef(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:3001/criarativsust/');
                const servicos = await response.json();
                setDadosServico(servicos);
                setDadosFiltrados(servicos);
            } catch (error) {
                console.error('Erro ao buscar dados:', error);
            }
        };

        fetchData();
    }, []);

    const handleBuscaChange = (event) => {
        const termo = event.target.value;
        setTermoBusca(termo);

        if (termo.trim() === '') {
            setDadosFiltrados(dadosServico);
        } else {
            const filtro = termo.toLowerCase();
            const itensFiltrados = dadosServico.filter(
                (item) =>
                    item.criar_nome.toLowerCase().includes(filtro) ||
                    item.criar_cpf.toLowerCase().includes(filtro) ||
                    item.tipo_atividade.toLowerCase().includes(filtro)
            );
            setDadosFiltrados(itensFiltrados);
        }
    };

    const handleLimpar = () => {
        setTermoBusca('');
        setDadosFiltrados(dadosServico);
    };

    return (
        <div className="bg-white p-0 rounded shadow w-100" style={{ minHeight: '90vh' }}>
            <h2 className="text-center mb-4 fs-3">
                <FaListAlt /> RELATÓRIO DE ATIVIDADES SUSTENTÁVEIS
            </h2>
            <Container className="mt-2">
                <Card>
                    <Card.Body>
                        <h3 className="text-center mt-4">Gráfico de Atividades Sustentáveis</h3>
                        <DashboardA />
                        <Card.Header as="h5">
                            <Row className="align-items-center">
                                <Col lg={2}>Pesquisar:</Col>
                                <Col lg={6}>
                                    <Form.Group className="mb-0">
                                        <Form.Control
                                            className="border-secondary"
                                            type="text"
                                            onChange={handleBuscaChange} 
                                            placeholder="Digite um termo para buscar"
                                            value={termoBusca}
                                        />
                                    </Form.Group>
                                </Col>
                                <Col lg={2}>
                                    <Button variant="secondary" className="w-100" onClick={handleLimpar}>
                                        <FaBackspace /> Limpar
                                    </Button>
                                </Col>
                            </Row>
                        </Card.Header>
                        <Card.Body>
                            <TableExportButtons tableRef={tableRef} />
                            <ReportTableA dados={dadosFiltrados} ref={tableRef} />
                            {dadosFiltrados.length === 0 && termoBusca && (
                                <div className="text-center mt-3 text-muted">
                                    Nenhum resultado foi encontrado.
                                </div>
                            )}
                        </Card.Body>
                    </Card.Body>
                </Card>
            </Container>
        </div>
    );
}

export default RelatorioAtividades;