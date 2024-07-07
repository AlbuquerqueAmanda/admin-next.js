// import node module libraries
import { Col, Row, Form, Card, Button, Image } from 'react-bootstrap';
import { FormSelect } from 'widgets';
import useMounted from 'hooks/useMounted';
import React, { useState } from 'react';
import axios from 'axios'; // Import axios for HTTP requests

  const estadosBr = [
    { value: 'AC', label: 'Acre' },
    { value: 'AL', label: 'Alagoas' },
    { value: 'AM', label: 'Amazonas' },
    { value: 'AP', label: 'Amapá' },
    { value: 'BA', label: 'Bahia' },
    { value: 'CE', label: 'Ceará' },
    { value: 'DF', label: 'Distrito Federal' },
    { value: 'ES', label: 'Espírito Santo' },
    { value: 'GO', label: 'Goiás' },
    { value: 'MA', label: 'Maranhão' },
    { value: 'MT', label: 'Mato Grosso' },
    { value: 'MS', label: 'Mato Grosso do Sul' },
    { value: 'MG', label: 'Minas Gerais' },
    { value: 'PA', label: 'Pará' },
    { value: 'PB', label: 'Paraíba' },
    { value: 'PR', label: 'Paraná' },
    { value: 'PE', label: 'Pernambuco' },
    { value: 'PI', label: 'Piauí' },
    { value: 'RJ', label: 'Rio de Janeiro' },
    { value: 'RN', label: 'Rio Grande do Norte' },
    { value: 'RO', label: 'Rondônia' },
    { value: 'RR', label: 'Roraima' },
    { value: 'RS', label: 'Rio Grande do Sul' },
    { value: 'SC', label: 'Santa Catarina' },
    { value: 'SE', label: 'Sergipe' },
    { value: 'SP', label: 'São Paulo' },
    { value: 'TO', label: 'Tocantins' },
  ];
  
  const GeneralSetting = () => {
    const hasMounted = useMounted();
    const [cep, setCep] = useState('');
    const [addressLine, setAddressLine] = useState('');
    const [addressLineTwo, setAddressLineTwo] = useState('');
  
    const handleCepChange = (event) => {
      setCep(event.target.value);
    };
  
    const handleAddressFill = async () => {
      if (!cep) return; // Don't fetch if CEP is empty
  
      try {
        const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
        setAddressLine(response.data.logradouro);
        setAddressLineTwo(`${response.data.bairro}, ${response.data.localidade} - ${response.data.uf}`);
      } catch (error) {
        console.error('Error fetching address:', error);
        // Handle errors gracefully, e.g., display an error message to the user
      }
    };

  return (
    <Row className="mb-8">
      <Col xl={3} lg={4} md={12} xs={12}>
        <div className="mb-4 mb-lg-0">
          <h4 className="mb-1">Configurações de perfil</h4>
        </div>
      </Col>
      <Col xl={9} lg={8} md={12} xs={12}>
        <Card>
          {/* card body */}
          <Card.Body>
            <div className=" mb-6">
              <h4 className="mb-1">Editar Perfil</h4>
            </div>
            <Row className="align-items-center mb-8">
              <Col md={3} className="mb-3 mb-md-0">
                <h5 className="mb-0">Avatar</h5>
              </Col>
              <Col md={9}>
                <div className="d-flex align-items-center">
                  <div className="me-3">
                    <Image src="/images/avatar/avatar-5.jpg" className="rounded-circle avatar avatar-lg" alt="" />
                  </div>
                  <div>
                    <Button variant="outline-white" className="me-2" type="submit">Trocar </Button>
                    <Button variant="outline-white" type="submit">Remover </Button>
                  </div>
                </div>
              </Col>
            </Row>
            {/* col */}
            <Row className="mb-8">
              
            </Row>
            <div>
              <div className="mb-6">
                <h4 className="mb-1">Informações Básicas</h4>
              </div>
              {hasMounted && 
              <Form>
                <Row className="mb-3">
                  <Form.Label className="col-sm-4 col-form-label form-label" htmlFor="fullName">Nome completo</Form.Label>
                  <Col sm={4} className="mb-3 mb-lg-0">
                    <Form.Control type="text" placeholder="Nome" id="fullName" required />
                  </Col>
                  <Col sm={4}>
                    <Form.Control type="text" placeholder="Sobrenome" id="lastName" required />
                  </Col>
                </Row>
                {/* row */}
                <Row className="mb-3">
                <Form.Label className="col-sm-4 col-form-label form-label" htmlFor="email">E-mail</Form.Label>
                  <Col md={8} xs={12}>
                    <Form.Control type="email" placeholder="E-mail" id="email" required />
                  </Col>
                </Row>
                {/* row */}
                <Row className="mb-3">
                  <Form.Label className="col-sm-4" htmlFor="phone">Celular <span className="text-muted">(Opcional)</span></Form.Label>
                  <Col md={8} xs={12}>
                    <Form.Control type="text" placeholder="Número de celular" id="phone" />
                  </Col>
                </Row>

                {/* Location */}
                <Row className="mb-3">
                  <Form.Label className="col-sm-4" htmlFor="country">Estado</Form.Label>
                  <Col md={8} xs={12}>
                    <Form.Control as={FormSelect} placeholder="Selecione o estado" id="country" options={estadosBr} />
                  </Col>
                </Row>

                 {/* Zip code */}
                 <Row className="mb-3">
                    <Form.Label className="col-sm-4" htmlFor="zipcode">
                      CEP
                    </Form.Label>
                    <Col md={8} xs={12}>
                      <Form.Control
                        type="text"
                        placeholder="Digite o CEP"
                        id="zipcode"
                        value={cep}
                        onChange={handleCepChange}
                        onBlur={handleAddressFill} // Fetch address on blur event
                        required
                      />
                    </Col>
                  </Row>

                {/* Address Line One */}
                <Row className="mb-3">
                    <Form.Label className="col-sm-4" htmlFor="addressLine">
                      Endereço
                    </Form.Label>
                    <Col md={8} xs={12}>
                      <Form.Control
                        type="text"
                        placeholder="Insira seu endereço"
                        id="addressLine"
                        value={addressLine}
                        readOnly // Make addressLine read-only
                      />
                    </Col>
                  </Row>

                {/* Address Line Two */}
                <Row className="mb-3">
                    <Form.Label className="col-sm-4" htmlFor="addressLineTwo">
                      Complemento
                    </Form.Label>
                    <Col md={8} xs={12}>
                      <Form.Control
                        type="text"
                        placeholder="Insira complemento"
                        id="addressLineTwo"
                        value={addressLineTwo}
                        readOnly // Make addressLineTwo read-only
                      />
                    </Col>
                  </Row>
              </Form>
              }
            </div>
          </Card.Body>
        </Card>

      </Col>
    </Row>
  )
}

export default GeneralSetting;