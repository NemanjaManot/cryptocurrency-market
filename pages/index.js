import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import styles from '../styles/Home.module.css';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Table from '../components/Table';

export default function Home() {
  return (
    <div className={styles.home}>
      <Head>
        <title>Crypto Currency Market</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className={styles.tableHeader}>
        <Link href={`/alerts/`}>
          <Button variant="contained" color="primary">
            Alerts
          </Button>
        </Link>
        <TextField id="outlined-search" label="Search field" type="search" variant="outlined" />
      </div>

      <Table />
    </div>
  );
}
