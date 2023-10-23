import {useGeneral} from '../../../state-mgmt/general';

import MuiAlert from '@mui/material/Alert';

const ToastList = () => {
  const generalManager = useGeneral();
  const onClose = (id: number) => {
    generalManager.removeToast(id);
  };

  return (
    <div style={{ position: 'fixed', bottom: '2%', right: '2%', zIndex: 1301 }}>
      {generalManager.state.toastList.map((toast) => (
        <MuiAlert
          key={toast.id}
          variant="filled"
          onClose={() => onClose(toast.id as number)}
          severity={toast.type}
          sx={{ width: '100%', marginTop: '5px' }}
        >
          {toast.message}
        </MuiAlert>
      ))}
    </div>
  );
};

export default ToastList;
