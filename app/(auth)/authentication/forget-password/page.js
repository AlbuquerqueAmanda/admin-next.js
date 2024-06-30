'use client'

// import node module libraries
import { Row, Col, Card, Form, Button, Image } from 'react-bootstrap';
import Link from 'next/link';

// import hooks
import useMounted from 'hooks/useMounted';

const ForgetPassword = () => {
  const hasMounted = useMounted();
  return (
    <Row className="align-items-center justify-content-center g-0 min-vh-100">
      <Col xxl={4} lg={6} md={8} xs={12} className="py-8 py-xl-0">
        {/* Card */}
        <Card className="smooth-shadow-md">
          {/* Card body */}
          <Card.Body className="p-6">
            <div className="mb-4">
              <Link href="/"><Image src="/images/brand/logo/logo-primary.svg" className="mb-2" alt="" /></Link>
              <p className="mb-6">Enviaremos um e-mail para alterar sua senha.</p>
            </div>
            {/* Form */}
            {hasMounted && 
            <Form>
              {/* Email */}
              <Form.Group className="mb-3" controlId="email">
                <Form.Label>E-mail</Form.Label>
                <Form.Control type="email" name="email" placeholder="Insira seu e-mail de cadastro" />
              </Form.Group>
              {/* Button */}
              <div className="mb-3 d-grid">
                <Button variant="primary" type="submit">Redefinir minha senha</Button>
              </div>
              <span>Não possui conta? <Link href="/authentication/sign-in">Criar conta</Link></span>
            </Form>
            }
          </Card.Body>
        </Card>
      </Col>
    </Row>
  )
}

export default ForgetPassword