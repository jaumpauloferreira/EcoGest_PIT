import React, { useEffect, useState } from 'react';
import { Button, Card, Col, Row, Form, Container, Table, Alert } from 'react-bootstrap';
import { FaListAlt, FaSearch, FaTrashAlt, FaEdit, FaBackspace, FaCheckCircle, FaTimes } from 'react-icons/fa';
import BtnCadastrar from '../../Componentes/BtnCadastrar.jsx';
import { Link, useParams, useNavigate } from 'react-router-dom';

import ServicoService from '../../services/ServicoService.js';
const servicoService = new ServicoService();




function CadTiposServ() {
    const [listaServicos, setListaServicos] = useState(null);
    const [sucessoMensagem, setSucessoMensagem] = useState('');
    const [editandoServico, setEditandoServico] = useState(null);
    const [erro, setErro] = useState('');
    const navigate = useNavigate();
    const [validated, setValidated] = useState(false);
    const [nome, setNome] = useState('');
    const [errors, setErrors] = useState({});
    const [termoBusca, setTermoBusca] = useState('');
    const { idServico } = useParams();

    const handleBuscaChange = (event) => {
        setTermoBusca(event.target.value);
    };

    const handleFiltrar = async () => {
        await listarServicos(termoBusca);
    };

    const listarServicos = async (termoBusca) => {
        let dados = [];
        if (termoBusca) {
            dados = await servicoService.filtrar(termoBusca);
            setListaServicos(dados);
        } else {
            dados = await servicoService.obterTodos();
            setListaServicos(dados);
        }
    };

    const handleLimpar = () => {
        setListaServicos(null);
        setTermoBusca('');
    };

    useEffect(() => {
        if (idServico) {
            const obterServico = async () => {
                const dados = await servicoService.obterPorId(idServico);
                setNome(dados.nome);
            };
            obterServico();
        }
    }, [idServico]);

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
        } else if (value.length < 20) {
            error = 'O Nome deve ter no mínimo 20 caracteres.';
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

        const servico = {
            id: idServico || 0,
            nome: nome,
        };

        if (!idServico) {
            await servicoService.adicionar(servico);
            setSucessoMensagem('Serviço cadastrado com sucesso!');
        } else {
            await servicoService.atualizar(idServico, servico);
            setSucessoMensagem('Serviço atualizado com sucesso!');
        }

        setNome('');
        setErrors({});
        navigate('/TiposDeServico'); 
        setEditandoServico(null);
        if (listaServicos !== null) {
            await listarServicos(termoBusca);
        }
        setTimeout(() => {
            setSucessoMensagem('');
        }, 3000);
    }

    const handleExcluir = async (id) => {
        if (window.confirm('Tem certeza que deseja excluir?')) {
            await servicoService.excluir(id);
            setSucessoMensagem('Serviço excluído com sucesso!');
            await listarServicos();
            setTimeout(() => {
                setSucessoMensagem('');
            }, 3000);
        }
    };

    const handleEditar = (servico) => {
        setNome(servico.nome);
        setEditandoServico(servico);
    };

    const handleCancelar = () => {
        setNome('');
        setEditandoServico(null);
        setErro('');
        navigate('/TiposDeServico');
    };

    return (
        <>
            <div className="bg-white p-0 rounded shadow w-100" style={{ minHeight: '90vh' }}>
                <h2 className="text-center mb-4"><FaListAlt /> CADASTRO DE TIPOS DE SERVIÇO</h2>
                <Container className='mt-2'>
                    <Card>
                        <Card.Header as="h4">
                            <Row className="align-items-center">
                                <Col lg={2}>Serviços:</Col>
                                <Col lg={6}>
                                    <Form.Group className='mb-0'>
                                        <Form.Control
                                            className="border-secondary"
                                            type="text"
                                            onChange={handleBuscaChange}
                                            placeholder="Pesquise o Nome do Serviço"
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
                                                placeholder="Digite um novo serviço..."
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
                                            editandoServico={editandoServico}
                                            handleEditar={handleEditar}
                                            handleCancelar={handleCancelar}
                                        />
                                    </Col>
                                    <Col lg={2}>
                                        {editandoServico && (
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
                        <Card.Header as="h5">Serviços Cadastrados</Card.Header>
                        <Card.Body>
                            {listaServicos !== null && (
                                <Table className='border-success mt-2'>
                                    <thead>
                                        <tr>
                                            <th>ID</th>
                                            <th colSpan={3}>Nome do Tipo de Serviço</th>
                                            <th colSpan={2} className='text-center'>Editar</th>
                                            <th colSpan={2} className='text-center'>Excluir</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {listaServicos.length <= 0 ? (
                                            <tr>
                                                <td colSpan="3" className="text-center">Nenhum item para listar</td>
                                            </tr>
                                        ) : (
                                            listaServicos.map((servico) => (
                                                <tr key={servico.id}>
                                                    <td>{servico.id}</td>
                                                    <td colSpan={3}>{servico.nome}</td>
                                                    <td colSpan={2} className='text-center'>
                                                        <Link to={`${servico.id}`} className="btn-primary m-1" onClick={() => handleEditar(servico)}>
                                                            <FaEdit />
                                                        </Link>
                                                        
                                                    </td>
                                                    <td colSpan={2} className='text-center'>
                                                        <Link className="text-danger text" onClick={() => handleExcluir(servico.id)}>
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

export default CadTiposServ;
