import React, { useEffect, useState } from "react";
import Select from "react-select"; // Importação do React-Select
import { Button, Card, Col, Row, Form, Container, Table, Alert, Modal } from "react-bootstrap";
import { FaListAlt, FaSave, FaSearch, FaEdit, FaTrash, FaQuestionCircle } from "react-icons/fa";
import { format } from "date-fns";
import TramitarServicoService from "../../services/TramitarServicoService";
import RealizarAgServService from "../../services/RealizarAgServService";
import SecretariaService from "../../services/SecretariaService";

const tramitarServicoService = new TramitarServicoService();
const realizarAgServService = new RealizarAgServService();
const secretariaService = new SecretariaService();

function TramitarServicosAgendados() {
  const [msgMotivo, setMsgMotivo] = useState("");
  const [idAgendamento, setIdAgendamento] = useState("");
  const [idSecretaria, setIdSecretaria] = useState("");
  const [listaTramitacoes, setListaTramitacoes] = useState([]);
  const [listaAgendamentos, setListaAgendamentos] = useState([]);
  const [listaSecretarias, setListaSecretarias] = useState([]);
  const [sucessoMensagem, setSucessoMensagem] = useState("");
  const [erro, setErro] = useState("");
  const [termoPesquisa, setTermoPesquisa] = useState("");
  const [tramitacoesFiltradas, setTramitacoesFiltradas] = useState([]);
  const [idEdicao, setIdEdicao] = useState(null);
  const [agendamentoSelectRef, setAgendamentoSelectRef] = useState(null);
  const [secretariaSelectRef, setSecretariaSelectRef] = useState(null);
  const [showTutorial, setShowTutorial] = useState(false);

  const handleShowTutorial = () => setShowTutorial(true);
  const handleCloseTutorial = () => setShowTutorial(false);

  function formatCPF(cpf) {
    if (!cpf) return ""; // Verifica se o CPF é válido
    return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
  }

  const limparMensagens = () => {
    setTimeout(() => {
      setSucessoMensagem("");
      setErro("");
    }, 5000);
  };

  useEffect(() => {
    if (!termoPesquisa) {
      setTramitacoesFiltradas(listaTramitacoes);
      return;
    }

    const termoLowerCase = termoPesquisa.toLowerCase();
    const resultadosFiltrados = listaTramitacoes.filter(
      (tramitacao) =>
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
      setErro("Erro ao carregar agendamentos.");
      limparMensagens();
    }
  };

  const carregarSecretarias = async () => {
    try {
      const dados = await secretariaService.obterTodos();
      setListaSecretarias(dados);
    } catch {
      setErro("Erro ao carregar secretarias.");
      limparMensagens();
    }
  };

  const carregarTramitacaoParaEdicao = (tramitacao) => {
    setIdEdicao(tramitacao.id);

    // Encontrar o valor correto na lista de opções para "idAgendamento"
    const agendamentoSelecionado = listaTramitacoes.find(
      (op) => op.id === tramitacao.id_tiposervico
    );
    setIdAgendamento(agendamentoSelecionado ? agendamentoSelecionado.id : "");

    // Encontrar o valor correto na lista de opções para "idSecretaria"
    const secretariaSelecionada = listaTramitacoes.find(
      (op) => op.id_secretaria === tramitacao.id_secretaria
    );
    setIdSecretaria(
      secretariaSelecionada ? secretariaSelecionada.id_secretaria : ""
    );

    setMsgMotivo(tramitacao.msg_motivo);
  };

  const handleExcluir = async (id) => {
    if (!window.confirm("Tem certeza de que deseja excluir esta tramitação?"))
      return;
    try {
      await tramitarServicoService.excluir(id);
      setSucessoMensagem("Tramitação excluída com sucesso!");
      carregarTramitacoes();
    } catch {
      setErro("Erro ao excluir tramitação.");
    }
    limparMensagens();
  };

  const handleSalvarTramitacao = async () => {
    if (!idAgendamento || !idSecretaria || !msgMotivo) {
      setErro("Por favor, preencha todos os campos.");
      limparMensagens();
      return;
    }
    try {
      if (idEdicao) {
        // Atualiza uma tramitação existente
        await tramitarServicoService.atualizar(idEdicao, {
          id_servico: idAgendamento,
          id_secretaria: idSecretaria,
          msg_motivo: msgMotivo,
          status: "Em Análise",
        });
        setSucessoMensagem("Tramitação atualizada com sucesso!");
      } else {
        // Cria uma nova tramitação
        await tramitarServicoService.adicionar({
          id_servico: idAgendamento,
          id_secretaria: idSecretaria,
          msg_motivo: msgMotivo,
        });
        setSucessoMensagem("Tramitação salva com sucesso!");
      }
      limparCampos();
      carregarTramitacoes();
    } catch {
      setErro("Erro ao salvar tramitação.");
    }
    limparMensagens();
  };

  const carregarTramitacoes = async () => {
    try {
      const dados = await tramitarServicoService.obterTodos();
      setListaTramitacoes(dados);
    } catch {
      setErro("Erro ao carregar tramitações.");
      limparMensagens();
    }
  };

  const limparCampos = () => {
    setIdAgendamento("");
    setIdSecretaria("");
    setMsgMotivo("");
    setIdEdicao(null);
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
    <div
      className="bg-white p-0 rounded shadow w-100"
      style={{ minHeight: "90vh" }}
    >
      <h2 className="d-flex justify-content-between align-items-center mb-4 fs-3">
        <span className="mx-auto text-center">
          <FaListAlt /> TRAMITAR SERVIÇOS AGENDADOS
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
                      value={opcoesAgendamento.find(
                        (op) => op.value === idAgendamento
                      )}
                      onChange={(op) => setIdAgendamento(op ? op.value : "")}
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
                      value={opcoesSecretaria.find(
                        (op) => op.value === idSecretaria
                      )}
                      onChange={(op) => setIdSecretaria(op ? op.value : "")}
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
                    disabled={idEdicao !== null}
                  >
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
          <Card.Header
            as="h5"
            className="d-flex justify-content-between align-items-center"
          >
            <span>Tramitações Realizadas</span>
            <div
              className="d-flex align-items-center"
              style={{ width: "300px" }}
            >
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
                    <th className="text-center">Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {tramitacoesFiltradas.map((tramitacao) => (
                    <tr key={tramitacao.id}>
                      <td>{tramitacao.id}</td>
                      <td>{tramitacao.nomeSolicitante}</td>
                      <td>
                        {tramitacao.cpfSolicitante
                          ? formatCPF(tramitacao.cpfSolicitante)
                          : "-"}
                      </td>
                      <td>{tramitacao.msg_motivo}</td>
                      <td>{tramitacao.tipo_servico}</td>
                      <td>{tramitacao.nome_secretaria}</td>
                      <td>
                        {tramitacao.data_tramitacao
                          ? format(
                              new Date(tramitacao.data_tramitacao),
                              "HH:mm"
                            )
                          : "-"}
                      </td>
                      <td>
                        <div className="d-flex">
                          <Button
                            variant="link"
                            onClick={() =>
                              carregarTramitacaoParaEdicao(tramitacao)
                            }
                            className="fs-5"
                          >
                            <FaEdit />
                          </Button>
                          <Button
                            variant="link"
                            onClick={() => handleExcluir(tramitacao.id)}
                            className="text-danger fs-5"
                          >
                            <FaTrash />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            ) : (
              <div className="text-center">
                {termoPesquisa
                  ? "Nenhuma tramitação encontrada para esta pesquisa"
                  : "Nenhuma tramitação para listar"}
              </div>
            )}
          </Card.Body>
        </Card>
      </Container>
      <Modal
        show={showTutorial}
        onHide={handleCloseTutorial}
        size="lg"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Tutorial: Como Criar, Atualizar ou Excluir uma Tramitação</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ol>
            <li>
              <strong>Agendamento:</strong> Selecione o serviço agendado na caixa de seleção <span className="text-primary">"Agendamento de Serviço"</span>.
            </li>
            <li>
              <strong>Secretaria:</strong> Escolha a secretaria responsável no campo <span className="text-primary">"Secretaria"</span>.
            </li>
            <li>
              <strong>Mensagem:</strong> Preencha o motivo da tramitação no campo <span className="text-primary">"Mensagem"</span>.
            </li>
            <li>
              <strong>Salvar:</strong> Clique no botão <Button variant="success" size="sm">Salvar</Button> para registrar uma nova tramitação.
            </li>
            <li>
              <strong>Atualizar:</strong> Para editar uma tramitação existente:
              <ol type="a" className="mt-2">
                <li>Clique no ícone <FaEdit className="text-primary" /> na lista de tramitações.</li>
                <li>Atualize os campos desejados.</li>
                <li>Clique no botão <Button variant="warning" size="sm">Atualizar</Button> para salvar as alterações.</li>
              </ol>
            </li>
            <li>
              <strong>Excluir:</strong> Para remover uma tramitação:
              <ol type="a" className="mt-2">
                <li>Clique no ícone <FaTrash className="text-danger" /> na lista de tramitações.</li>
                <li>Confirme a exclusão na janela que será exibida.</li>
              </ol>
            </li>
            <li>
              <strong>Cancelar:</strong> Caso tenha iniciado uma edição e deseje desistir, clique no botão <Button variant="secondary" size="sm">Cancelar</Button> para limpar os campos sem salvar.
            </li>
            <li>
              <strong>Pesquisar Tramitações:</strong> Use o campo <span className="text-primary">"Pesquisar tramitações"</span> para localizar registros rapidamente.
            </li>
          </ol>
          <img
            src="/tutorial-tramitar-serviço-agendado.png"
            alt="Tutorial de Tramitação"
            className="img-fluid rounded shadow mt-3"
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseTutorial}>
            Fechar
          </Button>
        </Modal.Footer>
      </Modal>


    </div>
  );
}

export default TramitarServicosAgendados;
