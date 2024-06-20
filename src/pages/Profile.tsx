import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, FormGroup, FormLabel, FormControl } from 'react-bootstrap';
import Carousel from 'react-bootstrap/Carousel';
import { useParams } from 'react-router-dom';
import { useQuery, gql } from '@apollo/client';
import LoadingSpinner from '../components/LoadingSpinner';

interface Profile {
  id: number;
  profilePhoto: { name: string };
  nickname: string;
  birthdate: string;
  hornlength: number;
  gender: number;
  attractedToGender: number;
  description: string;
  lastseen: string;
  photos: { name: string }[];
}

interface ProfileData {
  profileById: Profile;
}

const GET_PROFILE_BY_ID = gql`
  query GetProfileById($id: ID!) {
    profileById(id: $id) {
      id
      profilePhoto {
        name
      }
      nickname
      birthdate
      hornlength
      gender
      attractedToGender
      description
      lastseen
      photos {
        name
      }
    }
  }
`;

function Profile() {
  const [isDelayed, setIsDelayed] = useState(true);
  const params = useParams();
  const profileId = params.profileId;

  const { loading, error, data } = useQuery<ProfileData>(GET_PROFILE_BY_ID, {
    variables: { id: profileId },
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsDelayed(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  if (loading || isDelayed) return <LoadingSpinner />; // Display a loading indicator while fetching data or during the delay
  if (error) return <p>Error: {error.message}</p>; // Display an error message if query fails

  const { profileById: profile } = data!;

  return (
    <Container>
      <h1 className="mt-4">Profil von {profile.nickname}</h1>
      <Row className="mt-4">
        <Col md={4}>
          <div className="border p-3">
            <Carousel className="mb-3" style={{ height: '400px' }}>
              {profile.photos.map((photo, index) => (
                <Carousel.Item key={index}>
                  <img
                    className="d-block w-100"
                    src={`http://localhost:8080/api/photos/${photo.name}`}
                    alt={profile.nickname}
                    style={{ height: '400px', objectFit: 'cover' }}
                  />
                  <Carousel.Caption>
                    <p>Like</p>
                  </Carousel.Caption>
                </Carousel.Item>
              ))}
            </Carousel>
          </div>
        </Col>

        <Col md={8}>
          <Form>
            <FormGroup>
              <FormLabel>Geburtsdatum</FormLabel>
              <FormControl readOnly defaultValue={profile.birthdate} />
            </FormGroup>
            <FormGroup>
              <FormLabel>Hornlänge</FormLabel>
              <FormControl readOnly defaultValue={`${profile.hornlength} cm`} />
            </FormGroup>
            <FormGroup>
              <FormLabel>Geschlecht</FormLabel>
              <FormControl readOnly defaultValue={profile.gender === 1 ? 'Männlich' : 'Weiblich'} />
            </FormGroup>
            <FormGroup>
              <FormLabel>Interesse am Geschlecht</FormLabel>
              <FormControl readOnly defaultValue={profile.attractedToGender === 1 ? 'Männlich' : 'Weiblich'} />
            </FormGroup>
            <FormGroup>
              <FormLabel>Hobbies / Freizeit / Interessen</FormLabel>
              <FormControl readOnly as="textarea" rows={5} defaultValue={profile.description} />
            </FormGroup>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default Profile;
