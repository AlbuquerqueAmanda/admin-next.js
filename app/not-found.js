'use client'
// import node module libraries
import { Col, Row, Image, Container } from 'react-bootstrap';
import Link from 'next/link';

// import hooks
import useMounted from 'hooks/useMounted';
import { Fragment } from 'react';

const NotFound = () => {
  const hasMounted = useMounted();
  return (
    <Fragment>
      {hasMounted &&
        <Container>
          <Row className="justify-content-center align-items-center min-vh-100">
            <Col sm={12} className="text-center">
              <h1 className="display-4 fw-bold text-danger">Oops! Página não encontrada.</h1>
              <p className="mb-4 text-muted">Desculpe, mas a página que você está procurando não existe ou foi movida.</p>
              <Link legacyBehavior href="/" passHref>
                <a className="btn btn-primary btn-lg">
                  Voltar para a Página Inicial
                </a>
              </Link>
            </Col>
          </Row>
        </Container>
      }
    </Fragment>
  );
};

export default NotFound;
