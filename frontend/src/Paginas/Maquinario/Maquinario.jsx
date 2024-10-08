import { Button, Col, Form, Row, Container, Table, Alert, FormLabel } from 'react-bootstrap';
import { FaCheckCircle, FaTrash, FaListAlt, FaEdit, FaSearch } from 'react-icons/fa';
import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from "react-router-dom";
import './Maquinario.css';
import MaquinarioService from '../../services/MaquinarioService';

const maquinarioService = new MaquinarioService();

function Maquinario() {
    const [sucessoMensagem, setSucessoMensagem] = useState('');
    const [validated, setValidated] = useState(false);
    const [id, setId] = useState("");
    const [modelo, setModelo] = useState("");
    const [placa, setPlaca] = useState("");
    const [ano, setAno] = useState("");
    const { idMaquinario } = useParams();
    const navigate = useNavigate();
    const [errors, setErrors] = useState({});
    const [listaMaquinario, setListaMaquinario] = useState([]);
    const [termoBusca, setTermoBusca] = useState("");
    const [isLoading, setIsLoading] = useState(true);

    const handleBuscaChange = (event) => {
        setTermoBusca(event.target.value);
    };

    const handleFiltrar = async () => {
        await listarMaquinarios(termoBusca);
    };

    const listarMaquinarios = async (termoBusca) => {
        setIsLoading(true);
        try {
            let dados = [];
            if (termoBusca) {
                dados = await maquinarioService.filtrar(termoBusca);
            } else {
                dados = await maquinarioService.obterTodos();
            }
            setListaMaquinario(dados);
        } catch (error) {
            console.error('Erro ao listar maquinários:', error);
            setListaMaquinario([]);
        } finally {
            setIsLoading(false);
        }
    };

    const carregarMaquinarios = async () => {
        setIsLoading(true);
        try {
            const dados = await maquinarioService.obterTodos();
            setListaMaquinario(dados);
        } catch (error) {
            console.error('Erro ao carregar maquinários:', error);
            setListaMaquinario([]);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        const obterMaquinario = async () => {
            try {
                if (idMaquinario) {
                    const dados = await maquinarioService.obterPorId(idMaquinario);
                    setId(dados.id);
                    setModelo(dados.modelo);
                    setPlaca(dados.placa);
                    setAno(dados.ano);
                } else {
                    setId("");
                    setModelo("");
                    setPlaca("");
                    setAno("");
                }
            } catch (error) {
                console.error("Erro ao obter o maquinário:", error);
            }
        };

        obterMaquinario();
        listarMaquinarios();
    }, [idMaquinario]);

    const handleExcluir = async (id) => {
        if (window.confirm('Tem Certeza que Deseja Excluir o Maquinário?')) {
            try {
                await maquinarioService.delete(id);
                await listarMaquinarios();
            } catch (error) {
                console.error('Erro ao excluir maquinário:', error);
            }
        }
    };

    const handleModelo = (e) => {
        const value = e.target.value;
        setModelo(value);
        setErrors((prev) => ({
            ...prev,
            modelo: value === "" ? 'O campo não pode estar vazio.' : value.length > 50 ? 'O campo não aceita mais de 50 caracteres.' : null
        }));
    };

    const handlePlaca = (e) => {
        const value = e.target.value;
        setPlaca(value);
        setErrors((prev) => ({
            ...prev,
            placa: value === "" ? 'O campo não pode estar vazio.' : value.length > 50 ? 'O campo não aceita mais de 50 caracteres.' : null
        }));
    };

    const handleAno = (e) => {
        const value = e.target.value;
        setAno(value);
        setErrors((prev) => ({
            ...prev,
            ano: value === "" ? 'O campo não pode estar vazio.' : value.length > 4 ? 'O campo não aceita mais de 4 caracteres.' : null
        }));
    };

    async function handleSalvar(event) {
        event.preventDefault();
        const form = event.currentTarget;
        let newErros = {};

        if (form.checkValidity() === false) {
            event.stopPropagation();
        }

        if (!modelo) {
            newErros.modelo = 'O campo não pode estar vazio.';
        } else if (modelo.length > 50) {
            newErros.modelo = 'O campo não aceita mais de 50 caracteres.';
        }

        if (!placa) {
            newErros.placa = 'O campo não pode estar vazio.';
        } else if (placa.length > 50) {
            newErros.placa = 'O campo não aceita mais de 50 caracteres.';
        }

        if (!ano) {
            newErros.ano = 'O campo não pode estar vazio.';
        } else if (ano.length > 4) {
            newErros.ano = 'O campo não aceita mais de 4 caracteres.';
        }

        if (Object.keys(newErros).length > 0) {
            setErrors(newErros);
            setValidated(true);
        } else {
            const maquinario = {
                id: id || 0,
                modelo: form.modelo.value,
                placa: form.placa.value,
                ano: form.ano.value,
            };

            try {
                if (idMaquinario === undefined) {
                    await maquinarioService.adicionar(maquinario);
                    setSucessoMensagem('Maquinario Cadastrado com Sucesso!');
                } else {
                    await maquinarioService.atualizar(idMaquinario, maquinario);
                    setSucessoMensagem('Maquinário Atualizado com Sucesso!');
                }
                carregarMaquinarios();
                form.reset();
                setModelo('');
                setPlaca('');
                setAno('');
                setValidated(false);

                setTimeout(() => {
                    setSucessoMensagem('');
                    setErrors({});
                    navigate('/maquinario');
                }, 3000);
            } catch (error) {
                console.error('Erro ao salvar maquinário:', error);
            }
        }
    }

    return (
        <>
            <Container className='form-colab'>
                <h2 className="text-center mb-4"><FaListAlt /> CADASTRO DE MAQUINÁRIO</h2>
                <Col className="card borda">
                    <hr />
                    <Col className="card-body">
                        <Form noValidate validated={validated} onSubmit={handleSalvar}>
                            <Row>
                            <Form.Group as={Col} xs={1} controlId='id' className="mt-3">
                                    <Form.Label>ID</Form.Label>
                                <Form.Control type="text" className="form-control" placeholder="ID" aria-label="ID" aria-describedby="basic-addon2" disabled value={id} />
                                </Form.Group>
                                <Col xs='3' className='mt-3'>
                                    <Form.Group controlId='modelo'>
                                        <Form.Label>Modelo</Form.Label>
                                        <Col className="input-group mb-3">
                                            <Form.Control
                                                type="text"
                                                className="form-control"
                                                placeholder="Modelo do Maquinario"
                                                aria-label="Recipient's username"
                                                aria-describedby="basic-addon2"
                                                required
                                                value={modelo}
                                                isInvalid={!!errors.modelo}
                                                onChange={handleModelo}
                                                name="modelo"
                                            />
                                            <Form.Control.Feedback type="invalid">
                                                {errors.modelo}
                                            </Form.Control.Feedback>
                                        </Col>
                                    </Form.Group>
                                </Col>

                                <Col xs='3' className='mt-3'>
                                    <Form.Group controlId='placa'>
                                        <Form.Label>Placa</Form.Label>
                                        <Col className="input-group mb-3">
                                            <Form.Control
                                                type="text"
                                                className="form-control"
                                                placeholder="Placa do Maquinário"
                                                aria-label="Recipient's username"
                                                aria-describedby="basic-addon2"
                                                required
                                                value={placa}
                                                isInvalid={!!errors.placa}
                                                onChange={handlePlaca}
                                                name='placa'
                                            />
                                            <Form.Control.Feedback type="invalid">
                                                {errors.placa}
                                            </Form.Control.Feedback>
                                        </Col>
                                    </Form.Group>
                                </Col>

                                <Col xs='3' className='mt-3'>
                                    <Form.Group controlId='ano'>
                                        <FormLabel>Ano do Maquinário</FormLabel>
                                        <Col className="input-group mb-3">
                                            <Form.Control
                                                type="text"
                                                className="form-control"
                                                placeholder="Ano do Maquinário"
                                                aria-label="Recipient's username"
                                                aria-describedby="basic-addon2"
                                                required
                                                value={ano}
                                                isInvalid={!!errors.ano}
                                                onChange={handleAno}
                                                name='ano'
                                            />
                                            <Form.Control.Feedback type="invalid">
                                                {errors.ano}
                                            </Form.Control.Feedback>
                                        </Col>
                                    </Form.Group>
                                </Col>
                                <Alert className="alert-success-custom" variant='success' show={sucessoMensagem !== ""}> <b> <FaCheckCircle></FaCheckCircle> </b>{sucessoMensagem}</Alert>
                            </Row>
                            <Row>
                                <Col className='row justify-content-center'>
                                    <Col className='col-auto'>
                                        <Button type="submit" variant='success m-1' className="btn btn-success btn-lg me-2" disabled={!!id}>Cadastrar</Button>
                                        <Button type="submit" variant='warning m-1' className="btn btn-warning btn-lg me-2" disabled={!id}>Atualizar</Button>
                                    </Col>
                                </Col>
                            </Row>
                        </Form>
                    </Col>
                </Col>

                <h2 className="text-center mb-4 mt-4"><FaListAlt /> LISTA DE MAQUINÁRIOS</h2>
                <Form className="d-flex">
                    <Form.Control
                        type="search"
                        placeholder="Pesquisar por modelo"
                        className="me-2"
                        aria-label="Search"
                        value={termoBusca}
                        onChange={handleBuscaChange}
                    />
                    <Button variant="btn btn-secondary" onClick={handleFiltrar}> <FaSearch /> </Button>
                </Form>
                {isLoading ? (
                    <p>Carregando...</p>
                ) : (
                    <Table striped bordered hover className="table mt-5 custom-table">
                        <thead className='bg-green text-white'>
                            <tr>
                                <th scope="col" className="w-20">ID</th>
                                <th scope="col" className="w-20">Modelo</th>
                                <th scope="col" className="w-20">Placa</th>
                                <th scope="col" className="w-20">Ano</th>
                                <th scope="col" className="w-20">Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {listaMaquinario.length === 0 ? (
                                <tr>
                                    <td colSpan="5">Nenhum maquinário cadastrado</td>
                                </tr>
                            ) : (
                                listaMaquinario.map((maquinario) => (
                                    <tr key={maquinario.id}>
                                        <td>{maquinario.id}</td>
                                        <td>{maquinario.modelo}</td>
                                        <td>{maquinario.placa}</td>
                                        <td>{maquinario.ano}</td>
                                        <td>
                                            <div className="align-items-center">
                                                <Link to={`/maquinario/${maquinario.id}`} className='text-primary fs-5'>
                                                    <FaEdit />
                                                </Link>
                                                <Button variant="link" onClick={() => handleExcluir(maquinario.id)} className='text-danger fs-5'>
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
        </>
    );
}

export default Maquinario;
