import { useState } from 'react';
import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap';

const SignUpForm = () => {
    const [formData, setFormData] = useState({
        fullName: '',
        dateOfBirth: '',
        cep: '',
        address: '',
        phoneNumber: '',
        email: '',
        password: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Implement validation here
        // Example: Validate password format
        const passwordRegex = /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z0-9!@#$%^&*]{6,}$/;
        if (!passwordRegex.test(formData.password)) {
            alert('Password must contain at least 1 uppercase letter, 1 number, 1 special character, and be at least 6 characters long.');
            return;
        }
        // Add further validations for other fields

        // If all validations pass, you can proceed to submit the form
        alert('Form submitted successfully!');
        // Add logic to submit the form data to your backend or wherever needed
    };

    return (
        <Container>
            <Row className="justify-content-center">
                <Col xl={6} lg={8} md={10} xs={12}>
                    <Card>
                        <Card.Body>
                            <Card.Title as="h4" className="text-center mb-4">Cadastrar Cliente</Card.Title>
                            <Form onSubmit={handleSubmit}>
                                <Form.Group controlId="fullName" className="mb-3">
                                    <Form.Label>Nome Completo</Form.Label>
                                    <Form.Control type="text" name="fullName" value={formData.fullName} onChange={handleChange} required />
                                </Form.Group>
                                <Form.Group controlId="dateOfBirth" className="mb-3">
                                    <Form.Label>Data de Nascimento</Form.Label>
                                    <Form.Control type="date" name="dateOfBirth" value={formData.dateOfBirth} onChange={handleChange} required />
                                </Form.Group>
                                <Form.Group controlId="cep" className="mb-3">
                                    <Form.Label>CEP</Form.Label>
                                    <Form.Control type="text" name="cep" value={formData.cep} onChange={handleChange} required />
                                </Form.Group>
                                <Form.Group controlId="address" className="mb-3">
                                    <Form.Label>Endereço</Form.Label>
                                    <Form.Control type="text" name="address" value={formData.address} onChange={handleChange} required />
                                </Form.Group>
                                <Form.Group controlId="phoneNumber" className="mb-3">
                                    <Form.Label>Celular</Form.Label>
                                    <Form.Control type="text" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} required />
                                </Form.Group>
                                <Form.Group controlId="email" className="mb-3">
                                    <Form.Label>E-mail</Form.Label>
                                    <Form.Control type="email" name="email" value={formData.email} onChange={handleChange} required />
                                </Form.Group>
                                <Form.Group controlId="password" className="mb-4">
                                    <Form.Label>Senha</Form.Label>
                                    <Form.Control type="password" name="password" value={formData.password} onChange={handleChange} required />
                                </Form.Group>
                                <div className="text-center mb-3">
                                    <Button variant="primary" type="submit" className="my-3">
                                        Cadastrar
                                    </Button>
                                </div>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
                <Col xl={3} lg={4} md={2} xs={12} className="text-end">
                </Col>
            </Row>
        </Container>
    );
};

export default SignUpForm;
