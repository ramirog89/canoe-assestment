import * as React from 'react';
import { styled } from '@mui/material/styles';

import MuiDrawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';

import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DashboardIcon from '@mui/icons-material/Dashboard';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';


import { FundModel } from '../../../../models';
import { useFunds } from '../../../hooks/useFunds';

const drawerWidth = 240;

const AppBar = styled(MuiAppBar)(({ theme }) => ({
  zIndex: theme.zIndex.drawer + 1,
  marginLeft: drawerWidth,
}));

const Drawer = styled(MuiDrawer)(() => ({
  '& .MuiDrawer-paper': {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    boxSizing: 'border-box',
  },
}));

const Home = () => {
  const fundManager = useFunds();
  const [funds, setFunds] = React.useState<FundModel.IFund[]>([]);
  const [modal, setModal] = React.useState<any>({ isOpen: false, id: null });
  const [removeDialog, setRemoveDialog] = React.useState<any>({ isOpen: false, id: null });
  
  const onEditHandler = (id: number) => {
    setModal({ isOpen: true, id });
  }

  const onCloseModal = () => {
    setModal({ isOpen: false, id: null });
  }

  const onDeleteHandler = (id: number) => {
    setRemoveDialog({ isOpen: true, id });
  }

  const onRemoveConfirm = () => {
    fundManager.remove.mutate(removeDialog.id);
  }

  const isLoading = fundManager.funds.isLoading;

  React.useEffect(() => {
    if (fundManager.funds.isSuccess) {
      setFunds(fundManager.funds.data?.items);
    }
  }, [fundManager.funds]);

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar>
        <Toolbar>
          <Typography
            component="h1"
            variant="h6"
            color="inherit"
          >
            Dashboard
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" sx={{ mt: '56px' }}>
        <Divider />
        <List component="nav">
          <ListItemButton>
            <ListItemIcon>
              <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary="Funds" />
          </ListItemButton>
        </List>
      </Drawer>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          height: '100vh',
          overflow: 'auto',
        }}
      >
        <Toolbar />
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
              <React.Fragment>
                <Typography component="h2" variant="h6" color="primary" gutterBottom>
                  Funds
                </Typography>
                <div>
                  <Button color="primary" onClick={() => {}} variant="contained">
                    Create
                  </Button>
                </div>
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell>Id</TableCell>
                      <TableCell>Name</TableCell>
                      <TableCell>Start Year</TableCell>
                      <TableCell>Manager</TableCell>
                      <TableCell align="right">Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {funds.map((fund) => (
                      <TableRow key={fund.id}>
                        <TableCell>{fund.id}</TableCell>
                        <TableCell>{fund.name}</TableCell>
                        <TableCell>{fund.name}</TableCell>
                        <TableCell>{fund.name}</TableCell>
                        <TableCell align="right">
                          <Tooltip arrow placement="left" title="Edit">
                            <IconButton onClick={() => onEditHandler(fund.id)}>
                              <EditIcon />
                            </IconButton>
                          </Tooltip>
                          <Tooltip arrow placement="right" title="Delete">
                            <IconButton color="error" onClick={() => onDeleteHandler(fund.id)}>
                              <DeleteIcon />
                            </IconButton>
                          </Tooltip>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </React.Fragment>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </Box>
      <>
        <Dialog open={modal.isOpen}>
        <DialogTitle textAlign="center">{modal.title}</DialogTitle>
        <DialogContent>
          <form onSubmit={(e) => e.preventDefault()}>
            <Stack
              sx={{
                width: '100%',
                minWidth: { xs: '300px', sm: '360px', md: '400px' },
                gap: '1.5rem',
              }}
            >
              <TextField
                label="Name"
                name="name"
                value=""
                onChange={(e) => console.log(e)}
              />
              <TextField
                label="Start Year"
                name="start_year"
                value=""
                onChange={(e) => console.log(e)}
              />
              <TextField
                label="Managers"
                name="manager"
                value=""
                onChange={(e) => console.log(e)}
              />
              <TextField
                label="Alias"
                name="alias"
                value=""
                onChange={(e) => console.log(e)}
              />
            </Stack>
          </form>
        </DialogContent>
        <DialogActions sx={{ p: '1.25rem' }}>
          <Button onClick={onCloseModal}>Cancel</Button>
          <Button color="secondary" onClick={() => {}} variant="contained">
            Create
          </Button>
        </DialogActions>
      </Dialog>
      </>
    </Box>
  );
};

export default Home;
