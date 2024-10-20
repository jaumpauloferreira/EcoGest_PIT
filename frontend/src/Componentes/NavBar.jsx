// import React, { useState } from 'react';
// import './NavBar.css';
// import { Link, Outlet, useLocation } from 'react-router-dom';
// import { FaClipboardList, FaRegUser, FaUserPlus, FaBars, FaHome, FaTractor, FaCogs, FaSignOutAlt, FaRegClone } from 'react-icons/fa';
// import { Container } from 'react-bootstrap';
// import Footer from '../Componentes/Footer.jsx';
// import { useNavigate } from 'react-router-dom';
// import { isDirector, isAdmin, isColab, } from '../utils/auth';

// function NavBar() {
//     const [show, setShow] = useState(true);
//     const [isHome, setIsHome] = useState(false);

//     const location = useLocation();
//     const navigate = useNavigate();
//     const handleShow = () => {
//         setShow(!show);
//     };

//     const handleLogout = () => {
//         localStorage.removeItem('authToken'); 
//         navigate('/');
//     };

//     React.useEffect(() => {
//         setIsHome(location.pathname === '/Componentes' || location.pathname === '/');
//     }, [location.pathname]);

//     return (
//         <>
//             <div className={`side-navbar ${show ? 'active-nav' : ''}`} id="sidebar">
//                 <ul className="nav flex-column text-white w-100 p-8">
//                     <span className="nav-link h3 text-black mt-4 mb-0 fw-bold fs-1  pb-0 text-center italic-text text-shadow ecogest">ECOGEST</span>
//                     <span className="nav-link h1 text-black mb-4 pt-0 fs-6 text-center">Inovando o Presente, Preservando o Futuro</span>
//                     <li className="nav-link px-2 py-3">
//                         <Link to="/Componentes">
//                             <FaHome />
//                             <span className="mx-2">Home</span>
//                         </Link>
//                     </li>       
//                     {(isAdmin() || isDirector())&& (             
//                     <li className="nav-link px-2 py-3">
//                         <Link to="/AtivSustentaveis">
//                             <FaClipboardList />
//                             <span className="mx-2">Cadastro Tipo Ativ. Sustent.</span>
//                         </Link>
//                     </li>
//                     )}
//                      {(isAdmin() || isDirector() || isColab() )&& (
//                     <li className="nav-link px-2 py-3">
//                         <Link to="/CriarAtivSust">
//                             <FaRegClone />
//                             <span className="mx-2">Criar Atividade Sustentável</span>
//                         </Link>
//                     </li>
//                      )}
//                       {(isAdmin() || isDirector() || isColab() )&& (
//                     <li className="nav-link px-2 py-3">
//                         <Link to="/TiposDeServico">
//                             <FaCogs />
//                             <span className="mx-2">Cadastrar Tipos de Serviços</span>
//                         </Link>
//                     </li>
//                       )}
//                        {(isAdmin() || isDirector())&& (
//                     <li className="nav-link px-2 py-3">
//                         <Link to="/Beneficiarios">
//                             <FaRegUser />
//                             <span className="mx-2">Cadastro de Beneficiarios</span>
//                         </Link>
//                     </li>
//                        )}
//                     {(isAdmin())&& (
//                       <li className="nav-link px-2 py-3">
//                         <Link to="/Colaborador">
//                             <FaUserPlus />
//                             <span className="mx-2">Cadastro de Colaboradores</span>
//                         </Link>
//                       </li>
//                     )}
//                      {(isAdmin())&& (
//                     <li className="nav-link px-2 py-3">
//                         <Link to="/TiposDeMaquinario">
//                             <FaTractor />
//                             <span className="mx-2">Cadastrar Tipos de Maquin.</span>
//                         </Link>
//                     </li>
//                      )}
//                       {(isAdmin() || isDirector())&& (
//                     <li className="nav-link px-2 py-3">
//                         <Link to="/Maquinario">
//                             <FaTractor />
//                             <span className="mx-2">Cadastro de Maquinário</span>
//                         </Link>
//                     </li>
//                       )}
//                 </ul>
//             </div>

//             <div className={`p-1 my-container ${show ? 'active-cont' : ''}`}>
//                 <nav onClick={handleShow} className="navbar top-navbar navbar-light bg-#025c14; px-1">
//                     <FaBars className="fs-2 text-white" />
//                     <div onClick={handleLogout} className="ms-auto d-flex align-items-center" style={{ cursor: 'pointer' }}>
//                         <p className="text-white mb-0 me-2">SAIR</p>
//                         <FaSignOutAlt className="fs-3 text-white" />
//                     </div>
//                 </nav>
//                 <Container className={`main-container ${isHome ? '' : 'bg-white'} p-2 rounded-5 mb-5`}>
//                     <Outlet />
                    
//                 </Container>
//                 <Footer className="main-footer p-2"></Footer>
//             </div>
//         </>
//     );
// }

// export default NavBar;

