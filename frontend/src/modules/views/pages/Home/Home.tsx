import * as React from 'react';

import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import MuiAlert from '@mui/material/Alert';

import Layout from '../../common/Layout';
import Dialog from '../../common/Dialog';
import FundCard from './components/FundCard';
import FundTable from './components/FundTable';

import { useFunds } from '../../../hooks/useFunds';
import { usePaginatedFunds, FundFilter } from '../../../hooks/usePaginatedFunds';

const Home = () => {
  const fundManager = usePaginatedFunds();
  const { create, remove, update } = useFunds();

  const [time, setTime] = React.useState(0);
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

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setTime(Date.now())
    }, 5000);
    if (!deleteModal.isOpen && !modal.isOpen) {
      fundManager.funds.refetch();
    }
    return () => clearTimeout(timer);
  }, [time, deleteModal.isOpen, modal.isOpen]); // eslint-disable-line

  return (
    <Layout>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <MuiAlert elevation={6} variant="filled" severity='info'>
            List is being refreshed every 30 secs to show new generated Records
          </MuiAlert>
          <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', mt: '10px' }}>
            <div style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              padding: '10px 0'
            }}>
              <div style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}>
                <Typography component="h2" variant="h6" color="primary">
                  Funds
                </Typography>
                <Select
                  label="Manager"
                  name="manager"
                  size="small"
                  value={fundManager.filter}
                  style={{ marginLeft: '20px' }}
                  onChange={(event) => fundManager.onChangeFilter(event.target.value)}
                >
                  <MenuItem value={FundFilter.ALL}>{FundFilter.ALL}</MenuItem>
                  <MenuItem value={FundFilter.DUPLICATES}>{FundFilter.DUPLICATES}</MenuItem>
                </Select>
              </div>
              <div>
                <Button color="primary" onClick={onOpenCreateModal} variant="contained">
                  Create
                </Button>
              </div>
            </div>
            {!fundManager.funds.isLoading && fundManager.funds?.data?.total === 0 ? (
              <div>
                Empty Records
              </div>
            ) : <></>}
            {fundManager.funds?.data?.total && fundManager.funds?.data?.total >= 0 ? (
              <FundTable
                isLoading={fundManager.funds.isLoading}
                page={fundManager.page}
                rowsPerPage={fundManager.rowsPerPage}
                items={fundManager.funds.data?.items || []}
                totalItems={fundManager.funds?.data?.total || 0}
                onChangePage={fundManager.onChangePage}
                onChangeRow={fundManager.onChangeRowsPerPage}
                onOpenEditModal={onOpenEditModal}
                onOpenDeleteModal={onOpenDeleteModal}
              />
              ) : <></>}
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
