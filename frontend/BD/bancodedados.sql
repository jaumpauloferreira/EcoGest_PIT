-- Criação do banco de dados
CREATE DATABASE IF NOT EXISTS `sistemaecogest` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci */;

USE `sistemaecogest`;

-- Tabela beneficiario
DROP TABLE IF EXISTS `beneficiario`;
CREATE TABLE `beneficiario` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nome` varchar(100) NOT NULL,
  `cpf` varchar(14) NOT NULL,
  `contato` varchar(20) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `endereco` varchar(255) DEFAULT NULL,
  `bairro` varchar(100) DEFAULT NULL,
  `numero` int(11) DEFAULT NULL,
  `datanascimento` date DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `cpf_UNIQUE` (`cpf`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Inserção de dados na tabela beneficiario
INSERT INTO `beneficiario` (`id`, `nome`, `cpf`, `contato`, `email`, `endereco`, `bairro`, `numero`, `datanascimento`) VALUES
(1, 'João Paulo Ferreira', '336.360.788-73', '(14) 99878-4400', 'joaopaulo@hotmail.com', 'Rua Eleazar', 'Eldorado', 61, '1985-10-08'),
(2, 'Ana Clara Ferreira', '080.370.774-18', '(44) 99541-2542', 'anaclara@hotmail.com', 'Rua das pedras verdes', 'Centro', 188, '1991-03-16'),
(3, 'Taisa Mariana', '123.456.549-87', '(13) 45695-8451', 'taisa@hotmail.com', 'Rua das rosas vermelhas', 'Jaboticabal', 215, '1985-06-12'),
(4, 'Neide de Fátima', '654.123.987-45', '(43) 99854-7526', 'neidefatima@hotmail.com', 'Avenida Brasil', 'Centro', 123, '1994-04-03');

-- Tabela cadastrotiposdemaquinario
DROP TABLE IF EXISTS `cadastrotiposdemaquinario`;
CREATE TABLE `cadastrotiposdemaquinario` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nome` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Inserção de dados na tabela cadastrotiposdemaquinario
INSERT INTO `cadastrotiposdemaquinario` (`id`, `nome`) VALUES
(1, 'Utilitários'),
(2, 'Maquinários Pesados'),
(3, 'Implementos Agrícolas'),
(4, 'Equipamentos Pequenos (ferramentas)');

-- Tabela cadastrotiposdeservico
DROP TABLE IF EXISTS `cadastrotiposdeservico`;
CREATE TABLE `cadastrotiposdeservico` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nome` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Inserção de dados na tabela cadastrotiposdeservico
INSERT INTO `cadastrotiposdeservico` (`id`, `nome`) VALUES
(1, 'Realizar Poda e Remoção de plantas'),
(2, 'Liberação de mudas de árvores para beneficiários'),
(3, 'Medição e análise da qualidade do ar'),
(4, 'Implementação de medidas contra erosão do solo'),
(5, 'Monitoramento de recursos hídricos'),
(6, 'Conservação e manutenção de áreas verdes');

-- Tabela cadtipoativsust
DROP TABLE IF EXISTS `cadtipoativsust`;
CREATE TABLE `cadtipoativsust` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nome` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Inserção de dados na tabela cadtipoativsust
INSERT INTO `cadtipoativsust` (`id`, `nome`) VALUES
(1, 'Evento cultural para levantamento de recursos'),
(2, 'Programa de medição para preservação de mata ciliar'),
(3, 'Campanhas de reflorestamento'),
(4, 'Programas de coleta de materiais recicláveis'),
(5, 'Pontos de coleta para descarte de eletrônicos'),
(6, 'Desenvolvimento de hortas urbanas'),
(7, 'Sistemas de produção sustentáveis'),
(8, 'Desenvolvimento de infraestrutura para ciclistas'),
(9, 'Práticas ambientais em instituições de ensino'),
(10, 'Sessões educativas sobre práticas sustentáveis'),
(11, 'Produção de biogás a partir de resíduos orgânicos'),
(12, 'Incentivo à práticas ambientais nas escolas');

