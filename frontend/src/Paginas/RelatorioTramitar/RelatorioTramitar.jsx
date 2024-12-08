import React, { useState, useEffect, useRef } from 'react';
import { Button, Card, Col, Row, Form, Container } from 'react-bootstrap';
import { FaListAlt, FaBackspace } from 'react-icons/fa';
import DashboardT from '../../Componentes/relatorio/tramitar/DashboardT.jsx';
import ReportTableT from '../../Componentes/relatorio/tramitar/ReportTableT.jsx';
import TableExportButtons from '../../Componentes/relatorio/TableExportButtons.jsx';

function RelatorioTramitar() {
    const [termoBusca, setTermoBusca] = useState('');
    const [dadosServico, setDadosServico] = useState([]);
    const [dadosFiltrados, setDadosFiltrados] = useState([]);
    const tableRef = useRef(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:3001/tramitarserv/');
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
                    item.nomeSolicitante.toLowerCase().includes(filtro) ||
                    item.cpfSolicitante?.toLowerCase().includes(filtro) ||
                    item.status.toLowerCase().includes(filtro) ||
                    item.tipo_servico.toLowerCase().includes(filtro) ||
                    item.nome_secretaria.toLowerCase().includes(filtro)
            );
            setDadosFiltrados(itensFiltrados);
        }
    };

    const handleLimpar = () => {
        setTermoBusca('');
        setDadosFiltrados(dadosServico);
    };

    return (
        <>
            <div className="bg-white p-0 rounded shadow w-100" style={{ minHeight: '90vh' }}>
                <h2 className="text-center mb-4 fs-3">
                    <FaListAlt /> RELATÓRIO DE SERVIÇOS TRAMITADOS
                </h2>
                <Container className="mt-2">
                    <Card>
                        <Card.Body>
                            <h3 className="text-center mt-4">Gráfico de Serviços por Secretaria</h3>
                            <DashboardT />

                            <Card.Header as="h5" className="mt-4">
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
                            <TableExportButtons tableRef={tableRef} />
                            <ReportTableT dados={dadosFiltrados} ref={tableRef} />
                            {dadosFiltrados.length === 0 && termoBusca && (
                                <div className="text-center mt-3 text-muted">
                                    Nenhum resultado foi encontrado.
                                </div>
                            )}
                        </Card.Body>
                    </Card>
                </Container>
            </div>
        </>
    );
}

export default RelatorioTramitar;