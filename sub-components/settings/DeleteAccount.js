// import node module libraries
import Link from 'next/link';
import { useState } from 'react';
import { Col, Row, Card, Modal, Button } from 'react-bootstrap';

const DeleteAccount = () => {
  const [showModal, setShowModal] = useState(false);

  const handleDelete = () => {
    setShowModal(true);
  };

  const confirmDelete = () => {
    setShowModal(false);
    // Aqui você pode adicionar a lógica para deletar a conta
    console.log('Conta deletada.');
  };

  const cancelDelete = () => {
    setShowModal(false);
  };

  return (
    <>
      <Row>
        <Col xl={3} lg={4} md={12} xs={12}>
          <div className="mb-4 mb-lg-0">
            <h4 className="mb-1">Deletar Conta</h4>
            <p className="mb-0 fs-5 text-muted">Excluir definitivamente sua conta</p>
          </div>
        </Col>
        <Col xl={9} lg={8} md={12} xs={12}>
          <Card className="mb-6">
            <Card.Body>
              <div className="mb-6">
                <h4 className="mb-1">Atenção! Essa ação é definitiva. </h4>
              </div>
              <div>
                <p>Exclua permanentemente todo o seu conteúdo, incluindo artigos, comentários, lista de leitura e mensagens de chat. Seu nome de usuário ficará disponível para qualquer pessoa.</p>
                <Button className="btn btn-danger" onClick={handleDelete}>Deletar Conta</Button>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Modal show={showModal} onHide={cancelDelete}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmar Exclusão</Modal.Title>
        </Modal.Header>
        <Modal.Body>Você tem certeza de que deseja deletar sua conta? Esta ação não pode ser desfeita.</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={cancelDelete}>
            Cancelar
          </Button>
          <Button variant="danger" onClick={confirmDelete}>
            Deletar Conta
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default DeleteAccount;
