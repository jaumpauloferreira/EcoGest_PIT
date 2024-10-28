import React from 'react';
import { Form } from 'react-bootstrap';

const CaixaSelecaoGerenciarServicos = ({ onFiltrar, options, label }) => {
  const handleChange = (event) => {
    onFiltrar(event.target.value);
  };

  return (
    <Form.Group controlId="filtroStatus">
      <Form.Label>{label}</Form.Label>
      <Form.Control as="select" onChange={handleChange}>
        <option value="">Todos</option>
        {options.map(option => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </Form.Control>
    </Form.Group>
  );
};

export default CaixaSelecaoGerenciarServicos;
