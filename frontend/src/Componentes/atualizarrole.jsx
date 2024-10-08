import React, { useState, useEffect } from 'react';
import './Login.css'; 
import './Register.css';
import { FaUser, FaBriefcase } from 'react-icons/fa';

const UpdateUserRole = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState('');
  const [newRoleId, setNewRoleId] = useState('');

  // Função para buscar usuários
  const fetchUsers = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/auth/users', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`, // Adicione seu token aqui
        },
      });

      if (!response.ok) {
        throw new Error('Erro ao buscar usuários: ' + response.statusText);
      }

      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error(error);
      alert('Erro ao buscar usuários: ' + error.message); // Exibir o erro
    }
  };

  // Chama fetchUsers ao montar o componente
  useEffect(() => {
    fetchUsers();
  }, []);

  const handleUpdateRole = async () => {
    if (selectedUser && newRoleId) {
      try {
        const response = await fetch(`http://localhost:3001/api/auth/update-role`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`, // Adicione o token aqui
          },
          body: JSON.stringify({ userId: selectedUser, newRoleId }),
        });

        const data = await response.json();

        if (response.ok) {
          alert("Role atualizada com sucesso!");
          setSelectedUser('');
          setNewRoleId('');
          await fetchUsers(); // Atualiza a lista de usuários
        } else {
          alert(data.error || 'Erro ao atualizar a role.');
        }
      } catch (error) {
        console.error(error);
        alert('Erro ao atualizar a role: ' + error.message);
      }
    } else {
      alert("Por favor, selecione um usuário e uma nova role.");
    }
  };

  return (
    <div className="login-page">
      <div className="wrapper">
        <h1>Atualizar Permissão do Usuário</h1>

        <div className="input-box">
          <select
            onChange={(e) => setSelectedUser(e.target.value)}
            value={selectedUser}
          >
            <option value="">Selecione um usuário</option>
            {users.map(user => (
              <option key={user.id} value={user.id}>
                {user.email}
              </option>
            ))}
          </select>
          <FaUser />
        </div>

        <div className="input-box">
          <select
            onChange={(e) => setNewRoleId(e.target.value)}
            value={newRoleId}
          >
            <option value="">Selecione um novo nível</option>
            <option value="1">Admin</option>
            <option value="2">Diretor</option>
            <option value="3">Colaborador</option>
          </select>
          <FaBriefcase />
        </div>

        <button onClick={handleUpdateRole} className="btn">Atualizar Permissão</button>
        <div className="register-link">
        <p>
              <a href="/Componentes">Voltar para a página inicial</a>
            </p>
        </div>
      </div>
      
    </div>
  );
};

export default UpdateUserRole;
