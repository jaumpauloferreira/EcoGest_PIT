require('dotenv').config();
const express = require("express");
const cors = require("cors");  
const authRoutes = require('./routers/authRoutes');
const relatoriosRoute =require('./routers/relatoriosRoutes')

/** Rotas */

const atividadeRouters = require('./routers/AtividadesRouters')
const colaboradoresRoutes = require('./routers/ColaboradoresRoutes')
const beneficiarioRoutes = require('./routers/BeneficiarioRoutes')
const maquinarioRouter = require('./routers/MaquinarioRouter')
const servicoRouters = require('./routers/ServicoRouters')
const RealizarAgServRouters = require('./routers/RealizarAgServRoutes')
const tipoMaquinarioRouter = require('./routers/TipoMaquinarioRouters')
const criarAtivSustRouter = require('./routers/CriarAtivSustRouter')
const app = express();
const port = 3001;
app.use(express.json());
app.use(cors());


app.use('/api/auth', authRoutes)
app.use('/api/relatorios', relatoriosRoute);


app.use(atividadeRouters);
app.use(colaboradoresRoutes);
app.use(beneficiarioRoutes);
app.use(maquinarioRouter);
app.use(servicoRouters);
app.use(RealizarAgServRouters);
app.use(tipoMaquinarioRouter); 
app.use(criarAtivSustRouter);
const mysql = require("mysql2");
app.listen(port, () => console.log('Servidor rodando na porta ' + port));
app.use('/api', atividadeRouters); 
app.use('/api', colaboradoresRoutes);
app.use('/api', beneficiarioRoutes);
app.use('/api', maquinarioRouter);
app.use('/api', servicoRouters);
app.use('/api', RealizarAgServRouters);
app.use('/api', tipoMaquinarioRouter); 
app.use('/api', criarAtivSustRouter);