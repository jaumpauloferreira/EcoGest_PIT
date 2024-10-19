import { useEffect, useState } from "react";
import { Container, Col, Form, Row, Spinner } from "react-bootstrap";

export default function CaixaSelecaoServicos({ enderecoFonteDados, campoChave, campoExibicao, funcaoSelecao }) {
    const [valorSelecionado, setValorSelecionado] = useState('');
    const [carregandoDados, setCarregandoDados] = useState(false);
    const [dados, setDados] = useState([]);

    useEffect(() => {
        const carregarDados = async () => {
            try {
                setCarregandoDados(true);
                const resposta = await fetch(enderecoFonteDados);
                if (resposta.ok) {
                    const listaDados = await resposta.json();
                    const dadosObtidos = Array.isArray(listaDados) ? listaDados : [listaDados];
                    setDados(dadosObtidos);
                    // Seleciona automaticamente o primeiro item se o valor selecionado estiver vazio
                    if (valorSelecionado === '' && dadosObtidos.length > 0) {
                        const primeiroItem = dadosObtidos[0];
                        setValorSelecionado(primeiroItem[campoChave]);
                        funcaoSelecao(primeiroItem);
                    }
                } else {
                    setDados([]);
                }
            } catch (erro) {
                setDados([]);
            } finally {
                setCarregandoDados(false);
            }
        };
        carregarDados();
    }, [enderecoFonteDados]); // Removi 'valorSelecionado' como dependência para evitar laço infinito de re-renderização

    return (
        <Container>
            <Row>
                <Col md={11}>
                    <Form.Select
                        value={valorSelecionado}
                        onChange={(evento) => {
                            const itemSelecionado = evento.currentTarget.value;
                            const pos = dados.findIndex((item) => item[campoChave].toString() === itemSelecionado);
                            const selecionado = dados[pos];

                            if (selecionado) {
                                setValorSelecionado(itemSelecionado);
                                funcaoSelecao(selecionado);
                            }
                        }}
                    >
                        <option value="" disabled>Selecione um serviço</option>
                        {dados.length > 0 ? (
                            dados.map((item) => (
                                <option key={item[campoChave]} value={item[campoChave]}>
                                    {item[campoExibicao]}
                                </option>
                            ))
                        ) : (
                            <option value="" disabled>Nenhum serviço disponível</option>
                        )}
                    </Form.Select>
                </Col>
                <Col md={1} className="d-flex align-items-center">
                    {carregandoDados && <Spinner animation="border" />}
                </Col>
            </Row>
        </Container>
    );
}
