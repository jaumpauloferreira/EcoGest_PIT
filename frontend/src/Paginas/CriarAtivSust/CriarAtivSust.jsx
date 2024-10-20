import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  Col,
  Row,
  Form,
  Container,
  Alert,
  Table,
  FormLabel,
} from "react-bootstrap";
import { FaListAlt, FaTrash, FaEdit, FaSearch } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import AtivSustService from "../../services/AtivSustService.js";
import CaixaSelecao from "../../Componentes/CaixaSelecaoTipoAtividade.jsx";

const ativSustService = new AtivSustService(); // Instância do serviço

// Função para formatar a data no formato DD/MM/YYYY
const formatarData = (dataString) => {
  const data = new Date(dataString);
  const dia = String(data.getDate()).padStart(2, "0");
  const mes = String(data.getMonth() + 1).padStart(2, "0"); // Meses começam do zero
  const ano = data.getFullYear();
  return `${dia}/${mes}/${ano}`;
};

function CriarAtivSust() {
  const [atividade, setAtividade] = useState({
    id: 0,
    criar_nome: "",
    criar_cpf: "",
    criar_contato: "",
    criar_endereco: "",
    criar_bairro: "",
    criar_numero: "",
    tipoAtividade: {
      id: 0,
      nome: "",
    },
    criar_data: "",
    criar_horarioInicial: "",
    criar_horarioFinal: "",
    criar_descricao: "",
  });

  const [listaAtividades, setListaAtividades] = useState(null);
  const [tiposAtividades, setTiposAtividades] = useState([]); // Estado para armazenar os tipos de atividades
  const [sucessoMensagem, setSucessoMensagem] = useState("");
  const [erro, setErro] = useState("");
  const [searchName, setSearchName] = useState(""); // Estado para o campo de busca
  const [mostrarTabela, setMostrarTabela] = useState(false); // Controla exibição da tabela filtrada
  const navigate = useNavigate();
  const { idAtivSust } = useParams(); // Obtém o ID da atividade da URL
  const [errors, setErrors] = useState({});
  const [validated, setValidated] = useState(false);

  const handleSelecaoAtividade = (atividadeSelecionada) => {
    setAtividade((prevAtividade) => ({
      ...prevAtividade,
      tipoAtividade: { id: atividadeSelecionada.id, nome: atividadeSelecionada.nome },
    }));
  };

  const listarAtividades = async (termoBusca) => {
    let dados = [];
    if (termoBusca) {
      dados = await ativSustService.filtrar(termoBusca);
    } else {
      dados = await ativSustService.obterTodos();
    }
    const atividadesComDataFormatada = dados.map((atividade) => ({
      ...atividade,
      criar_data: formatarData(atividade.criar_data),
    }));
    setListaAtividades(atividadesComDataFormatada); // Atualiza a lista com as atividades buscadas
    setMostrarTabela(true); // Exibe a tabela após carregar atividades
  };

  useEffect(() => {
    const carregarTiposAtividades = async () => {
      try {
        const tipos = await ativSustService.obterTipos();
        setTiposAtividades(tipos);
      } catch (error) {
        setErro("Erro ao carregar tipos de atividades.");
      }
    };

    const carregarAtividades = async () => {
      await listarAtividades(); // Carregar atividades quando o componente montar
    };

    carregarTiposAtividades();
    carregarAtividades();

    if (idAtivSust) {
      const obterAtivSust = async () => {
        try {
          const dados = await ativSustService.obterPorId(idAtivSust);
          dados.criar_data = formatarData(dados.criar_data); // Formata a data ao obter a atividade
          setAtividade(dados); // Preenche o formulário com os dados da atividade
        } catch (error) {
          setErro("Erro ao obter atividade.");
        }
      };
      obterAtivSust();
    }
  }, [idAtivSust]);

  useEffect(() => {
    if (sucessoMensagem) {
      const timer = setTimeout(() => {
        setSucessoMensagem("");
      }, 3000);
      return () => clearTimeout(timer); // Limpa o timer ao desmontar o componente
    }
  }, [sucessoMensagem]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAtividade((prev) => ({ ...prev, [name]: value }));
  };

  const validateFields = () => {
    const newErrors = {};

    if (!atividade.criar_nome) newErrors.nome = "O Nome não pode estar vazio.";
    if (!atividade.criar_cpf) newErrors.cpf = "O CPF não pode estar vazio.";
    if (!atividade.criar_contato) newErrors.contato = "O Contato não pode estar vazio.";
    if (!atividade.criar_endereco) newErrors.endereco = "O Endereço não pode estar vazio.";
    if (!atividade.criar_bairro) newErrors.bairro = "O Bairro não pode estar vazio.";
    if (!atividade.tipoAtividade || !atividade.tipoAtividade.id) {
      newErrors.tipoAtividade = "Selecione um tipo de atividade.";
    }
    if (!atividade.criar_data) newErrors.data = "A Data é obrigatória.";
    if (!atividade.criar_horarioInicial) newErrors.horarioInicial = "A Hora Inicial é obrigatória.";
    if (!atividade.criar_horarioFinal) newErrors.horarioFinal = "A Hora Final é obrigatória.";
    if (!atividade.criar_descricao) newErrors.descricao = "A Descrição é obrigatória.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSalvar = async (event) => {
    event.preventDefault();
    const isValid = validateFields();

    if (!isValid) {
      setErro("Por favor, corrija os campos em vermelho.");
      return;
    }

    try {
      const dados = {
        id: atividade.id,
        criar_nome: atividade.criar_nome,
        criar_cpf: atividade.criar_cpf,
        criar_contato: atividade.criar_contato,
        criar_endereco: atividade.criar_endereco,
        criar_bairro: atividade.criar_bairro,
        criar_numero: atividade.criar_numero,
        tipoAtividade: atividade.tipoAtividade.id, // Pegando o ID da atividade
        criar_data: atividade.criar_data,
        criar_horarioInicial: atividade.criar_horarioInicial,
        criar_horarioFinal: atividade.criar_horarioFinal,
        criar_descricao: atividade.criar_descricao,
      };

      if (!idAtivSust) {
        await ativSustService.adicionar(dados); // Caso seja um novo cadastro
        setSucessoMensagem("Atividade cadastrada com sucesso!");
      } else {
        await ativSustService.atualizar(idAtivSust, dados); // Atualização no banco de dados
        setSucessoMensagem("Atividade atualizada com sucesso!");
      }

      await listarAtividades(); // Atualiza a lista de atividades
      navigate("/criarativsust");
    } catch (error) {
      setErro(`Erro ao salvar a atividade: ${error.message}`);
    }
  };

  const handleAtualizar = async () => {
    const isValid = validateFields(); // Valida os campos antes de atualizar
    if (!isValid) return;

    try {
      const dados = {
        id: atividade.id,
        criar_nome: atividade.criar_nome,
        criar_cpf: atividade.criar_cpf,
        criar_contato: atividade.criar_contato,
        criar_endereco: atividade.criar_endereco,
        criar_bairro: atividade.criar_bairro,
        criar_numero: atividade.criar_numero,
        tipoAtividade: atividade.tipoAtividade.id,
        criar_data: atividade.criar_data,
        criar_horarioInicial: atividade.criar_horarioInicial,
        criar_horarioFinal: atividade.criar_horarioFinal,
        criar_descricao: atividade.criar_descricao,
      };

      await ativSustService.atualizar(atividade.id, dados);

      const atividadesAtualizadas = await ativSustService.obterTodos();
      const atividadesComDataFormatada = atividadesAtualizadas.map((atividade) => ({
        ...atividade,
        criar_data: formatarData(atividade.criar_data),
      }));

      setListaAtividades(atividadesComDataFormatada); // Atualiza a lista com as datas formatadas

      setSucessoMensagem("Atividade atualizada com sucesso!");
      navigate("/criarativsust");
    } catch (error) {
      setErro(`Erro ao atualizar a atividade: ${error.message}`);
    }
  };

  const handleExcluir = async (id) => {
    if (window.confirm("Tem certeza que deseja excluir?")) {
      await ativSustService.excluir(id);
      setSucessoMensagem("Atividade excluída com sucesso!");
      await listarAtividades(); // Atualiza a lista após exclusão
    }
  };

  const handleEditar = async (id) => {
    try {
      const dados = await ativSustService.obterPorId(id);
      dados.criar_data = formatarData(dados.criar_data); // Formata a data ao editar
      setAtividade(dados); // Preenche o formulário com a atividade a ser editada
    } catch (error) {
      setErro("Erro ao obter dados da atividade.");
    }
  };

  // Filtro por nome
  const filteredAtividades = listaAtividades?.filter((atividade) =>
    atividade.criar_nome.toLowerCase().includes(searchName.toLowerCase())
  );

  return (
    <div className="bg-white p-0 rounded shadow w-100" style={{ minHeight: "90vh" }}>
      <h2 className="text-center mb-4">
        <FaListAlt /> CRIAR ATIVIDADE SUSTENTÁVEL
      </h2>

      <Container className="mt-2">
        <Card>
          <Card.Header as="h4">Informações do Solicitante</Card.Header>
          <Card.Body>
            <Form noValidate validated={validated} onSubmit={handleSalvar}>
              <Row className="align-items-center mb-3">
                <Col lg={1}>
                  <Form.Group>
                    <Form.Label>ID</Form.Label>
                    <Form.Control
                      className="border-secondary"
                      type="text"
                      name="id"
                      value={atividade.id}
                      placeholder="ID"
                      disabled
                    />
                  </Form.Group>
                </Col>
                <Col lg={5}>
                  <Form.Group>
                    <Form.Label>Nome</Form.Label>
                    <Form.Control
                      className="border-secondary"
                      type="text"
                      name="criar_nome"
                      value={atividade.criar_nome}
                      onChange={handleChange}
                      placeholder="Digite seu nome completo"
                      isInvalid={!!errors.nome}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.nome}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
                <Col lg={3}>
                  <Form.Group>
                    <Form.Label>CPF</Form.Label>
                    <Form.Control
                      className="border-secondary"
                      type="text"
                      name="criar_cpf"
                      value={atividade.criar_cpf}
                      onChange={handleChange}
                      placeholder="Digite o seu CPF"
                      isInvalid={!!errors.cpf}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.cpf}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
                <Col lg={3}>
                  <Form.Group>
                    <Form.Label>Contato</Form.Label>
                    <Form.Control
                      className="border-secondary"
                      type="text"
                      name="criar_contato"
                      value={atividade.criar_contato}
                      onChange={handleChange}
                      placeholder="(00) 00000-0000"
                      isInvalid={!!errors.contato}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.contato}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
              </Row>

              <Card>
                <Card.Header as="h4">Local onde será realizado</Card.Header>
                <Card.Body>
                  <Row className="align-items-center mb-3">
                    <Col lg={7}>
                      <Form.Group>
                        <Form.Label>Endereço</Form.Label>
                        <Form.Control
                          className="border-secondary"
                          type="text"
                          name="criar_endereco"
                          value={atividade.criar_endereco}
                          onChange={handleChange}
                          placeholder="Digite o seu endereço"
                          isInvalid={!!errors.endereco}
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.endereco}
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                    <Col lg={4}>
                      <Form.Group>
                        <Form.Label>Bairro</Form.Label>
                        <Form.Control
                          className="border-secondary"
                          type="text"
                          name="criar_bairro"
                          value={atividade.criar_bairro}
                          onChange={handleChange}
                          placeholder="Digite o seu bairro"
                          isInvalid={!!errors.bairro}
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.bairro}
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                    <Col lg={1}>
                      <Form.Group>
                        <Form.Label>Número</Form.Label>
                        <Form.Control
                          className="border-secondary"
                          type="text"
                          name="criar_numero"
                          value={atividade.criar_numero}
                          onChange={handleChange}
                          placeholder="S/N"
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>

              <Card>
                <Card.Header as="h4">Detalhes da Atividade Sustentável</Card.Header>
                <Card.Body>
                  <Row className="align-items-center mb-3">
                    <Col lg={6}>
                      <Form.Group controlId="formTipoAtividade">
                        <Form.Label>Tipo de Atividade</Form.Label>
                        <CaixaSelecao
                          enderecoFonteDados="http://localhost:3001/cadtipoativsust"
                          campoChave="id"
                          campoExibicao="nome"
                          funcaoSelecao={handleSelecaoAtividade}
                          localLista={tiposAtividades}
                        />
                      </Form.Group>
                    </Col>
                    <Col lg={2}>
                      <Form.Group>
                        <Form.Label>Data</Form.Label>
                        <Form.Control
                          className="border-secondary"
                          type="date"
                          name="criar_data"
                          value={atividade.criar_data}
                          onChange={handleChange}
                          isInvalid={!!errors.data}
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.data}
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                    <Col lg={2}>
                      <Form.Group>
                        <Form.Label>Horário Inicial</Form.Label>
                        <Form.Control
                          className="border-secondary"
                          type="time"
                          name="criar_horarioInicial"
                          value={atividade.criar_horarioInicial}
                          onChange={handleChange}
                          isInvalid={!!errors.horarioInicial}
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.horarioInicial}
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                    <Col lg={2}>
                      <Form.Group>
                        <Form.Label>Horário Final</Form.Label>
                        <Form.Control
                          className="border-secondary"
                          type="time"
                          name="criar_horarioFinal"
                          value={atividade.criar_horarioFinal}
                          onChange={handleChange}
                          isInvalid={!!errors.horarioFinal}
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.horarioFinal}
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                  </Row>

                  <Row className="align-items-center mb-3">
                    <Col lg={12}>
                      <Form.Group>
                        <Form.Label>Descrição Completa da Atividade</Form.Label>
                        <Form.Control
                          className="border-secondary"
                          as="textarea"
                          rows={3}
                          name="criar_descricao"
                          value={atividade.criar_descricao}
                          onChange={handleChange}
                          placeholder="Descrição completa da atividade"
                          isInvalid={!!errors.descricao}
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.descricao}
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                  </Row>

                  <Row className="align-items-center d-md-flex justify-content-md-center">
                    <Col lg={2}>
                      <Button variant="success" type="submit" className="w-100">
                        Cadastrar
                      </Button>
                    </Col>
                    <Col lg={2}>
                      <Button variant="warning" onClick={handleAtualizar} className="w-100">
                        Atualizar
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
                </Card.Body>
              </Card>
            </Form>
          </Card.Body>
        </Card>
      </Container>

      <Container className="mt-2">
        <Card>
          <Card.Header as="h5">Atividades Cadastradas</Card.Header>
          <Card.Body>
            <Form className="d-flex justify-content-start mb-4">
              <FormLabel
                className="me-2"
                style={{ fontWeight: "bold", fontSize: "1.2rem" }} // Estilo ajustado para negrito e tamanho da fonte maior
              >
                Pesquise
              </FormLabel>
              <Form.Control
                type="text"
                placeholder="Pesquise o nome"
                value={searchName}
                onChange={(e) => setSearchName(e.target.value)}
                className="me-2"
              />
              <Button onClick={() => listarAtividades(searchName)} variant="secondary">
                <FaSearch />
              </Button>
            </Form>

            {mostrarTabela && listaAtividades && listaAtividades.length > 0 ? (
              <Table className="striped bordered hover">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th colSpan={3}>Nome da Solicitante</th>
                    <th colSpan={2}>CPF</th>
                    <th colSpan={2}>Contato</th>
                    <th colSpan={2}>Data</th>
                    <th colSpan={2}>Atividade</th>
                    <th colSpan={2}>Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredAtividades.map((atividade) => (
                    <tr key={atividade.criar_id}>
                      <td>{atividade.criar_id}</td>
                      <td colSpan={3}>{atividade.criar_nome}</td>
                      <td colSpan={2}>{atividade.criar_cpf}</td>
                      <td colSpan={2}>{atividade.criar_contato}</td>
                      <td colSpan={2}>{atividade.criar_data}</td>
                      <td colSpan={2}>{atividade.tipo_atividade}</td>
                      <td>
                        <div className="d-flex">
                          <Button
                            variant="link"
                            onClick={() => handleEditar(atividade.criar_id)}
                            className="text-primary fs-5"
                          >
                            <FaEdit />
                          </Button>
                          <Button
                            variant="link"
                            onClick={() => handleExcluir(atividade.criar_id)}
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
              <div className="text-center">Nenhum item para listar</div>
            )}
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
}

export default CriarAtivSust;

