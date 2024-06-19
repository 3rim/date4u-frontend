import { Form, FormGroup, FormLabel, FormControl, Button, Row, Col } from "react-bootstrap";

interface SearchFormProps {
    ageRange: { min: number; max: number };
    hornLengthRange: { min: number; max: number };
    gender: string;
    onSearch: () => void;
    onAgeRangeChange: (min: number, max: number) => void;
    onHornLengthRangeChange: (min: number, max: number) => void;
    onGenderChange: (gender: string) => void;
}

function SearchForm({
    ageRange,
    hornLengthRange,
    gender,
    onSearch,
    onAgeRangeChange,
    onHornLengthRangeChange,
    onGenderChange
}: SearchFormProps) {
    return (
        <>
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
                                        onChange={(e) => onAgeRangeChange(parseInt(e.target.value), ageRange.max)}
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
                                        onChange={(e) => onAgeRangeChange(ageRange.min, parseInt(e.target.value))}
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
                                        onChange={(e) => onHornLengthRangeChange(parseInt(e.target.value), hornLengthRange.max)}
                                        style={{ width: '100%' }}
                                    >
                                        {Array.from({ length: 24 }, (_, i) => i + 10).map(length => (
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
                                        onChange={(e) => onHornLengthRangeChange(hornLengthRange.min, parseInt(e.target.value))}
                                        style={{ width: '100%' }}
                                    >
                                        {Array.from({ length: 24 }, (_, i) => i + 10).map(length => (
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
                                onChange={(e) => onGenderChange(e.target.value)}
                                style={{ width: '100%' }}
                            >
                                <option value="null">Alle</option>
                                <option value="1">Männlich</option>
                                <option value="2">Weiblich</option>
                            </FormControl>
                        </FormGroup>
                    </Col>
                    <Col xs={12} md={6} lg={3} className="d-flex align-items-end">
                        <Button onClick={onSearch} variant="primary" className="w-100" style={{ maxWidth: '150px' }}>Suche starten</Button>
                    </Col>
                </Row>
            </Form>
        </>
    );
}

export default SearchForm;
