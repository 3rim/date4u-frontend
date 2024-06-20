import Spinner from 'react-bootstrap/Spinner';

function LoadingSpinner() {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh', // Full viewport height to center vertically
      }}
    >
      <Spinner
        animation="border"
        role="status"
        style={{
          width: '100px',
          height: '100px',
          borderWidth: '10px', // Increase border width for a thicker spinner
        }}
      >
        <span className="visually-hidden">Loading...</span>
      </Spinner>
      <p className='text-lg' style={{ marginTop: '20px', fontSize: '20px' }}>Loading Data ...</p>
    </div>
  );
}

export default LoadingSpinner;
