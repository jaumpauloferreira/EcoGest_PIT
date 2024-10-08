import {jwtDecode} from 'jwt-decode';

// Função para salvar o token no localStorage
export const setToken = (token) => {
  localStorage.setItem('token', token);
};

// Função para obter o token do localStorage
export const getToken = () => {
  return localStorage.getItem('token');
};

// Função para decodificar o token e extrair as informações
export const getUserFromToken = () => {
  const token = getToken();
  if (token) {
    try {
      return jwtDecode(token); // Decodifica o token JWT
    } catch (error) {
      console.error('Token inválido');
    }
  }
  return null;
};

// Função para verificar se o usuário é da diretoria
export const isDirector = () => {
  const user = getUserFromToken();
  return user?.role === 'diretor'; // Verifica se a role do usuário é 'Diretoria'
};

export const isAdmin = () => {
    const user = getUserFromToken();
    return user?.role === 'admin'; // Verifica se a role do usuário é 'Admin'
  };

  export const isColab = () => {
    const user = getUserFromToken();
    return user?.role === 'colaborador'; // Verifica se a role do usuário é 'Admin'
  };

// Função para remover o token (logout)
export const logout = () => {
  localStorage.removeItem('token');
};
