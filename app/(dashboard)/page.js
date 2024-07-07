'use client'
// import node module libraries
import { Col, Row, Container, Card, Button } from 'react-bootstrap';
import Link from 'next/link';

// import widget as custom components
import { PageHeading } from 'widgets'

const Home = () => {
  return (
    <Container fluid className="p-6">
      <Row className="mb-4">
        <Col>
          {/* Page Heading */}
          <PageHeading heading="Página Inicial" />
        </Col>
        <Col className="text-end">
          <Link href="/authentication/sign-in" passHref>
            <Button variant="primary">Login</Button>
          </Link>
        </Col>
      </Row>

      {/* Notícias */}
      <Row className="mb-4">
        <Col>
          <Card>
            <Card.Body>
              <Card.Title as="h4">Notícias</Card.Title>
              <Card.Text>
                <h5>Notícia 1</h5>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent vel dolor ac urna tincidunt ultrices.</p>
                <p><small>Publicado em 27 de junho de 2024</small></p>
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Posts */}
      <Row className="mb-4">
        <Col>
          <Card>
            <Card.Body>
              <Card.Title as="h4">Posts</Card.Title>
              <Card.Text>
                <h5>Post 1</h5>
                <p>Curabitur eget eros non lorem aliquam imperdiet. Phasellus nec nisl ut leo vehicula tincidunt a ut ex.</p>
                <p><small>Publicado em 25 de junho de 2024</small></p>
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Outros conteúdos */}
      <Row className="mb-4">
        <Col>
          <Card>
            <Card.Body>
              <Card.Title as="h4">Outros Conteúdos</Card.Title>
              <Card.Text>
                <h5>Conteúdo 1</h5>
                <p>Integer et massa sit amet sapien tempus bibendum sit amet a urna. Nullam ut dolor vitae risus commodo aliquet.</p>
                <p><small>Atualizado em 20 de junho de 2024</small></p>
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}

export default Home;
