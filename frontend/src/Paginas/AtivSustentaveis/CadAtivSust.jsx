import React, { useEffect, useState } from 'react';
import { Button, Card, Col, Row, Form, Container, Table, Alert } from 'react-bootstrap';
import { FaListAlt, FaSearch, FaTrashAlt, FaEdit, FaBackspace, FaCheckCircle, FaTimes } from 'react-icons/fa';
import BtnCadastrar from '../../Componentes/BtnCadastrar.jsx';
import { Link, useParams, useNavigate } from 'react-router-dom';
import AtividadeService from '../../services/AtividadeService';
const atividadeService = new AtividadeService();

function CadAtivSust() {
    const [listaAtividades, setListaAtividades] = useState(null);
    const [sucessoMensagem, setSucessoMensagem] = useState('');
    const [editandoAtividade, setEditandoAtividade] = useState(null);
    const [erro, setErro] = useState('');
    const navigate = useNavigate();
    const [validated, setValidated] = useState(false);
    const [nome, setNome] = useState('');
    const [errors, setErrors] = useState({});
    const [termoBusca, setTermoBusca] = useState('');
    const { idAtividade } = useParams();

    const handleBuscaChange = (event) => {
        setTermoBusca(event.target.value);
    };

    const handleFiltrar = async () => {
        await listarAtividades(termoBusca);
    };

    const listarAtividades = async (termoBusca) => {
        let dados = [];
        if (termoBusca) {
            dados = await atividadeService.filtrar(termoBusca);
            setListaAtividades(dados);
        } else {
            dados = await atividadeService.obterTodos();
            setListaAtividades(dados);
        }
    };

    const handleLimpar = () => {
        setListaAtividades(null);
        setTermoBusca('');
    };

    useEffect(() => {
        if (idAtividade) {
            const obterAtividade = async () => {
                const dados = await atividadeService.obterPorId(idAtividade);
                setNome(dados.nome);
            };
            obterAtividade();
        }
    }, [idAtividade]);

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

        const atividade = {
            id: idAtividade || 0,
            nome: nome,
        };

        if (!idAtividade) {
            await atividadeService.adicionar(atividade);
            setSucessoMensagem('Atividade cadastrada com sucesso!');
        } else {
            await atividadeService.atualizar(idAtividade, atividade);
            setSucessoMensagem('Atividade atualizada com sucesso!');
        }

        setNome('');
        setErrors({});
        navigate('/AtivSustentaveis'); 
        setEditandoAtividade(null);
        if (listaAtividades !== null) {
            await listarAtividades(termoBusca);
        }
        setTimeout(() => {
            setSucessoMensagem('');
        }, 3000);
    }

    const handleExcluir = async (id) => {
        if (window.confirm('Tem certeza que deseja excluir?')) {
            await atividadeService.excluir(id);
            setSucessoMensagem('Atividade excluída com sucesso!');
            await listarAtividades();
            setTimeout(() => {
                setSucessoMensagem('');
            }, 3000);
        }
    };

    const handleEditar = (atividade) => {
        setNome(atividade.nome);
        setEditandoAtividade(atividade);
    };

    const handleCancelar = () => {
        setNome('');
        setEditandoAtividade(null);
        setErro('');
        navigate('/AtivSustentaveis');
    };

    return (
        <>
            <div className="bg-white p-0 rounded shadow w-100" style={{ minHeight: '90vh' }}>
                <h2 className="text-center mb-4"><FaListAlt /> CADASTRO DE TIPO DE ATIVIDADE SUSTENTÁVEL</h2>
                <Container className='mt-2'>
                    <Card>
                        <Card.Header as="h4">
                            <Row className="align-items-center">
                                <Col lg={2}>Atividades:</Col>
                                <Col lg={6}>
                                    <Form.Group className='mb-0'>
                                        <Form.Control
                                            className="border-secondary"
                                            type="text"
                                            onChange={handleBuscaChange}
                                            placeholder="Pesquise o Nome da Atividade Sustentável"
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
                                                placeholder="Digite uma nova atividade..."
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
                                            editandoAtividade={editandoAtividade}
                                            handleEditar={handleEditar}
                                            handleCancelar={handleCancelar}
                                        />
                                    </Col>
                                    <Col lg={2}>
                                        {editandoAtividade && (
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
                        <Card.Header as="h5">Atividades Cadastradas</Card.Header>
                        <Card.Body>
                            {listaAtividades !== null && (
                                <Table className='border-success mt-2'>
                                    <thead>
                                        <tr>
                                            <th>ID</th>
                                            <th colSpan={3}>Nome da Atividade</th>
                                            <th colSpan={2} className='text-center'>Editar</th>
                                            <th colSpan={2} className='text-center'>Excluir</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {listaAtividades.length <= 0 ? (
                                            <tr>
                                                <td colSpan="3" className="text-center">Nenhum item para listar</td>
                                            </tr>
                                        ) : (
                                            listaAtividades.map((atividade) => (
                                                <tr key={atividade.id}>
                                                    <td>{atividade.id}</td>
                                                    <td colSpan={3}>{atividade.nome}</td>
                                                    <td colSpan={2} className='text-center'>
                                                        <Link to={`${atividade.id}`} className="btn-primary m-1" onClick={() => handleEditar(atividade)}>
                                                            <FaEdit />
                                                        </Link>
                                                        
                                                    </td>
                                                    <td colSpan={2} className='text-center'>
                                                        <Link className="text-danger text" onClick={() => handleExcluir(atividade.id)}>
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

export default CadAtivSust;
