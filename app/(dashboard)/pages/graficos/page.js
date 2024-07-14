'use client';

// import node module libraries
import { useState, useEffect } from 'react';
import { Col, Row, Container, Form, Button } from 'react-bootstrap';
import Image from 'next/image';
// import widget as custom components
import { PageHeading } from 'widgets';

const Graficos = () => {
  const [imageData, setImageData] = useState(null);

  useEffect(() => {
    const savedImage = localStorage.getItem('uploadedImage');
    if (savedImage) {
      setImageData(savedImage);
    }
  }, []);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setImageData(reader.result);
      localStorage.setItem('uploadedImage', reader.result);
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setImageData(null);
    localStorage.removeItem('uploadedImage');
  };

  return (
    <Container fluid className="p-6">
      {/* Page Heading */}
      <PageHeading heading="Gráficos" />
      <div className="py-8">
        <Row>
          <Col xl={{ span: 10, offset: 1 }} md={12}> 
            <Row className="mb-10">
              <Col lg={12} md={12} xs={12}>
                <Form.Group>
                  <Form.Label>Upload de Imagem</Form.Label>
                  <Form.Control type="file" onChange={handleImageUpload} />
                </Form.Group>
                {imageData && (
                  <>
                    <div className="mt-4" style={{ position: 'relative', width: '100%', height: 'auto' }}>
                      <Image src={imageData} alt="Uploaded Graph" layout="responsive" width={700} height={400} />
                    </div>
                    <Button variant="danger" className="mt-3" onClick={handleRemoveImage}>Remover Imagem</Button>
                  </>
                )}
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
    </Container>
  );
};

export default Graficos;
