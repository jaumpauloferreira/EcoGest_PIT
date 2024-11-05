// Local: frontend/components/GerenciarCicloServicos.jsx

import React, { useState, useEffect } from 'react';
import { Button, Card, Table, Container, Alert, Modal, Form, InputGroup, Row, Col, Badge } from 'react-bootstrap';
import { FaSearch, FaTrash, FaChartPie, FaTasks, FaCheckCircle, FaExclamationCircle, FaClock, FaExclamation, FaCheck } from 'react-icons/fa';
import GerenciarCicloServService from '../../services/GerenciarCicloServService';
import { format, parseISO } from 'date-fns';
import './GerenciarCicloServicos.css';

const GerenciarCicloServicos = () => {
  const [servicos, setServicos] = useState([]);
  const [filteredServicos, setFilteredServicos] = useState([]);
  const [tipoServicoFilter, setTipoServicoFilter] = useState('');
  const [selectedServices, setSelectedServices] = useState([]);
  const [sucessoMensagem, setSucessoMensagem] = useState('');
  const [erro, setErro] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [servicoParaExcluir, setServicoParaExcluir] = useState(null);

  useEffect(() => {
    carregarServicos();
  }, []);

  const carregarServicos = async () => {
    try {
      const data = await GerenciarCicloServService.obterTodos();
      setServicos(data);
      setFilteredServicos(data);
    } catch (error) {
      setErro('Erro ao carregar serviços');
    }
  };

  const handleFilterChange = () => {
    let filtered = servicos;
    if (tipoServicoFilter) filtered = filtered.filter(s => s.tipo_servico.toLowerCase().includes(tipoServicoFilter.toLowerCase()));
    setFilteredServicos(filtered);
  };

  const handleMassUpdate = async (newStatus) => {
    try {
      await Promise.all(
        selectedServices.map(async serviceId => {
          await GerenciarCicloServService.atualizarStatus(serviceId, newStatus);
        })
      );
      setServicos(prevServicos =>
        prevServicos.map(servico =>
          selectedServices.includes(servico.id) ? { ...servico, status: newStatus } : servico
        )
      );
      setFilteredServicos(prevFiltered =>
        prevFiltered.map(servico =>
          selectedServices.includes(servico.id) ? { ...servico, status: newStatus } : servico
        )
      );
      setSelectedServices([]);
      setSucessoMensagem(`Status atualizado para ${newStatus}`);
      setTimeout(() => setSucessoMensagem(''), 5000);
    } catch {
      setErro('Erro ao atualizar status dos serviços');
      setTimeout(() => setErro(''), 5000);
    }
  };

  const confirmarExclusao = (servico) => {
    setServicoParaExcluir(servico);
    setShowModal(true);
  };

  const excluirServico = async () => {
    try {
      await GerenciarCicloServService.excluirServico(servicoParaExcluir.id);
      setServicos(prevServicos => prevServicos.filter(s => s.id !== servicoParaExcluir.id));
      setFilteredServicos(prevFiltered => prevFiltered.filter(s => s.id !== servicoParaExcluir.id));
      setSucessoMensagem('Serviço excluído com sucesso!');
      setShowModal(false);
      setTimeout(() => setSucessoMensagem(''), 5000);
    } catch {
      setErro('Erro ao excluir serviço');
      setShowModal(false);
      setTimeout(() => setErro(''), 5000);
    }
  };

  const toggleSelectAll = (e) => {
    setSelectedServices(e.target.checked ? filteredServicos.map(s => s.id) : []);
  };

  const toggleSelectService = (id) => {
    setSelectedServices(prev =>
      prev.includes(id) ? prev.filter(serviceId => serviceId !== id) : [...prev, id]
    );
  };

  const pendentes = servicos.filter(s => s.status === 'Pendente').length;
  const emAndamento = servicos.filter(s => s.status === 'Em Andamento').length;
  const concluidos = servicos.filter(s => s.status === 'Concluído').length;

  return (
    <Container className="bg-white p-4 rounded shadow">
      <h2 className="text-center mb-4">
        <FaTasks /> Gerenciar Ciclo de Serviços
      </h2>

      {erro && <Alert variant="danger">{erro}</Alert>}
      {sucessoMensagem && <Alert variant="success">{sucessoMensagem}</Alert>}

      {/* Painel de Resumo de Serviços */}
      <h4 className="text-center my-4"><FaChartPie /> Resumo de Serviços</h4>
      <Row className="mb-4">
        <Col md={4}>
          <Card className="text-center shadow-sm border-danger">
            <Card.Body>
              <h5><FaExclamationCircle className="text-danger" /> Pendentes</h5>
              <h3 className="text-danger">{pendentes}</h3>
              <p>Serviços aguardando início</p>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="text-center shadow-sm border-warning">
            <Card.Body>
              <h5><FaClock className="text-warning" /> Em Andamento</h5>
              <h3 className="text-warning">{emAndamento}</h3>
              <p>Serviços em execução</p>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="text-center shadow-sm border-success">
            <Card.Body>
              <h5><FaCheckCircle className="text-success" /> Concluídos</h5>
              <h3 className="text-success">{concluidos}</h3>
              <p>Serviços finalizados com sucesso</p>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Filtros de Pesquisa */}
      <Row className="mb-3">
        <Col md={12}>
          <InputGroup>
            <Form.Control
              type="text"
              placeholder="Filtrar por Tipo de Serviço"
              value={tipoServicoFilter}
              onChange={(e) => setTipoServicoFilter(e.target.value)}
            />
            <Button variant="secondary" onClick={handleFilterChange}>
              <FaSearch />
            </Button>
          </InputGroup>
        </Col>
      </Row>

      {/* Tabela de Serviços */}
      <Card>
        <Card.Header>
          <FaTasks /> Serviços Agendados
        </Card.Header>
        <Card.Body>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>
                  <Form.Check type="checkbox" onChange={toggleSelectAll} />
                </th>
                <th>ID</th>
                <th>Nome do Solicitante</th>
                <th>Contato</th>
                <th>Data Serv.</th>
                <th>Horário</th>
                <th>Tipo do Serviço</th>
                <th>Status / Excluir</th>
              </tr>
            </thead>
            <tbody>
              {filteredServicos.map(servico => (
                <tr key={servico.id}>
                  <td>
                    <Form.Check
                      type="checkbox"
                      checked={selectedServices.includes(servico.id)}
                      onChange={() => toggleSelectService(servico.id)}
                    />
                  </td>
                  <td>{servico.id}</td>
                  <td>{servico.solicitante}</td>
                  <td>{servico.contato}</td>
                  <td>{format(parseISO(servico.data_servico), 'dd/MM/yyyy')}</td>
                  <td>{servico.horario}</td>
                  <td>{servico.tipo_servico}</td>
                  <td>
                    <Badge bg={
                      servico.status === 'Concluído' ? 'success' :
                      servico.status === 'Em Andamento' ? 'warning' : 'danger'
                    }>
                      {servico.status}
                    </Badge>
                    <Button
                      variant="link"
                      className="text-danger p-0 ms-2"
                      onClick={() => confirmarExclusao(servico)}
                    >
                      <FaTrash />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card>

      {/* Atualização de Status em Massa */}
      <Row className="mt-3 button-row">
        <Col className="text-center">
          <Button variant="danger" className="status-button" onClick={() => handleMassUpdate('Pendente')}>
            <FaExclamation className="me-2" /> Pendente
          </Button>{' '}
          <Button variant="warning" className="status-button" onClick={() => handleMassUpdate('Em Andamento')}>
            <FaClock className="me-2" /> Em Andamento
          </Button>{' '}
          <Button variant="success" className="status-button" onClick={() => handleMassUpdate('Concluído')}>
            <FaCheck className="me-2" /> Concluído
          </Button>
        </Col>
      </Row>

      {/* Modal de Confirmação de Exclusão */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmação de Exclusão</Modal.Title>
        </Modal.Header>
        <Modal.Body>Tem certeza de que deseja excluir este serviço agendado?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>Cancelar</Button>
          <Button variant="danger" onClick={excluirServico}>Excluir</Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default GerenciarCicloServicos;
