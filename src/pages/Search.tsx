import { Container, Row, Col } from "react-bootstrap";
import { useState, useEffect } from "react";
import { useQuery, gql } from '@apollo/client';
import ProfileCard from '../components/ProfileCard';
import CardPlaceHolder from "../components/CardPlaceHolder"; 
import SearchForm from "../components/SearchForm";



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

    const handleAgeRangeChange = (min: number, max: number) => {
        setAgeRange({ min, max });
    };

    const handleHornLengthRangeChange = (min: number, max: number) => {
        setHornLengthRange({ min, max });
    };

    const handleGenderChange = (selectedGender: string) => {
        setGender(selectedGender);
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
    //const { loading, error, data } = useQuery<ProfilesData>(GET_PROFILES);

    const { loading, error, data } = useQuery<ProfilesData>(GET_PROFILES,{
        variables: {
            ageRange: {
                min: ageRange.min,
                max: ageRange.max,
            },
            hornLengthRange: {
                min: hornLengthRange.min,
                max: hornLengthRange.max,
            },
            gender: gender,
        },
    });

    if(error){return error.message}


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
            <SearchForm
                ageRange={ageRange}
                hornLengthRange={hornLengthRange}
                gender={gender}
                onSearch={handleSearch}
                onAgeRangeChange={handleAgeRangeChange}
                onHornLengthRangeChange={handleHornLengthRangeChange}
                onGenderChange={handleGenderChange}
            />

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
