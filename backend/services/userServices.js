// const bcryptjs = require('bcryptjs');
// const jwt = require('jsonwebtoken');
// const userModel = require('../model/userModel');

// // Certifique-se de que o dotenv seja carregado
// require('dotenv').config();

// const registerUser = async (email, nome, password) => {
//     const userExists = await userModel.findUserByEmail(email);
//     if (userExists && userExists.length > 0) {  // Certifique-se de que há resultados
//         throw new Error('Usuário com este e-mail já existe');
//     }

//     const hashedPassword = await bcryptjs.hash(password, 10);
//     await userModel.createUser(email, nome, hashedPassword);
// };

// const loginUser = async (email, password) => {
//     const user = await userModel.findUserByEmail(email);
//     if (!user || user.length === 0 || !(await bcryptjs.compare(password, user[0].senha))) {
//         throw new Error('Usuário ou senha incorretos!');
//     }

//     const token = jwt.sign({ id: user[0].id, nome: user[0].nome, email: user[0].email }, process.env.JWT_SECRET, { expiresIn: '30m' });
//     return token;
// };

// module.exports = {
//     registerUser,
//     loginUser
// };
