import { Container, Row, Col, Pagination, ButtonGroup, Button } from "react-bootstrap";
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

interface PageInfo {
    pageNumber: number;
    pageSize: number;
    totalPages: number;
    totalElements: number;
}

interface ProfilesData {
    profilesFilter: {
        content: Profile[];
        pageInfo: PageInfo;
    };
}

const GET_PROFILES = gql`
    query GetProfiles(
        $page: Int!,
        $pageSize: Int!,
        $gender: Int!,
        $attractedToGender: Int,
        $minBirthdate: String,
        $maxBirthdate: String,
        $minHornLength: Int,
        $maxHornLength: Int) {
        profilesFilter(filter: {
            page: $page,
            pageSize: $pageSize,
            gender: $gender,
            attractedToGender: $attractedToGender,
            minBirthdate: $minBirthdate,
            maxBirthdate: $maxBirthdate,
            minHornlength: $minHornLength,
            maxHornlength: $maxHornLength
        }) {
            content {
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
            pageInfo {
                pageNumber
                pageSize
                totalPages
                totalElements
            }
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
    const [currentPage, setCurrentPage] = useState(0);
    const [pageSize, setPageSize] = useState(5);

    const myGender = 1;
    const ageToDateString = AgeToDateUtil.ageToDate;

    const { loading, error, data, refetch } = useQuery<ProfilesData>(GET_PROFILES, {
        variables: {
            gender: myGender,
            page: currentPage,
            pageSize: pageSize,
            attractedToGender: searchCriteria.gender,
            minHornLength: searchCriteria.hornLengthRange.min,
            maxHornLength: searchCriteria.hornLengthRange.max,
            minBirthdate: ageToDateString(searchCriteria.ageRange.max),
            maxBirthdate: ageToDateString(searchCriteria.ageRange.min),
        }
    });

    useEffect(() => {
        if (!loading && data) {
            console.log(data);
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
            page: 0,
            pageSize: pageSize,
            attractedToGender: newCriteria.gender,
            minHornLength: newCriteria.hornLengthRange.min,
            maxHornLength: newCriteria.hornLengthRange.max,
            minBirthdate: ageToDateString(newCriteria.ageRange.max),
            maxBirthdate: ageToDateString(newCriteria.ageRange.min),
        });
        setCurrentPage(0);
    };

    const handlePageChange = (pageNumber: number) => {
        setCurrentPage(pageNumber);
        refetch({
            gender: myGender,
            page: pageNumber,
            pageSize: pageSize,
            attractedToGender: searchCriteria.gender,
            minHornLength: searchCriteria.hornLengthRange.min,
            maxHornLength: searchCriteria.hornLengthRange.max,
            minBirthdate: ageToDateString(searchCriteria.ageRange.max),
            maxBirthdate: ageToDateString(searchCriteria.ageRange.min),
        });
    };

    const handlePageSizeChange = (newPageSize: number) => {
        setPageSize(newPageSize);
        setCurrentPage(0);
        refetch({
            gender: myGender,
            page: 0,
            pageSize: newPageSize,
            attractedToGender: searchCriteria.gender,
            minHornLength: searchCriteria.hornLengthRange.min,
            maxHornLength: searchCriteria.hornLengthRange.max,
            minBirthdate: ageToDateString(searchCriteria.ageRange.max),
            maxBirthdate: ageToDateString(searchCriteria.ageRange.min),
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
           <div className="d-flex flex-column align-items-center m-3">
                <span>Pagesize</span>
                <ButtonGroup aria-label="Page size">
                    {[5, 10, 15].map(size => (
                        <Button 
                            key={size}
                            variant="primary" 
                            active={pageSize === size} 
                            onClick={() => handlePageSizeChange(size)}
                        >
                            {size}
                        </Button>
                    ))}
                </ButtonGroup>
            </div>
            <div className="d-flex flex-column align-items-center mt-3">
                <span>Pages</span>
                <Pagination className="justify-content-center">
                    {Array.from({ length: data?.profilesFilter?.pageInfo.totalPages ?? 0 }).map((_, index) => (
                        <Pagination.Item key={index} active={index === currentPage} onClick={() => handlePageChange(index)}>
                            {index + 1}
                        </Pagination.Item>
                    ))}
                </Pagination>
                <span className="text-secondary">Total matches: {data?.profilesFilter?.pageInfo.totalElements}</span>
            </div>
            
            <Row>
            
                {loading || !showProfiles ? (
                    Array.from({ length: pageSize }).map((_, index) => (
                        <Col key={index} xs={12} sm={6} md={4} lg={3}>
                            <CardPlaceHolder />
                        </Col>
                    ))
                ) : (
                    (data?.profilesFilter?.content.length ?? 0) > 0 ? (
                        data?.profilesFilter.content.map((profile) => (
                            <Col key={profile.id} xs={12} sm={6} md={4} lg={3}>
                                <ProfileCard profile={profile} />
                            </Col>
                        ))
                    ) : (
                        <Col>
                            <div style={{ textAlign: 'center', marginTop: '20px' }}>
                                <h3>Keine Einhörner gefunden</h3>
                                <p>Versuchen Sie es mit anderen Suchkriterien.</p>
                            </div>
                        </Col>
                    )
                )}
            </Row>
        </Container>
    );
}

export default Search;
