'use client'
// import node module libraries
import { useRouter } from 'next/navigation';
import { Col, Row, Container, Button } from 'react-bootstrap';

// import widget as custom components
import { PageHeading } from 'widgets'

// import sub components
import {
  ActivityFeed,
  MyTeam,
  ProfileHeader,
  ProjectsContributions,
  RecentFromBlog,
  SignUpForm
} from 'sub-components'

const Profile = () => {
  const router = useRouter(); // Instanciando o useRouter

  const handleSearchClick = () => {
    router.push('/(dashboard)/pages/search-clients'); 
  };

  return (
    <Container fluid className="p-6">
      <Row className="align-items-center justify-content-between mb-4">
        <Col>
          {/* Page Heading */}
          <PageHeading heading="Clientes" />
        </Col>
        <Col xs="auto">

        </Col>
      </Row>

      {/* content */}
      <div className="py-6">
        <Row className="justify-content-center">
          <SignUpForm />
        </Row>
      </div>
    </Container>
  )
}

export default Profile;
