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
import uniqid from 'uniqid';
import FormModal from '../../components/FormModal';
import PageHeader from '../../components/PageHeader';
// Helpers
import { getItemFromLocalStorage, setItemToLocalStorage, removeItemFromLocalStorage } from '../../utils/helpers';
// Styles
import styles from '../../styles/Home.module.css';

const boldLabel = { fontWeight: 'bold' };
const buttonStyle = { marginRight: '20px' };

export default function Alerts() {
  const [open, setOpen] = useState(false);
  const [symbol, setSymbol] = useState(null);
  const [currMinAvg, setCurrMinAvg] = useState(0);
  const [currMaxAvg, setCurrMaxAvg] = useState(0);
  const [savedAlerts, setSavedAlerts] = useState([]);
  const [alerts, setAlerts] = useState([]);
  const [localListOfCurrencies, setLocalListOfCurrencies] = useState([]);
  const [localFilteredData, setLocalFilteredData] = useState([]);
  const [currAvg, setCurrAvg] = useState(0);

  useEffect(() => {
    const listOfCurrencies = getItemFromLocalStorage('currenciesList');
    setLocalListOfCurrencies(listOfCurrencies);
    setLocalFilteredData(listOfCurrencies.filter((item) => item.avg));
    setSymbol(listOfCurrencies.filter((item) => item.avg)[0].symbol);
  }, []);

  useEffect(() => {
    const foundSymbol = localListOfCurrencies.filter((item) => item.symbol === symbol);
    const selectedAvg = foundSymbol && foundSymbol[0] && foundSymbol[0].avg;
    setCurrAvg(selectedAvg || 0);
  }, [symbol]);

  useEffect(() => {
    const listOfSavedAlerts = getItemFromLocalStorage('savedAlerts');
    setSavedAlerts(listOfSavedAlerts || []);
  }, []);

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

  const handleRemoveAll = async () => {
    await removeItemFromLocalStorage('savedAlerts');
    setSavedAlerts([]);
  };

  const handleSave = () => {
    const symbolObj = localListOfCurrencies.filter((item) => item.symbol === symbol)[0];
    const itemToSave = [
      ...savedAlerts,
      {
        avg: symbolObj.avg,
        symbol: symbolObj.symbol,
        minAvg: currMinAvg,
        maxAvg: currMaxAvg,
        showAlert: symbolObj.avg > currMinAvg && symbolObj.avg < currMaxAvg,
      },
    ];
    setItemToLocalStorage('savedAlerts', itemToSave);
    setSavedAlerts(itemToSave);
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
        <Alert key={uniqid()} onClose={() => handleCloseAlertNotification(al)}>
          {al.symbol} reaches the limit
        </Alert>
      ))}

      <PageHeader>
        <Link href="/">
          <a className={styles.bold}>← Back to home</a>
        </Link>

        <div>
          <Button style={buttonStyle} variant="contained" color="secondary" onClick={handleRemoveAll}>
            Remove all
          </Button>

          <Button variant="contained" color="primary" onClick={handleOpen}>
            Add alert
          </Button>
        </div>
      </PageHeader>

      <FormModal
        open={open}
        onClose={handleClose}
        symbol={symbol}
        selectSymbol={handleSelectSymbol}
        filteredData={localFilteredData}
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
              <TableRow key={uniqid()}>
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
