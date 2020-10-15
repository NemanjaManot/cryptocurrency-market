import React from 'react';
import Head from 'next/head';
import HomeTable from '../components/HomeTable';
// Styles
import styles from '../styles/Home.module.css';

export default function Home() {
  return (
    <div className={styles.home}>
      <Head>
        <title>Crypto Currency Market</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <HomeTable />
    </div>
  );
}
