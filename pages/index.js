import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import HomePage from '../components/HomePage';
// Helpers
import { setItemToLocalStorage, getItemFromLocalStorage } from '../utils/helper';
// temporary mocked data
import { data } from '../dataMock';
// Styles
import styles from '../styles/Home.module.css';

export default function Home() {
  const [list, setList] = useState([]);

  useEffect(() => {
    setItemToLocalStorage('currenciesList', data);
  }, []);

  useEffect(() => {
    let tt = getItemFromLocalStorage('currenciesList');
    setList(tt);
  }, []);

  return (
    <div className={styles.home}>
      <Head>
        <title>Crypto Currency Market</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <HomePage list={list} />
    </div>
  );
}
