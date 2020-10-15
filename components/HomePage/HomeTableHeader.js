import React from 'react';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TableSortLabel from '@material-ui/core/TableSortLabel';
// Styles
import styles from '../../styles/Home.module.css';

const headCells = [
  { id: 'symbol', disablePadding: true, label: 'Currency Symbol' },
  { id: 'volume', disablePadding: false, label: 'Volume' },
  { id: 'avg', disablePadding: false, label: 'Average' },
  { id: 'latest_trade', disablePadding: false, label: 'Latest trade' },
];

export default function HomeTableHeader(props) {
  const { order, orderBy, onRequestSort } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell key={headCell.id} align="left" sortDirection={orderBy === headCell.id ? order : false}>
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
              className={styles.bold}
            >
              {headCell.label}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}
