import * as React from 'react';

import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';

import Layout from '../../common/Layout';
import Dialog from '../../common/Dialog';
import FundCard from './FundCard';
import FundTable from './FundTable';
import { useFunds } from '../../../hooks/useFunds';
import { usePaginatedFunds } from '../../../hooks/usePaginatedFunds';

const Home = () => {
  const fundManager = usePaginatedFunds();
  const { create, remove, update } = useFunds();

  const [modal, setModal] = React.useState<any>({ isOpen: false, type: null, id: null });
  const [deleteModal, setDeleteModal] = React.useState<any>({ isOpen: false, id: null });

  const onOpenEditModal = (id: number) => {
    setModal({ isOpen: true, type: 'edit', id });
  }
  
  const onOpenCreateModal = (e: any) => {
    setModal({ isOpen: true, type: 'create', id: null });
  }

  const onOpenDeleteModal = (id: number) => {
    setDeleteModal({ isOpen: true, id });
  }

  const onCloseModal = () => {
    setModal({ ...modal, isOpen: false, id: null });
  }

  const onCloseDeleteModal = () => {
    setDeleteModal({ isOpen: false });
  }

  const onDeleteConfirm = () => {
    remove.mutate({ id: deleteModal.id });
  }

  const onSubmitFund = () => {
    fundManager.funds.refetch();
    create.reset();
    update.reset();
    onCloseModal();
  }

  React.useEffect(() => {
    if (remove.isSuccess) {
      fundManager.funds.refetch();
      remove.reset();
      onCloseDeleteModal();
    }
  }, [remove.isSuccess]); // eslint-disable-line

  return (
    <Layout>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column'}}>
            <div style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between'
            }}>
              <Typography component="h2" variant="h6" color="primary" gutterBottom>
                Funds
              </Typography>
              <div>
                <Button color="primary" onClick={onOpenCreateModal} variant="contained">
                  Create
                </Button>
              </div>
            </div>
            <FundTable
              page={fundManager.page}
              rowsPerPage={fundManager.rowsPerPage}
              items={fundManager.funds.data?.items || []}
              totalItems={fundManager.funds?.data?.total || 0}
              onChangePage={fundManager.onChangePage}
              onChangeRow={fundManager.onChangeRowsPerPage}
              onOpenEditModal={onOpenEditModal}
              onOpenDeleteModal={onOpenDeleteModal}
            />
          </Paper>
        </Grid>
      </Grid>
      <FundCard
        id={modal.id as any}
        items={fundManager.funds.data?.items || []}
        type={modal.type}
        isOpen={modal.isOpen}
        onClose={onCloseModal}
        onSubmit={onSubmitFund}
      />
      <Dialog
        title="Delete Fund"
        isLoading={false}
        isOpen={deleteModal.isOpen}
        onClose={onCloseDeleteModal}
        onConfirm={onDeleteConfirm}
        closeLabel='Cancel'
        submitLabel='Confirm'
        render={() => (
          <>
            Are you sure you want to delete Fund #{deleteModal.id}?
          </>
        )}
      />
    </Layout>
  );
};

export default Home;
