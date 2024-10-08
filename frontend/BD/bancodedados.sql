-- Criação do banco de dados
CREATE DATABASE IF NOT EXISTS `cadastroativsustentavel` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci */;

USE `cadastroativsustentavel`;

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
(81, 'João Paulo Ferreira da Silva', '336.360.788-73', '(14) 99878-4400', 'joaopaulo@hotmail.com', 'Rua Eleazar', 'Eldorado', 61, '1985-10-08'),
(94, 'Pedro da Silva Sauro', '080.370.774-18', '(44) 99541-2542', 'joaoss@gmail.com', 'Rua das pedras verdes', 'Centro', 188, '1991-03-16'),
(95, 'Maria das Dores', '123.456.549-87', '(13) 45695-8451', 'mariadasdores@hotmail.com', 'Rua das rosas vermelhas', 'Jaboticabal', 215, '1985-06-12'),
(96, 'Ana Julia Medeiros', '654.123.987-45', '(43) 99854-7526', 'anajuliam@outlook.com', 'Avenida Brasil', 'Centro', 123, '1994-04-03'),
(97, 'Benício Henrique dos Santos', '456.711.452-36', '(45) 99142-3569', 'beniciohs@gmail.com', 'Rua Joaquim Santos', 'Joao de Barro', 456, '1979-09-13');

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
(3, 'Liberação de mudas de árvores para beneficiários'),
(4, 'Medição e análise da qualidade do ar'),
(5, 'Implementação de medidas contra erosão do solo'),
(6, 'Monitoramento de recursos hídricos'),
(7, 'Conservação e manutenção de áreas verdes');

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
(7, 'Maria Cleusa', '232.434.324-32', '(18) 99548-3029', 'Rua Valter da Silva', 'Jardim Por do Sol', 1211, '2001-12-11', 'Secretário', 'Ensino Técnico', 'test@gmail.com.br'),
(37, 'Alice Joaquina da Silva', '756.421.265-79', '(18) 99845-2145', 'Rua Joaquim Campos', 'Centro', 154, '1990-05-16', 'Assessor', 'Pós-graduação', 'alicejoaquina@outlook.com'),
(38, 'Carlos Cesar de Souza', '452.145.698-54', '(18) 45124-6985', 'Rua dos Patos', 'Centro', 452, '2000-08-01', 'Auxiliar', 'Ensino Técnico', 'carloscesar@hotmail.com');

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
(1, 'João da Silva', '12345678901', '(11) 91234-5678', 'Rua Exemplo, 123', 'Centro', 45, 1, '2024-09-20', '08:00:00', '12:00:00', 'Atividade de coleta seletiva no bairro Centro.');

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
(6, 'Trator John Deere', 'CCC-0C00', 2024);

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
