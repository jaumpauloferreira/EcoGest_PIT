import React, { useState } from 'react';
import './NavBar.css';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { FaClipboardList, FaRegUser, FaUserPlus, FaBars, FaHome, FaTractor, FaCogs, FaSignOutAlt, FaRegClone, FaTasks, FaExchangeAlt, FaQuestionCircle } from 'react-icons/fa';
import { Container } from 'react-bootstrap';
import Footer from '../Componentes/Footer.jsx';
import { useNavigate } from 'react-router-dom';
import { isDirector, isAdmin, isColab } from '../utils/auth';

function NavBar() {
    const [show, setShow] = useState(true);
    const [isHome, setIsHome] = useState(false);
    const [showCadastros, setShowCadastros] = useState(false);
    const [showAgendamentos, setShowAgendamentos] = useState(false);
    const [showRelatorios, setShowRelatorios] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();
    
    const handleShow = () => {
        setShow(!show);
    };

    const handleLogout = () => {
        localStorage.removeItem('authToken'); 
        localStorage.removeItem('userEmail');
        localStorage.removeItem('userRole');
        navigate('/');
    };

    React.useEffect(() => {
        setIsHome(location.pathname === '/Componentes' || location.pathname === '/');
    }, [location.pathname]);

    const userEmail = localStorage.getItem('userEmail') || 'Usuário Desconhecido';
    const userRole = localStorage.getItem('userRole') || 'Nível Desconhecido';

    return (
        <>
            <div className={`side-navbar ${show ? 'active-nav' : ''}`} id="sidebar">
                <ul className="nav flex-column text-white w-100 p-8">
                    <span className="nav-link h3 text-black mt-4 mb-0 fw-bold fs-1 pb-0 text-center italic-text text-shadow ecogest px-0">ECOGEST</span>
                    <span className="nav-link h1 text-black mb-4 pt-0 fs-6 text-center">Inovando o Presente, Preservando o Futuro</span>

                    {/* Link Home */}
                    <li className="nav-link px-2 py-3 fs-6">
                        <Link to="/Componentes">
                            <FaHome />
                            <span className="mx-2">Home</span>
                        </Link>
                    </li>
                    {/* Menu Cadastros */}
                    <li
                        className={`d-flex align-items-center pointer nav-link px-2 py-3 ${showCadastros ? 'active-border' : ''}`}
                        onClick={() => setShowCadastros(!showCadastros)}>
                        <span className="d-flex align-items-center gap-2 fs-6">
                            <FaClipboardList />
                            <span>Menu de Cadastros</span>
                        </span>
                        <span className={`arrow ${showCadastros ? 'rotate' : ''}`}>▶</span>
                    </li>
                    {showCadastros && (
                        <ul className="nav flex-column ms-4">
                            {(isAdmin() || isDirector()) && (
                                <li className="nav-link px-2 py-2">
                                    <Link to="/AtivSustentaveis">
                                        <FaClipboardList />
                                        <span className="mx-2">Cad. Tipo Atividade Sust.</span>
                                    </Link>
                                </li>
                            )}
                            {(isAdmin() || isDirector()) && (
                                <li className="nav-link px-2 py-2">
                                    <Link to="/TiposDeServico">
                                        <FaCogs />
                                        <span className="mx-2">Cad. Tipo de Serviços</span>
                                    </Link>
                                </li>
                            )}
                            {(isAdmin() || isDirector()) && (
                                <li className="nav-link px-2 py-2">
                                    <Link to="/Beneficiarios">
                                        <FaRegUser />
                                        <span className="mx-2">Cad. de Beneficiarios</span>
                                    </Link>
                                </li>
                            )}
                            {isAdmin() && (
                                <li className="nav-link px-2 py-2">
                                    <Link to="/Colaborador">
                                        <FaUserPlus />
                                        <span className="mx-2">Cad. de Colaboradores</span>
                                    </Link>
                                </li>
                            )}
                            {isAdmin() && (
                                <li className="nav-link px-2 py-2">
                                    <Link to="/TiposDeMaquinario">
                                        <FaTractor />
                                        <span className="mx-2">Cad. Tipo de Maquinários</span>
                                    </Link>
                                </li>
                            )}
                            {(isAdmin() || isDirector()) && (
                                <li className="nav-link px-2 py-2">
                                    <Link to="/Maquinario">
                                        <FaTractor />
                                        <span className="mx-2">Cad. de Maquinário</span>
                                    </Link>
                                </li>
                            )}

                            {(isAdmin() || isDirector() || isColab()) && (
                                <li className="nav-link px-2 py-2">
                                    <Link to="/secretaria">
                                        <FaRegClone />
                                        <span className="mx-2">Cadastro de Secretaria</span>
                                    </Link>
                                </li>
                            )}
                        </ul>
                    )}
                    {/* Menu Agendamentos */}
                    <li className={`d-flex align-items-center pointer nav-link px-2 py-3 ${showAgendamentos ? 'active-border' : ''}`}
                        onClick={() => setShowAgendamentos(!showAgendamentos)} >
                        <span className="d-flex align-items-center gap-2 fs-6">
                            <FaClipboardList />
                            <span>Menu de Agendamentos</span>
                        </span>
                        <span className={`arrow ${showAgendamentos ? 'rotate' : ''}`}>▶</span>
                    </li>
                    {showAgendamentos && (
                        <ul className="nav flex-column ms-4">
                            {(isAdmin() || isDirector() || isColab()) && (
                                <li className="nav-link px-2 py-2">
                                    <Link to="/CriarAtivSust">
                                        <FaRegClone />
                                        <span className="mx-2">Criar Atividade Sust.</span>
                                    </Link>
                                </li>
                            )}
                            {(isAdmin() || isDirector() || isColab()) && (
                                <li className="nav-link px-2 py-2">
                                    <Link to="/RealizarAgServ">
                                        <FaRegClone />
                                        <span className="mx-2">Agendar Serviços</span>
                                    </Link>
                                </li>
                            )}
                            {(isAdmin() || isDirector() || isColab()) && (
                                <li className="nav-link px-2 py-2">
                                    <Link to="/tramitar">
                                        <FaExchangeAlt />
                                        <span className="mx-2">Tramitar Serv Agendados</span>
                                    </Link>
                                </li>
                            )}
                            {(isAdmin() || isDirector() || isColab()) && (
                                <li className="nav-link px-2 py-2">
                                    <Link to="/GerenciarCicloServicos">
                                        <FaTasks />
                                        <span className="mx-2">Gerenciar Ciclo de Serviços</span>
                                    </Link>
                                </li>
                            )}
                        </ul>
                    )}
                    {/* Menu Relatórios */}
                    <li
                    className={`d-flex align-items-center pointer nav-link px-2 py-3 ${showRelatorios ? 'active-border' : ''}`}
                    onClick={() => setShowRelatorios(!showRelatorios)}
                    >
                    <span className="d-flex align-items-center gap-2 fs-6">
                        <FaClipboardList />
                        <span>Relatórios</span>
                    </span>
                    <span className={`arrow ${showRelatorios ? 'rotate' : ''}`}>▶</span>
                    </li>
                    {showRelatorios && (
                    <ul className="nav flex-column ms-2">
                        <li className="nav-link px-2 py-2">
                        <Link to="/relatorio-servicos-realizados">
                            <FaTasks />
                            <span className="mx-2">Relatório: Serviços Realizados</span>
                        </Link>
                        </li>
                        <li className="nav-link px-2 py-2">
                        <Link to="/relatorio-servicos-tramitados">
                            <FaExchangeAlt />
                            <span className="mx-2">Relatório: Serviços Tramitados</span>
                        </Link>
                        </li>
                        <li className="nav-link px-2 py-2">
                        <Link to="/relatorio-atividades-sustentaveis">
                            <FaExchangeAlt />
                            <span className="mx-2">Relatório: Atividades Sustentáveis</span>
                        </Link>
                        </li>
                    </ul>
                    )}

                    <li>
                        {(isAdmin()) && (
                            <li className="nav-link px-2 py-3 fs-6">
                                <Link to="/update-role">
                                    <FaUserPlus />
                                    <span className="mx-2">Alterar Nível de Acesso</span>
                                </Link>
                            </li>
                        )}
                    </li>
                </ul>                
            </div>
            <div className={`p-1 my-container ${show ? 'active-cont' : ''}`}>
                <nav className="navbar top-navbar navbar-light bg-#025c14 px-1">
                    <FaBars className="fs-2 text-white" onClick={handleShow} />
                    <div className="ms-auto d-flex align-items-center">
                        <p className='text-white mb-0 mx-5' ><FaRegUser /> {userEmail} / {userRole}</p>
                        
                        <div onClick={handleLogout} className="d-flex align-items-center pointer">
                            <p className="text-white mb-0 me-2">SAIR</p>
                            <FaSignOutAlt className="fs-3 text-white" />
                        </div>
                    </div>
                </nav>
                <Container className={`main-container ${isHome ? '' : 'bg-white'} p-2 rounded-5 mb-5`}>
                    <Outlet />
                </Container>
                <Footer className="main-footer p-2"></Footer>
            </div>
        </>
    );
}

export default NavBar;
