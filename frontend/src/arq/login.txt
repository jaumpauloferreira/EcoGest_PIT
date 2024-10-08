import './Login.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUser, FaLock } from 'react-icons/fa';

function Login() {
  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch('http://localhost:3001/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: username, password })
    });

    const data = await response.json();

    if (response.ok) {
      localStorage.setItem('token', data.token);
      navigate('/Componentes');
    } else {
      alert(data.message);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="login-page">
      <div className="wrapper">
        <form onSubmit={handleSubmit}>
          <h1>ECOGEST</h1>
          <p>Inovando o Presente, Preservando o futuro.</p>
          <div className="input-box">
            <input
              type="text"
              placeholder="Nome"
              value={username}
              onChange={(e) => setUserName(e.target.value)}
            />
            <FaUser />
          </div>
          <div className="input-box">
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <FaLock onClick={togglePasswordVisibility} style={{ cursor: 'pointer' }} />
          </div>
          <div className="remember-forgot">
            <label>
              <input type="checkbox" /> Lembrar Senha
            </label>
            <a href="#">Forgot Password</a>
          </div>
          <button type="submit" className="btn">Login</button>
          <div className="register-link">
            <p>
              Não tem uma conta? <a href="#">Crie uma conta</a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
