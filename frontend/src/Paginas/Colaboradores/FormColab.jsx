import { Button, Col, Form, Row, Container, Table, Alert, FormLabel } from 'react-bootstrap';
import { FaCheckCircle, FaTrash, FaListAlt, FaEdit, FaSearch } from 'react-icons/fa'
import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from "react-router-dom";
import moment from 'moment';


import './formcolab.css'
import ColaboradorService from '../../services/ColaboradorService';


   


const colaboradorService = new ColaboradorService();

function FormColab() {
    const [sucessoMensagem, setSucessoMensagem] = useState('')
    const [validated, setValidated] = useState(false);
    const [id, setId] = useState("");
    const [nome, setNome] = useState("");
    const [cpf, setCpf] = useState("");
    const [contato, setContato] = useState("");
    const [dataNascimento, setDataNascimento] = useState("");
    const [endereco, setEndereco] = useState("");
    const [bairro, setBairro] = useState("");
    const [numero, setNumero] = useState("");
    const [cargo, setCargo] = useState("");
    const [email, setEmail] = useState("");
    const [nivelEscolaridade, setNivelEscolaridade] = useState("");
    const { idColaborador } = useParams();
    const navigate = useNavigate();
    const [erroMensagem, setErroMensagem] = useState("");
    const [errors, setErrors] = useState({});

    const [listaColaboradores, setListaColaboradores] = useState([]);
    const [termoBusca, setTermoBusca] = useState("");
    const handleBuscaChange = (event) => {

        setTermoBusca(event.target.value)
    }

    const handleFiltrar = async () => {
        await listarColaboradores(termoBusca)
    }

    const formatarData = (data) => {
        return moment(data).format('DD/MM/YYYY');
    };


    const listarColaboradores = async (termoBusca) => {
        let dados = [];
        if (termoBusca) {
            dados = await colaboradorService.filtrar(termoBusca);
            setListaColaboradores(dados);
        } else {
            dados = await colaboradorService.obterTodos();
            setListaColaboradores(dados);
        }
    }

    const carregarColaboradores = async () => {
        const dados = await colaboradorService.obterTodos();
        setListaColaboradores(dados);
    };

    

    useEffect(() => {
        const obterColaborador = async () => {
            const dados = await colaboradorService.obterPorId(idColaborador);
            setId(dados.id);
            setNome(dados.nome);
            setCpf(dados.cpf);
            setContato(dados.contato);
            setDataNascimento(new Date(dados.dataNascimento).toISOString().slice(0, 10));
            setEndereco(dados.endereco);
            setBairro(dados.bairro);
            setNumero(dados.numero);
            setCargo(dados.cargo);
            setNivelEscolaridade(dados.nivelEscolaridade);
            setEmail(dados.email);
        };

        if (idColaborador !== undefined) {
            obterColaborador();
        } else {
            setId("");
            setNome("");
            setCpf("");
            setContato("");
            setDataNascimento("");
            setEndereco("");
            setBairro("");
            setNumero("");
            setCargo("");
            setNivelEscolaridade("");
            setEmail("");
        }

        listarColaboradores();


    }, [idColaborador]);

    const handleExcluir = async (id) => {
        if (window.confirm('Tem Certeza que Deseja Excluir o Colaborador?')) {
            await colaboradorService.delete(id);
            await listarColaboradores();
        }
    };




    const hadleNomeChange = (e) => {
        const value = e.target.value;
        setNome(value);
        if (value && value.length <= 50) {
            setErrors((prev) => ({ ...prev, nome: null }));
        } else {

            if (value === "") {
                setErrors((prev) => ({ ...prev, nome: 'O campo não pode estar vazio.' }));
            } else {
                setErrors((prev) => ({ ...prev, nome: 'O campo não aceita mais de 50 caracteres.' }));
            }

        }
    };

    const handleCpfChange = (event) => {
        let value = event.target.value;
        value = value.replace(/\D/g, '');
        value = value.replace(/(\d{3})(\d)/, '$1.$2');
        value = value.replace(/(\d{3})(\d)/, '$1.$2');
        value = value.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
        setCpf(value);
        if (value && value.length < 14) {
            setErrors((prev) => ({ ...prev, cpf: 'O campo deve ter 11 números.' }));
        } else if (value && value.length > 14) {
            setErrors((prev) => ({ ...prev, cpf: 'O campo não aceita mais de 11 números.' }));
        } else {
            setErrors((prev) => ({ ...prev, cpf: null }));
        }
    };

    const handleContatoChange = (e) => {
        let value = e.target.value;
        value = value.replace(/\D/g, '');
        value = value.replace(/^(\d{2})(\d)/g, '($1) $2');
        value = value.replace(/(\d)(\d{4})$/, '$1-$2');
        setContato(value);
        if (value && value.length < 15) {
            setErrors((prev) => ({ ...prev, contato: 'O campo deve ter 11 números.' }));
        } else if (value.length > 15) {
            setErrors((prev) => ({ ...prev, contato: 'O campo não aceita mais de 11 números.' }));
        } else {
            setErrors((prev) => ({ ...prev, contato: null }));
        }
    };

    const hadleEnderecoChange = (e) => {
        const value = e.target.value;
        setEndereco(value);
        if (value && value.length <= 50) {
            setErrors((prev) => ({ ...prev, endereco: null }));
        } else {

            if (value === "") {
                setErrors((prev) => ({ ...prev, endereco: 'O campo não pode estar vazio.' }));
            } else {
                setErrors((prev) => ({ ...prev, endereco: 'O campo não aceita mais de 50 caracteres.' }));
            }

        }
    };

    const hadleBairroChange = (e) => {
        const value = e.target.value;
        setBairro(value);
        if (value && value.length <= 50) {
            setErrors((prev) => ({ ...prev, bairro: null }));
        } else {

            if (value === "") {
                setErrors((prev) => ({ ...prev, bairro: 'O campo não pode estar vazio.' }));
            } else {
                setErrors((prev) => ({ ...prev, bairro: 'O campo não aceita mais de 50 caracteres.' }));
            }

        }
    };

    const hadleNumeroChange = (e) => {
        const value = e.target.value;
        setNumero(value);
        if (value && value.length <= 50) {
            setErrors((prev) => ({ ...prev, numero: null }));
        } else {

            if (value === "") {
                setErrors((prev) => ({ ...prev, numero: 'O campo não pode estar vazio.' }));
            } else {
                setErrors((prev) => ({ ...prev, numero: 'O campo não aceita mais de 50 caracteres.' }));
            }

        }
    };


    const hadleDataNascimentoChange = (e) => {
        const value = e.target.value;
        setDataNascimento(value);
        if (value && new Date(value) < new Date()) {

            setErrors((prev) => ({ ...prev, dataNascimento: null }));
        } else {

            if (value === "") {
                setErrors((prev) => ({ ...prev, dataNascimento: 'A data não pode ser vazia' }));
            } else {
                setErrors((prev) => ({ ...prev, dataNascimento: 'Não é permitido data futura.' }));
            }

        }
    }

    const handleCargoChange = (event) => {
        setCargo(event.target.value);
    };


    const handleEmailChange = (e) => {
        const value = e.target.value;
        setEmail(value);
        if (value && value.includes('@')) {
            setErrors((prev) => ({ ...prev, email: null }));
        } else {
            if (value === "") {
                setErrors((prev) => ({ ...prev, email: 'O campo não pode estar vazio.' }));
            } else if (!value.includes('@')) {
                setErrors((prev) => ({ ...prev, email: 'O campo deve conter um "@"' }));
            }
        }
    };


    const handleNivelEscolaridadeChange = (event) => {
        setNivelEscolaridade(event.target.value);
    };


    


  
    async function handleSalvar(event) {
        event.preventDefault();
        const form = event.currentTarget;
        let newErros = {};
    
        if (form.checkValidity() === false) {
            event.stopPropagation();
        }
        if (!nome) {
            newErros.nome = 'O campo não pode estar vazio.';
        } else if (nome.length > 50) {
            newErros.nome = 'O campo não aceita mais de 50 caracteres.';
        }
    
        if (!endereco) {
            newErros.endereco = 'O campo não pode estar vazio.';
        } else if (endereco.length > 50) {
            newErros.endereco = 'O campo não aceita mais de 50 caracteres.';
        }
    
        if (!bairro) {
            newErros.bairro = 'O campo não pode estar vazio.';
        } else if (bairro.length > 50) {
            newErros.bairro = 'O campo não aceita mais de 50 caracteres.';
        }
    
        if (!numero) {
            newErros.numero = 'O campo não pode estar vazio.';
        } else if (numero.length > 6) {
            newErros.numero = 'O campo não aceita mais de 5 dígitos.';
        }
    
        if (!cpf) {
            newErros.cpf = 'O campo não pode estar vazio.';
        } else if (cpf.length > 14) {
            newErros.cpf = 'O campo não aceita mais de 11 números.';
        }
    
        if (!contato) {
            newErros.contato = 'O campo não pode estar vazio.';
        } else if (contato.length > 15) {
            newErros.contato = 'O campo não aceita mais de 11 números.';
        }
    
        if (!dataNascimento) {
            newErros.dataNascimento = 'A data não pode ser vazia.';
        } else if (new Date(dataNascimento) > new Date()) {
            newErros.dataNascimento = 'Não é permitido data futura.';
        }
    
        if (!email) {
            newErros.email = 'O campo não pode estar vazio.';
        } else if (!email.includes('@')) {
            newErros.email = 'O campo deve conter um "@"';
        }
    
        if (Object.keys(newErros).length > 0) {
            setErrors(newErros);
            setValidated(true);
        } else {
            const colaborador = {
                id: 0,
                nome: form.nome.value,
                cpf: form.cpf.value,
                contato: form.contato.value,
                endereco: form.endereco.value,
                bairro: form.bairro.value,
                numero: form.numero.value,
                dataNascimento: form.dataNascimento.value,
                cargo: cargo,
                nivelEscolaridade: nivelEscolaridade,
                email: email,
            }
    
            try {
                if (idColaborador === undefined) {
                    await colaboradorService.adicionar(colaborador);
                    setSucessoMensagem('Colaborador Cadastrado com Sucesso!');
                    carregarColaboradores();
                } else {
                    await colaboradorService.atualizar(idColaborador, colaborador);
                    setSucessoMensagem('Colaborador Atualizado com Sucesso!');
                    setValidated(false);
                }
    
                form.reset(); 
                setNome('');
                setBairro('');
                setEndereco('');
                setCargo('');
                setContato('');
                setCpf('');
                setNivelEscolaridade('');
                setDataNascimento('');
                setEmail('');
                setNumero('');
                setValidated(false);
    
                setTimeout(() => {
                    setSucessoMensagem('');
                    setErrors({});
                    navigate('/colaborador');
                }, 3000);
            } catch (error) {
                setErroMensagem('Erro ao cadastrar: CPF já cadastrado. Tente outro CPF.');
                setTimeout(() => setErroMensagem(''), 3000); 
            }
        }
    }
    
    


    return (


        <>
            <Container className='form-colab bg-white p-0 rounded shadow w-100' style={{ minHeight: '90vh' }}>
                <h2 className="text-center mb-4"><FaListAlt /> CADASTRO DE COLABORADORES</h2>
                <Col class="card borda">
                    <h5 class="card-header">Informações Pessoais</h5>
                    <hr /> { }
                    <Col class="card-body">

                        <Form noValidate validated={validated} onSubmit={handleSalvar}>
                            <Row>
                                <Col lg='1' className='mt-3'>
                                    <Form.Group controlId='id'>
                                        <Form.Label>ID</Form.Label>
                                        <Col class="input-group mb-3">
                                            <Form.Control type="text" class="form-control" placeholder="ID" aria-label="ID" aria-describedby="basic-addon2" disabled value={id} />
                                        </Col>
                                    </Form.Group>
                                </Col>

                                <Col lg='3' className='mt-3'>
                                    <Form.Group controlId='nome'>
                                        <Form.Label>Nome</Form.Label>
                                        <Col class="input-group mb-3">
                                            <Form.Control type="text" class="form-control" placeholder="Nome do Colaborador" aria-label="Recipient's username" aria-describedby="basic-addon2"
                                                required
                                                value={nome}
                                                isInvalid={!!errors.nome}
                                                onChange={hadleNomeChange}
                                                name="nome"
                                            />
                                            <Form.Control.Feedback type="invalid">
                                                {errors.nome}
                                            </Form.Control.Feedback>
                                        </Col>
                                    </Form.Group>
                                </Col>
                                <Col lg='3' className='mt-3'>
                                    <Form.Group controlId='cpf'>
                                        <Form.Label>CPF</Form.Label>
                                        <Col className="input-group mb-3">
                                            <Form.Control
                                                type="text"
                                                className="form-control"
                                                placeholder="CPF do Colaborador"
                                                aria-label="Recipient's username"
                                                aria-describedby="basic-addon2"
                                                required
                                                value={cpf}
                                                isInvalid={!!errors.cpf}
                                                onChange={handleCpfChange}
                                                name='cpf'
                                            />
                                            <Form.Control.Feedback type="invalid">
                                                {errors.cpf}
                                            </Form.Control.Feedback>
                                        </Col>
                                    </Form.Group>
                                </Col>

                                <Col lg='3' className='mt-3'>
                                    <Form.Group controlId='contato'>
                                        <Form.Label>Contato</Form.Label>
                                        <Col className="input-group mb-3">
                                            <Form.Control
                                                type="text"
                                                className="form-control"
                                                placeholder="(XX) XXXXX-XXXX"
                                                aria-label="Recipient's username"
                                                aria-describedby="basic-addon2"
                                                id="contact-input"
                                                required
                                                name='contato'
                                                value={contato}
                                                isInvalid={!!errors.contato}
                                                onChange={handleContatoChange}
                                            />
                                            <Form.Control.Feedback type="invalid">
                                                {errors.contato}
                                            </Form.Control.Feedback>
                                        </Col>
                                    </Form.Group>
                                </Col>
                            </Row>

                            

                            <Row>
                                <Col lg="4" className='mt-3'>
                                    <Form.Group controlId='endereco'>
                                        <Form.Label>Endereço</Form.Label>
                                        <Col class="input-group mb-3">
                                            <Form.Control type="text" class="form-control" placeholder="" aria-label="" aria-describedby="basic-addon2"
                                                required
                                                name='endereco'
                                                value={endereco}
                                                isInvalid={!!errors.endereco}
                                                onChange={hadleEnderecoChange}
                                            />
                                            <Form.Control.Feedback type="invalid">
                                                {errors.endereco}
                                            </Form.Control.Feedback>
                                        </Col>
                                    </Form.Group>
                                </Col>

                                <Col lg="3" className='mt-3'>
                                    <Form.Group controlId='bairro'>
                                        <Form.Label>Bairro</Form.Label>
                                        <Col class="input-group mb-2">
                                            <Form.Control type="text" class="form-control" placeholder="" aria-label="" aria-describedby="basic-addon2"
                                                required
                                                value={bairro}
                                                name='bairro'
                                                isInvalid={!!errors.bairro}
                                                onChange={hadleBairroChange}
                                            />
                                            <Form.Control.Feedback type="invalid">
                                                {errors.bairro}
                                            </Form.Control.Feedback>
                                        </Col>
                                    </Form.Group>
                                </Col>

                                <Col lg="2" className='mt-3'>
                                    <Form.Group controlId='numero'>
                                        <Form.Label>Número da Casa</Form.Label>
                                        <Col class="input-group mb-3">
                                            <Form.Control type="number" class="form-control" placeholder="" aria-label="" aria-describedby="basic-addon2"
                                                required
                                                value={numero}
                                                name='numero'
                                                isInvalid={!!errors.numero}
                                                onChange={hadleNumeroChange}
                                            />
                                            <Form.Control.Feedback type="invalid">
                                                {errors.numero}
                                            </Form.Control.Feedback>
                                        </Col>
                                    </Form.Group>
                                </Col>

                                <Col lg="2" className='mt-3'>
                                    <Form.Group controlId='dataNascimento'>
                                        <Form.Label style={{ whiteSpace: 'nowrap' }}>Data de Nascimento</Form.Label>
                                        <Col className="input-group mb-3">
                                            <Form.Control type="date" className="form-control" aria-label="Data de Nascimento" aria-describedby="basic-addon2"
                                                onChange={hadleDataNascimentoChange}
                                                required
                                                name='dataNascimento'
                                                value={dataNascimento}
                                                isInvalid={!!errors.dataNascimento}
                                            />
                                            <Form.Control.Feedback type="invalid">
                                                {errors.dataNascimento}
                                            </Form.Control.Feedback>
                                        </Col>
                                    </Form.Group>
                                </Col>

                            </Row>

                            <hr /> { }
                            <h5>Outras Informações</h5> { }

                            <Row className='row' >
                                <Col lg='3' className='mt-3'>
                                    <Form.Group controlId='cargo'>
                                        <Col class="input-group mb-3">
                                            <Form.Label>Cargo</Form.Label>
                                            <Form.Select required className="form-select"
                                                onChange={handleCargoChange}
                                                value={cargo}
                                            >
                                                <option value="">Selecione...</option>
                                                <option value="Secretário">Secretário</option>
                                                <option value="Acessor">Acessor</option>
                                                <option value="Fiscal">Fiscal</option>
                                                <option value="Auxíliar">Auxíliar</option>
                                            </Form.Select>
                                            <Form.Control.Feedback type="invalid">
                                                Selecione um Cargo
                                            </Form.Control.Feedback>
                                        </Col>
                                    </Form.Group>
                                </Col>
                                <Col lg='3'>
                                    <Form.Group controlId='escolaridade'>
                                        <Col className="mb-3 mt-3">
                                            <Form.Label>Nível de Escolaridade</Form.Label>
                                            <Form.Select required className="form-select"
                                                onChange={handleNivelEscolaridadeChange}
                                                value={nivelEscolaridade}
                                            >
                                                <option value="">Selecione...</option>
                                                <option value="Ensino Fundamental">Ensino Fundamental</option>
                                                <option value="Ensino Médio">Ensino Médio</option>
                                                <option value="Ensino Técnico">Ensino Técnico</option>
                                                <option value="Ensino Superior">Ensino Superior</option>
                                                <option value="Pós-graduação">Pós-graduação</option>
                                                <option value="Mestrado">Mestrado</option>
                                                <option value="Doutorado">Doutorado</option>
                                            </Form.Select>
                                            <Form.Control.Feedback type="invalid">
                                                Selecione um nível de Escolaridade
                                            </Form.Control.Feedback>
                                        </Col>
                                    </Form.Group>
                                </Col>

                                <Col lg="3" className='mt-3'>
                                    <Form.Group controlId='email'>
                                        <Form.Label>E-mail</Form.Label>
                                        <Col class="input-group mb-2">
                                            <Form.Control type="email" class="form-control" placeholder="" aria-label="" aria-describedby="basic-addon2"
                                                required
                                                value={email}
                                                name='email'
                                                isInvalid={!!errors.email}
                                                onChange={handleEmailChange}
                                            />
                                            <Form.Control.Feedback type="invalid">
                                                {errors.email}
                                            </Form.Control.Feedback>
                                        </Col>
                                    </Form.Group>
                                </Col>
                                <Alert className="alert-success-custom" variant='sucess' show={sucessoMensagem !== ""}> <b> <FaCheckCircle></FaCheckCircle> </b>{sucessoMensagem}</Alert>

                                <div>
                        {/* Renderize o Alert dentro do componente Form, após os campos de entrada */}
                        {erroMensagem && <Alert variant="danger">{erroMensagem}</Alert>}
                    </div>
                            </Row>

                            <hr /> { }


                            <Col className='row justify-content-center'>
                                <Col className='col-auto'>
                                    <Button type="submit" variant='success m-1' className="btn btn-success btn-lg me-2" disabled={!!id}>Cadastrar</Button>
                                    <Button type="submit" variant='warning m-1' className="btn btn-warning btn-lg me-2" disabled={!id}>Atualizar</Button>
                                </Col>
                            </Col>
                        </Form>

                    </Col>
                </Col>

                <h3 className="text-center mt-5 mb-1">Colaboradores Cadastrados</h3>

                <Container className="custom-table-container mx-0">
                    <Col>
                        <div className="mt-5 d-flex">
                            <FormLabel className="pesquise-label">Pesquise</FormLabel>
                            <Form.Control type="text" onChange={handleBuscaChange} placeholder="Pesquise o Colaborador" />
                            <Button onClick={handleFiltrar} variant="secondary" className="mr-2"><FaSearch /></Button>
                        </div>
                    </Col>
                    <div className="custom-table-container">
                        <Table striped bordered hover className="table mt-5 custom-table">
                            <thead>
                                <tr>
                                    <th scope="col" className="w-5">ID</th>
                                    <th scope="col" className="w-15">Nome</th>
                                    <th scope="col" className="w-10">CPF</th>
                                    <th scope="col" className="w-15">Contato</th>
                                    <th scope="col" className="w-15">Endereço</th>
                                    <th scope="col" className="w-10">Bairro</th>
                                    <th scope="col" className="w-10">Número</th>
                                    <th scope="col" className="w-15">Data de Nascimento</th>
                                    <th scope="col" className="w-10">Cargo</th>
                                    <th scope="col" className="w-10">Escolaridade</th>
                                    <th scope="col" className="w-15">E-mail</th>
                                    <th scope="col" className="w-10">Ações</th>
                                </tr>
                            </thead>
                            <tbody>
                                {listaColaboradores.length <= 0 ? (
                                    <tr>
                                        <td colSpan="13">Nenhum colaborador cadastrado</td>
                                    </tr>
                                ) : (
                                    listaColaboradores.map((colaborador, index) => (
                                        <tr key={index} className={index % 2 === 0 ? 'dark-green' : 'light-green'}>
                                            <td>{colaborador.id}</td>
                                            <td>{colaborador.nome}</td>
                                            <td>{colaborador.cpf}</td>
                                            <td>{colaborador.contato}</td>
                                            <td>{colaborador.endereco}</td>
                                            <td>{colaborador.bairro}</td>
                                            <td>{colaborador.numero}</td>
                                            <td>{formatarData(colaborador.dataNascimento)}</td>
                                            <td>{colaborador.cargo}</td>
                                            <td>{colaborador.nivelEscolaridade}</td>
                                            <td>{colaborador.email}</td>
                                            <td>
                                                <div className="d-flex align-items-center">
                                                    <Link to={`/colaborador/${colaborador.id}`} className='text-primary fs-5'>
                                                        <FaEdit />
                                                    </Link>
                                                    <Button variant="link" onClick={() => handleExcluir(colaborador.id)} className='text-danger fs-5'>
                                                        <FaTrash />
                                                    </Button>
                                                    
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </Table>
                    </div>
                </Container>
            </Container>

        </>




    );
}

export default FormColab;

