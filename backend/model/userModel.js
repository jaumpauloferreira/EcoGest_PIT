const Database = require("./database");
const db = new Database();  // Instanciando a classe

const findUserByEmail = async (email) => {
    const rows = await db.ExecutaComando('SELECT * FROM user WHERE email = ?', [email]);
    return rows;  
}

const createUser = async (email, hashedPassword, roleId) => {
    const result = await db.ExecutaComando(
        'INSERT INTO users (email, password, role_id) VALUES (?, ?, ?)',
        [email, hashedPassword, roleId]
    );
    return result;
};

module.exports = { findUserByEmail, createUser };
