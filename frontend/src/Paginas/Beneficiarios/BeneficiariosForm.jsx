import React, { useState, useEffect } from "react";
import { Form, Row, Col, Button, Alert } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import BeneficiarioService from "../../services/BeneficiarioService";
import InputMask from "react-input-mask";
import "./Beneficiarios.css";

const beneficiarioService = new BeneficiarioService();

const BeneficiariosForm = ({ selectedBeneficiary, onFormSubmit }) => {
  const [validated, setValidated] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const [formData, setFormData] = useState({
    id: "",
    nome: "",
    cpf: "",
    contato: "",
    email: "",
    endereco: "",
    bairro: "",
    numero: "",
    datanascimento: null,
  });

  useEffect(() => {
    if (selectedBeneficiary) {
      setFormData(selectedBeneficiary);
    }
  }, [selectedBeneficiary]);

  const handleDataNascimentoChange = (date) => {
    setFormData({ ...formData, datanascimento: date });
  };

  const handleKeyDown = (event) => {
    const allowedKeys = ["Backspace", "ArrowLeft", "ArrowRight", "/"];
    if (!allowedKeys.includes(event.key) && isNaN(Number(event.key))) {
      event.preventDefault();
    }
  };

  const isFormValid = () => {
    const {
      nome,
      cpf,
      contato,
      email,
      endereco,
      bairro,
      numero,
      datanascimento,
    } = formData;

    return (
      nome !== "" &&
      cpf !== "" &&
      contato !== "" &&
      email !== "" &&
      endereco !== "" &&
      bairro !== "" &&
      numero !== "" &&
      datanascimento !== null
    );
  };

  const resetForm = () => {
    setFormData({
      id: "",
      nome: "",
      cpf: "",
      contato: "",
      email: "",
      endereco: "",
      bairro: "",
      numero: "",
      datanascimento: null,
    });
    setValidated(false);
  };

  const handleSubmit = async (event, action) => {
    event.preventDefault();
    event.stopPropagation();

    if (!isFormValid()) {
      setErrorMessage("Por favor, preencha todos os campos obrigatórios.");
      setValidated(true);
      setTimeout(() => setErrorMessage(""), 3000);
    } else {
      try {
        if (action === "Cadastrar") {
          await beneficiarioService.adicionarBeneficiario(formData);
        } else if (action === "Atualizar") {
          await beneficiarioService.atualizarBeneficiario(
            formData.id,
            formData
          );
        }
        setSuccessMessage(`${action} realizado com sucesso!`);
        setValidated(true);
        setTimeout(() => setSuccessMessage(""), 3000);
        if (onFormSubmit) {
          onFormSubmit();
        }
        resetForm();
      } catch (error) {
        setErrorMessage(`Erro ao ${action.toLowerCase()}: ${error.message}`);
        setTimeout(() => setErrorMessage(""), 3000);
      }
    }
  };

  return (
    <div className="container-fluid mt-3">
      <Form noValidate validated={validated}>
        <Row className="mb-3 justify-content-center">
          <Form.Group as={Col} xs={12} md={1} controlId="validationCustom01">
            <Form.Label>ID</Form.Label>
            <Col className="input-group mb-3">
              <Form.Control
                type="text"
                className="form-control dark-gray-border"
                placeholder="ID"
                aria-label="ID"
                aria-describedby="basic-addon2"
                value={formData.id}
                onChange={(e) =>
                  setFormData({ ...formData, id: e.target.value })
                }
                disabled
              />
            </Col>
          </Form.Group>
          <Form.Group as={Col} xs={12} md={4} controlId="validationCustom02">
            <Form.Label>Nome</Form.Label>
            <Form.Control
              required
              type="text"
              placeholder="Nome"
              className="dark-gray-border"
              value={formData.nome}
              onChange={(e) =>
                setFormData({ ...formData, nome: e.target.value })
              }
            />
            <Form.Control.Feedback type="invalid">
              Por favor, insira um nome válido.
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group
            as={Col}
            xs={12}
            md={2}
            controlId="validationCustomUsername"
          >
            <Form.Label>CPF</Form.Label>
            <InputMask
              mask="999.999.999-99"
              maskChar="_"
              value={formData.cpf}
              onChange={(e) =>
                setFormData({ ...formData, cpf: e.target.value })
              }
            >
              {(inputProps) => (
                <Form.Control
                  {...inputProps}
                  type="text"
                  placeholder="CPF"
                  className="dark-gray-border"
                  required
                />
              )}
            </InputMask>
            <Form.Control.Feedback type="invalid">
              Por favor, insira um CPF válido.
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} xs={12} md={2} controlId="validationCustom03">
            <Form.Label>Contato</Form.Label>
            <InputMask
              mask="(99) 99999-9999"
              maskChar="_"
              value={formData.contato}
              onChange={(e) =>
                setFormData({ ...formData, contato: e.target.value })
              }
            >
              {(inputProps) => (
                <Form.Control
                  {...inputProps}
                  type="text"
                  placeholder="(xx)xxxxx-xxxx)"
                  className="dark-gray-border"
                  required
                />
              )}
            </InputMask>
            <Form.Control.Feedback type="invalid">
              Por favor, insira um contato válido.
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} xs={12} md={3} controlId="validationCustom04">
            <Form.Label>E-mail</Form.Label>
            <Form.Control
              type="email"
              placeholder="E-mail"
              className="dark-gray-border"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              required
            />
            <Form.Control.Feedback type="invalid">
              Por favor, insira um e-mail válido.
            </Form.Control.Feedback>
          </Form.Group>
        </Row>
        <Row className="mb-3 justify-content-center">
          <Form.Group as={Col} xs={12} md={4} controlId="validationCustom05">
            <Form.Label>Endereço</Form.Label>
            <Form.Control
              type="text"
              placeholder="Endereço"
              className="dark-gray-border"
              value={formData.endereco}
              onChange={(e) =>
                setFormData({ ...formData, endereco: e.target.value })
              }
              required
            />
            <Form.Control.Feedback type="invalid">
              Por favor, insira um endereço válido.
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} xs={12} md={3} controlId="validationCustom06">
            <Form.Label>Bairro</Form.Label>
            <Form.Control
              type="text"
              placeholder="Bairro"
              className="dark-gray-border"
              value={formData.bairro}
              onChange={(e) =>
                setFormData({ ...formData, bairro: e.target.value })
              }
              required
            />
            <Form.Control.Feedback type="invalid">
              Por favor, insira um bairro válido.
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} xs={12} md={3} controlId="validationCustom07">
            <Form.Label>Número</Form.Label>
            <InputMask
              mask="99999"
              maskChar=""
              value={formData.numero}
              onChange={(e) =>
                setFormData({ ...formData, numero: e.target.value })
              }
            >
              {(inputProps) => (
                <Form.Control
                  {...inputProps}
                  type="text"
                  placeholder="Número"
                  className="dark-gray-border"
                  required
                />
              )}
            </InputMask>
            <Form.Control.Feedback type="invalid">
              Por favor, insira um número válido.
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} xs={12} md={2} controlId="validationCustom08">
            <Form.Label>Data de Nascimento</Form.Label>
            <DatePicker
              selected={formData.datanascimento}
              onChange={handleDataNascimentoChange}
              dateFormat="dd/MM/yyyy"
              onKeyDown={handleKeyDown}
              placeholderText="DD/MM/AAAA"
              showYearDropdown
              scrollableYearDropdown
              yearDropdownItemNumber={100}
              className="form-control dark-gray-border"
              required
            />
            <Form.Control.Feedback type="invalid">
              Por favor, insira uma data de nascimento válida.
            </Form.Control.Feedback>
          </Form.Group>
        </Row>
        <Form.Group className="mb-3">
          <Form.Check
            required
            label="Concordo com os termos e condições"
            feedback="Você deve concordar antes de enviar."
            feedbackType="invalid"
            className="dark-gray-border"
          />
        </Form.Group>
        <div className="d-grid gap-2 d-md-flex justify-content-md-center py-5">
          <Button
            type="button"
            variant="success"
            className="me-md-2"
            onClick={(e) => handleSubmit(e, "Cadastrar")}
          >
            Cadastrar
          </Button>
          <Button
            type="button"
            variant="warning"
            className="me-md-2"
            onClick={(e) => handleSubmit(e, "Atualizar")}
            disabled={!isFormValid()}
          >
            Atualizar
          </Button>
        </div>
      </Form>
      {errorMessage && (
        <Alert variant="danger" className="mt-3">
          {errorMessage}
        </Alert>
      )}
      {successMessage && (
        <Alert variant="success" className="mt-3">
          {successMessage}
        </Alert>
      )}
    </div>
  );
};

export default BeneficiariosForm;
