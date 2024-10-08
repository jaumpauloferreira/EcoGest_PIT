const API_BASE_URL = "http://localhost:3001";

class BeneficiarioService {
  async obterTodosBeneficiarios() {
    const response = await fetch(`${API_BASE_URL}/beneficiarios`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      console.log("Algo deu errado");
    }
    const dados = await response.json();
    return dados;
  }

  async obterBeneficiarioPorId(id) {
    const response = await fetch(`${API_BASE_URL}/beneficiarios/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      console.log("Ocorreu um erro ao obter o beneficiário");
    } else {
      const dados = await response.json();
      return dados;
    }
  }

  async adicionarBeneficiario(beneficiarioDados) {
    try {
      const response = await fetch(`${API_BASE_URL}/beneficiarios`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(beneficiarioDados),
      });

      if (!response.ok) {
        console.log("Ocorreu um erro ao adicionar o beneficiário");
        throw new Error("CPF já cadastrado. Tente outro CPF.");
      }
    } catch (error) {
      throw error;
    }
  }

  async atualizarBeneficiario(idBeneficiario, beneficiarioDados) {
    try {
      const response = await fetch(
        `${API_BASE_URL}/beneficiarios/${idBeneficiario}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(beneficiarioDados),
        }
      );

      if (!response.ok) {
        console.log("Ocorreu um erro ao atualizar o beneficiário");
        throw new Error("Erro ao atualizar beneficiário");
      }
    } catch (error) {
      throw error;
    }
  }

  async deletarBeneficiario(idBeneficiario) {
    try {
      const response = await fetch(
        `${API_BASE_URL}/beneficiarios/${idBeneficiario}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        console.log("Ocorreu um erro ao deletar o beneficiário");
        throw new Error("Erro ao deletar beneficiário");
      }
    } catch (error) {
      throw error;
    }
  }

  async filtrarBeneficiarios(termoBusca) {
    const response = await fetch(
      `${API_BASE_URL}/beneficiarios?nome=${termoBusca}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      console.log("Ocorreu um erro ao filtrar os beneficiários");
    } else {
      const dados = await response.json();
      return dados;
    }
  }

  async verificarExistenciaCPF(cpf) {
    const response = await fetch(`${API_BASE_URL}/beneficiarios/cpf/${cpf}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
  
    if (!response.ok) {
      console.log("Ocorreu um erro ao verificar o CPF");
      throw new Error("Erro ao verificar CPF");
    }
    const data = await response.json();
    return data.exists;
  }
  
}



export default BeneficiarioService;

