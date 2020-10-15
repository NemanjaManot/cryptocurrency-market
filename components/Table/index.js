import React, { useState } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import TableHeader from './TableHeader';

// temporary mocked data
import { data } from '../../dataMock';

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

export default function EnhancedTable() {
  const [order, setOrder] = useState('desc');
  const [orderBy, setOrderBy] = useState('volume');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(event.target.value);
    setPage(0);
  };

  const renderTableBody = () => {
    return stableSort(data, getComparator(order, orderBy))
      .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
      .map((row, index) => {
        const labelId = `enhanced-table-checkbox-${index}`;

        return (
          <TableRow tabIndex={-1} key={row.symbol}>
            <TableCell component="th" id={labelId} scope="row" padding="none">
              {row.symbol}
            </TableCell>
            <TableCell align="left">{row.volume || 0}</TableCell>
            <TableCell align="left">{row.avg || 0}</TableCell>
            <TableCell align="left">{row.latest_trade || 0}</TableCell>
          </TableRow>
        );
      });
  };

  return (
    <Paper>
      <TableContainer>
        <Table aria-labelledby="tableTitle" aria-label="enhanced table">
          <TableHeader order={order} orderBy={orderBy} onRequestSort={handleRequestSort} />
          <TableBody>{renderTableBody()}</TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 20]}
        component="div"
        count={data.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
