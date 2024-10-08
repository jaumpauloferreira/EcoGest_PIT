// import './Login.css'; // Reaproveitando o CSS de Login para manter a consistência

// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { FaUser, FaLock, FaEnvelope } from 'react-icons/fa';

// function Register() {
//   const [email, setEmail] = useState('');
//   const [nome, setNome] = useState('');
//   const [password, setPassword] = useState('');
//   const [showPassword, setShowPassword] = useState(false);
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const response = await fetch('http://localhost:3001/api/auth/register', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({ email, nome, password })
//     });

//     const data = await response.json();

//     if (response.ok) {
//       alert("Usuário registrado com sucesso!");
//       navigate('/');
//     } else {
//       alert(data.message);
//     }
//   };

//   const togglePasswordVisibility = () => {
//     setShowPassword(!showPassword);
//   };

//   return (
//     <div className="login-page">
//       <div className="wrapper">
//         <form onSubmit={handleSubmit}>
//           <h1>Registrar-se no ECOGEST</h1>
//           <p>Inovando o Presente, Preservando o Futuro.</p>
          
//           <div className="input-box">
//             <input
//               type="email"
//               placeholder="Email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//             />
//             <FaEnvelope />
//           </div>
          
//           <div className="input-box">
//             <input
//               type="text"
//               placeholder="Nome"
//               value={nome}
//               onChange={(e) => setNome(e.target.value)}
//             />
//             <FaUser />
//           </div>
          
//           <div className="input-box">
//             <input
//               type={showPassword ? 'text' : 'password'}
//               placeholder="Senha"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//             />
//             <FaLock onClick={togglePasswordVisibility} style={{ cursor: 'pointer' }} />
//           </div>
          
//           <button type="submit" className="btn">Registrar</button>

//           <div className="register-link">
//             <p>
//               Já tem uma conta? <a href="/">Faça login</a>
//             </p>
//             <p>
//               <a href="/Componentes">Voltar para a página inicial</a>
//             </p>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }

// export default Register;

import './Login.css'; // Reaproveitando o CSS de Login para manter a consistência
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaUser, FaLock, FaEnvelope, FaBriefcase } from 'react-icons/fa';

function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [roleId, setRoleId] = useState('3'); // Define um valor padrão para 'colaborador'
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch('http://localhost:3001/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password, roleId }) // Removido o campo nome
    });

    const data = await response.json();

    if (response.ok) {
      alert("Usuário registrado com sucesso!");
      navigate('/');
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
          <h1>Registrar-se no ECOGEST</h1>
          <p>Inovando o Presente, Preservando o Futuro.</p>
          
          <div className="input-box">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <FaEnvelope />
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

          {/* Campo de seleção para role */}
          <div className="input-box">
            <select value={roleId} disabled onChange={(e) => setRoleId(e.target.value)}>
              <option value="3" disabled>Colaborador</option> {/* Valor padrão */}
            </select>
            <FaBriefcase />
          </div>
          
          <button type="submit" className="btn">Registrar</button>

          <div className="register-link">
            <p>
              Já tem uma conta? <a href="/">Faça login</a>
            </p>
            <p>
              <a href="/Componentes">Voltar para a página inicial</a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;
