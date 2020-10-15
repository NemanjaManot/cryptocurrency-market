import React, { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Button from '@material-ui/core/Button';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import FormModal from './FormModal';
import { mockedAlerts, data } from '../../dataMock';

const filteredData = data.filter((item) => item.avg);

export default function Alerts() {
  const [open, setOpen] = useState(false);
  const [symbol, setSymbol] = useState(filteredData[0].symbol);
  const [currMinAvg, setCurrMinAvg] = useState(0);
  const [currMaxAvg, setCurrMaxAvg] = useState(0);
  const [savedAlerts, setSavedAlerts] = useState(mockedAlerts);

  const foundSymbol = data.filter((item) => item.symbol === symbol);
  const currAvg = foundSymbol[0].avg;

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSave = () => {
    const symbolObj = data.filter((item) => item.symbol === symbol)[0];
    setSavedAlerts([
      ...savedAlerts,
      {
        avg: symbolObj.avg,
        symbol: symbolObj.symbol,
        minAvg: currMinAvg,
        maxAvg: currMaxAvg,
      },
    ]);
    handleClose();
  };

  const handleSelectSymbol = (e) => setSymbol(e.target.value);

  const handleCurrMinAvg = (e) => setCurrMinAvg(e.target.value);

  const handleCurrMaxAvg = (e) => setCurrMaxAvg(e.target.value);

  return (
    <div>
      <Head>
        <title>Crypto Currency Market / Alerts</title>
      </Head>

      <div style={{ margin: '15px 0' }}>
        <Link href="/">
          <a>← Back to home</a>
        </Link>
      </div>

      <Button variant="contained" color="primary" onClick={handleOpen}>
        Add alert
      </Button>

      <FormModal
        open={open}
        onClose={handleClose}
        symbol={symbol}
        selectSymbol={handleSelectSymbol}
        filteredData={filteredData}
        currAvg={currAvg}
        currMinAvg={currMinAvg}
        currMaxAvg={currMaxAvg}
        setCurrMinAvg={handleCurrMinAvg}
        setCurrMaxAvg={handleCurrMaxAvg}
        onSave={handleSave}
      />

      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Symbol</TableCell>
              <TableCell align="right">Avg</TableCell>
              <TableCell align="right">Min avg</TableCell>
              <TableCell align="right">Max avg</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {savedAlerts.map((row) => (
              <TableRow key={Math.random()}>
                <TableCell align="right">{row.symbol}</TableCell>
                <TableCell align="right">{row.avg}</TableCell>
                <TableCell align="right">{row.minAvg}</TableCell>
                <TableCell align="right">{row.maxAvg}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
