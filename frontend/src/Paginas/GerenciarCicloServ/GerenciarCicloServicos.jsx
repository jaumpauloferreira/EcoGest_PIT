// Local: frontend/components/GerenciarCicloServicos.jsx

import React, { useState, useEffect } from 'react';
import { Button, Card, Table, Container, Alert, Modal, Form } from 'react-bootstrap';
import { FaInfoCircle, FaTrash, FaPlus, FaSave } from 'react-icons/fa';
import GerenciarCicloServService from '../../services/GerenciarCicloServService';
import { format, parseISO } from 'date-fns';

const GerenciarCicloServicos = () => {
  const [servicos, setServicos] = useState([]);
  const [servicoSelecionado, setServicoSelecionado] = useState(null);
  const [historico, setHistorico] = useState([]);
  const [erro, setErro] = useState('');
  const [sucessoMensagem, setSucessoMensagem] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [servicoParaExcluir, setServicoParaExcluir] = useState(null);
  const [novoServicoModal, setNovoServicoModal] = useState(false);
  const [novoServico, setNovoServico] = useState({ tipo_servico: '', solicitante: '', data_inicio: '' });
  const [statusAtualizado, setStatusAtualizado] = useState('');

  useEffect(() => {
    carregarServicos();
  }, []);

  const carregarServicos = () => {
    GerenciarCicloServService.obterTodos()
      .then(data => {
        setServicos(data);
        setErro('');
      })
      .catch(() => setErro('Erro ao carregar serviços'));
  };

  const mostrarDetalhes = (id) => {
    GerenciarCicloServService.obterPorId(id)
      .then(data => {
        setServicoSelecionado(data);
        setStatusAtualizado(data.status);
      })
      .catch(() => setErro('Erro ao carregar detalhes do serviço'));

    GerenciarCicloServService.obterHistorico(id)
      .then(data => setHistorico(data))
      .catch(() => setErro('Erro ao carregar histórico'));
  };

  const atualizarStatus = () => {
    if (servicoSelecionado) {
      GerenciarCicloServService.atualizarStatus(servicoSelecionado.id, statusAtualizado)
        .then(() => {
          setSucessoMensagem('Status salvo com sucesso!');
          carregarServicos();
          setServicoSelecionado(null);

          // Configura o tempo de exibição da mensagem de sucesso
          setTimeout(() => {
            setSucessoMensagem('');
          }, 5000);
        })
        .catch(() => setErro('Erro ao atualizar status do serviço'));
    }
  };

  const confirmarExclusao = (servico) => {
    setServicoParaExcluir(servico);
    setShowModal(true);
  };

  const excluirServico = () => {
    GerenciarCicloServService.excluirServico(servicoParaExcluir.id)
      .then(() => {
        setSucessoMensagem('Serviço excluído com sucesso!');
        carregarServicos();
        setShowModal(false);

        setTimeout(() => {
          setSucessoMensagem('');
        }, 5000);
      })
      .catch(() => setErro('Erro ao excluir serviço'));
  };

  const abrirNovoServicoModal = () => {
    setNovoServicoModal(true);
  };

  const fecharNovoServicoModal = () => {
    setNovoServicoModal(false);
    setNovoServico({ tipo_servico: '', solicitante: '', data_inicio: '' });
  };

  const adicionarNovoServico = () => {
    GerenciarCicloServService.adicionar(novoServico)
      .then(() => {
        setSucessoMensagem('Novo serviço adicionado com sucesso!');
        carregarServicos();
        fecharNovoServicoModal();

        setTimeout(() => {
          setSucessoMensagem('');
        }, 5000);
      })
      .catch(() => setErro('Erro ao adicionar novo serviço'));
  };

  return (
    <div className="bg-white p-0 rounded shadow w-100" style={{ minHeight: '90vh' }}>
      <h2 className="text-center mb-4">
        <FaInfoCircle /> GERENCIAR CICLO DE SERVIÇOS
      </h2>

      <Container className="mt-2">
        {erro && <Alert variant="danger" className="mt-3">{erro}</Alert>}
        {sucessoMensagem && <Alert variant="success" className="mt-3">{sucessoMensagem}</Alert>}

        <Button variant="success" className="mb-3" onClick={abrirNovoServicoModal}>
          <FaPlus /> Cadastrar Novo Serviço
        </Button>

        <Card>
          <Card.Header as="h4">Serviços Agendados</Card.Header>
          <Card.Body>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Nome do Solicitante</th>
                  <th>Contato</th>
                  <th>Data Serv.</th>
                  <th>Horário</th>
                  <th>Tipo do Serviço</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                {servicos.map((servico) => (
                  <tr key={servico.id}>
                    <td>{servico.id}</td>
                    <td>{servico.solicitante || 'Não disponível'}</td>
                    <td>{servico.contato || 'Não disponível'}</td>
                    <td>{servico.data_servico ? format(parseISO(servico.data_servico), 'dd/MM/yyyy') : 'Data não disponível'}</td>
                    <td>{servico.horario || 'Não disponível'}</td>
                    <td>{servico.tipo_servico || 'Não disponível'}</td>
                    <td>
                      <div className="d-flex">
                        <Button
                          variant="link"
                          onClick={() => mostrarDetalhes(servico.id)}
                          className="text-info fs-5"
                        >
                          <FaInfoCircle /> Detalhes
                        </Button>
                        <Button
                          variant="link"
                          onClick={() => confirmarExclusao(servico)}
                          className="text-danger fs-5"
                        >
                          <FaTrash /> Excluir
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>

            {servicoSelecionado && (
              <div className="mt-4">
                <Card>
                  <Card.Header as="h4">Detalhes do Serviço: {servicoSelecionado.tipo_servico}</Card.Header>
                  <Card.Body>
                    <p><strong>Solicitante:</strong> {servicoSelecionado.solicitante || 'Não disponível'}</p>
                    <p><strong>Status Atual:</strong> {servicoSelecionado.status || 'Não disponível'}</p>
                    <p><strong>Data de Início:</strong> {servicoSelecionado.data_servico ? format(parseISO(servicoSelecionado.data_servico), 'dd/MM/yyyy') : 'Data não disponível'}</p>
                    {servicoSelecionado.data_fim && (
                      <p><strong>Data de Conclusão:</strong> {format(parseISO(servicoSelecionado.data_fim), 'dd/MM/yyyy')}</p>
                    )}
                    <h5>Atualizar Status</h5>
                    <Form.Group controlId="statusAtualizado">
                      <Form.Label>Novo Status</Form.Label>
                      <Form.Control
                        as="select"
                        value={statusAtualizado}
                        onChange={(e) => setStatusAtualizado(e.target.value)}
                      >
                        <option value="Pendente">Pendente</option>
                        <option value="Em Andamento">Em Andamento</option>
                        <option value="Concluído">Concluído</option>
                      </Form.Control>
                    </Form.Group>
                    <Button variant="primary" onClick={atualizarStatus} className="mt-3">
                      <FaSave /> Salvar Status
                    </Button>
                    <h5 className="mt-4">Histórico de Status</h5>
                    <Table striped bordered>
                      <thead>
                        <tr>
                          <th>Status</th>
                          <th>Data da Alteração</th>
                          <th>Alterado por</th>
                        </tr>
                      </thead>
                      <tbody>
                        {historico.map((registro, index) => (
                          <tr key={index}>
                            <td>{registro.status || 'Não disponível'}</td>
                            <td>{registro.data_alteracao ? format(parseISO(registro.data_alteracao), 'dd/MM/yyyy') : 'Data não disponível'}</td>
                            <td>{registro.alterado_por || 'Não disponível'}</td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                  </Card.Body>
                </Card>
              </div>
            )}
          </Card.Body>
        </Card>

        <Modal show={novoServicoModal} onHide={fecharNovoServicoModal}>
          <Modal.Header closeButton>
            <Modal.Title>Cadastrar Novo Serviço</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group controlId="tipo_servico">
                <Form.Label>Tipo de Serviço</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Digite o tipo de serviço"
                  value={novoServico.tipo_servico}
                  onChange={(e) => setNovoServico({ ...novoServico, tipo_servico: e.target.value })}
                />
              </Form.Group>
              <Form.Group controlId="solicitante">
                <Form.Label>Solicitante</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Digite o nome do solicitante"
                  value={novoServico.solicitante}
                  onChange={(e) => setNovoServico({ ...novoServico, solicitante: e.target.value })}
                />
              </Form.Group>
              <Form.Group controlId="data_inicio">
                <Form.Label>Data de Início</Form.Label>
                <Form.Control
                  type="date"
                  value={novoServico.data_inicio}
                  onChange={(e) => setNovoServico({ ...novoServico, data_inicio: e.target.value })}
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={fecharNovoServicoModal}>Cancelar</Button>
            <Button variant="primary" onClick={adicionarNovoServico}>Cadastrar</Button>
          </Modal.Footer>
        </Modal>

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
    </div>
  );
};

export default GerenciarCicloServicos;
