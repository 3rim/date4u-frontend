import { useState } from "react";
import { Form, FormGroup, FormLabel, FormControl, Button, Row, Col } from "react-bootstrap";

interface SearchFormProps {
    initialAgeRange: { min: number; max: number };
    initialHornLengthRange: { min: number; max: number };
    initialGender: number;
    onSearch: (searchCriteria: {
        ageRange: { min: number; max: number };
        hornLengthRange: { min: number; max: number };
        gender: number;
    }) => void;
}

function SearchForm({
    initialAgeRange,
    initialHornLengthRange,
    initialGender,
    onSearch
}: SearchFormProps) {
    const [ageRange, setAgeRange] = useState(initialAgeRange);
    const [hornLengthRange, setHornLengthRange] = useState(initialHornLengthRange);
    const [gender, setGender] = useState(initialGender);

    const handleAgeRangeChange = (min: number, max: number) => {
        setAgeRange({ min, max });
    };

    const handleHornLengthRangeChange = (min: number, max: number) => {
        setHornLengthRange({ min, max });
    };

    const handleGenderChange = (selectedGender: string) => {
        setGender(parseInt(selectedGender));
    };

    const handleSearchClick = () => {
        onSearch({ ageRange, hornLengthRange, gender });
    };

    return (
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
                                    onChange={(e) => handleAgeRangeChange(parseInt(e.target.value), ageRange.max)}
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
                                    onChange={(e) => handleAgeRangeChange(ageRange.min, parseInt(e.target.value))}
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
                                    onChange={(e) => handleHornLengthRangeChange(parseInt(e.target.value), hornLengthRange.max)}
                                    style={{ width: '100%' }}
                                >
                                    {Array.from({ length: 33 }, (_, i) => i + 1).map(length => (
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
                                    onChange={(e) => handleHornLengthRangeChange(hornLengthRange.min, parseInt(e.target.value))}
                                    style={{ width: '100%' }}
                                >
                                    {Array.from({ length: 33 }, (_, i) => i + 1).map(length => (
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
                            onChange={(e) => handleGenderChange(e.target.value)}
                            style={{ width: '100%' }}
                        >
                            <option value="null">Alle</option>
                            <option value="1">Männlich</option>
                            <option value="2">Weiblich</option>
                        </FormControl>
                    </FormGroup>
                </Col>
                <Col xs={12} md={6} lg={3} className="d-flex align-items-end">
                    <Button onClick={handleSearchClick} variant="primary" className="w-100" style={{ maxWidth: '150px' }}>Suche starten</Button>
                </Col>
            </Row>
        </Form>
    );
}

export default SearchForm;
