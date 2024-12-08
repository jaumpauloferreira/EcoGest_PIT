import { useEffect, useState } from "react";
import {
  Container,
  Card,
  Row,
  Col,
  Table,
  Form,
  Button,
  Alert,
} from "react-bootstrap";
import { FaListAlt, FaEdit, FaTrashAlt, FaSearch } from "react-icons/fa";
import BeneficiariosForm from "./BeneficiariosForm";
import BeneficiarioService from "../../services/BeneficiarioService";
import "./Beneficiarios.css";

const beneficiarioService = new BeneficiarioService();

function Beneficiarios() {
  const [listaBeneficiarios, setListaBeneficiarios] = useState([]);
  const [selectedBeneficiary, setSelectedBeneficiary] = useState(null);
  const [searchName, setSearchName] = useState("");
  const [sucessoMensagem, setSucessoMensagem] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const handleFillForm = (beneficiary) => {
    setSelectedBeneficiary(beneficiary);
  };

  const listarBeneficiarios = async () => {
    setIsLoading(true);
    try {
      const dados = await beneficiarioService.obterTodosBeneficiarios();
      dados.sort((a, b) => a.nome.localeCompare(b.nome));
      setListaBeneficiarios(dados);
    } catch (error) {
      console.error("Erro ao listar beneficiários:", error);
      setListaBeneficiarios([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleExcluir = async (id) => {
    if (window.confirm("Tem certeza que deseja excluir?")) {
      try {
        await beneficiarioService.deletarBeneficiario(id);
        await listarBeneficiarios();
        setSucessoMensagem("Beneficiário excluído com sucesso!");
        setTimeout(() => setSucessoMensagem(""), 3000);
      } catch (error) {
        console.error("Erro ao excluir beneficiário:", error);
      }
    }
  };

  useEffect(() => {
    listarBeneficiarios();
  }, []);

  const filteredBeneficiaries = listaBeneficiarios.filter((beneficiary) =>
    beneficiary.nome.toLowerCase().includes(searchName.toLowerCase())
  );

  const formattedDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  return (
    <div className="bg-white p-0 rounded shadow w-100" style={{ minHeight: "90vh" }}>
      <h2 className="text-center fs-3">
        <FaListAlt /> CADASTRO DE BENEFICIÁRIOS
      </h2>
      <Container>
        <Card>
          <Card.Header as="h5">Informações Pessoais:</Card.Header>
          <Card.Body>
            <Row>
              <Col>
                <BeneficiariosForm
                  selectedBeneficiary={selectedBeneficiary}
                  onFormSubmit={listarBeneficiarios}
                />
              </Col>
            </Row>
          </Card.Body>
        </Card>
      </Container>
      <hr />
      <h3 className="text-center mt-4">Beneficiários Cadastrados</h3>
      <Container>
        <Alert
          className="alert-success-custom"
          variant="success"
          show={sucessoMensagem !== ""}
        >
          {sucessoMensagem}
        </Alert>
        <Form className="d-flex mb-4">
          <Form.Control
            type="search"
            placeholder="Pesquisar por nome"
            className="me-2"
            aria-label="Search"
            value={searchName}
            onChange={(e) => setSearchName(e.target.value)}
          />
          <Button variant="btn btn-secondary" disabled>
            <FaSearch />
          </Button>
        </Form>
        {isLoading ? (
          <p>Carregando...</p>
        ) : (
          <Table striped bordered hover>
            <thead>
              <tr>
                <th className="text-center">ID</th>
                <th className="text-center">Nome</th>
                <th className="text-center">CPF</th>
                <th className="text-center">Contato</th>
                <th className="text-center">E-mail</th>
                <th className="text-center">Endereço</th>
                <th className="text-center">Bairro</th>
                <th className="text-center">Número</th>
                <th className="text-center">Data de Nascimento</th>
                <th className="text-center">Ações</th>
              </tr>
            </thead>
            <tbody>
              {filteredBeneficiaries.length === 0 ? (
                <tr>
                  <td colSpan="10" className="text-center">
                    Nenhum beneficiário encontrado
                  </td>
                </tr>
              ) : (
                filteredBeneficiaries.map((beneficiary, index) => (
                  <tr key={index}>
                    <td className="text-center">{beneficiary.id}</td>
                    <td>{beneficiary.nome}</td>
                    <td>{beneficiary.cpf}</td>
                    <td>{beneficiary.contato}</td>
                    <td>{beneficiary.email}</td>
                    <td>{beneficiary.endereco}</td>
                    <td>{beneficiary.bairro}</td>
                    <td className="text-center">{beneficiary.numero}</td>
                    <td className="text-center">
                      {formattedDate(beneficiary.datanascimento)}
                    </td>
                    <td className="text-center">
                      <Button
                        variant="link"
                        className="text-primary p-0"
                        onClick={() => handleFillForm(beneficiary)}
                      >
                        <FaEdit />
                      </Button>
                      <Button
                        variant="link"
                        className="text-danger p-0"
                        onClick={() => handleExcluir(beneficiary.id)}
                      >
                        <FaTrashAlt />
                      </Button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </Table>
        )}
      </Container>
    </div>
  );
}

export default Beneficiarios;