-- Tabela colaboradores
DROP TABLE IF EXISTS `colaboradores`;
CREATE TABLE `colaboradores` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nome` varchar(50) NOT NULL,
  `cpf` varchar(14) NOT NULL,
  `contato` varchar(15) NOT NULL,
  `endereco` varchar(50) NOT NULL,
  `bairro` varchar(50) NOT NULL,
  `numero` decimal(10,0) NOT NULL,
  `dataNascimento` date NOT NULL,
  `cargo` char(25) NOT NULL,
  `nivelEscolaridade` char(25) NOT NULL,
  `email` varchar(50) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `cpf_UNIQUE` (`cpf`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Inserção de dados na tabela colaboradores
INSERT INTO `colaboradores` (`id`, `nome`, `cpf`, `contato`, `endereco`, `bairro`, `numero`, `dataNascimento`, `cargo`, `nivelEscolaridade`, `email`) VALUES
(1, 'Vitória Caldeira dos Santos', '518.508.748-08', '(18) 99626-4023', 'Rua Valter da Silva', 'Asa Branca', 260, '2002-10-26', 'Fiscal', 'Doutorado', 'vitoria@gmail.com'),
(2, 'Maria Cleusa', '232.434.324-32', '(18) 99548-3029', 'Rua Valter da Silva', 'Jardim Por do Sol', 1211, '2001-12-11', 'Secretário', 'Ensino Técnico', 'test@gmail.com.br'),
(3, 'Alice Joaquina da Silva', '756.421.265-79', '(18) 99845-2145', 'Rua Joaquim Campos', 'Centro', 154, '1990-05-16', 'Assessor', 'Pós-graduação', 'alicejoaquina@outlook.com'),
(4, 'Carlos Cesar de Souza', '452.145.698-54', '(18) 45124-6985', 'Rua dos Patos', 'Centro', 452, '2000-08-01', 'Auxiliar', 'Ensino Técnico', 'carloscesar@hotmail.com');

-- Tabela criarativsust
DROP TABLE IF EXISTS `criarativsust`;
CREATE TABLE `criarativsust` (
  `criar_id` int(11) NOT NULL AUTO_INCREMENT,
  `criar_nome` varchar(100) NOT NULL,
  `criar_cpf` varchar(14) NOT NULL,
  `criar_contato` varchar(20) DEFAULT NULL,
  `criar_endereco` varchar(255) DEFAULT NULL,
  `criar_bairro` varchar(100) DEFAULT NULL,
  `criar_numero` int(5) DEFAULT NULL,
  `id` int(11) NOT NULL,
  `criar_data` date DEFAULT NULL,
  `criar_horarioInicial` time NOT NULL,
  `criar_horarioFinal` time NOT NULL,
  `criar_descricao` varchar(1000) NOT NULL,
  PRIMARY KEY (`criar_id`),
  KEY `fk_cadtipoativsust_criarativsust` (`id`),
  CONSTRAINT `fk_cadtipoativsust_criarativsust` FOREIGN KEY (`id`) REFERENCES `cadtipoativsust` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Inserção de dados na tabela criarativsust
INSERT INTO `criarativsust` (`criar_id`, `criar_nome`, `criar_cpf`, `criar_contato`, `criar_endereco`, `criar_bairro`, `criar_numero`, `id`, `criar_data`, `criar_horarioInicial`, `criar_horarioFinal`, `criar_descricao`) VALUES
(1, 'João da Silva', '12345678901', '(11) 91234-5678', 'Rua Exemplo, 123', 'Centro', 45, 1, '2024-09-20', '08:00:00', '12:00:00', 'Atividade de coleta seletiva no bairro Centro.'),
(2, 'Ana Clara', '98765432100', '(21) 92345-6789', 'Av. Principal, 456', 'Jardim Paulista', 22, 2, '2024-10-01', '09:00:00', '13:00:00', 'Atividade de educação ambiental para crianças.'),
(3, 'Taisa Mariana', '11223344556', '(31) 93456-7890', 'Rua Verde, 789', 'Vila Nova', 12, 3, '2024-10-10', '14:00:00', '16:00:00', 'Palestra sobre reciclagem e reaproveitamento de materiais.');

-- Tabela maquinario
DROP TABLE IF EXISTS `maquinario`;
CREATE TABLE `maquinario` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `modelo` varchar(100) NOT NULL,
  `placa` varchar(9) NOT NULL,
  `ano` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Inserção de dados na tabela maquinario
INSERT INTO `maquinario` (`id`, `modelo`, `placa`, `ano`) VALUES
(1, 'Pá Carregadeira Caterpillar', 'AAA-0A00', 2024),
(2, 'Motoniveladora Caterpillar', 'BBB-0B00', 2024),
(3, 'Trator John Deere', 'CCC-0C00', 2024);

-- Tabela roles
DROP TABLE IF EXISTS `roles`;
CREATE TABLE `roles` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `name` VARCHAR(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Inserção de dados na tabela roles
INSERT INTO `roles` (`name`) VALUES
('admin'),
('diretor'),
('colaborador');

-- Tabela users
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `email` VARCHAR(255) UNIQUE NOT NULL,
  `password` VARCHAR(255) NOT NULL,
  `role_id` INT,
  FOREIGN KEY (`role_id`) REFERENCES `roles`(`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Inserção de dados na tabela users
