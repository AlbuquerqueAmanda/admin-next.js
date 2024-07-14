'use client';
import { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, ListGroup, Modal, Form, Alert } from 'react-bootstrap';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const Relatorios = () => {
  const [relatorios, setRelatorios] = useState([]);
  const [formData, setFormData] = useState({ tipo: '', conteudo: '', setor: '', titulo: '' });
  const [showForm, setShowForm] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [relatoriosSelecionados, setRelatoriosSelecionados] = useState([]);
  const [filtroTipo, setFiltroTipo] = useState('');
  const [ordem, setOrdem] = useState('');
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [selectedRelatorio, setSelectedRelatorio] = useState(null);

  useEffect(() => {
    const relatoriosLocalStorage = JSON.parse(localStorage.getItem('relatorios')) || [];
    if (!Array.isArray(relatoriosLocalStorage)) {
      localStorage.setItem('relatorios', JSON.stringify([]));
      setRelatorios([]);
    } else {
      setRelatorios(relatoriosLocalStorage);
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCadastroRelatorio = () => {
    if (!formData.tipo || !formData.conteudo) {
      setShowAlert(true);
      return;
    }
    const newRelatorio = {
      id: relatorios.length + 1,
      ...formData,
      dataModificacao: new Date().toLocaleDateString('pt-BR'),
    };
    const updatedRelatorios = [...relatorios, newRelatorio];
    setRelatorios(updatedRelatorios);
    localStorage.setItem('relatorios', JSON.stringify(updatedRelatorios));
    setFormData({ tipo: '', conteudo: '', setor: '', titulo: '' });
    setShowAlert(false);
    setShowForm(false);
  };

  const handleShowForm = () => setShowForm(true);
  const handleCloseForm = () => setShowForm(false);

  const handleExportarPDF = (relatoriosToExport) => {
    const doc = new jsPDF();
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold'); // Define o estilo da fonte como negrito
  
    let startY = 10; // Posição inicial do primeiro relatório na página
    let pageHeight = doc.internal.pageSize.height; // Altura da página atual (padrão A4)
    let marginBottom = 10;
  
    relatoriosToExport.forEach((relatorio, index) => {
      // Calcula a altura necessária para renderizar o relatório completo
      let lineHeight = 5; // Altura estimada de uma linha de texto
      let relatorioHeight = 60; // Altura base do relatório
  
      if (relatorio.conteudo) {
        relatorioHeight += relatorio.conteudo.split('\n').length * lineHeight; // Altura estimada do conteúdo do relatório
      }
  
      // Verifica se há espaço suficiente para renderizar o relatório na página atual
      if (startY + relatorioHeight > pageHeight - marginBottom) {
        if (index > 0) { // Evita adicionar uma página antes do primeiro relatório
          doc.addPage(); // Adiciona uma nova página se não houver espaço suficiente
        }
        startY = 10; // Reinicia a posição Y para o topo da nova página
      }
  
      // Escreve o relatório na posição startY
      doc.setFont('helvetica', 'bold'); // Garante que o estilo da fonte seja negrito para o título do relatório
      doc.text(`Relatório ${index + 1}`, 10, startY);
      startY += 10; // Ajusta a posição Y para o próximo elemento
  
      doc.setFont('helvetica', 'normal'); // Retorna ao estilo de fonte normal para os detalhes do relatório
      doc.text(`Tipo: ${relatorio.tipo}`, 15, startY);
      startY += 10;
      doc.text(`Setor: ${relatorio.setor}`, 15, startY);
      startY += 10;
      doc.text(`Título: ${relatorio.titulo}`, 15, startY);
      startY += 10;
      doc.text(`Conteúdo:`, 15, startY);
      doc.setFont('helvetica', 'normal');
      startY += 5;
  
      if (relatorio.conteudo) {
        const lines = doc.splitTextToSize(relatorio.conteudo, 180); // Ajusta o conteúdo para caber na largura da página
        lines.forEach((line) => {
          if (startY > pageHeight - marginBottom) {
            doc.addPage();
            startY = 10;
          }
          doc.text(line, 15, startY);
          startY += lineHeight;
        });
      }
  
      startY += 10; // Ajusta a posição Y para a próxima seção
      if (startY > pageHeight - marginBottom) {
        doc.addPage();
        startY = 10;
      }
      doc.text(`Data de Modificação: ${relatorio.dataModificacao}`, 15, startY);
      startY += 20; // Ajusta a posição Y para a próxima seção
    });
  
    doc.save('lista_relatorios.pdf');
  };
   
  const handleCloseAlert = () => setShowAlert(false);

  const handleShowConfirmModal = () => setShowConfirmModal(true);
  const handleCloseConfirmModal = () => setShowConfirmModal(false);

  const handleExcluirRelatoriosSelecionados = () => {
    const updatedRelatorios = relatorios.filter((relatorio) => !relatoriosSelecionados.includes(relatorio.id));
    setRelatorios(updatedRelatorios);
    localStorage.setItem('relatorios', JSON.stringify(updatedRelatorios));
    setShowConfirmModal(false);
    setRelatoriosSelecionados([]);
  };

  const handleViewDetails = (relatorio) => {
    setSelectedRelatorio(relatorio);
    setShowDetails(true);
  };

  const handleCloseDetails = () => setShowDetails(false);

  const handleSelectRelatorio = (id) => {
    const selecionados = [...relatoriosSelecionados];
    if (selecionados.includes(id)) {
      setRelatoriosSelecionados(selecionados.filter((selectedId) => selectedId !== id));
    } else {
      setRelatoriosSelecionados([...selecionados, id]);
    }
  };

  const handleExportar = () => {
    const relatoriosToExport = relatoriosSelecionados.length
      ? relatorios.filter((relatorio) => relatoriosSelecionados.includes(relatorio.id))
      : relatorios;
    handleExportarPDF(relatoriosToExport);
  };

  const handleSelectAll = () => {
    if (relatoriosSelecionados.length === relatorios.length) {
      setRelatoriosSelecionados([]);
    } else {
      setRelatoriosSelecionados(relatorios.map((relatorio) => relatorio.id));
    }
  };

  const filtrarRelatorios = () => {
    return relatorios
      .filter((relatorio) => relatorio.tipo.toLowerCase().includes(filtroTipo.toLowerCase()))
      .sort((a, b) => {
        if (ordem === 'tipo') {
          return a.tipo.localeCompare(b.tipo);
        } else if (ordem === 'dataModificacao') {
          return new Date(b.dataModificacao) - new Date(a.dataModificacao);
        }
        return 0;
      });
  };

  const relatoriosFiltrados = filtrarRelatorios();

  return (
    <Container>
      <Card className="mt-4">
        <Card.Header>Cadastro de Relatórios</Card.Header>
        <Card.Body>
          <Row className="mb-4">
            <Col md={6}>
              <Form.Control
                type="text"
                placeholder="Filtrar por tipo"
                value={filtroTipo}
                onChange={(e) => setFiltroTipo(e.target.value)}
              />
            </Col>
            <Col md={6}>
              <Form.Select value={ordem} onChange={(e) => setOrdem(e.target.value)}>
                <option value="">Ordenar por</option>
                <option value="tipo">Tipo</option>
                <option value="dataModificacao">Data de Modificação</option>
              </Form.Select>
            </Col>
          </Row>
          <Button onClick={handleShowForm} className="mb-4">Cadastrar Novo Relatório</Button>
          <Button onClick={handleExportar} className="mb-4 ms-2">Exportar PDF</Button>
          <Button onClick={handleSelectAll} className="mb-4 ms-2">
            {relatoriosSelecionados.length === relatorios.length ? "Deselecionar Tudo" : "Selecionar Tudo"}
          </Button>
          {relatoriosSelecionados.length > 0 && (
            <Button onClick={handleShowConfirmModal} variant="danger" className="mb-4 ms-2">Excluir Selecionados</Button>
          )}
          <ListGroup>
            {relatoriosFiltrados.map((relatorio) => (
              <ListGroup.Item key={relatorio.id} className="d-flex justify-content-between align-items-center">
                <div>
                  <input
                    type="checkbox"
                    onChange={() => handleSelectRelatorio(relatorio.id)}
                    checked={relatoriosSelecionados.includes(relatorio.id)}
                  />
                  <span className="ms-2">{relatorio.tipo} - {relatorio.dataModificacao}</span>
                </div>
                <div>
                  <Button onClick={() => handleViewDetails(relatorio)} variant="info" size="sm" className="me-2">Detalhes</Button>
                </div>
              </ListGroup.Item>
            ))}
          </ListGroup>
          <Modal show={showForm} onHide={handleCloseForm}>
            <Modal.Header closeButton>
              <Modal.Title>Cadastro de Relatório</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form>
                {showAlert && <Alert variant="danger" onClose={handleCloseAlert} dismissible>Por favor, preencha todos os campos.</Alert>}
                <Form.Group>
                  <Form.Label>Tipo</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Digite o tipo do relatório"
                    name="tipo"
                    value={formData.tipo}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Setor</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Digite o setor do relatório"
                    name="setor"
                    value={formData.setor}
                    onChange={handleChange}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Título</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Digite o título do relatório"
                    name="titulo"
                    value={formData.titulo}
                    onChange={handleChange}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Conteúdo</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    placeholder="Digite o conteúdo do relatório"
                    name="conteudo"
                    value={formData.conteudo}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleCloseForm}>Cancelar</Button>
              <Button variant="primary" onClick={handleCadastroRelatorio}>Salvar</Button>
            </Modal.Footer>
          </Modal>
          <Modal show={showConfirmModal} onHide={handleCloseConfirmModal}>
            <Modal.Header closeButton>
              <Modal.Title>Confirmar Exclusão</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              Deseja realmente excluir os relatórios selecionados?
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleCloseConfirmModal}>Cancelar</Button>
              <Button variant="danger" onClick={handleExcluirRelatoriosSelecionados}>Excluir</Button>
            </Modal.Footer>
          </Modal>
          <Modal show={showDetails} onHide={handleCloseDetails}>
            <Modal.Header closeButton>
              <Modal.Title>Detalhes do Relatório</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {selectedRelatorio && (
                <>
                  <p><strong>Tipo:</strong> {selectedRelatorio.tipo}</p>
                  <p><strong>Setor:</strong> {selectedRelatorio.setor}</p>
                  <p><strong>Título:</strong> {selectedRelatorio.titulo}</p>
                  <p><strong>Conteúdo:</strong> {selectedRelatorio.conteudo}</p>
                  <p><strong>Data de Modificação:</strong> {selectedRelatorio.dataModificacao}</p>
                </>
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

export default Relatorios;
