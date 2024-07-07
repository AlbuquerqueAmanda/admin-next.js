"use client";
import { useState } from 'react';
import { Row, Col, Card, Form, Button, Image } from 'react-bootstrap';
import Link from 'next/link';
import { FaGoogle, FaFacebook } from 'react-icons/fa';
import axios from 'axios';
import useMounted from 'hooks/useMounted';

const SignIn = () => {
  const hasMounted = useMounted();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('/api/auth', { email, password });
      if (response.data.role === 'admin') {
        // Redirecionar para a página do admin
        // router.push('/dashboard/admin');
      } else if (response.data.role === 'client') {
        // Redirecionar para a página do cliente
        // router.push('/dashboard/client');
      }
    } catch (error) {
      setMessage('Credenciais inválidas');
    }
  };

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
                <p className="mb-6">Bem vindo de volta!</p>
              </div>
              <div>
                <Link href="/">
                  <Button variant="secondary">Página Inicial</Button>
                </Link>
              </div>
            </div>
            {/* Formulário */}
            {hasMounted && (
              <Form onSubmit={handleSubmit}>
                {/* E-mail */}
                <Form.Group className="mb-3" controlId="username">
                  <Form.Label>E-mail</Form.Label>
                  <Form.Control
                    type="email"
                    name="username"
                    placeholder="Insira seu e-mail"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </Form.Group>

                {/* Senha */}
                <Form.Group className="mb-3" controlId="password">
                  <Form.Label>Senha</Form.Label>
                  <Form.Control
                    type="password"
                    name="password"
                    placeholder="**************"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </Form.Group>

                {/* Checkbox */}
                <div className="d-lg-flex justify-content-between align-items-center mb-4">
                  <Form.Check type="checkbox" id="rememberme">
                    <Form.Check.Input type="checkbox" />
                    <Form.Check.Label>Permanecer conectado</Form.Check.Label>
                  </Form.Check>
                </div>

                {/* Botão de Entrar */}
                <div className="d-grid">
                  <Button variant="primary" type="submit">Entrar</Button>
                </div>

                {/* Links adicionais */}
                <div className="d-md-flex justify-content-between mt-4">
                  <div className="mb-2 mb-md-0">
                    <Link href="/authentication/sign-up" className="fs-5">Não possui conta? Crie sua conta.</Link>
                  </div>
                  <div>
                    <Link href="/authentication/forget-password" className="text-inherit fs-5">Esqueceu sua senha?</Link>
                  </div>
                </div>
              </Form>
            )}
            {/* Mensagem de erro */}
            {message && <p>{message}</p>}

            {/* Botões de login social */}
            <div className="d-grid gap-2 mt-4">
              <Button variant="danger" href="/authentication/login-google" className="d-flex align-items-center justify-content-center">
                <FaGoogle className="me-2" /> Login com Google
              </Button>
              <Button variant="primary" href="/authentication/login-facebook" className="d-flex align-items-center justify-content-center">
                <FaFacebook className="me-2" /> Login com Facebook
              </Button>
            </div>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};

export default SignIn;
