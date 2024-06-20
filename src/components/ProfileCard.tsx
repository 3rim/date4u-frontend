import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useNavigate } from 'react-router-dom';


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

interface Props {
    profile: Profile;
}

function ProfileCard({ profile }: Props) {
    const [photoUrl, setPhotoUrl] = useState<string | null>(null);
    const navigate = useNavigate();

    const handleGoToProfile = () => {
        // Navigate to the profile page with the profile ID
        navigate(`/profile/${profile.id}`);
    };
    
    //This hook updates the photoUrl state whenever the profile.profilePhoto?.name changes. 
    //This ensures that the component re-renders with the correct photo URL.
    useEffect(() => {
        if (profile.profilePhoto?.name) {
            setPhotoUrl(`http://localhost:8080/api/photos/${profile.profilePhoto.name}`);
        }
    }, [profile.profilePhoto?.name]);

    const getGenderText = (gender: number) => {
        switch (gender) {
            case 1:
                return 'Male';
            case 2:
                return 'Female';
            default:
                return 'Other';
        }
    };

    return (
        <Card style={{ width: '18rem', margin: '1rem' }}>
            {photoUrl ? (
                <Card.Img variant="top" src={photoUrl} alt={profile.nickname} />
            ) : (
                <Card.Img variant="top" src="path/to/placeholder-image.jpg" alt="Placeholder" />
            )}
            <Card.Body>
                <Card.Title>{profile.nickname}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">
                    {getGenderText(profile.gender)}
                </Card.Subtitle>
                <Card.Text>
                    <b>Hornlength:</b> {profile.hornlength}cm
                    <br />
                    <b>Birthdate:</b> {profile.birthdate}
                    <br />
                    <b>Attracted to:</b> {getGenderText(profile.attractedToGender)}
                    <br />
                </Card.Text>
                <Card.Text>
                    <small className="text-muted">Last seen: {profile.lastseen}</small>
                </Card.Text>
                <Button variant="primary" onClick={handleGoToProfile}>Go To Profile</Button>
            </Card.Body>
            
        </Card>
    );
}

export default ProfileCard;
