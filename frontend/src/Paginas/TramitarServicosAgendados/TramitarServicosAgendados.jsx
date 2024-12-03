import React, { useEffect, useState } from 'react';
import Select from 'react-select'; // Importação do React-Select
import { Button, Card, Col, Row, Form, Container, Table, Alert } from 'react-bootstrap';
import { FaListAlt, FaSave, FaSearch, FaEdit, FaTrash } from 'react-icons/fa';
import { format } from 'date-fns';
import TramitarServicoService from '../../services/TramitarServicoService';
import RealizarAgServService from '../../services/RealizarAgServService';
import SecretariaService from '../../services/SecretariaService';

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
  const [idEdicao, setIdEdicao] = useState(null);
  const [agendamentoSelectRef, setAgendamentoSelectRef] = useState(null);
  const [secretariaSelectRef, setSecretariaSelectRef] = useState(null);

  function formatCPF(cpf) {
    if (!cpf) return ''; // Verifica se o CPF é válido
    return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
  }

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

  const carregarTramitacaoParaEdicao = (tramitacao) => {
    setIdEdicao(tramitacao.id);
  
    // Encontrar o valor correto na lista de opções para "idAgendamento"
    const agendamentoSelecionado = listaTramitacoes.find(
      (op) => op.id === tramitacao.id_tiposervico
    );
    setIdAgendamento(agendamentoSelecionado ? agendamentoSelecionado.id : '');
  
    // Encontrar o valor correto na lista de opções para "idSecretaria"
    const secretariaSelecionada = listaTramitacoes.find(
      (op) => op.id_secretaria === tramitacao.id_secretaria
    );
    setIdSecretaria(secretariaSelecionada ? secretariaSelecionada.id_secretaria : '');
  
    setMsgMotivo(tramitacao.msg_motivo);
  };
  

  const handleExcluir = async (id) => {
    if (!window.confirm('Tem certeza de que deseja excluir esta tramitação?')) return;
    try {
      await tramitarServicoService.excluir(id);
      setSucessoMensagem('Tramitação excluída com sucesso!');
      carregarTramitacoes();
    } catch {
      setErro('Erro ao excluir tramitação.');
    }
    limparMensagens();
  };

  const handleSalvarTramitacao = async () => {
    if (!idAgendamento || !idSecretaria || !msgMotivo) {
      setErro('Por favor, preencha todos os campos.');
      limparMensagens();
      return;
    }
    try {
      if (idEdicao) {
        await tramitarServicoService.atualizar(idEdicao, {
          id_servico: idAgendamento,
          id_secretaria: idSecretaria,
          msg_motivo: msgMotivo,
          status: 'Em Análise',
        });
        setSucessoMensagem('Tramitação atualizada com sucesso!');
      } else {
        await tramitarServicoService.adicionar({
          id_servico: idAgendamento,
          id_secretaria: idSecretaria,
          msg_motivo: msgMotivo,
        });
        setSucessoMensagem('Tramitação salva com sucesso!');
      }
      limparCampos();
      carregarTramitacoes();
    } catch {
      setErro('Erro ao salvar tramitação.');
    }
    limparMensagens();
  };

  const limparCampos = () => {
    setIdAgendamento('');
    setIdSecretaria('');
    setMsgMotivo('');
    setIdEdicao(null);
  
  if (agendamentoSelectRef) {
    agendamentoSelectRef.clearValue();
  }
  if (agendamentoSelectRef) {
    agendamentoSelectRef.clearValue();
  }
  if (secretariaSelectRef) {
    secretariaSelectRef.clearValue();
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

  useEffect(() => {
    carregarAgendamentos();
    carregarSecretarias();
    carregarTramitacoes();
  }, []);

  const opcoesAgendamento = listaAgendamentos.map((ag) => ({
    value: ag.agserv_id,
    label: `${ag.agserv_nomeSolicitante} - ${ag.agserv_descricao}`,
  }));

  const opcoesSecretaria = listaSecretarias.map((sec) => ({
    value: sec.id,
    label: `${sec.nome_secretaria}`,
  }));

  return (
    <div className="bg-white p-0 rounded shadow w-100" style={{ minHeight: '90vh' }}>
      <h2 className="text-center mb-4 fs-3">
        <FaListAlt /> Tramitar Serviços Agendados
      </h2>

      <Container className="mt-2">
        <Card>
          <Card.Header as="h5">Nova Tramitação</Card.Header>
          <Card.Body>
            <Form>
              <Row className="align-items-center mb-3">
                <Col lg={6}>
                  <Form.Group>
                    <Form.Label>Agendamento de Serviço</Form.Label>
                    <Select
                      options={opcoesAgendamento}
                      value={opcoesAgendamento.find((op) => op.value === idAgendamento)}
                      onChange={(op) => setIdAgendamento(op ? op.value : '')}
                      placeholder="Selecione ou busque um agendamento..."
                      isClearable
                    />
                  </Form.Group>
                </Col>

                <Col lg={6}>
                  <Form.Group>
                    <Form.Label>Secretaria</Form.Label>
                    <Select
                      options={opcoesSecretaria}
                      value={opcoesSecretaria.find((op) => op.value === idSecretaria)}
                      onChange={(op) => setIdSecretaria(op ? op.value : '')}
                      placeholder="Selecione ou busque uma secretaria..."
                      isClearable
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

              <Row className="align-items-center d-md-flex justify-content-md-center">
              <Col lg={2} className="me-2">
              <Button
                    variant="success"
                          onClick={handleSalvarTramitacao}
                          className="w-100"
                          disabled={idEdicao !== null}>
      <FaSave /> Salvar
    </Button>
  </Col>
  <Col lg={2} className="me-2">
    <Button
      variant="warning"
      onClick={handleSalvarTramitacao}
      className="w-100"
      disabled={idEdicao === null}
    >
      <FaEdit /> Atualizar
    </Button>
  </Col>
  <Col lg={2}>
    <Button
      variant="secondary"
      onClick={() => {
        limparCampos();
        setIdEdicao(null);
      }}
      className="w-100"
      disabled={idEdicao === null}
    >
      Cancelar
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
                      <td>{tramitacao.cpfSolicitante ? formatCPF(tramitacao.cpfSolicitante) : '-'}</td>
                      <td>{tramitacao.msg_motivo}</td>
                      <td>{tramitacao.tipo_servico}</td>
                      <td>{tramitacao.nome_secretaria}</td>
                      <td>{tramitacao.data_tramitacao 
                      ? format(new Date(tramitacao.data_tramitacao), 'HH:mm') 
                      : '-'}
                      </td>
                      <td>
                      <div className="d-flex">
                      <Button
                      variant="link"
                      onClick={() => carregarTramitacaoParaEdicao(tramitacao)}
                      className="text-primary fs-5"
                      ><FaEdit />
                      </Button>
                      <Button
                      variant="link"
                      onClick={() => handleExcluir(tramitacao.id)}
                      className="text-danger fs-5">
                      <FaTrash />
                      </Button>
                      </div>
                      </td>
                    </tr> 
                    ))} 
                    </tbody> 
                    </Table> ) : 
                    (<div className="text-center"> 
                    {termoPesquisa ? 'Nenhuma tramitação encontrada para esta pesquisa' : 'Nenhuma tramitação para listar'} 
                    </div> )} 
                    </Card.Body> 
                    </Card> 
                    </Container> 
                    </div> ); }

export default TramitarServicosAgendados;
