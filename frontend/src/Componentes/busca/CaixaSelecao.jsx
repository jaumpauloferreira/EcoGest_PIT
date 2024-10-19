import { useEffect, useState } from "react";
import { Container, Col, Form, Row, Spinner } from "react-bootstrap";

//Depende de componentes estilizados pelo bootstrap
//endereFonteDados: informa qual a url que a caixa de seleção utilizará para recuperar os dados
//campoChave: Nos dados, qual campo é a chave primária
//campoExibicao: Qual coluna deve ser exibida pela caixa de seleção
//funcaoSelecao : Que é a função que receberá o objeto selecionado pelo usuário


export default function CaixaSelecao({ enderecoFonteDados,
    campoChave,
    campoExibicao, 
    funcaoSelecao,
    localLista,
    tokenAcesso }) {
    const [valorSelecionado, setValorSelecionado] = useState({
        [campoChave]: 0,
        [campoExibicao]:"Não foi possível obter os dados do backend"
    });

    
    const [carregandoDados, setCarregandoDados] = useState(false);
    const [dados, setDados] = useState([]);

    useEffect(() => {
        try {

            setCarregandoDados(true);
            let config;
            if (tokenAcesso){
                config = {
                    method: "GET",
                    headers: {
                        "Authorization": tokenAcesso
                    },
                    credentials: 'include'
                }
            }
            else
            {
                config = { method: "GET", credentials: 'include' };
            }
            fetch(enderecoFonteDados, config).then((resposta) => {
                if (resposta.ok) {  //código 200
                    return resposta.json();
                }
                else {
                    return ([{
                        [campoChave]: 0,
                        [campoExibicao]:"Não foi possível obter os dados do backend"
                    }
                    ]);
                }
            }).then((listaDados) => {
                setCarregandoDados(false);
                if (localLista){
                    setDados(listaDados[localLista]);
                }
                else{
                    setDados(listaDados);
                }
                //lembrar que a minha caixa de seleção possui um valor previamente selecionado
                if (listaDados.length > 0){
                   setValorSelecionado(listaDados[0]);
                   funcaoSelecao(listaDados[0]);     
                }
            });
        } catch(erro){
            setCarregandoDados(false);
            setDados([{
                       [campoChave]: 0,
                       [campoExibicao]: "Não foi possível obter os dados do backend: " + erro.message 
                      }
                    ]);
        }
    }, []);  //willMount

    return (
        <Container border>
            <Row>
                <Col md={11}>
                    <Form.Select
                                 onChange={(evento) => {
                                    const itemSelecionado = evento.currentTarget.value;
                                    //ValorSelecionado e funcaoSelecao esperam objetos da lista
                                                //gerando uma lista somente de ids, cpfs, codigo
                                    const pos = dados.map((item) => item[campoChave].toString()).indexOf(itemSelecionado);
                                    setValorSelecionado(dados[pos]);
                                    funcaoSelecao(dados[pos]);
                                 }}>
                        {
                            dados?.map((item) => {
                                return <option key={item[campoChave]} 
                                               value={item[campoChave]}>
                                                {item[campoExibicao]}
                                       </option>
                            })
                        }
                        
                    </Form.Select>
                </Col>
                <Col md={1}>
                    <Spinner className={carregandoDados ? "visible" : "invisible"}></Spinner>
                </Col>
            </Row>
        </Container>
    );
}