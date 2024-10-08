import React, { useEffect, useState } from 'react';
import { Button, Card, Col, Row, Form, Container, Table, Alert } from 'react-bootstrap';
import { FaListAlt, FaSearch, FaTrashAlt, FaEdit, FaBackspace, FaCheckCircle, FaTimes } from 'react-icons/fa';
import BtnCadastrar from '../../Componentes/BtnCadastrar.jsx';
import { Link, useParams, useNavigate } from 'react-router-dom';
import TipoMaquinarioService from '../../services/TipoMaquinarioService.js';

const tipoMaquinarioService = new TipoMaquinarioService();

function CadTipoMaq() {
    const [listaTipoMaq, setListaTipoMaq] = useState([]);
    const [sucessoMensagem, setSucessoMensagem] = useState('');
    const [editandoTipoMaq, setEditandoTipoMaq] = useState(null);
    const [erro, setErro] = useState('');
    const navigate = useNavigate();
    const [validated, setValidated] = useState(false);
    const [nome, setNome] = useState('');
    const [errors, setErrors] = useState({});
    const [termoBusca, setTermoBusca] = useState('');
    const { idTiposMaq } = useParams();

    const handleBuscaChange = (event) => {
        setTermoBusca(event.target.value);
    };

    const handleFiltrar = async () => {
        await listarTipoMaq(termoBusca);
    };

    const listarTipoMaq = async (termoBusca) => {
        let dados = [];
        if (termoBusca) {
            dados = await tipoMaquinarioService.filtrar(termoBusca);
            setListaTipoMaq(dados);
        } else {
            dados = await tipoMaquinarioService.obterTodos();
            setListaTipoMaq(dados);
        }
    };

    const handleLimpar = () => {
        setListaTipoMaq([]);
        setTermoBusca('');
    };

    useEffect(() => {
        if (idTiposMaq) {
            const obterTipoMaq = async () => {
                const dados = await tipoMaquinarioService.obterPorId(idTiposMaq);
                setNome(dados.nome);
            };
            obterTipoMaq();
        }
    }, [idTiposMaq]);

    useEffect(() => {
        const obterTodosTiposMaq = async () => {
            const dados = await tipoMaquinarioService.obterTodos();
            setListaTipoMaq(dados);
        };
        obterTodosTiposMaq();
    }, []);

    const handleNomeChange = (e) => {
        const value = e.target.value;
        setNome(value);
        if (errors.nome && value.length >= 20) {
            setErrors({});
        }
    };

    const validateNome = (value) => {
        let error = '';
        if (!value) {
            error = 'O Nome não pode estar vazio.';
        } else if (value.length < 4) {
            error = 'O Nome deve ter no mínimo 5 caracteres.';
        } else if (value.length > 100) {
            error = 'O Nome não pode ter mais de 100 caracteres.';
        }
        return error;
    };

    async function handleSalvar(event) {
        event.preventDefault();
        const nomeError = validateNome(nome);

        if (nomeError) {
            setErrors({ nome: nomeError });
            return;
        }

        const tiposMaq = {
            id: editandoTipoMaq ? editandoTipoMaq.id : 0,
            nome: nome,
        };

        if (!editandoTipoMaq) {
            await tipoMaquinarioService.adicionar(tiposMaq);
            setSucessoMensagem('Tipo de Maquinário cadastrado com sucesso!');
        } else {
            await tipoMaquinarioService.atualizar(editandoTipoMaq.id, tiposMaq);
            setSucessoMensagem('Tipo de Maquinário atualizado com sucesso!');
        }

        setNome('');
        setErrors({});
        setEditandoTipoMaq(null);
        navigate('/TiposDeMaquinario');
        if (listaTipoMaq !== null) {
            await listarTipoMaq(termoBusca);
        }
        setTimeout(() => {
            setSucessoMensagem('');
        }, 3000);
    }

    const handleExcluir = async (id) => {
        if (window.confirm('Tem certeza que deseja excluir?')) {
            await tipoMaquinarioService.excluir(id);
            setSucessoMensagem('Excluído com sucesso!');
            await listarTipoMaq();
            setTimeout(() => {
                setSucessoMensagem('');
            }, 3000);
        }
    };

    const handleEditar = (tiposMaq) => {
        setNome(tiposMaq.nome);
        setEditandoTipoMaq(tiposMaq);
        navigate(`/TiposDeMaquinario/${tiposMaq.id}`);
    };

    const handleCancelar = () => {
        setNome('');
        setEditandoTipoMaq(null);
        setErro('');
        navigate('/TiposDeMaquinario');
    };

    return (
        <>
            <div className="bg-white p-0 rounded shadow w-100" style={{ minHeight: '90vh' }}>
                <h2 className="text-center mb-4"><FaListAlt /> CADASTRO DE TIPOS DE MAQUINÁRIO</h2>
                <Container className='mt-2'>
                    <Card>
                        <Card.Header as="h4">
                            <Row className="align-items-center">
                                <Col lg={2}>Tipos de Maquinário:</Col>
                                <Col lg={6}>
                                    <Form.Group className='mb-0'>
                                        <Form.Control
                                            className="border-secondary"
                                            type="text"
                                            onChange={handleBuscaChange}
                                            placeholder="Pesquise o Nome do Tipo de Maquinário"
                                            value={termoBusca}
                                        />
                                    </Form.Group>
                                </Col>
                                <Col lg={2}>
                                    <Button variant="secondary" className="w-100" onClick={handleFiltrar}>
                                        <FaSearch /> Pesquisar
                                    </Button>
                                </Col>
                                <Col lg={2}>
                                    <Button variant="secondary" className="w-100" onClick={handleLimpar}>
                                        <FaBackspace /> Limpar
                                    </Button>
                                </Col>
                            </Row>
                        </Card.Header>
                        <Card.Body>
                            <Form noValidate validated={validated} onSubmit={handleSalvar}>
                                <Row className="d-flex align-items-start">
                                    <Col lg={8}>
                                        <Form.Group controlId="nome">
                                            <Form.Control
                                                type="text"
                                                className={`${errors.nome ? 'is-invalid' : 'border-secondary'}`}
                                                placeholder="Digite um novo tipo de maquinário..."
                                                required
                                                value={nome}
                                                isInvalid={!!errors.nome}
                                                onChange={handleNomeChange}
                                            />
                                            <Form.Control.Feedback type="invalid">
                                                {errors.nome}
                                            </Form.Control.Feedback>
                                        </Form.Group>
                                    </Col>
                                    <Col lg={2}>
                                        <BtnCadastrar
                                            editandoTipoMaq={editandoTipoMaq}
                                            handleEditar={handleEditar}
                                            handleCancelar={handleCancelar}
                                        />
                                    </Col>
                                    <Col lg={2}>
                                        {editandoTipoMaq && (
                                            <Button className='btn w-100' variant='danger' onClick={handleCancelar}>
                                                <FaTimes /> Cancelar
                                            </Button>
                                        )}
                                    </Col>                                    
                                </Row>
                                <Col lg={10}>
                                    <Alert className="mt-3 text-center" variant="success" show={sucessoMensagem !== ""}>
                                        <b> <FaCheckCircle /> </b> {sucessoMensagem}
                                    </Alert>
                                </Col>
                            </Form>
                        </Card.Body>
                    </Card>
                </Container>
                
                <Container className="mt-2">
                    <Card>
                        <Card.Header as="h5">Tipos de Maquinários Cadastrados</Card.Header>
                        <Card.Body>
                            {listaTipoMaq !== null && (
                                <Table className='border-success mt-2'>
                                    <thead>
                                        <tr>
                                            <th>ID</th>
                                            <th colSpan={3}>Nome do Tipo de Maquinário</th>
                                            <th colSpan={2} className='text-center'>Editar</th>
                                            <th colSpan={2} className='text-center'>Excluir</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {listaTipoMaq.length <= 0 ? (
                                            <tr>
                                                <td colSpan="3" className="text-center">Nenhum item para listar</td>
                                            </tr>
                                        ) : (
                                            listaTipoMaq.map((tiposMaq) => (
                                                <tr key={tiposMaq.id}>
                                                    <td>{tiposMaq.id}</td>
                                                    <td colSpan={3}>{tiposMaq.nome}</td>
                                                    <td colSpan={2} className='text-center'>
                                                        <Link to="#" className="btn-primary m-1" onClick={() => handleEditar(tiposMaq)}>
                                                            <FaEdit />
                                                        </Link>
                                                    </td>
                                                    <td colSpan={2} className='text-center'>
                                                        <Link to="#" className="text-danger text" onClick={() => handleExcluir(tiposMaq.id)}>
                                                            <FaTrashAlt />
                                                        </Link>
                                                    </td>
                                                </tr>
                                            ))
                                        )}
                                    </tbody>
                                </Table>
                            )}
                        </Card.Body>
                    </Card>
                </Container>
            </div>
        </>
    );
}

export default CadTipoMaq;
