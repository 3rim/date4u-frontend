import { Container, Row, Col, Form, FormGroup, FormLabel, FormControl } from 'react-bootstrap';
import Carousel from 'react-bootstrap/Carousel';


function Profile() {
  return (
    <Container>
      <h1 className="mt-4">Profil von ####</h1>
      <Row className="mt-4">
        <Col md={4}>
          <div className="border p-3">
            <Carousel className="mb-3" style={{ height: '200px' }}>
              <Carousel.Item>
                <img
                  className="d-block w-100"
                  src="https://via.placeholder.com/200"
                  alt="First slide"
                  style={{ height: '200px', objectFit: 'cover' }}
                />
                <Carousel.Caption>
                  <p>Like</p>
                </Carousel.Caption>
              </Carousel.Item>
              <Carousel.Item>
                <img
                  className="d-block w-100"
                  src="https://via.placeholder.com/200"
                  alt="Second slide"
                  style={{ height: '200px', objectFit: 'cover' }}
                />
                <Carousel.Caption>
                  <p>Like</p>
                </Carousel.Caption>
              </Carousel.Item>
              <Carousel.Item>
                <img
                  className="d-block w-100"
                  src="https://via.placeholder.com/200"
                  alt="Third slide"
                  style={{ height: '200px', objectFit: 'cover' }}
                />
                <Carousel.Caption>
                  <p>Like</p>
                </Carousel.Caption>
              </Carousel.Item>
            </Carousel>
            <Form.Control type="text" placeholder="Nickname" />
          </div>
        </Col>

        <Col md={8}>
          <Form>
            <FormGroup>
              <FormLabel>Geburtsdatum</FormLabel>
              <FormControl as="select">
                <option>1. Mai 1888</option>
                {/* Add more options as needed */}
              </FormControl>
            </FormGroup>
            <FormGroup>
              <FormLabel>Hornlänge</FormLabel>
              <FormControl as="select">
                <option>28 cm</option>
                {/* Add more options as needed */}
              </FormControl>
            </FormGroup>
            <FormGroup>
              <FormLabel>Geschlecht</FormLabel>
              <FormControl as="select">
                {/* Add options for gender */}
                <option>Männlich</option>
                <option>Weiblich</option>
              </FormControl>
            </FormGroup>
            <FormGroup>
              <FormLabel>Interesse am Geschlecht</FormLabel>
              <FormControl as="select">
                {/* Add options for interest in gender */}
                <option>Männlich</option>
                <option>Weiblich</option>
                <option>Beides</option>
              </FormControl>
            </FormGroup>
            <FormGroup>
              <FormLabel>Hobbies / Freizeit / Interessen</FormLabel>
              <FormControl as="textarea" rows={5} />
            </FormGroup>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default Profile;