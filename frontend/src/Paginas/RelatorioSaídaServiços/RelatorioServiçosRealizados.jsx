import React, { useState } from 'react';
import { Button, Card, Col, Row, Form, Container, Table } from 'react-bootstrap';
import { FaListAlt, FaSearch, FaBackspace } from 'react-icons/fa';
import ReportTable from '../../Componentes/relatorio/saidaServicos/ReportTable.jsx';
import Dashboard from '../../Componentes/relatorio/saidaServicos/Dashboard.jsx'

function ModeloRelatorio() {
    const [termoBusca, setTermoBusca] = useState('');
    const [listaItens, setListaItens] = useState(null);

    const handleBuscaChange = (event) => {
        setTermoBusca(event.target.value);
    };

    const handleFiltrar = () => {
    };

    const handleLimpar = () => {
        setListaItens(null);
        setTermoBusca('');
    };



    
    return (
        <>
            <div className="bg-white p-0 rounded shadow w-100" style={{ minHeight: '90vh' }}>
                <h2 className="text-center mb-4 fs-3"><FaListAlt /> RELATÓRIO DE SERVIÇOS</h2>
                <Container className="mt-2">
                    <Card>
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
                                    <Button variant="secondary" className="w-100" onClick={handleFiltrar}>
                                        <FaSearch /> Pesquisar
                                    </Button>
                                </Col>
                                <Col lg={2}>
                                    <Button variant="secondary" className="w-100" onClick={handleLimpar}>
                                        <FaBackspace /> Limpar
                                    </Button>
                                </Col>
                            </Row>
                        </Card.Header>
                        <Card.Body>
                            {listaItens !== null && (
                                <Table striped bordered hover>
                                    <thead>
                                        <tr>
                                            <th>ID</th>
                                            <th>Nome</th>
                                            <th>Descrição</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {listaItens.length === 0 ? (
                                            <tr>
                                                <td colSpan="3" className="text-center">Nenhum item encontrado</td>
                                            </tr>
                                        ) : (
                                            listaItens.map((item) => (
                                                <tr key={item.id}>
                                                    <td>{item.id}</td>
                                                    <td>{item.nome}</td>
                                                    <td>{item.descricao}</td>
                                                </tr>
                                            ))
                                        )}
                                    </tbody>
                                </Table>
                            )}
                            <ReportTable/>
                            <Dashboard/>
                        </Card.Body>
                    </Card>
                </Container>
            </div>
        </>
    );
}

export default ModeloRelatorio;