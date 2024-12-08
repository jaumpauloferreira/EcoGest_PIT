// Local: frontend/components/GerenciarCicloServicos.jsx

import React, { useState, useEffect } from 'react';
import { Button, Card, Table, Container, Alert, Modal, Form, InputGroup, Row, Col, Badge } from 'react-bootstrap';
import { Bar } from 'react-chartjs-2';
import { FaSearch, FaTrash, FaChartBar, FaTasks, FaCheckCircle, FaExclamationCircle, FaClock, FaExclamation, FaCheck, FaListAlt, FaQuestionCircle } from 'react-icons/fa';
import GerenciarCicloServService from '../../services/GerenciarCicloServService';
import { format, parseISO } from 'date-fns';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import './GerenciarCicloServicos.css';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const GerenciarCicloServicos = () => {
  const [servicos, setServicos] = useState([]);
  const [filteredServicos, setFilteredServicos] = useState([]);
  const [tipoServicoFilter, setTipoServicoFilter] = useState('');
  const [selectedServices, setSelectedServices] = useState([]);
  const [sucessoMensagem, setSucessoMensagem] = useState('');
  const [erro, setErro] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [servicoParaExcluir, setServicoParaExcluir] = useState(null);  
  const [showTutorial, setShowTutorial] = useState(false);

  const handleShowTutorial = () => setShowTutorial(true);
  const handleCloseTutorial = () => setShowTutorial(false);

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
    if (tipoServicoFilter) {
      filtered = filtered.filter(s => s.tipo_servico.toLowerCase().includes(tipoServicoFilter.toLowerCase()));
    }
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

  const dataGrafico = {
    labels: ['Pendentes', 'Em Andamento', 'Concluídos'],
    datasets: [
      {
        label: 'Distribuição de Status',
        data: [pendentes, emAndamento, concluidos],
        backgroundColor: ['#dc3545', '#ffc107', '#28a745'],
        borderColor: ['#b02a37', '#e0a800', '#218838'],
        borderWidth: 1
      }
    ]
  };

  const optionsGrafico = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top'
      },
      title: {
        display: true,
        text: 'Status dos Serviços'
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        max: Math.max(pendentes, emAndamento, concluidos) + 2
      }
    }
  };

  return (
    <Container className="bg-white p-4 rounded shadow">
       <h2 className="d-flex justify-content-between align-items-center mb-4 fs-3">
        <span className="mx-auto text-center">
          <FaListAlt /> GERENCIAR CICLO DE SERVIÇOS
        </span>
        <span>
          <FaQuestionCircle
            className="fs-4 me-3"
            style={{ cursor: "pointer", marginLeft: "auto" }}
            onClick={handleShowTutorial}
            title="Ajuda"
          />
        </span>
      </h2>

      {erro && <Alert variant="danger">{erro}</Alert>}

      {/* Gráfico de Distribuição de Status em Colunas */}
      <Row className="mb-4">
        <Col>
          <Card className="shadow-sm">
            <Card.Body className="d-flex flex-column align-items-center">
              <h5 className="text-center mb-3"><FaChartBar /> Distribuição de Status</h5>
              <div style={{ width: '400px' }}>
                <Bar data={dataGrafico} options={optionsGrafico} />
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Painel de Resumo de Serviços */}
      <h4 className="text-center my-4"><FaChartBar /> Resumo de Serviços</h4>
      <Row className="mb-4 text-center">
        <Col md={4}>
          <Card className="shadow-sm border-danger">
            <Card.Body>
              <h5><FaExclamationCircle className="text-danger" /> Pendentes</h5>
              <h3 className="text-danger">{pendentes}</h3>
              <p>Serviços aguardando início</p>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="shadow-sm border-warning">
            <Card.Body>
              <h5><FaClock className="text-warning" /> Em Andamento</h5>
              <h3 className="text-warning">{emAndamento}</h3>
              <p>Serviços em execução</p>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="shadow-sm border-success">
            <Card.Body>
              <h5><FaCheckCircle className="text-success" /> Concluídos</h5>
              <h3 className="text-success">{concluidos}</h3>
              <p>Serviços finalizados</p>
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

      {/* Mensagem de Sucesso abaixo do Filtro */}
      {sucessoMensagem && (
        <Row className="my-3">
          <Col>
            <Alert variant="success" className="text-center">
              {sucessoMensagem}
            </Alert>
          </Col>
        </Row>
      )}

      {/* Tabela de Serviços */}
      <Card className="shadow-sm">
        <Card.Header className="">
          <FaTasks /> Serviços Agendados
        </Card.Header>
        <Card.Body>
          <Table striped bordered hover responsive>
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
                <th className="text-center">Status</th>
                <th className="text-center">Excluir</th>
              </tr>
            </thead>
            <tbody>
              {filteredServicos.map((servico) => (
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
                  <td className="text-nowrap">{servico.contato}</td>
                  <td>{format(parseISO(servico.data_servico), 'dd/MM/yyyy')}</td>
                  <td>{servico.horario}</td>
                  <td>{servico.tipo_servico}</td>
                  <td className="text-center align-middle">
                    <Badge
                      bg={
                        servico.status === 'Concluído'
                          ? 'success'
                          : servico.status === 'Em Andamento'
                          ? 'warning'
                          : 'danger'
                      }
                      style={{ whiteSpace: 'nowrap' }}
                    >
                      {servico.status}
                    </Badge>
                  </td>
                  <td className="text-center align-middle">
                    <Button
                      variant="link"
                      className="text-danger p-0"
                      onClick={() => confirmarExclusao(servico)}
                      style={{ whiteSpace: 'nowrap' }}
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
      <Row className="mt-3">
        <Col className="text-center">
          <Button variant="danger" className="me-2" onClick={() => handleMassUpdate('Pendente')}>
            <FaExclamation className="me-2" /> Pendente
          </Button>
          <Button variant="warning" className="me-2" onClick={() => handleMassUpdate('Em Andamento')}>
            <FaClock className="me-2" /> Em Andamento
          </Button>
          <Button variant="success" onClick={() => handleMassUpdate('Concluído')}>
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
      <Modal
        show={showTutorial}
        onHide={handleCloseTutorial}
        size="lg"
        centered
      >
        <Modal.Header closeButton>
  <Modal.Title>Tutorial: Gerenciar Ciclo de Serviço</Modal.Title>
</Modal.Header>
<Modal.Body>
  <ol>
    <li>
      <strong>Visualize o Status:</strong> Confira no gráfico a quantidade de serviços <span className="text-danger">Pendentes</span>, <span className="text-warning">Em Andamento</span>, ou <span className="text-success">Concluídos</span>.
    </li>
    <li>
      <strong>Resumo Rápido:</strong> Use o painel abaixo do gráfico para ver o resumo de cada status.
    </li>
    <li>
      <strong>Filtrar Serviços:</strong> Digite no campo de busca para localizar serviços por tipo.
    </li>
    <li>
      <strong>Alterar Status:</strong> Marque os serviços desejados e clique em:
      <ul>
        <li><Button variant="danger" size="sm">Pendente</Button> para marcar como pendente.</li>
        <li><Button variant="warning" size="sm">Em Andamento</Button> para marcar como em andamento.</li>
        <li><Button variant="success" size="sm">Concluído</Button> para finalizar o serviço.</li>
      </ul>
    </li>
    <li>
      <strong>Excluir Serviços:</strong> Clique no ícone <FaTrash className="text-danger" /> para remover um serviço.
    </li>
  </ol>
  <img
    src="/tutorial-ciclo-servico.png"
    alt="Tutorial Gerenciar Ciclo"
    className="img-fluid rounded shadow mt-3"
  />
</Modal.Body>
<Modal.Footer>
  <Button variant="secondary" onClick={handleCloseTutorial}>
    Fechar
  </Button>
</Modal.Footer>

      </Modal>
    </Container>
    
  );
};

export default GerenciarCicloServicos;