import { CircularProgress } from '@mui/material';

const TableLoader = () => {
  return (
    <>
      <div
        style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          top: '0%',
          left: '0%',
          background: '#EEE',
          opacity: 0.6,
          borderRadius: '10px'
        }}
      />
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          zIndex: 999999
        }}
      >
        <CircularProgress />
      </div>
    </>
  );
}

export default TableLoader;