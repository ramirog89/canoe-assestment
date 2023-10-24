import * as React from 'react';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import TablePagination from '@mui/material/TablePagination';

import { FundModel } from '../../../../models';

interface IFundTableProps {
  page: number;
  rowsPerPage: number;
  totalItems: number;
  items: FundModel.IFund[];
  onChangePage: (e: any, page: number) => void;
  onChangeRow: (e: any) => void;
  onOpenEditModal: (id: number) => void;
  onOpenDeleteModal: (id: number) => void;
}

const FundTable = ({
  page,
  rowsPerPage,
  totalItems,
  items,
  onChangePage,
  onChangeRow,
  onOpenEditModal,
  onOpenDeleteModal
}: IFundTableProps) => {
  return (
    <React.Fragment>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Id</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Start Year</TableCell>
            <TableCell>Manager</TableCell>
            <TableCell>Created At</TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {items.map((fund) => (
            <TableRow key={fund.id}>
              <TableCell>{fund.id}</TableCell>
              <TableCell>{fund.name}</TableCell>
              <TableCell>{fund.start_year}</TableCell>
              <TableCell>{fund.manager.name}</TableCell>
              <TableCell>{fund.created_at.toString()}</TableCell>
              <TableCell align="right">
                <Tooltip arrow placement="left" title="Edit">
                  <IconButton onClick={() => onOpenEditModal(fund.id)}>
                    <EditIcon />
                  </IconButton>
                </Tooltip>
                <Tooltip arrow placement="right" title="Delete">
                  <IconButton color="error" onClick={() => onOpenDeleteModal(fund.id)}>
                    <DeleteIcon />
                  </IconButton>
                </Tooltip>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <TablePagination
        component="div"
        rowsPerPageOptions={[5, 10, 25]}
        page={page - 1}
        rowsPerPage={rowsPerPage}
        count={totalItems}
        onPageChange={onChangePage}
        onRowsPerPageChange={onChangeRow}
      />
    </React.Fragment>
  )
}

export default FundTable;
