import { Container, Row, Col } from "react-bootstrap";
import { useState, useEffect } from "react";
import { useQuery, gql } from '@apollo/client';
import ProfileCard from '../components/ProfileCard';
import CardPlaceHolder from "../components/CardPlaceHolder"; 
import SearchForm from "../components/SearchForm";
import AgeToDateUtil from "../utils/AgeToDate";

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
    profilesFilter: Profile[];
}

const GET_PROFILES = gql`
    query GetProfiles($gender: Int!, 
        $attractedToGender: Int,
        $minBirthdate: String, 
        $maxBirthdate: String,
        $minHornLength: Int, 
        $maxHornLength: Int) {
        profilesFilter(filter: { 
            gender: $gender,
            attractedToGender: $attractedToGender,
            minBirthdate: $minBirthdate,
            maxBirthdate: $maxBirthdate,
            minHornlength: $minHornLength,
            maxHornlength: $maxHornLength
        }) {
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
        }
    }
`;

function Search() {
    const [searchCriteria, setSearchCriteria] = useState({
        ageRange: { min: 18, max: 99 },
        hornLengthRange: { min: 1, max: 33 },
        gender: 1,
    });
    const [showProfiles, setShowProfiles] = useState(false);

    const myGender = 1;

    const ageToDateString = AgeToDateUtil.ageToDate;

    const { loading, error, data, refetch } = useQuery<ProfilesData>(GET_PROFILES, {
        variables: {
            gender: myGender,
            attractedToGender: searchCriteria.gender,
            minHornLength: searchCriteria.hornLengthRange.min,
            maxHornLength: searchCriteria.hornLengthRange.max,
            /*
                minBirthdate ist das frühestmögliche Geburtsdatum also ageRange.MAX
                maxBirthdate bezieht sich das das späteste geburtsdatum.
                minBirthDate ist das MAXIMAL Alter
                maxBirthDate ist das MINIMAL Alter
                ==> ageRange,MAX wird minBirthdate zugewiesen. Analog ageRange.MIN
            */
            minBirthdate: ageToDateString(searchCriteria.ageRange.max),
            maxBirthdate: ageToDateString(searchCriteria.ageRange.min),
        }
    });

    useEffect(() => {
        if (!loading && data) {
            console.log(data.profilesFilter);
            setShowProfiles(true);
        } else {
            setShowProfiles(false);
        }
    }, [loading, data]);

    const handleSearch = (newCriteria: {
        ageRange: { min: number; max: number };
        hornLengthRange: { min: number; max: number };
        gender: number;
    }) => {
        console.log(newCriteria);
        setSearchCriteria(newCriteria);
        refetch({
            gender: myGender,
            attractedToGender: newCriteria.gender,
            minHornLength: newCriteria.hornLengthRange.min,
            maxHornLength: newCriteria.hornLengthRange.max,
            minBirthdate: ageToDateString(newCriteria.ageRange.max),
            maxBirthdate: ageToDateString(newCriteria.ageRange.min),
        });
    };

    return (
        <Container>
            <h2>Ich suche Einhörner</h2>
            <SearchForm
                initialAgeRange={searchCriteria.ageRange}
                initialHornLengthRange={searchCriteria.hornLengthRange}
                initialGender={searchCriteria.gender}
                onSearch={handleSearch}
            />

            <Row>
                {loading || !showProfiles ? (
                    Array.from({ length: 15 }).map((_, index) => (
                        <Col key={index} xs={12} sm={6} md={4} lg={3}>
                            <CardPlaceHolder />
                        </Col>
                    ))
                ) : (
                    data?.profilesFilter.map((profile) => (
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
