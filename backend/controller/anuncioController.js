// const jwt = require('jsonwebtoken');

// const listar = (req, res) => {
//     const token = req.header('Authorization');

//     if (!token) return res.status(401).json({ message: 'Token não fornecido' });

//     try {
//         const tokenLimpo = token.split(' ')[1];
//         const decoded = jwt.verify(tokenLimpo, process.env.JWT_SECRET);
//         req.user = decoded;
//         res.json({message: 'Rota protegida acessada', user:req.user})
//     } catch (error) {
//         res.status(400).json({message:'Token inválido'})
//     }
// }    

// module.exports = {
//     listar
// }