const jwt = require('jsonwebtoken');


const verifyToken = (req, res, next) => {
  const token = req.headers['authorization'];
   console.log('token',token)
  if (!token) return res.status(403).json({ error: 'Token não fornecido' });

  jwt.verify(token.split(' ')[1], process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.status(401).json({ error: 'Token inválido' });
    req.user = decoded;
    next();
  });
};

const authorizeRole = (roles) => {
  return (req, res, next) => {
     console.log('req',req.user.role)
     console.log('roles',roles)
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ error: 'Acesso não autorizado' });
    }
    next();
  };
};

module.exports = { verifyToken, authorizeRole };
