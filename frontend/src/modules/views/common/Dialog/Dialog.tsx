import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';

import ButtonLoader from '../ButtonLoader';

interface IDialogProps {
  title: string;
  closeLabel?: string;
  submitLabel?: string;
  isOpen: boolean;
  isLoading: boolean;
  render: () => React.ReactNode;
  onClose: () => void;
  onConfirm: () => void;
}

const DialogModal = ({
  title,
  isOpen,
  isLoading = false,
  closeLabel = 'Cancel',
  submitLabel = 'Submit',
  render,
  onClose,
  onConfirm
}: IDialogProps) => {
  return (
    <Dialog open={isOpen}>
      <DialogTitle textAlign="center">{title}</DialogTitle>
      <DialogContent>
        {render()}
      </DialogContent>
      <DialogActions sx={{ p: '1.25rem' }}>
        <Button onClick={onClose}>{closeLabel}</Button>
        <ButtonLoader
          color="primary"
          variant="contained"
          label={submitLabel}
          isLoading={isLoading}
          disabled={isLoading}
          onClick={onConfirm}
        />
      </DialogActions>
    </Dialog>
  );
}

export default DialogModal;
