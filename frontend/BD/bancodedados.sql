create database ecogest;

select * from atividadesustentavel;
select * from tipoatividadesust;

SELECT * FROM tipostividadesust WHERE tipo_id = 10 order by tipo_nome;



select * from cadtipoativsust;
select * from cadtipoativsust order by tipo_nome asc;
select * from cadtipoativsust where tipo_id = 60;
select * from criarativsust;
SELECT * FROM criarativsust ORDER BY criar_nome ASC;
select * from maquinario;
select * from beneficiario;
select * from user;


SELECT user, host FROM mysql.user;
SELECT user, host, authentication_string FROM mysql.user WHERE user = 'root';

CREATE TABLE `cadtipoativsust` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nome` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=58 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

INSERT INTO `cadtipoativsust` VALUES (1,'Evento cultural para levantamento de recursos'),(2,'Programa de medição para preservação de mata siliar'),(45,'Campanhas de reflorestamento e plantio de árvores em áreas urbanas e rurais'),(46,'Programas de coleta de materiais recicláveis como papel, plástico, vidro e metal'),(47,'Pontos de coleta para o descarte seguro de equipamentos eletrônicos'),(48,'Desenvolvimento de hortas urbanas e comunitárias para promover a agricultura local'),(49,'Sistemas de produção que integram árvores, cultivos agrícolas e pecuária de forma sustentável'),(50,'Desenvolvimento de infraestrutura para ciclistas'),(51,'Incentivo para a implementação de práticas ambientais em instituições de ensino'),(52,'Sessões educativas sobre práticas sustentáveis e proteção ambiental'),(53,'Utilização de resíduos orgânicos para a produção de biogás'),(54,'Incentivo para a implementação de práticas ambientais em escolas');

CREATE TABLE IF NOT EXISTS criarativsust (
    criar_id INT AUTO_INCREMENT,
    criar_nome VARCHAR(100) NOT NULL,
    criar_cpf VARCHAR(14) NOT NULL,
    criar_contato VARCHAR(20) DEFAULT NULL,
    criar_endereco VARCHAR(255) DEFAULT NULL,
    criar_bairro VARCHAR(100) DEFAULT NULL,
    criar_numero INT(5) DEFAULT NULL,
    id INT NOT NULL, -- Chave estrangeira para a tabela cadtipoativsust
    criar_data DATE DEFAULT NULL,
    criar_horarioInicial TIME NOT NULL,
    criar_horarioFinal TIME NOT NULL,
    criar_descricao VARCHAR(1000) NOT NULL,
    CONSTRAINT pk_criar_id PRIMARY KEY (criar_id),
    CONSTRAINT fk_cadtipoativsust_criarativsust
		FOREIGN KEY (id) 
		REFERENCES cadtipoativsust(id) -- Define o relacionamento 1:N
);

-- Adicionando dados na tabela 'criarativsust'
INSERT INTO criarativsust (
    criar_nome,
    criar_cpf,
    criar_contato,
    criar_endereco,
    criar_bairro,
    criar_numero,
    id, -- Este é o ID que referencia a tabela 'cadtipoativsust'
    criar_data,
    criar_horarioInicial,
    criar_horarioFinal,
    criar_descricao
) VALUES (
    'João da Silva',              -- criar_nome
    '12345678901',                -- criar_cpf
    '(11) 91234-5678',            -- criar_contato
    'Rua Exemplo, 123',           -- criar_endereco
    'Centro',                     -- criar_bairro
    45,                           -- criar_numero
    1,                            -- id (referência para 'cadtipoativsust')
    '2024-09-20',                 -- criar_data
    '08:00:00',                   -- criar_horarioInicial
    '12:00:00',                   -- criar_horarioFinal
    'Atividade de coleta seletiva no bairro Centro.' -- criar_descricao
);
