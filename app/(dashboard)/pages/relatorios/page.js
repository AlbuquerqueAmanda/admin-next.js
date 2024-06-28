// pages/relatorios/page.js
'use client';
// pages/relatorios/page.js

import { useState } from 'react';
import { Container, Row, Col, Card, Button, ListGroup, Modal, Form } from 'react-bootstrap';
import jsPDF from 'jspdf';

// Dados fictícios de clientes com data de modificação
const clientes = [
  { id: 1, nome: 'João Silva', dataNascimento: '15/02/1985', cidade: 'São Paulo', telefone: '(11) 9999-9999', email: 'joao.silva@example.com', dataModificacao: '2023-06-15' },
  { id: 2, nome: 'Maria Souza', dataNascimento: '23/07/1990', cidade: 'Rio de Janeiro', telefone: '(21) 8888-8888', email: 'maria.souza@example.com', dataModificacao: '2023-05-20' },
  { id: 3, nome: 'José Santos', dataNascimento: '10/04/1982', cidade: 'Belo Horizonte', telefone: '(31) 7777-7777', email: 'jose.santos@example.com', dataModificacao: '2023-07-02' },
  { id: 4, nome: 'Ana Oliveira', dataNascimento: '05/09/1995', cidade: 'Porto Alegre', telefone: '(51) 6666-6666', email: 'ana.oliveira@example.com', dataModificacao: '2023-04-18' },
  { id: 5, nome: 'Enzo Costa', dataNascimento: '12/11/1988', cidade: 'Brasília', telefone: '(61) 5555-5555', email: 'enzo.costa@example.com', dataModificacao: '2023-08-10' },
  { id: 6, nome: 'Mariana Lima', dataNascimento: '20/03/1993', cidade: 'Salvador', telefone: '(71) 4444-4444', email: 'mariana.lima@example.com', dataModificacao: '2023-09-05' },
  { id: 7, nome: 'Rafael Mendes', dataNascimento: '28/06/1980', cidade: 'Curitiba', telefone: '(41) 3333-3333', email: 'rafael.mendes@example.com', dataModificacao: '2023-07-20' },
  { id: 8, nome: 'Carla Almeida', dataNascimento: '14/07/1991', cidade: 'Fortaleza', telefone: '(85) 2222-2222', email: 'carla.almeida@example.com', dataModificacao: '2023-05-28' },
  { id: 9, nome: 'Lucas Santos', dataNascimento: '08/05/1987', cidade: 'Manaus', telefone: '(92) 1111-1111', email: 'lucas.santos@example.com', dataModificacao: '2023-06-30' },
  { id: 10, nome: 'Fernanda Oliveira', dataNascimento: '17/12/1984', cidade: 'Recife', telefone: '(81) 0000-0000', email: 'fernanda.oliveira@example.com', dataModificacao: '2023-08-15' },
];

