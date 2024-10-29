import React, { useEffect, useState } from 'react';
import { Button, Card, Col, Row, Form, Container, Table, Alert } from 'react-bootstrap';
import { FaListAlt, FaSave } from 'react-icons/fa';
import TramitarServService from '../../services/TramitarServService';
import AgendamentoService from '../../services/AgendamentoService';
import SecretariaService from '../../services/SecretariaService';
import { format } from 'date-fns';

const tramitarServService = new TramitarServService();
const agendamentoService = new AgendamentoService();
const secretariaService = new SecretariaService();

function TramitarServicosAgendados() {
  const [idTramitar, setIdTramitar] = useState('');
  const [msgMotivo, setMsgMotivo] = useState('');
  const [idAgendamento, setIdAgendamento] = useState('');
  const [idSecretaria, setIdSecretaria] = useState('');
  const [listaTramitacoes, setListaTramitacoes] = useState([]);
  const [listaAgendamentos, setListaAgendamentos] = useState([]);
  const [listaSecretarias, setListaSecretarias] = useState([]);
  const [sucessoMensagem, setSucessoMensagem] = useState('');
  const [erro, setErro] = useState('');

  const carregarAgendamentos = async () => {
    try {
      const dados = await agendamentoService.obterTodos();
      setListaAgendamentos(dados);
    } catch (error) {
      setErro('Erro ao carregar agendamentos.');
    }
  };

  const carregarSecretarias = async () => {
    try {
      const dados = await secretariaService.obterTodas();
      setListaSecretarias(dados);
    } catch (error) {
      setErro('Erro ao carregar secretarias.');
    }
  };

  const listarTramitacoes = async () => {
    try {
      const dados = await tramitarServService.obterTodas();
      setListaTramitacoes(dados);
    } catch (error) {
      setErro('Erro ao listar tramitações.');
    }
  };

  const handleSalvarTramitacao = async () => {
    if (!idAgendamento || !idSecretaria || !msgMotivo) {
      setErro('Por favor, preencha todos os campos.');
      return;
    }

    try {
      await tramitarServService.adicionar({ idAgendamento, idSecretaria, msgMotivo });
      setSucessoMensagem('Tramitação salva com sucesso!');
      listarTramitacoes();
      limparCampos();
    } catch (error) {
      setErro('Erro ao salvar tramitação.');
    }
  };

  const limparCampos = () => {
    setIdTramitar('');
    setMsgMotivo('');
    setIdAgendamento('');
    setIdSecretaria('');
  };

  useEffect(() => {
    carregarAgendamentos();
    carregarSecretarias();
    listarTramitacoes();
  }, []);

  return (
    <div className="bg-white p-0 rounded shadow w-100" style={{ minHeight: '90vh' }}>
      <h2 className="text-center mb-4">
        <FaListAlt /> Tramitar Serviços Agendados
      </h2>

      <Container className="mt-2">
        <Card>
          <Card.Header as="h4">Nova Tramitação</Card.Header>
          <Card.Body>
            <Form>
              <Row className="align-items-center mb-3">
                <Col lg={4}>
                  <Form.Group>
                    <Form.Label>ID de Agendamento de Serviço</Form.Label>
                    <Form.Select
                      value={idAgendamento}
                      onChange={(e) => setIdAgendamento(e.target.value)}
                    >
                      <option value="">Selecione um agendamento</option>
                      {listaAgendamentos.map((agendamento) => (
                        <option key={agendamento.id} value={agendamento.id}>
                          {agendamento.id} - {agendamento.nomeSolicitante}
                        </option>
                      ))}
                    </Form.Select>
                  </Form.Group>
                </Col>
                <Col lg={4}>
                  <Form.Group>
                    <Form.Label>ID Secretaria</Form.Label>
                    <Form.Select
                      value={idSecretaria}
                      onChange={(e) => setIdSecretaria(e.target.value)}
                    >
                      <option value="">Selecione uma secretaria</option>
                      {listaSecretarias.map((secretaria) => (
                        <option key={secretaria.id} value={secretaria.id}>
                          {secretaria.id} - {secretaria.nome}
                        </option>
                      ))}
                    </Form.Select>
                  </Form.Group>
                </Col>
                <Col lg={4}>
                  <Form.Group>
                    <Form.Label>ID Tramitação</Form.Label>
                    <Form.Control
                      type="text"
                      value={idTramitar}
                      readOnly
                      placeholder="ID gerado automaticamente"
                    />
                  </Form.Group>
                </Col>
              </Row>

              <Row className="align-items-center mb-3">
                <Col lg={12}>
                  <Form.Group>
                    <Form.Label>Mensagem</Form.Label>
                    <Form.Control
                      type="text"
                      value={msgMotivo}
                      onChange={(e) => setMsgMotivo(e.target.value)}
                      placeholder="Digite uma mensagem breve"
                    />
                  </Form.Group>
                </Col>
              </Row>

              <Row className="align-items-center">
                <Col lg={2}>
                  <Button variant="primary" onClick={handleSalvarTramitacao} className="w-100">
                    <FaSave /> Salvar Tramitação
                  </Button>
                </Col>
              </Row>

              {sucessoMensagem && (
                <Alert variant="success" className="mt-3">
                  {sucessoMensagem}
                </Alert>
              )}
              {erro && (
                <Alert variant="danger" className="mt-3">
                  {erro}
                </Alert>
              )}
            </Form>
          </Card.Body>
        </Card>

        <Card className="mt-4">
          <Card.Header as="h5">Tramitações Realizadas</Card.Header>
          <Card.Body>
            {listaTramitacoes && listaTramitacoes.length > 0 ? (
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>ID Tramitação</th>
                    <th>Nome do Solicitante</th>
                    <th>CPF Solicitante</th>
                    <th>Mensagem</th>
                    <th>ID Agendamento</th>
                    <th>Secretaria</th>
                    <th>Horário</th>
                  </tr>
                </thead>
                <tbody>
                  {listaTramitacoes.map((tramitacao) => (
                    <tr key={tramitacao.id}>
                      <td>{tramitacao.id}</td>
                      <td>{tramitacao.agserv_nomeSolicitante}</td>
                      <td>{tramitacao.agserv_cpfSolicitante}</td>
                      <td>{tramitacao.MsgMotivo}</td>
                      <td>{tramitacao.agserv_id}</td>
                      <td>{tramitacao.secretaria_nome}</td>
                      <td>{format(new Date(tramitacao.horario), 'HH:mm')}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            ) : (
              <div className="text-center">Nenhuma tramitação para listar</div>
            )}
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
}

export default TramitarServicosAgendados;