import React, { useState } from 'react';
import './NavBar.css';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { FaClipboardList, FaRegUser, FaUserPlus, FaBars, FaHome, FaTractor, FaCogs, FaSignOutAlt, FaRegClone } from 'react-icons/fa';
import { Container } from 'react-bootstrap';
import Footer from '../Componentes/Footer.jsx';
import { useNavigate } from 'react-router-dom';
import { isDirector, isAdmin, isColab } from '../utils/auth';

function NavBar() {
    const [show, setShow] = useState(true);
    const [isHome, setIsHome] = useState(false);

    const location = useLocation();
    const navigate = useNavigate();
    const handleShow = () => {
        setShow(!show);
    };

    const handleLogout = () => {
        localStorage.removeItem('authToken'); 
        localStorage.removeItem('userEmail'); // Remove o email do localStorage
        localStorage.removeItem('userRole'); // Remove o nível de acesso do localStorage
        navigate('/');
    };

    React.useEffect(() => {
        setIsHome(location.pathname === '/Componentes' || location.pathname === '/');
    }, [location.pathname]);

    // Obtendo email e role do localStorage
    const userEmail = localStorage.getItem('userEmail') || 'Usuário Desconhecido';
    const userRole = localStorage.getItem('userRole') || 'Nível Desconhecido';

    return (
        <>
            <div className={`side-navbar ${show ? 'active-nav' : ''}`} id="sidebar">
                <ul className="nav flex-column text-white w-100 p-8">
                    <span className="nav-link h3 text-black mt-4 mb-0 fw-bold fs-1 pb-0 text-center italic-text text-shadow ecogest">ECOGEST</span>
                    <span className="nav-link h1 text-black mb-4 pt-0 fs-6 text-center">Inovando o Presente, Preservando o Futuro</span>
                    <li className="nav-link px-2 py-3">
                        <Link to="/Componentes">
                            <FaHome />
                            <span className="mx-2">Home</span>
                        </Link>
                    </li>
                    {(isAdmin() || isDirector()) && (             
                        <li className="nav-link px-2 py-3">
                            <Link to="/AtivSustentaveis">
                                <FaClipboardList />
                                <span className="mx-2">Cadastro Tipo Ativ. Sustent.</span>
                            </Link>
                        </li>
                    )}
                    {(isAdmin() || isDirector() || isColab()) && (
                        <li className="nav-link px-2 py-3">
                            <Link to="/CriarAtivSust">
                                <FaRegClone />
                                <span className="mx-2">Criar Atividade Sustentável</span>
                            </Link>
                        </li>
                    )}
                    {(isAdmin() || isDirector() || isColab()) && (
                        <li className="nav-link px-2 py-3">
                            <Link to="/TiposDeServico">
                                <FaCogs />
                                <span className="mx-2">Cadastrar Tipos de Serviços</span>
                            </Link>
                        </li>
                    )}
                    {(isAdmin() || isDirector() || isColab()) && (
                        <li className="nav-link px-2 py-3">
                            <Link to="/RealizarAgServ">
                                <FaRegClone />
                                <span className="mx-2">Agendar Serviços</span>
                            </Link>
                        </li>
                    )}
                    {(isAdmin() || isDirector()) && (
                        <li className="nav-link px-2 py-3">
                            <Link to="/Beneficiarios">
                                <FaRegUser />
                                <span className="mx-2">Cadastro de Beneficiarios</span>
                            </Link>
                        </li>
                    )}
                    {(isAdmin()) && (
                        <li className="nav-link px-2 py-3">
                            <Link to="/Colaborador">
                                <FaUserPlus />
                                <span className="mx-2">Cadastro de Colaboradores</span>
                            </Link>
                        </li>
                    )}
                    {(isAdmin()) && (
                        <li className="nav-link px-2 py-3">
                            <Link to="/TiposDeMaquinario">
                                <FaTractor />
                                <span className="mx-2">Cadastrar Tipos de Maquin.</span>
                            </Link>
                        </li>
                    )}
                    {(isAdmin() || isDirector()) && (
                        <li className="nav-link px-2 py-3">
                            <Link to="/Maquinario">
                                <FaTractor />
                                <span className="mx-2">Cadastro de Maquinário</span>
                            </Link>
                        </li>
                    )}
                    {(isAdmin()) && (
                        <li className="nav-link px-2 py-3">
                            <Link to="/update-role">
                                <FaUserPlus />
                                <span className="mx-2">Alterar Nível de Acesso</span>
                            </Link>
                        </li>
                    )}
                </ul>

                {/* Exibir email e nível de acesso */}
                <div className="user-info text-center mt-4">
                    <p style={{ color: 'black' }}>{userEmail}</p>
                    <p style={{ color: 'black' }}>{userRole}</p>
                </div>
            </div>

            <div className={`p-1 my-container ${show ? 'active-cont' : ''}`}>
                <nav onClick={handleShow} className="navbar top-navbar navbar-light bg-#025c14; px-1">
                    <FaBars className="fs-2 text-white" />
                    <div onClick={handleLogout} className="ms-auto d-flex align-items-center" style={{ cursor: 'pointer' }}>
                        <p className="text-white mb-0 me-2">SAIR</p>
                        <FaSignOutAlt className="fs-3 text-white" />
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