INSERT INTO `users` (`email`, `password`, `role_id`) VALUES
('willian@gmail.com', 'willian123', 1),
('joao@gmail.com', 'joao123', 2),
('vitor@gmail.com', 'vitor123', 3),
('thiago@gmail.com', 'thiago123', 3);

-- Tabela user (adicional para autenticação)
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `email` VARCHAR(25) NOT NULL,
  `nome` VARCHAR(35) NOT NULL,
  `senha` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Inserção de dados na tabela user (adicional para autenticação)
INSERT INTO `user` (`email`, `nome`, `senha`) VALUES
('ecogest@gmail.com', 'ecogest', '$2a$10$FQcfJ6XZuWiUuLoIZ2F9aO9PjmXkDTON3HIIi/alYetP/6xERoXbu'),
('t1@gmail.com', 't1', '$2a$10$bmoonC20reMbMOc/eRJyGOB28EHx1icSZN.P8B1HCTaUWfdnljRri'),
('teste@gmail.com', 'teste', '$2a$10$OTfqlVuQr83.Zy24XFI7N.zUkdcORmfx8zD71XhKvowpYx/bbb8Dm'),
('thiago@gmail.com', 'Thiago', '$2a$10$kPHqGoJAkpJVfhQE.Hx/KuvWdIGkMpY5YUgJx7RWvV/I7xw.WDdne');


ALTER TABLE realizaragserv
ADD COLUMN data_fim datetime DEFAULT NULL;



