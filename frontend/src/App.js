import { Routes, Route } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './Componentes/Login';
import Home from './Componentes/Home';
import ProtectedRoute from './Componentes/ProtectedRoute';

function App() {
  return (
    <Routes>
      <Route path='/' element={<Login />} />
      <Route path='/Componentes' element={<ProtectedRoute><Home /></ProtectedRoute>} />
    </Routes>
  );
}

export default App;