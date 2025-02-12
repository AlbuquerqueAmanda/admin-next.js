'use client';

// import node module libraries
import { useState } from 'react';
import { Row, Col, Card, Form, Button, Image } from 'react-bootstrap';
import Link from 'next/link';
import useMounted from 'hooks/useMounted';

const SignUp = () => {
  const hasMounted = useMounted();

  return (
    <Row className="align-items-center justify-content-center g-0 min-vh-100">
      <Col xxl={4} lg={6} md={8} xs={12} className="py-8 py-xl-0">
        {/* Card */}
        <Card className="smooth-shadow-md">
          {/* Card body */}
          <Card.Body className="p-6">
            <div className="d-flex justify-content-between mb-4">
              <div>
                <Link href="/">
                  <Image src="/images/brand/logo/logo-primary.svg" className="mb-2" alt="" />
                </Link>
                <p className="mb-6">Crie sua conta</p>
              </div>
              <div>
                <Link href="/">
                  <Button variant="secondary">Página Inicial</Button>
                </Link>
              </div>
            </div>
            {/* Form */}
            {hasMounted && 
            <Form>
              {/* Username */}
              <Form.Group className="mb-3" controlId="username">
                <Form.Label>Nome e sobrenome</Form.Label>
                <Form.Control type="text" name="username" placeholder="Nome e sobrenome" required="" />
              </Form.Group>

              {/* Email */}
              <Form.Group className="mb-3" controlId="email">
                <Form.Label>E-mail</Form.Label>
                <Form.Control type="email" name="email" placeholder="Insira aqui seu endereço de e-mail" required="" />
              </Form.Group>

              {/* Password */}
              <Form.Group className="mb-3" controlId="password">
                <Form.Label>Senha</Form.Label>
                <Form.Control type="password" name="password" placeholder="**************" required="" />
              </Form.Group>

              {/* Confirm Password */}
              <Form.Group className="mb-3" controlId="confirm-password">
                <Form.Label>Confirme sua senha</Form.Label>
                <Form.Control type="password" name="confirm-password" placeholder="**************" required="" />
              </Form.Group>

              {/* Checkbox */}
              <div className="mb-3">
                <Form.Check type="checkbox" id="check-api-checkbox">
                  <Form.Check.Input type="checkbox" />
                  <Form.Check.Label>
                  Ao me cadastrar, concordo com os <Link href="#"> Termos de uso e Política de privacidade.</Link>
                  </Form.Check.Label>
                </Form.Check>
              </div>

              <div>
                {/* Button */}
                <div className="d-grid">
                  <Button variant="primary" type="submit">Criar conta</Button>
                </div>
                <div className="d-md-flex justify-content-between mt-4">
                  <div className="mb-2 mb-md-0">
                    <Link href="/authentication/sign-in" className="fs-5">Já possui conta? Faça Login. </Link>
                  </div>
                  <div>
                    <Link href="/authentication/forget-password" className="text-inherit fs-5">Esqueceu sua senha?</Link>
                  </div>
                </div>
              </div>
            </Form>
            }
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};

export default SignUp;
  