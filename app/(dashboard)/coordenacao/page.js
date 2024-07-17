'use client';  

import React from 'react';
import { Card, Image, Badge } from 'react-bootstrap';

const CoordinatorInfo = () => {
  return (
    <Card className="my-3">
      <Card.Body className="d-flex align-items-center">
        <Image 
          src="/images/avatar/avatar-14.jpg" 
          roundedCircle 
          className="me-3" 
          style={{ width: '150px', height: '150px' }} 
          alt="Foto do Coordenador" 
        />
        <div>
          <Card.Title>Nome do Coordenador</Card.Title>
          <Card.Text>
            <Badge bg="primary">Administrador</Badge>
          </Card.Text>
          <Card.Text>
            <strong>Email:</strong> coordenador@example.com
          </Card.Text>
          <Card.Text>
            <strong>Formação:</strong> Graduação em Administração, Mestrado em Gestão de Projetos
          </Card.Text>
          <Card.Text>
            <strong>Introdução:</strong> 
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla quis lorem ut libero malesuada feugiat. Proin eget tortor risus.
          </Card.Text>
        </div>
      </Card.Body>
    </Card>
  );
};

export default CoordinatorInfo;
