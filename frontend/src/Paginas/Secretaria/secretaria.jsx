import { Button, Col, Form, Row, Container, Table, Alert, Card } from 'react-bootstrap';
import { FaCheckCircle, FaTrash, FaListAlt, FaEdit, FaSearch } from 'react-icons/fa';
import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from "react-router-dom";
import SecretariaService from '../../services/SecretariaService';

const secretariaService = new SecretariaService();

function Secretaria() {
    const [sucessoMensagem, setSucessoMensagem] = useState('');
    const [validated, setValidated] = useState(false);
    const [id, setId] = useState("");
    const [nome_secretaria, setNomeSecretaria] = useState("");
    const { idSecretaria } = useParams();
    const navigate = useNavigate();
    const [errors, setErrors] = useState({});
    const [listaSecretarias, setListaSecretarias] = useState([]);
    const [termoBusca, setTermoBusca] = useState("");
    const [isLoading, setIsLoading] = useState(true);

    const handleBuscaChange = (event) => {
        setTermoBusca(event.target.value);
    };

    const handleFiltrar = async () => {
        await listarSecretarias(termoBusca);
    };

    const listarSecretarias = async (termoBusca) => {
        setIsLoading(true);
        try {
            let dados = [];
            if (termoBusca) {
                dados = await secretariaService.filtrar(termoBusca);
            } else {
                dados = await secretariaService.obterTodos();
            }
            setListaSecretarias(dados);
        } catch (error) {
            console.error('Erro ao listar secretarias:', error);
            setListaSecretarias([]);
        } finally {
            setIsLoading(false);
        }
    };

    const carregarSecretarias = async () => {
        setIsLoading(true);
        try {
            const dados = await secretariaService.obterTodos();
            setListaSecretarias(dados);
        } catch (error) {
            console.error('Erro ao carregar secretarias:', error);
            setListaSecretarias([]);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        const obterSecretaria = async () => {
            try {
                if (idSecretaria) {
                    const dados = await secretariaService.obterPorId(idSecretaria);
                    setId(dados.id);
                    setNomeSecretaria(dados.nome_secretaria);
                } else {
                    setId("");
                    setNomeSecretaria("");
                }
            } catch (error) {
                console.error("Erro ao obter a secretaria:", error);
            }
        };

        obterSecretaria();
        listarSecretarias();
    }, [idSecretaria]);

    const handleExcluir = async (id) => {
        if (window.confirm('Tem certeza que deseja excluir a secretaria?')) {
            try {
                await secretariaService.delete(id);
                await listarSecretarias();
            } catch (error) {
                console.error('Erro ao excluir secretaria:', error);
            }
        }
    };

    const handleNomeSecretaria = (e) => {
        const value = e.target.value;
        setNomeSecretaria(value);
        setErrors((prev) => ({
            ...prev,
            nome_secretaria: value === "" ? 'O campo não pode estar vazio.' : value.length > 100 ? 'O campo não aceita mais de 100 caracteres.' : null
        }));
    };

    async function handleSalvar(event) {
        event.preventDefault();
        const form = event.currentTarget;
        let newErros = {};

        if (form.checkValidity() === false) {
            event.stopPropagation();
        }

        if (!nome_secretaria) {
            newErros.nome_secretaria = 'O campo não pode estar vazio.';
        } else if (nome_secretaria.length > 100) {
            newErros.nome_secretaria = 'O campo não aceita mais de 100 caracteres.';
        }

        if (Object.keys(newErros).length > 0) {
            setErrors(newErros);
            setValidated(true);
        } else {
            const secretaria = {
                id: id || 0,
                nome_secretaria: nome_secretaria,
            };

            try {
                if (idSecretaria === undefined) {
                    await secretariaService.adicionar(secretaria);
                    setSucessoMensagem('Secretaria cadastrada com sucesso!');
                } else {
                    await secretariaService.atualizar(idSecretaria, secretaria);
                    setSucessoMensagem('Secretaria atualizada com sucesso!');
                }
                carregarSecretarias();
                form.reset();
                setNomeSecretaria('');
                setValidated(false);

                setTimeout(() => {
                    setSucessoMensagem('');
                    setErrors({});
                    navigate('/secretaria');
                }, 3000);
            } catch (error) {
                console.error('Erro ao salvar secretaria:', error);
            }
        }
    }

    return (
        <div className="bg-white p-0 rounded shadow w-100" style={{ minHeight: "90vh" }}>
            <h2 className="text-center mb-4 fs-3">
                <FaListAlt /> CADASTRO DE SECRETARIA
            </h2>
            <Container className='form-colab'>
                <Card>
                    <Card.Header as="h5">Informações da Secretaria</Card.Header>
                    <Card.Body>
                        <Form noValidate validated={validated} onSubmit={handleSalvar}>
                            <Row>
                                <Form.Group as={Col} xs={1} controlId='id' className="mt-3">
                                    <Form.Label>ID</Form.Label>
                                    <Form.Control 
                                        type="text" 
                                        disabled 
                                        value={id} 
                                    />
                                </Form.Group>
                                <Col xs='5' className='mt-3'>
                                    <Form.Group controlId='nome_secretaria'>
                                        <Form.Label>Nome da Secretaria</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder="Nome da Secretaria"
                                            required
                                            value={nome_secretaria}
                                            isInvalid={!!errors.nome_secretaria}
                                            onChange={handleNomeSecretaria}
                                            name="nome_secretaria"
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {errors.nome_secretaria}
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                </Col>
                                <Alert 
                                    className="alert-success-custom" 
                                    variant='success' 
                                    show={sucessoMensagem !== ""}
                                >
                                    <b><FaCheckCircle /></b> {sucessoMensagem}
                                </Alert>
                            </Row>
                            <Row>
                                <Col className='row justify-content-center mt-4'>
                                    <Col className='col-auto'>
                                        <Button 
                                            type="submit" 
                                            variant='success m-1' 
                                            className="btn btn-success btn-lg me-2" 
                                            disabled={!!id}
                                        >
                                            Cadastrar
                                        </Button>
                                        <Button 
                                            type="submit" 
                                            variant='warning m-1' 
                                            className="btn btn-warning btn-lg me-2" 
                                            disabled={!id}
                                        >
                                            Atualizar
                                        </Button>
                                    </Col>
                                </Col>
                            </Row>
                        </Form>
                    </Card.Body>
                </Card>

                <h2 className="text-center mb-4 mt-4 fs-3"><FaListAlt /> LISTA DE SECRETARIAS</h2>
                <Form className="d-flex">
                    <Form.Control
                        type="search"
                        placeholder="Pesquisar por nome da secretaria"
                        className="me-2"
                        aria-label="Search"
                        value={termoBusca}
                        onChange={handleBuscaChange}
                    />
                    <Button variant="btn btn-secondary" onClick={handleFiltrar}>
                        <FaSearch />
                    </Button>
                </Form>
                {isLoading ? (
                    <p>Carregando...</p>
                ) : (
                    <Table striped bordered hover className='mt-4'>
                        <thead className='bg-green text-white'>
                            <tr>
                                <th scope="col">ID</th>
                                <th scope="col">Nome da Secretaria</th>
                                <th scope="col">Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {listaSecretarias.length === 0 ? (
                                <tr>
                                    <td colSpan="3">Nenhuma secretaria cadastrada</td>
                                </tr>
                            ) : (
                                listaSecretarias.map((secretaria) => (
                                    <tr key={secretaria.id}>
                                        <td>{secretaria.id}</td>
                                        <td>{secretaria.nome_secretaria}</td>
                                        <td>
                                            <div className="align-items-center">
                                                <Link 
                                                    to={`/secretaria/${secretaria.id}`} 
                                                    className='text-primary fs-5'
                                                >
                                                    <FaEdit />
                                                </Link>
                                                <Button 
                                                    variant="link" 
                                                    onClick={() => handleExcluir(secretaria.id)} 
                                                    className='text-danger fs-5'
                                                >
                                                    <FaTrash />
                                                </Button>
                                            </div>
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

export default Secretaria;