'use client'
// import node module libraries
import { useState } from 'react';
import { Container, Row, Col, Form, Button, Table } from 'react-bootstrap';

// import layout components
import DashboardLayout from '../../layout';

const SearchClients = () => {
  const [filters, setFilters] = useState({
    modificationDate: '',
    name: '',
    age: '',
    city: ''
  });
  const [clients, setClients] = useState([]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFilters({
      ...filters,
      [name]: value
    });
  };

  const handleSearch = () => {
    // Logic to fetch clients based on filters
  };

  return (
    <DashboardLayout>
      <Container fluid className="p-6">
        <Row className="mb-4">
          <Col>
            <h1>Buscar Clientes</h1>
          </Col>
        </Row>
        <Row className="mb-4">
          <Col md={3}>
            <Form.Group controlId="modificationDate">
              <Form.Label>Data de Modificação</Form.Label>
              <Form.Control 
                type="date" 
                name="modificationDate" 
                value={filters.modificationDate} 
                onChange={handleInputChange} 
              />
            </Form.Group>
          </Col>
          <Col md={3}>
            <Form.Group controlId="name">
              <Form.Label>Nome</Form.Label>
              <Form.Control 
                type="text" 
                name="name" 
                value={filters.name} 
                onChange={handleInputChange} 
              />
            </Form.Group>
          </Col>
          <Col md={2}>
            <Form.Group controlId="age">
              <Form.Label>Idade</Form.Label>
              <Form.Control 
                type="number" 
                name="age" 
                value={filters.age} 
                onChange={handleInputChange} 
              />
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group controlId="city">
              <Form.Label>Cidade</Form.Label>
              <Form.Control 
                type="text" 
                name="city" 
                value={filters.city} 
                onChange={handleInputChange} 
              />
            </Form.Group>
          </Col>
        </Row>
        <Button variant="primary" onClick={handleSearch}>Buscar</Button>
        <Table striped bordered hover className="mt-4">
          <thead>
            <tr>
              <th>Nome</th>
              <th>Idade</th>
              <th>Cidade</th>
              <th>Data de Modificação</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {clients.map(client => (
              <tr key={client.id}>
                <td>{client.name}</td>
                <td>{client.age}</td>
                <td>{client.city}</td>
                <td>{client.modificationDate}</td>
                <td>
                  <Button variant="info">Visualizar</Button>{' '}
                  <Button variant="warning">Editar</Button>{' '}
                  <Button variant="danger">Baixar PDF</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Container>
    </DashboardLayout>
  );
};

export default SearchClients;
