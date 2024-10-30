import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import './index.css';
import CadAtivSust from './Paginas/AtivSustentaveis/CadAtivSust';
import CriarAtivSust from './Paginas/CriarAtivSust/CriarAtivSust';
import Beneficiarios from './Paginas/Beneficiarios/Beneficiarios';
import FormColab from './Paginas/Colaboradores/FormColab';
import Maquinario from './Paginas/Maquinario/Maquinario';
import reportWebVitals from './reportWebVitals';
import NavBar from './Componentes/NavBar';
import Home from './Componentes/Home';
import CadTiposServ from './Paginas/TiposDeServico/CadTiposServ';
import RealizarAgServ from './Paginas/RealizarAgServ/RealizarAgServ';
import CadTipoMaq from './Paginas/TipoMaquinario/CadTipoMaq';
import Login from './Componentes/Login';
import Register from './Componentes/Register';
import ProtectedRoute from './Componentes/ProtectedRoute';
import UpdateUserRole from './Componentes/atualizarrole';
import GerenciarCicloServicos from './Paginas/GerenciarCicloServ/GerenciarCicloServicos';
import TramitarServicosAgendados from './Paginas/TramitarServicosAgendados/TramitarServicosAgendados';
import Secretaria from './Paginas/Secretaria/secretaria';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Login />, // Página de login principal
  },
  {
    path: '/register',
    element: <Register />, // Rota para o registro
  },
  {
    path: '/update-role',
    element: <UpdateUserRole />, // Rota para atualizar o nível de acesso
  },
  {
    element: <NavBar />,
    children: [
      {
        path: '/Componentes',
        element: <ProtectedRoute> <Home /> </ProtectedRoute>, // Rota protegida para Home
      },
      {
        path: '/AtivSustentaveis',
        element: <ProtectedRoute> <CadAtivSust /> </ProtectedRoute>, // Rota protegida para Cadastro de Atividades Sustentáveis
      },
      {
        path: '/CriarAtivSust',
        element: <ProtectedRoute> <CriarAtivSust /> </ProtectedRoute>, // Rota protegida para Criar Atividades Sustentáveis
      },
      {
        path: '/AtivSustentaveis/:idAtividade',
        element: <ProtectedRoute> <CadAtivSust /> </ProtectedRoute>, // Rota protegida com ID para Atividades Sustentáveis
      },
      {
        path: '/Beneficiarios',
        element: <ProtectedRoute> <Beneficiarios/> </ProtectedRoute>, // Rota protegida para Beneficiários
      },
      {
        path: '/Colaborador',
        element: <ProtectedRoute> <FormColab/> </ProtectedRoute>, // Rota protegida para Colaboradores
      },
      {
        path: '/colaborador/:idColaborador',
        element: <ProtectedRoute> <FormColab /> </ProtectedRoute>, // Rota protegida com ID para Colaboradores
      },
      {
        path: '/TiposDeMaquinario',
        element: <ProtectedRoute> <CadTipoMaq /> </ProtectedRoute>, // Rota protegida para Tipos de Maquinário
      },
      {
        path: '/TiposDeMaquinario/:idTiposDeMaquinario',
        element: <ProtectedRoute> <CadTipoMaq /> </ProtectedRoute>, // Rota protegida com ID para Tipos de Maquinário
      },
      {
        path: '/Maquinario',
        element: <ProtectedRoute> <Maquinario /> </ProtectedRoute>, // Rota protegida para Maquinário
      },
      {
        path: '/maquinario/:idMaquinario',
        element: <ProtectedRoute> <Maquinario /> </ProtectedRoute>, // Rota protegida com ID para Maquinário
      },
      {
        path: '/TiposDeServico',
        element: <ProtectedRoute> <CadTiposServ /> </ProtectedRoute>, // Rota protegida para Tipos de Serviço
      },
      {
        path: '/TiposDeServico/:idServico',
        element: <ProtectedRoute> <CadTiposServ /> </ProtectedRoute>, // Rota protegida com ID para Tipos de Serviço
      },
      {
        path: '/RealizarAgServ',
        element: <ProtectedRoute> <RealizarAgServ /> </ProtectedRoute>, // Rota protegida para Realizar Agendamento de Serviço
      },
      {
        path: '/GerenciarCicloServicos',
        element: <ProtectedRoute> <GerenciarCicloServicos /> </ProtectedRoute>, // Rota protegida para Gerenciar Ciclo de Serviços
      },
      {
        path: '/tramitar',
        element: <ProtectedRoute> <TramitarServicosAgendados /> </ProtectedRoute>, // Rota protegida para Tramitar Serviços Agendados
      },
      {
        path: '/secretaria',
        element: <ProtectedRoute> <Secretaria /> </ProtectedRoute>, // Rota protegida para Secretaria
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

reportWebVitals();