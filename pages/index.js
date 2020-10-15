import React from 'react';
import Head from 'next/head';
import HomePage from '../components/HomePage';
// Styles
import styles from '../styles/Home.module.css';

export default function Home() {
  return (
    <div className={styles.home}>
      <Head>
        <title>Crypto Currency Market</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <HomePage />
    </div>
  );
}
