import React, { useEffect, useState } from 'react';
import { Button, Card, Col, Row, Form, Container, Table, Alert } from 'react-bootstrap';
import { FaListAlt, FaSave, FaSearch } from 'react-icons/fa';
import { format } from 'date-fns';
import TramitarServicoService from '../../services/TramitarServicoService';
import RealizarAgServService from '../../services/RealizarAgServService';
import SecretariaService from '../../services/SecretariaService';
import CaixaSelecaoTramitar from '../../Componentes/CaixaSelecaoTramitar';

// Instâncias dos serviços
const tramitarServicoService = new TramitarServicoService();
const realizarAgServService = new RealizarAgServService();
const secretariaService = new SecretariaService();

function TramitarServicosAgendados() {
  const [msgMotivo, setMsgMotivo] = useState('');
  const [idAgendamento, setIdAgendamento] = useState('');
  const [idSecretaria, setIdSecretaria] = useState('');
  const [listaTramitacoes, setListaTramitacoes] = useState([]);
  const [listaAgendamentos, setListaAgendamentos] = useState([]);
  const [listaSecretarias, setListaSecretarias] = useState([]);
  const [sucessoMensagem, setSucessoMensagem] = useState('');
  const [erro, setErro] = useState('');
  const [termoPesquisa, setTermoPesquisa] = useState('');
  const [tramitacoesFiltradas, setTramitacoesFiltradas] = useState([]);

  // Função para limpar mensagens após um tempo
  const limparMensagens = () => {
    setTimeout(() => {
      setSucessoMensagem('');
      setErro('');
    }, 5000);
  };

  useEffect(() => {
    if (!termoPesquisa) {
      setTramitacoesFiltradas(listaTramitacoes);
      return;
    }

    const termoLowerCase = termoPesquisa.toLowerCase();
    const resultadosFiltrados = listaTramitacoes.filter(tramitacao =>
      tramitacao.nomeSolicitante?.toLowerCase().includes(termoLowerCase) ||
      tramitacao.cpfSolicitante?.toLowerCase().includes(termoLowerCase) ||
      tramitacao.msg_motivo?.toLowerCase().includes(termoLowerCase) ||
      tramitacao.tipo_servico?.toLowerCase().includes(termoLowerCase) ||
      tramitacao.nome_secretaria?.toLowerCase().includes(termoLowerCase)
    );

    setTramitacoesFiltradas(resultadosFiltrados);
  }, [termoPesquisa, listaTramitacoes]);

  const carregarAgendamentos = async () => {
    try {
      const dados = await realizarAgServService.obterTodos();
      setListaAgendamentos(dados);
    } catch {
      setErro('Erro ao carregar agendamentos.');
      limparMensagens();
    }
  };

  const carregarSecretarias = async () => {
    try {
      const dados = await secretariaService.obterTodos();
      setListaSecretarias(dados);
    } catch {
      setErro('Erro ao carregar secretarias.');
      limparMensagens();
    }
  };

  const handleSalvarTramitacao = async () => {
    if (!idAgendamento || !idSecretaria || !msgMotivo) {
      setErro('Por favor, preencha todos os campos.');
      limparMensagens();
      return;
    }
    try {
      await tramitarServicoService.adicionar({
        id_servico: idAgendamento,
        id_secretaria: idSecretaria,
        msg_motivo: msgMotivo,
      });
      setSucessoMensagem('Tramitação salva com sucesso!');
      limparCampos();
      carregarTramitacoes();
      limparMensagens();
    } catch {
      setErro('Erro ao salvar tramitação.');
      limparMensagens();
    }
  };

  const carregarTramitacoes = async () => {
    try {
      const dados = await tramitarServicoService.obterTodos();
      setListaTramitacoes(dados);
    } catch {
      setErro('Erro ao carregar tramitações.');
      limparMensagens();
    }
  };

  const limparCampos = () => {
    setIdAgendamento('');
    setIdSecretaria('');
    setMsgMotivo('');
  };

  useEffect(() => {
    carregarAgendamentos();
    carregarSecretarias();
    carregarTramitacoes();
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
                <Col lg={6}>
                  <Form.Group>
                    <Form.Label>Agendamento de Serviço</Form.Label>
                    <Form.Select
                      value={idAgendamento}
                      onChange={(e) => setIdAgendamento(e.target.value)}
                    >
                      <option value="">Selecione um agendamento</option>
                      {listaAgendamentos.map((ag) => (
                        <option key={ag.agserv_id} value={ag.agserv_id}>
                          {ag.agserv_nomeSolicitante} - {ag.agserv_descricao}
                        </option>
                      ))}
                    </Form.Select>
                  </Form.Group>
                </Col>

                <Col lg={6}>
                  <Form.Group>
                    <Form.Label>Secretaria</Form.Label>
                    <CaixaSelecaoTramitar
                      enderecoFonteDados="http://localhost:3001/secretaria"
                      campoChave="id"
                      campoExibicao="nome_secretaria"
                      funcaoSelecao={setIdSecretaria}
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

              <Row>
                <Col lg={2}>
                  <Button
                    variant="primary"
                    onClick={handleSalvarTramitacao}
                    className="w-100"
                  >
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
          <Card.Header as="h5" className="d-flex justify-content-between align-items-center">
            <span>Tramitações Realizadas</span>
            <div className="d-flex align-items-center" style={{ width: '300px' }}>
              <FaSearch className="text-secondary me-2" />
              <Form.Control
                type="text"
                placeholder="Pesquisar tramitações..."
                value={termoPesquisa}
                onChange={(e) => setTermoPesquisa(e.target.value)}
              />
            </div>
          </Card.Header>
          <Card.Body>
            {tramitacoesFiltradas.length > 0 ? (
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>ID Tramitação</th>
                    <th>Nome do Solicitante</th>
                    <th>CPF Solicitante</th>
                    <th>Mensagem</th>
                    <th>Serviço Agendado</th>
                    <th>Secretaria</th>
                    <th>Horário</th>
                  </tr>
                </thead>
                <tbody>
                  {tramitacoesFiltradas.map((tramitacao) => (
                    <tr key={tramitacao.id}>
                      <td>{tramitacao.id}</td>
                      <td>{tramitacao.nomeSolicitante}</td>
                      <td>{tramitacao.cpfSolicitante}</td>
                      <td>{tramitacao.msg_motivo}</td>
                      <td>{tramitacao.tipo_servico}</td>
                      <td>{tramitacao.nome_secretaria}</td>
                      <td>
                        {tramitacao.data_tramitacao ? format(new Date(tramitacao.data_tramitacao), 'HH') : '-'} </td> </tr> ))} </tbody> </Table> ) : ( <div className="text-center"> {termoPesquisa ? 'Nenhuma tramitação encontrada para esta pesquisa' : 'Nenhuma tramitação para listar'} </div> )} </Card.Body> </Card> </Container> </div> ); }

export default TramitarServicosAgendados;
