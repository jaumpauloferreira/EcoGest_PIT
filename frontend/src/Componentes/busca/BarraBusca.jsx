//Esse é um componente que possui uma aparência para
//o usuário, onde existe um espaço para o usuário 
//informar seu termo de busca, e esse espaço está
//cercado por duas imagens, do lado esquerdo o
//desenho de uma lupa e do lado direito o desenho
//de um X
//  _0|João               |X
//     João
//     João Pedro
//     João Silva

//Parte 2 do desenvolvimento da barra de busca consiste em
//permitir que um item seja selecionado - ok
//estilizar a barra de busca
//permitir que esse componente também seja validado pelo formulário em que ele está contido

import { useState, useRef } from 'react';
import { Container, Form } from 'react-bootstrap';
import './barraBusca.css';
import { FaSearch, FaTimes  } from 'react-icons/fa';
export default function BarraBusca({ placeHolder,
    dados,
    campoChave,
    campoBusca,
    funcaoSelecao,
    valor }) {

    //manipula o elemento input
    const inputBusca = useRef();
    //definição dos estados do componente
    const [termoBusca, setTermoBusca] = useState(valor ? valor : "");
    const [dadosLista, setDadosLista] = useState(dados); //dados utilizados para exibir o resultado
    const [itemSelecionado, setItemSelecionado] = useState(false);

    function filtrarResultado() {
        //exige que o termo da busca seja conhecido e que
        //esse termo seja utilizado como critério de seleção
        setDadosLista(dados.filter((item) => {
            return termoBusca.length > 1 ? item[campoBusca].toLowerCase().includes(termoBusca.toLowerCase()) : false
        }
        )
        );
        let componenteResultado = document.querySelector('[data-resultado]');
        if (dadosLista.length > 0) {
            componenteResultado.style.display = 'block';
        }
        else {
            componenteResultado.style.display = "none";
        }

    }

    return (
        <Container>
            <div className='barra'>
                <FaSearch className='m-2' size={'25px'}/>
                <Form.Control
                    type="text"
                    ref={inputBusca}
                    placeholder={placeHolder}
                    value={termoBusca}
                    required
                    onChange={e => {
                        setTermoBusca(e.target.value.toLowerCase());
                        filtrarResultado();
                        if (!itemSelecionado) {
                            //esse atribuito é utilizado pelo HTML5 para verificar
                            //se os elementos do formulário estão válidos ou não
                            e.target.setAttribute('aria-invalid', true);
                            e.target.setCustomValidity('erro');
                        }
                        else {
                            e.target.removeAttribute('aria-invalid');
                            e.target.setCustomValidity("");
                        }
                    }}
                ></Form.Control>
                <FaTimes className="m-2" size={'25px'} onClick={() => {
                        setTermoBusca('');
                        filtrarResultado();
                        setItemSelecionado(false);
                        funcaoSelecao({});
                        inputBusca.current.setAttribute('aria-invalid', true);
                        inputBusca.current.setCustomValidity("erro");
                    }}/>
                
            </div>
            <div className='resultado'>
                <ul data-resultado>
                    {
                        dadosLista.map(item => {
                            //ex: cliente campoChave=cpf campoBusca=nome
                            return <li key={item[campoChave]}
                                onClick={() => {
                                    setTermoBusca(item[campoBusca]);
                                    setItemSelecionado(true);
                                    funcaoSelecao(item);
                                    //informar que o componente está "limpo" ou válido
                                    inputBusca.current.setCustomValidity("");
                                    //deixa de exibir a lista com os resultados
                                    let componenteResultado = document.querySelector('[data-resultado]');
                                    componenteResultado.style.display = "none";
                                }}>
                                {
                                    item[campoChave] + '-' + item[campoBusca]
                                }
                            </li>
                        })
                    }
                </ul>
            </div>
        </Container >
    );

}