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
  const [filtroNome, setFiltroNome] = useState('');
  const [filtroCidade, setFiltroCidade] = useState('');
  const [filtroIdade, setFiltroIdade] = useState('');
  const [ordem, setOrdem] = useState('');

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
    if (!formData.nome || !formData.dataNascimento || !formData.cidade || !formData.telefone || !formData.email) {
      setShowAlert(true);
      return;
    }

    const newCliente = {
      id: clientes.length + 1,
      ...formData,
      dataModificacao: new Date().toLocaleDateString('pt-BR'),
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
    const dia = dataObj.getUTCDate();
    const mes = dataObj.getUTCMonth() + 1;
    const ano = dataObj.getUTCFullYear();
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

  const handleSelectAll = () => {
    if (clientesSelecionados.length === clientesFiltrados.length) {
      setClientesSelecionados([]);
    } else {
      setClientesSelecionados(clientesFiltrados.map(cliente => cliente.id));
    }
  };

  const calcularIdade = (dataNascimento) => {
    const hoje = new Date();
    const nascimento = new Date(dataNascimento);
    let idade = hoje.getFullYear() - nascimento.getFullYear();
    const mes = hoje.getMonth() - nascimento.getMonth();
    if (mes < 0 || (mes === 0 && hoje.getDate() < nascimento.getDate())) {
      idade--;
    }
    return idade;
  };

  const filtrarClientes = () => {
    return clientes
      .filter(cliente => 
        cliente.nome.toLowerCase().includes(filtroNome.toLowerCase()) &&
        cliente.cidade.toLowerCase().includes(filtroCidade.toLowerCase()) &&
        (filtroIdade ? calcularIdade(cliente.dataNascimento) === parseInt(filtroIdade) : true)
      )
      .sort((a, b) => {
        if (ordem === 'nome') {
          return a.nome.localeCompare(b.nome);
        } else if (ordem === 'dataModificacao') {
          return new Date(b.dataModificacao) - new Date(a.dataModificacao);
        }
        return 0;
      });
  };

  const clientesFiltrados = filtrarClientes();

  return (
    <Container>
      <Card className="mt-4">
        <Card.Header>Cadastro de Clientes</Card.Header>
        <Card.Body>
          <Row className="mb-4">
            <Col md={3}>
              <Form.Control
                type="text"
                placeholder="Filtrar por nome"
                value={filtroNome}
                onChange={(e) => setFiltroNome(e.target.value)}
              />
            </Col>
            <Col md={3}>
              <Form.Control
                type="text"
                placeholder="Filtrar por cidade"
                value={filtroCidade}
                onChange={(e) => setFiltroCidade(e.target.value)}
              />
            </Col>
            <Col md={3}>
              <Form.Control
                type="number"
                placeholder="Filtrar por idade"
                value={filtroIdade}
                onChange={(e) => setFiltroIdade(e.target.value)}
              />
            </Col>
            <Col md={3}>
              <Form.Select value={ordem} onChange={(e) => setOrdem(e.target.value)}>
                <option value="">Ordenar por</option>
                <option value="nome">Nome (A-Z)</option>
                <option value="dataModificacao">Data de Modificação</option>
              </Form.Select>
            </Col>
          </Row>
          <Button onClick={handleShowForm} className="mb-4">Cadastrar Novo Cliente</Button>
          <Button onClick={handleExportar} className="mb-4 ms-2">Exportar PDF</Button>
          <Button onClick={handleSelectAll} className="mb-4 ms-2">Selecionar Tudo</Button>
          {clientesSelecionados.length > 0 && (
            <Button onClick={handleShowConfirmModal} variant="danger" className="mb-4 ms-2">Excluir Selecionados</Button>
          )}
          <Modal show={showConfirmModal} onHide={handleCloseConfirmModal}>
            <Modal.Header closeButton>
              <Modal.Title>Confirmar Exclusão</Modal.Title>
            </Modal.Header>
            <Modal.Body>Tem certeza que deseja excluir os clientes selecionados?</Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleCloseConfirmModal}>
                Cancelar
              </Button>
              <Button variant="danger" onClick={handleExcluirClientesSelecionados}>
                Excluir
              </Button>
            </Modal.Footer>
          </Modal>
          <ListGroup>
            {clientesFiltrados.map(cliente => (
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
          <Modal show={showForm} onHide={() => setShowForm(false)}>
            <Modal.Header closeButton>
              <Modal.Title>Cadastrar Novo Cliente</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {showAlert && (
                <Alert variant="danger" onClose={handleCloseAlert} dismissible>
                  Preencha todos os campos obrigatórios!
                </Alert>
              )}
              <Form>
                <Form.Group>
                  <Form.Label>Nome</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Nome"
                    name="nome"
                    value={formData.nome}
                    onChange={handleChange}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Data de Nascimento</Form.Label>
                  <Form.Control
                    type="date"
                    name="dataNascimento"
                    value={formData.dataNascimento}
                    onChange={handleChange}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Cidade</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Cidade"
                    name="cidade"
                    value={formData.cidade}
                    onChange={handleChange}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Telefone</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Telefone"
                    name="telefone"
                    value={formData.telefone}
                    onChange={handleChange}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={() => setShowForm(false)}>Fechar</Button>
              <Button variant="primary" onClick={handleCadastroCliente}>Cadastrar</Button>
            </Modal.Footer>
          </Modal>
          <Modal show={showDetails} onHide={handleCloseDetails}>
            <Modal.Header closeButton>
              <Modal.Title>Detalhes do Cliente</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {selectedCliente && (
                <div>
                  <p><strong>ID:</strong> {selectedCliente.id}</p>
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
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Clientes;
