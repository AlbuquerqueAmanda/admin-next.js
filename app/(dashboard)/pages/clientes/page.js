'use client';
import { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, ListGroup, Modal, Form, Alert } from 'react-bootstrap';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const Clientes = () => {
  const [clientes, setClientes] = useState([]);
  const [formData, setFormData] = useState({
    nome: '',
    dataNascimento: '',
    cidade: '',
    telefone: '',
    email: '',
  });
  const [showForm, setShowForm] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [clientesSelecionados, setClientesSelecionados] = useState([]);

  useEffect(() => {
    const clientesLocalStorage = JSON.parse(localStorage.getItem('clientes')) || [];
    setClientes(clientesLocalStorage);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleCadastroCliente = () => {
    // Validar se todos os campos obrigatórios estão preenchidos
    if (!formData.nome || !formData.dataNascimento || !formData.cidade || !formData.telefone || !formData.email) {
      setShowAlert(true);
      return;
    }

    const newCliente = {
      id: clientes.length + 1,
      ...formData,
      dataModificacao: new Date().toLocaleDateString('pt-BR'), // Garantir que a data seja formatada corretamente
    };
    const updatedClientes = [...clientes, newCliente];
    setClientes(updatedClientes);
    localStorage.setItem('clientes', JSON.stringify(updatedClientes));
    setFormData({
      nome: '',
      dataNascimento: '',
      cidade: '',
      telefone: '',
      email: '',
    });
    setShowAlert(false);
  };

  const handleShowForm = () => {
    setShowForm(true);
  };

  const handleExportarPDF = (clientesToExport) => {
    const doc = new jsPDF();
    try {
      doc.text('Lista de Clientes', 10, 10);
      doc.autoTable({
        head: [['ID', 'Nome', 'Data de Nascimento', 'Cidade', 'Telefone', 'Email', 'Data de Modificação']],
        body: clientesToExport.map(cliente => [
          cliente.id,
          cliente.nome,
          formatarData(cliente.dataNascimento),
          cliente.cidade,
          cliente.telefone,
          cliente.email,
          cliente.dataModificacao
        ]),
      });
      doc.save('lista_clientes.pdf');
    } catch (error) {
      console.error('Erro ao gerar PDF:', error);
    }
  };

  const formatarData = (data) => {
    const dataObj = new Date(data);
    const dia = dataObj.getUTCDate(); // Obter o dia em UTC
    const mes = dataObj.getUTCMonth() + 1; // Obter o mês em UTC
    const ano = dataObj.getUTCFullYear(); // Obter o ano em UTC
    return `${dia}/${mes}/${ano}`;
  };

  const handleCloseAlert = () => {
    setShowAlert(false);
  };

  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const handleShowConfirmModal = () => {
    setShowConfirmModal(true);
  };

  const handleCloseConfirmModal = () => {
    setShowConfirmModal(false);
  };

  const handleExcluirClientesSelecionados = () => {
    const updatedClientes = clientes.filter(cliente => !clientesSelecionados.includes(cliente.id));
    setClientes(updatedClientes);
    localStorage.setItem('clientes', JSON.stringify(updatedClientes));
    setShowConfirmModal(false);
    setClientesSelecionados([]);
  };

  const [showDetails, setShowDetails] = useState(false);
  const [selectedCliente, setSelectedCliente] = useState(null);

  const handleViewDetails = (cliente) => {
    setSelectedCliente(cliente);
    setShowDetails(true);
  };

  const handleCloseDetails = () => {
    setShowDetails(false);
  };

  const handleSelectCliente = (id) => {
    const selecionados = [...clientesSelecionados];
    if (selecionados.includes(id)) {
      const index = selecionados.indexOf(id);
      selecionados.splice(index, 1);
    } else {
      selecionados.push(id);
    }
    setClientesSelecionados(selecionados);
  };

  const handleExportar = () => {
    if (clientesSelecionados.length > 0) {
      handleExportarPDF(clientes.filter(cliente => clientesSelecionados.includes(cliente.id)));
    } else {
      handleExportarPDF(clientes);
    }
  };

  return (
    <Container fluid className="p-6">
      <Row className="align-items-center justify-content-between mb-4">
        <Col>
          <h1>Clientes</h1>
        </Col>
        <Col xs="auto">
          {clientesSelecionados.length > 0 ? (
            <Button variant="primary" onClick={handleExportar}>Exportar Selecionados</Button>
          ) : (
            <Button variant="primary" onClick={() => handleExportarPDF(clientes)}>Exportar Lista</Button>
          )}
        </Col>
        <Col xs="auto">
          <Button variant="success" onClick={handleShowForm}>Cadastrar Cliente</Button>
        </Col>
        {clientesSelecionados.length > 0 && (
          <Col xs="auto">
            <Button variant="danger" onClick={handleShowConfirmModal}>Excluir Selecionados</Button>
          </Col>
        )}
      </Row>

      {/* Alerta de campos obrigatórios */}
      <Alert variant="danger" show={showAlert} onClose={handleCloseAlert} dismissible>
        Todos os campos são obrigatórios. Por favor, preencha todos os campos antes de cadastrar.
      </Alert>

      {/* Formulário de cadastro de clientes */}
      {showForm && (
        <Card className="shadow mb-4">
          <Card.Body>
            <Form>
              <Row className="mb-3">
                <Form.Group as={Col} md={6} controlId="formNome">
                  <Form.Label>Nome</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Digite o nome"
                    name="nome"
                    value={formData.nome}
                    onChange={handleChange}
                  />
                </Form.Group>
                <Form.Group as={Col} md={6} controlId="formDataNascimento">
                  <Form.Label>Data de Nascimento</Form.Label>
                  <Form.Control
                    type="date"
                    placeholder="DD/MM/AAAA"
                    name="dataNascimento"
                    value={formData.dataNascimento}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Row>
              <Row className="mb-3">
                <Form.Group as={Col} md={6} controlId="formCidade">
                  <Form.Label>Cidade</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Digite a cidade"
                    name="cidade"
                    value={formData.cidade}
                    onChange={handleChange}
                  />
                </Form.Group>
                <Form.Group as={Col} md={6} controlId="formTelefone">
                  <Form.Label>Telefone</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Digite o telefone"
                    name="telefone"
                    value={formData.telefone}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Row>
              <Row className="mb-3">
                <Form.Group as={Col} controlId="formEmail">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Digite o email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Row>
              <Button variant="primary" onClick={handleCadastroCliente}>Cadastrar Cliente</Button>
            </Form>
          </Card.Body>
        </Card>
      )}

      {/* Lista de clientes */}
      <Card className="shadow">
        <Card.Body>
          <h2>Lista de Clientes</h2>
          <ListGroup>
            {clientes.map(cliente => (
              <ListGroup.Item key={cliente.id} className="d-flex justify-content-between align-items-center">
                <div>
                  <input
                    type="checkbox"
                    onChange={() => handleSelectCliente(cliente.id)}
                    checked={clientesSelecionados.includes(cliente.id)}
                  />
                  <span className="ms-2">{cliente.nome} - {cliente.cidade}</span>
                </div>
                <div>
                  <Button variant="outline-secondary" onClick={() => handleViewDetails(cliente)}>Visualizar</Button>
                </div>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Card.Body>
      </Card>

      {/* Modal para confirmar exclusão */}
      <Modal show={showConfirmModal} onHide={handleCloseConfirmModal}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmar Exclusão</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Tem certeza que deseja excluir os clientes selecionados?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseConfirmModal}>Cancelar</Button>
          <Button variant="danger" onClick={handleExcluirClientesSelecionados}>Excluir</Button>
        </Modal.Footer>
      </Modal>

      {/* Modal para exibir detalhes do cliente */}
      <Modal show={showDetails} onHide={handleCloseDetails}>
        <Modal.Header closeButton>
          <Modal.Title>Detalhes do Cliente</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedCliente && (
            <div>
              <p><strong>Nome:</strong> {selectedCliente.nome}</p>
              <p><strong>Data de Nascimento:</strong> {formatarData(selectedCliente.dataNascimento)}</p>
              <p><strong>Cidade:</strong> {selectedCliente.cidade}</p>
              <p><strong>Telefone:</strong> {selectedCliente.telefone}</p>
              <p><strong>Email:</strong> {selectedCliente.email}</p>
              <p><strong>Data de Modificação:</strong> {selectedCliente.dataModificacao}</p>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseDetails}>Fechar</Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default Clientes;
