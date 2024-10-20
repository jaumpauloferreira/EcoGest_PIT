import { useEffect, useState } from "react";
import { Container, Col, Form, Row, Spinner } from "react-bootstrap";

export default function CaixaSelecao({ enderecoFonteDados, campoChave, campoExibicao, funcaoSelecao }) {
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
    }, [enderecoFonteDados, valorSelecionado]); // Adicionando 'valorSelecionado' como dependência
    

    return (
        <Container border>
            <Row>
                <Col md={11}>
                    <Form.Select
                        value={valorSelecionado}
                        onChange={(evento) => {
                            const itemSelecionado = evento.currentTarget.value;
                            const pos = dados.map((item) => item[campoChave].toString()).indexOf(itemSelecionado);
                            const selecionado = dados[pos];

                            // Verifica se selecionado é válido
                            if (selecionado) {
                                setValorSelecionado(itemSelecionado);
                                funcaoSelecao(selecionado);
                            }
                        }}>
                        <option value="" disabled>Selecione uma opção</option>
                        {
                            dados.length > 0 ? (
                                dados.map((item) => (
                                    <option key={item[campoChave]} value={item[campoChave]}>
                                        {item[campoExibicao]}
                                    </option>
                                ))
                            ) : (
                                <option value="" disabled>Nenhuma opção disponível</option>
                            )
                        }
                    </Form.Select>
                </Col>
                <Col md={1}>
                    <Spinner className={carregandoDados ? "visible" : "invisible"} />
                </Col>
            </Row>
        </Container>
    );
}