const Relatorios = () => {
  // Estado para controlar exibição dos detalhes do cliente
  const [showDetails, setShowDetails] = useState(false);
  // Estado para armazenar o cliente selecionado para visualização detalhada
  const [selectedCliente, setSelectedCliente] = useState(null);
  // Estado para o filtro por nome
  const [filtroNome, setFiltroNome] = useState('');
  // Estado para o filtro por cidade
  const [filtroCidade, setFiltroCidade] = useState('');
  // Estado para a opção de ordenação
  const [ordenacao, setOrdenacao] = useState('');

  // Função para exibir os detalhes do cliente
  const handleViewDetails = (cliente) => {
    setSelectedCliente(cliente);
    setShowDetails(true);
  };

  // Função para fechar o modal de detalhes do cliente
  const handleCloseDetails = () => {
    setShowDetails(false);
  };

  // Função para capturar e exportar os dados do cliente como PDF
  const handleSavePDF = () => {
    const doc = new jsPDF();

    try {
      const { nome, dataNascimento, cidade, telefone, email } = selectedCliente;
      doc.text(`Nome: ${nome}`, 10, 20);
      doc.text(`Data de Nascimento: ${dataNascimento}`, 10, 30);
      doc.text(`Cidade: ${cidade}`, 10, 40);
      doc.text(`Telefone: ${telefone}`, 10, 50);
      doc.text(`Email: ${email}`, 10, 60);

      // Adiciona a data de modificação no PDF
      if (selectedCliente.dataModificacao) {
        doc.text(`Data de Modificação: ${selectedCliente.dataModificacao}`, 10, 70);
      }

      // Salva o PDF com o nome do cliente
      doc.save(`dados_cliente_${nome}.pdf`);
    } catch (error) {
      console.error('Erro ao gerar PDF:', error);
    }
  };

  // Função para aplicar filtros e ordenação nos clientes
  const filteredAndSortedClientes = clientes.filter(cliente => {
    return (
      (cliente.nome.toLowerCase().includes(filtroNome.toLowerCase()) || filtroNome === '') &&
      (cliente.cidade.toLowerCase().includes(filtroCidade.toLowerCase()) || filtroCidade === '')
    );
  }).sort((a, b) => {
    // Ordenação por nome
    if (ordenacao === 'nome') {
      return a.nome.localeCompare(b.nome);
    }
    // Ordenação por data de modificação
    if (ordenacao === 'dataModificacao') {
      return new Date(b.dataModificacao) - new Date(a.dataModificacao);
    }

    return 0;
  });

  return (
    <Container fluid className="p-6 d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
      <Row className="w-100">
        <Col>
          <Card className="shadow">
            <Card.Body>
              {/* Filtros e controles */}
              <Form className="mb-3">
                <Row>
                  <Col md={4}>
                    <Form.Control
                      type="text"
                      placeholder="Filtrar por nome"
                      value={filtroNome}
                      onChange={(e) => setFiltroNome(e.target.value)}
                    />
                  </Col>
                  <Col md={4}>
                    <Form.Control
                      type="text"
                      placeholder="Filtrar por cidade"
                      value={filtroCidade}
                      onChange={(e) => setFiltroCidade(e.target.value)}
                    />
                  </Col>
                  <Col md={4}>
                    <Form.Select
                      value={ordenacao}
                      onChange={(e) => setOrdenacao(e.target.value)}
                    >
                      <option value="">Ordenar por...</option>
                      <option value="nome">Nome</option>
                      <option value="dataModificacao">Data de Modificação</option>
                    </Form.Select>
                  </Col>
                </Row>
              </Form>

              {/* Lista de clientes filtrada e ordenada */}
              <ListGroup>
                {filteredAndSortedClientes.map(cliente => (
                  <ListGroup.Item key={cliente.id} className="d-flex justify-content-between align-items-center">
                    <span>{cliente.nome}</span>
                    <span>{cliente.cidade}</span>
                    <span>Data de Modificação: {cliente.dataModificacao}</span>
                    <Button variant="outline-secondary" onClick={() => handleViewDetails(cliente)}>Visualizar</Button>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Modal para exibir detalhes do cliente */}
      <Modal show={showDetails} onHide={handleCloseDetails}>
        <Modal.Header closeButton>
          <Modal.Title>Detalhes do Cliente</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedCliente && (
            <div>
              <p><strong>Nome:</strong> {selectedCliente.nome}</p>
              <p><strong>Data de Nascimento:</strong> {selectedCliente.dataNascimento}</p>
              <p><strong>Cidade:</strong> {selectedCliente.cidade}</p>
              <p><strong>Telefone:</strong> {selectedCliente.telefone}</p>
              <p><strong>Email:</strong> {selectedCliente.email}</p>
              {selectedCliente.dataModificacao && (
                <p><strong>Data de Modificação:</strong> {selectedCliente.dataModificacao}</p>
              )}
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseDetails}>Fechar</Button>
          <Button variant="primary" onClick={handleSavePDF}>Salvar como PDF</Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default Relatorios;
