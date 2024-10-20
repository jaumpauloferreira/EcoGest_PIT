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
    element: <UpdateUserRole />, // Rota para o registro
  },
  {
    element: <NavBar />, 
    children: [
      {
        path: '/Componentes',
        element: <ProtectedRoute> <Home /> </ProtectedRoute>, // Rota protegida
      },
      {
        path: '/AtivSustentaveis',
        element: <ProtectedRoute> <CadAtivSust /> </ProtectedRoute>, // Rota protegida
      },
      {
        path: '/CriarAtivSust',
        element: <ProtectedRoute> <CriarAtivSust /> </ProtectedRoute>, // Rota protegida
      },
      {
        path: '/AtivSustentaveis/:idAtividade',
        element: <ProtectedRoute> <CadAtivSust /> </ProtectedRoute>, // Rota protegida
      },
      {
        path: '/Beneficiarios',
        element: <ProtectedRoute> <Beneficiarios/> </ProtectedRoute>, // Rota protegida
      },
      {
        path: '/Colaborador',
        element: <ProtectedRoute> <FormColab/> </ProtectedRoute>, // Rota protegida
      },
      {
        path: '/colaborador/:idColaborador',
        element: <ProtectedRoute> <FormColab /> </ProtectedRoute>, // Rota protegida
      },
      {
        path: '/TiposDeMaquinario',
        element: <ProtectedRoute> <CadTipoMaq /> </ProtectedRoute>, // Rota protegida
      },
      {
        path: '/TiposDeMaquinario/:idTiposDeMaquinario',
        element: <ProtectedRoute> <CadTipoMaq /> </ProtectedRoute>, // Rota protegida
      },
      {
        path: '/Maquinario',
        element: <ProtectedRoute> <Maquinario /> </ProtectedRoute>, // Rota protegida
      },
      {
        path: '/maquinario/:idMaquinario',
        element: <ProtectedRoute> <Maquinario /> </ProtectedRoute>, // Rota protegida
      },
      {
        path: '/TiposDeServico',
        element: <ProtectedRoute> <CadTiposServ /> </ProtectedRoute>, // Rota protegida
      },
      {
        path: '/TiposDeServico/:idServico',
        element: <ProtectedRoute> <CadTiposServ /> </ProtectedRoute>, // Rota protegida
      },
      {
        path: '/RealizarAgServ',
        element: <ProtectedRoute> <RealizarAgServ /> </ProtectedRoute>, // Rota protegida
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
