'use client'
// import node module libraries
import { Row, Col, Container } from 'react-bootstrap';

// import widget as custom components
import { PageHeading } from 'widgets'

// import sub components
import { BillingAddress, CurrentPlan } from 'sub-components'

const Billing = () => {
  return (
    <Container fluid className="p-6">
      {/* Page Heading */}
      <PageHeading heading="" />

      
    </Container>
  )
}

export default Billing