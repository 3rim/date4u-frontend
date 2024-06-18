import { Container, Row, Col, Form, FormGroup, FormLabel, FormControl, Button } from "react-bootstrap";
import { useState, useEffect } from "react";
import { useQuery, gql } from '@apollo/client';
import ProfileCard from '../components/ProfileCard';
import CardPlaceHolder from "../components/CardPlaceHolder";  // Corrected import name

// Define the Profile type
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
}

// Define the response type for the query
interface ProfilesData {
    profiles: Profile[];
}

function Search() {
    const [ageRange, setAgeRange] = useState({ min: 18, max: 99 });
    const [hornLengthRange, setHornLengthRange] = useState({ min: 18, max: 33 });
    const [gender, setGender] = useState("");
    const [showProfiles, setShowProfiles] = useState(false);

    const handleSearch = () => {
        // Handle the search logic here
    };

    const GET_PROFILES = gql`
        query GetProfiles {
            profiles {
                id
                profilePhoto { name }
                nickname
                birthdate
                hornlength
                gender
                attractedToGender
                description
                lastseen
            }
        }
    `;

    // Use the useQuery hook with the correct types
    const { loading, error, data } = useQuery<ProfilesData>(GET_PROFILES);


    // useEffect hook to add delay
    useEffect(() => {
        if (!loading && data) {
            const timer = setTimeout(() => {
                setShowProfiles(true);
            }, 1000); // 1 second delay
            return () => clearTimeout(timer);
        }
    }, [loading, data]);

    return (
        <Container>
            <h2>Ich suche Einhörner</h2>
            <Form>
                <Row>
                    <Col xs={12} md={6} lg={3}>
                        <FormGroup>
                            <FormLabel>Im Alter von</FormLabel>
                            <Row className="align-items-center">
                                <Col>
                                    <FormControl
                                        as="select"
                                        value={ageRange.min}
                                        onChange={(e) => setAgeRange({ ...ageRange, min: parseInt(e.target.value) })}
                                        style={{ width: '100%' }}
                                    >
                                        {Array.from({ length: 82 }, (_, i) => i + 18).map(age => (
                                            <option key={age} value={age}>{age} Jahren</option>
                                        ))}
                                    </FormControl>
                                </Col>
                                <Col xs="auto" className="d-flex justify-content-center">
                                    <div>bis</div>
                                </Col>
                                <Col>
                                    <FormControl
                                        as="select"
                                        value={ageRange.max}
                                        onChange={(e) => setAgeRange({ ...ageRange, max: parseInt(e.target.value) })}
                                        style={{ width: '100%' }}
                                    >
                                        {Array.from({ length: 82 }, (_, i) => i + 18).map(age => (
                                            <option key={age} value={age}>{age} Jahren</option>
                                        ))}
                                    </FormControl>
                                </Col>
                            </Row>
                        </FormGroup>
                    </Col>
                    <Col xs={12} md={6} lg={3}>
                        <FormGroup>
                            <FormLabel>Mit einer Hornlänge von</FormLabel>
                            <Row className="align-items-center">
                                <Col>
                                    <FormControl
                                        as="select"
                                        value={hornLengthRange.min}
                                        onChange={(e) => setHornLengthRange({ ...hornLengthRange, min: parseInt(e.target.value) })}
                                        style={{ width: '100%' }}
                                    >
                                        {Array.from({ length: 16 }, (_, i) => i + 18).map(length => (
                                            <option key={length} value={length}>{length} cm</option>
                                        ))}
                                    </FormControl>
                                </Col>
                                <Col xs="auto" className="d-flex justify-content-center">
                                    <div>bis</div>
                                </Col>
                                <Col>
                                    <FormControl
                                        as="select"
                                        value={hornLengthRange.max}
                                        onChange={(e) => setHornLengthRange({ ...hornLengthRange, max: parseInt(e.target.value) })}
                                        style={{ width: '100%' }}
                                    >
                                        {Array.from({ length: 16 }, (_, i) => i + 18).map(length => (
                                            <option key={length} value={length}>{length} cm</option>
                                        ))}
                                    </FormControl>
                                </Col>
                            </Row>
                        </FormGroup>
                    </Col>
                    <Col xs={12} md={6} lg={3}>
                        <FormGroup>
                            <FormLabel>Geschlecht</FormLabel>
                            <FormControl
                                as="select"
                                value={gender}
                                onChange={(e) => setGender(e.target.value)}
                                style={{ width: '100%' }}
                            >
                                <option value="">Alle</option>
                                <option value="male">Männlich</option>
                                <option value="female">Weiblich</option>
                                <option value="other">Andere</option>
                            </FormControl>
                        </FormGroup>
                    </Col>
                    <Col xs={12} md={6} lg={3} className="d-flex align-items-end">
                        <Button onClick={handleSearch} variant="primary" className="w-100" style={{ maxWidth: '150px' }}>Suche starten</Button>
                    </Col>
                </Row>
            </Form>

            <Row>
                {loading || !showProfiles ? (
                    // Render placeholders while loading
                    Array.from({ length: 15 }).map((_, index) => (
                        <Col key={index} xs={12} sm={6} md={4} lg={3}>
                            <CardPlaceHolder />
                        </Col>
                    ))
                ) : (
                    data?.profiles.map((profile) => (
                        <Col key={profile.id} xs={12} sm={6} md={4} lg={3}>
                            <ProfileCard profile={profile} />
                        </Col>
                    ))
                )}
            </Row>
        </Container>
    );
}

export default Search;
