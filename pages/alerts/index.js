import React, { useEffect, useState } from 'react';
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
import Alert from '@material-ui/lab/Alert';
import FormModal from '../../components/FormModal';
import PageHeader from '../../components/PageHeader';
// Mocks
import { mockedAlerts, data } from '../../dataMock';
// Styles
import styles from '../../styles/Home.module.css';

const filteredData = data.filter((item) => item.avg);
const boldLabel = { fontWeight: 'bold' };

export default function Alerts() {
  const [open, setOpen] = useState(false);
  const [symbol, setSymbol] = useState(filteredData[0].symbol);
  const [currMinAvg, setCurrMinAvg] = useState(0);
  const [currMaxAvg, setCurrMaxAvg] = useState(0);
  const [savedAlerts, setSavedAlerts] = useState(mockedAlerts);
  const [alerts, setAlerts] = useState([]);

  const foundSymbol = data.filter((item) => item.symbol === symbol);
  const currAvg = foundSymbol[0].avg;

  useEffect(() => {
    const addedAlerts = savedAlerts.filter((al) => al.showAlert);
    setAlerts(addedAlerts);
  }, [savedAlerts]);

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
        showAlert: true,
      },
    ]);
    handleClose();
  };

  const handleSelectSymbol = (e) => setSymbol(e.target.value);

  const handleCurrMinAvg = (e) => setCurrMinAvg(e.target.value);

  const handleCurrMaxAvg = (e) => setCurrMaxAvg(e.target.value);

  const handleCloseAlertNotification = (al) => {
    const leftAlerts = alerts.filter((curr) => curr.symbol !== al.symbol);
    setAlerts(leftAlerts);
  };

  return (
    <div className={styles.alerts}>
      <Head>
        <title>Crypto Currency Market / Alerts</title>
      </Head>

      {alerts.map((al) => (
        <Alert key={Math.random()} onClose={() => handleCloseAlertNotification(al)}>
          {al.symbol}!
        </Alert>
      ))}

      <PageHeader>
        <Link href="/">
          <a className={styles.bold}>← Back to home</a>
        </Link>

        <Button variant="contained" color="primary" onClick={handleOpen}>
          Add alert
        </Button>
      </PageHeader>

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
              <TableCell style={boldLabel} align="left">
                Symbol
              </TableCell>
              <TableCell style={boldLabel} align="left">
                Avg
              </TableCell>
              <TableCell style={boldLabel} align="left">
                Min avg
              </TableCell>
              <TableCell style={boldLabel} align="left">
                Max avg
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {savedAlerts.map((row) => (
              <TableRow key={Math.random()}>
                <TableCell align="left">{row.symbol}</TableCell>
                <TableCell align="left">{row.avg}</TableCell>
                <TableCell align="left">{row.minAvg}</TableCell>
                <TableCell align="left">{row.maxAvg}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
