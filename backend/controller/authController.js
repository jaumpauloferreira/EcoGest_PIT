// const authService = require('../services/userServices');
// const register = async (req, res) => {
//     const { email, nome, password } = req.body;

//     try {
//         await authService.registerUser(email, nome, password);
//         res.status(201).json({ message: 'Usuário criado com sucesso!' });
//     } catch (error) {
//         res.status(400).json({ message: error.message });
//     }
// }

// const login = async (req, res) => {

//     const { email, password } = req.body;
//     try {
//         const token = await authService.loginUser(email, password);
//         res.json({ token });
//     } catch (error) {
//         res.status(400).json({ message: error.message });
//     }
// }

// module.exports = { register, login }


const jwt = require('jsonwebtoken');
const { db } = require('../config/db')

require('dotenv').config();

// Função de login para gerar o token com a role do usuário

const login = async (req, res) => {
    const { email, password } = req.body;
  
    try {
      // Consulta o usuário e sua role correspondente via JOIN
      const [result] = await db.query(`
        SELECT users.id, users.password, users.email, roles.name AS role
        FROM users
        JOIN roles ON users.role_id = roles.id
        WHERE users.email = ?
      `, [email]);
  
      if (result.length === 0) {
        return res.status(404).json({ error: 'Usuário não existe' });
      }
  
      const user = result[0];
  
      // Verifica se a senha está correta (use bcrypt em produção)
      if (user.password !== password) {
        return res.status(401).json({ error: 'Senha incorreta' });
      }
  
      // Gera o token JWT contendo a role e o ID do usuário
      const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, {
        expiresIn: '1h',
      });
  
      // Retorna o token e o email do usuário
      res.json({ token, user: { email: user.email, role: user.role } });
    } catch (err) {
      res.status(500).json({ error: 'Erro no servidor' });
    }
  };


// const login = async (req, res) => {
//   const { email, password } = req.body;

//   try {
//     // Consulta o usuário e sua role correspondente via JOIN
//     const [result] = await db.query(`
//       SELECT users.id, users.password, roles.name AS role
//       FROM users
//       JOIN roles ON users.role_id = roles.id
//       WHERE users.email = ?
//     `, [email]);

//     if (result.length === 0) {
//       return res.status(404).json({ error: 'Usuário não existe' });
//     }

//     const user = result[0];

//     // Verifica se a senha está correta (use bcrypt em produção)
//     if (user.password !== password) {
//       return res.status(401).json({ error: 'Senha incorreta' });
//     }

//     // Gera o token JWT contendo a role e o ID do usuário
//     const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, {
//       expiresIn: '1h',
//     });

//     res.json({ token });
//   } catch (err) {
//     res.status(500).json({ error: 'Erro no servidor' });
//   }
// };

// Função para atualizar a role do usuário e gerar um novo token
const updateRole = async (req, res) => {
  const { userId, newRoleId } = req.body;

  try {
    // Atualiza a role do usuário no banco de dados
    const [result] = await db.query('UPDATE users SET role_id = ? WHERE id = ?', [newRoleId, userId]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Usuário não existe' });
    }

    // Busca a nova role do usuário para gerar o novo token
    const [updatedUser] = await db.query(`
      SELECT users.id, roles.name AS role
      FROM users
      JOIN roles ON users.role_id = roles.id
      WHERE users.id = ?
    `, [userId]);

    if (updatedUser.length === 0) {
      return res.status(404).json({ error: 'Role não encontrada' });
    }

    const user = updatedUser[0];

    // Gera um novo token JWT com a role atualizada
    const token = jwt.sign({ id: userId, role: user.role }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    res.json({ token });
  } catch (err) {
    res.status(500).json({ error: 'Erro ao atualizar a role' });
  }
};

const register = async (req, res) => {
    const { email, password, roleId } = req.body; // Incluindo roleId
  
    try {
      // Verifica se o usuário já existe
      const [existingUser] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
      
      if (existingUser.length > 0) {
        return res.status(400).json({ error: 'Usuário já existe' });
      }
  
      // Aqui, você pode adicionar uma lógica para criptografar a senha usando bcrypt antes de armazená-la
      // const hashedPassword = await bcrypt.hash(password, 10);
  
      // Insere o novo usuário na tabela users
      const [result] = await db.query('INSERT INTO users (email, password, role_id) VALUES (?, ?, ?)', [email, password, roleId]);
  
      // Gera o token JWT para o novo usuário
      const token = jwt.sign({ id: result.insertId, role: roleId }, process.env.JWT_SECRET, {
        expiresIn: '1h',
      });
  
      // Retorna a resposta com o token
      res.status(201).json({ token, message: 'Usuário registrado com sucesso' });
    } catch (err) {
      res.status(500).json({ error: 'Erro ao registrar o usuário' });
    }
  };
  
  const getUsers = async (req, res) => {
    try {
        const [users] = await db.query('SELECT id, email FROM users');
        console.log('Usuários encontrados:', users); // Adicionando um log
        res.json(users);
    } catch (error) {
        console.error('Erro ao buscar usuários:', error); // Log de erro
        res.status(500).json({ error: 'Erro ao buscar usuários' });
    }
};
  
  module.exports = { login, updateRole, register, getUsers };