-- Tabela realizaragserv (Agendamentos Cadastrados)
DROP TABLE IF EXISTS `realizaragserv`;
CREATE TABLE `realizaragserv` (
  `agserv_id` int(11) NOT NULL AUTO_INCREMENT,
  `agserv_nomeSolicitante` varchar(100) NOT NULL,
  `agserv_cpfSolicitante` varchar(14) NOT NULL,
  `agserv_contatoSolicitante` varchar(20) DEFAULT NULL,
  `agserv_endereco` varchar(255) DEFAULT NULL,
  `agserv_bairro` varchar(100) DEFAULT NULL,
  `agserv_numero` int(5) DEFAULT NULL,
  `agserv_tipoServico_id` int(11) NOT NULL,
  `agserv_data` date DEFAULT NULL,
  `agserv_horario` time NOT NULL,
  `agserv_descricao` varchar(1000) NOT NULL,
  `agserv_status` varchar(50) NOT NULL DEFAULT 'Pendente', -- campo de status adicionado
  PRIMARY KEY (`agserv_id`),
  KEY `fk_cadastrotiposdeservico_realizaragserv` (`agserv_tipoServico_id`),
  CONSTRAINT `fk_cadastrotiposdeservico_realizaragserv` FOREIGN KEY (`agserv_tipoServico_id`) REFERENCES `cadastrotiposdeservico` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Inserção de dados na tabela realizaragserv
INSERT INTO `realizaragserv` VALUES 
(1,'Carlos Eduardo','12345678901','(11) 91234-5678','Rua Exemplo, 123','Centro',45,1,'2024-10-20','09:00:00','Serviço de poda de árvores em área pública', 'Pendente'),
(2,'Ana Maria','98765432100','(22) 98765-4321','Av. Brasil, 321','Zona Sul',100,3,'2024-10-21','10:00:00','Liberação de mudas de árvores para comunidade', 'Em Andamento'),
(3,'Roberto Silva','11122233344','(33) 99999-8888','Rua das Flores, 789','Jardim Primavera',120,2,'2024-10-22','11:30:00','Medição e análise da qualidade do ar em área industrial', 'Concluído');

-- Tabela historico_servico (para registrar histórico de alterações de status)
DROP TABLE IF EXISTS `historico_servico`;
CREATE TABLE `historico_servico` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `servico_id` INT NOT NULL,
  `status` VARCHAR(50) NOT NULL,
  `alterado_por` VARCHAR(100),
  `data_alteracao` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`servico_id`) REFERENCES `realizaragserv`(`agserv_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Inserção de dados na tabela historico_servico
INSERT INTO `historico_servico` (`servico_id`, `status`, `alterado_por`) VALUES
(1, 'Pendente', 'João Paulo'),
(1, 'Em Andamento', 'Maria Cleusa'),
(2, 'Pendente', 'Carlos Eduardo');


-- Criação das tabelas de secretaria e tramitação de serviços agendados, juntamente com suas inserções:
DROP TABLE IF EXISTS `secretaria`;
CREATE TABLE secretaria(
    id INT NOT NULL AUTO_INCREMENT,
    nome_secretaria varchar(100) NOT NULL,
  PRIMARY KEY (id)
);

-- Exemplo de inserção de dados para teste
LOCK TABLE `secretaria` WRITE;
INSERT INTO `secretaria` VALUES 
(1,'Secretaria de Meio Ambiente'), 
(2,'Secretaria de Governo'), 
(3,'Secretaria de Obras'), 
(4,'Secretaria de Serviços Municipais'),
(5,'Secretaria de Turismo');
UNLOCK TABLES;

DROP TABLE IF EXISTS `tramitarserv`;
CREATE TABLE tramitarserv (
    id INT NOT NULL AUTO_INCREMENT,
    id_tiposervico INT NOT NULL,
    id_secretaria INT NOT NULL,
    msg_motivo TEXT NOT NULL,
    data_tramitacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status VARCHAR(50) NOT NULL DEFAULT 'Em Análise',
    PRIMARY KEY (id),
    FOREIGN KEY (id_tiposervico) REFERENCES cadastrotiposdeservico(id),
    FOREIGN KEY (id_secretaria) REFERENCES secretaria(id)
);

-- Trigger necessária!
DELIMITER //
CREATE TRIGGER after_tramitarserv_insert
AFTER INSERT ON tramitarserv
FOR EACH ROW
BEGIN
    UPDATE realizaragserv 
    SET agserv_status = NEW.status
    WHERE agserv_tipoServico_id = NEW.id_tiposervico;
END //
DELIMITER ;


INSERT INTO tramitarserv (id_tiposervico, id_secretaria, msg_motivo) VALUES
(1, 1, 'Encaminhando para análise inicial'),
(3, 2, 'Transferindo para setor responsável'),
(2, 3, 'Necessita de equipamentos especiais');