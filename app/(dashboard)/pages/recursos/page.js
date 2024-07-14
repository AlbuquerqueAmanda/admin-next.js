'use client';
// import node module libraries
import { useState, useEffect } from 'react';
import { Row, Col, Container, Form, Button, Table, Modal } from 'react-bootstrap';
import jsPDF from 'jspdf';  // Importe jsPDF
import 'jspdf-autotable';   // Importe jspdf-autotable

// import widget as custom components
import { PageHeading } from 'widgets';

// Restante do código


const ResourceManagement = () => {
  const [resources, setResources] = useState([]);
  const [resourceName, setResourceName] = useState('');
  const [resourceType, setResourceType] = useState('');
  const [resourceQuantity, setResourceQuantity] = useState('');
  const [editIndex, setEditIndex] = useState(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [resourceToDelete, setResourceToDelete] = useState(null);

  useEffect(() => {
    const savedResources = localStorage.getItem('resources');
    if (savedResources) {
      setResources(JSON.parse(savedResources));
    }
  }, []);

  const saveResourcesToLocalStorage = (updatedResources) => {
    localStorage.setItem('resources', JSON.stringify(updatedResources));
  };

  const handleAddResource = () => {
    if (!resourceName || !resourceType || !resourceQuantity) {
      alert('Por favor, preencha todos os campos antes de adicionar um recurso.');
      return;
    }

    const newResource = {
      name: resourceName,
      type: resourceType,
      quantity: resourceQuantity,
      date: new Date().toLocaleString()
    };

    if (editIndex !== null) {
      const updatedResources = [...resources];
      updatedResources[editIndex] = newResource;
      setResources(updatedResources);
      saveResourcesToLocalStorage(updatedResources);
      setEditIndex(null);
    } else {
      const updatedResources = [...resources, newResource];
      setResources(updatedResources);
      saveResourcesToLocalStorage(updatedResources);
    }

    setResourceName('');
    setResourceType('');
    setResourceQuantity('');
  };

  const handleEditResource = (index) => {
    const resource = resources[index];
    setResourceName(resource.name);
    setResourceType(resource.type);
    setResourceQuantity(resource.quantity);
    setEditIndex(index);
  };

  const handleShowConfirmModal = (index) => {
    setResourceToDelete(index);
    setShowConfirmModal(true);
  };

  const handleCloseConfirmModal = () => {
    setResourceToDelete(null);
    setShowConfirmModal(false);
  };

  const handleDeleteResourceConfirmed = () => {
    if (resourceToDelete !== null) {
      const updatedResources = resources.filter((_, index) => index !== resourceToDelete);
      setResources(updatedResources);
      saveResourcesToLocalStorage(updatedResources);
      setResourceToDelete(null);
      setEditIndex(null);
      setResourceName('');
      setResourceType('');
      setResourceQuantity('');
    }
    setShowConfirmModal(false);
  };

  const handleDownloadPDF = () => {
    const doc = new jsPDF();
    doc.text('Lista de Recursos', 20, 10);
    doc.autoTable({
      head: [['Nome', 'Tipo', 'Quantidade', 'Data']],
      body: resources.map(resource => [resource.name, resource.type, resource.quantity, resource.date]),
    });
    doc.save('lista_recursos.pdf');
  };

  return (
    <Container fluid className="p-6">
      {/* Page Heading */}
      <PageHeading heading="Gerenciamento de Recursos" />

      {/* Form to Add Resource */}
      <Row className="mb-4">
        <Col md={3}>
          <Form.Group controlId="resourceName">
            <Form.Label>Nome do Recurso</Form.Label>
            <Form.Control
              type="text"
              value={resourceName}
              onChange={(e) => setResourceName(e.target.value)}
              placeholder="Insira o nome do recurso"
            />
          </Form.Group>
        </Col>
        <Col md={3}>
          <Form.Group controlId="resourceType">
            <Form.Label>Tipo de Recurso</Form.Label>
            <Form.Control
              as="select"
              value={resourceType}
              onChange={(e) => setResourceType(e.target.value)}
            >
              <option value="">Selecione o tipo de recurso</option>
              <option value="Financeiro">Financeiro</option>
              <option value="Material">Material</option>
            </Form.Control>
          </Form.Group>
        </Col>
        <Col md={3}>
          <Form.Group controlId="resourceQuantity">
            <Form.Label>Quantidade de Recurso</Form.Label>
            <Form.Control
              type="number"
              value={resourceQuantity}
              onChange={(e) => setResourceQuantity(e.target.value)}
              placeholder="Insira a quantidade de recurso"
            />
          </Form.Group>
        </Col>
        <Col md={3} className="d-flex align-items-end">
          <Button onClick={handleAddResource} variant="primary">
            {editIndex !== null ? 'Salvar Alterações' : 'Adicionar Recurso'}
          </Button>
          <Button onClick={handleDownloadPDF} variant="secondary" className="ms-2">
            Baixar PDF
          </Button>
        </Col>
      </Row>

      {/* Resource List */}
      <Row>
        <Col>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Nome do Recurso</th>
                <th>Tipo de Recurso</th>
                <th>Quantidade</th>
                <th>Data de Modificação</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {resources.map((resource, index) => (
                <tr key={index}>
                  <td>{resource.name}</td>
                  <td>{resource.type}</td>
                  <td>{resource.quantity}</td>
                  <td>{resource.date}</td>
                  <td>
                    <Button
                      variant="warning"
                      onClick={() => handleEditResource(index)}
                    >
                      Editar
                    </Button>
                    {/* Renderiza o botão de excluir apenas quando um recurso está sendo editado */}
                    {editIndex === index && (
                      <Button
                        variant="danger"
                        onClick={() => handleShowConfirmModal(index)}
                        className="ms-2"
                      >
                        Excluir
                      </Button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>

      {/* Modal de Confirmação */}
      <Modal show={showConfirmModal} onHide={handleCloseConfirmModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Confirmar Exclusão</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Tem certeza de que deseja excluir este recurso?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseConfirmModal}>
            Cancelar
          </Button>
          <Button variant="danger" onClick={handleDeleteResourceConfirmed}>
            Excluir
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default ResourceManagement;
