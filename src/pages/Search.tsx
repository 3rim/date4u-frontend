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

function Search() {
    const [ageRange, setAgeRange] = useState({ min: 18, max: 99 });
    const [hornLengthRange, setHornLengthRange] = useState({ min: 10, max: 33 }); // Adjusted default min hornlength
    const [gender, setGender] = useState(1); // Default gender filter set to 1 (assuming it's the default filter for male)
    const [showProfiles, setShowProfiles] = useState(false);

    const ageToDateString = AgeToDateUtil.ageToDate;

    const handleAgeRangeChange = (min: number, max: number) => {
        setAgeRange({ min, max });
    };

    const handleHornLengthRangeChange = (min: number, max: number) => {
        setHornLengthRange({ min, max });
    };

    const handleGenderChange = (selectedGender: string) => {
        setGender(parseInt(selectedGender)); // Convert selectedGender to number
    };


    console.log(
        hornLengthRange
    )

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

    // Use the useQuery hook with the correct types and variables
    const { loading, error, data, refetch } = useQuery<ProfilesData>(GET_PROFILES, {
        variables: {
            gender: 1,
            attractedToGender: gender,
            minHornLength: hornLengthRange.min,
            maxHornLength: hornLengthRange.max,
         //   minBirthdate: ageToDateString(ageRange.min), // Convert age to birthday string
          //  maxBirthdate: ageToDateString(ageRange.max), // Convert age to birthday string
        }
    });

    // useEffect hook to update profiles when query data changes
    useEffect(() => {
        if (!loading && data) {
            setShowProfiles(true);
        } else {
            setShowProfiles(false);
        }
    }, [loading, data]);

    // Handle the search logic to trigger the query
    const performSearch = () => {
        console.log("Searching...");
        refetch({
            gender: 1,
            attractedToGender: gender,
            minHornLength: hornLengthRange.min,
            maxHornLength: hornLengthRange.max,
          //  minBirthdate: ageToDateString(ageRange.min), // Convert age to birthday string
          //  maxBirthdate: ageToDateString(ageRange.max), // Convert age to birthday string
        });
    };

    return (
        <Container>
            <h2>Ich suche Einhörner</h2>
            <SearchForm
                ageRange={ageRange}
                hornLengthRange={hornLengthRange}
                gender={gender.toString()} // Convert gender to string for form component
                onSearch={performSearch} // Pass performSearch function to SearchForm
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
