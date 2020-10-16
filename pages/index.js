import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import HomePage from '../components/HomePage';
// Helpers
import { setItemToLocalStorage, getItemFromLocalStorage } from '../utils/helpers';
// temporary mocked data
import { data } from '../dataMock';
// Styles
import styles from '../styles/Home.module.css';

// 5 minutes in milliseconds
const timeToReFetchInMs = 300000;

export default function Home() {
  const [list, setList] = useState([]);

  const setLastGetTimeInMsToStorage = () => {
    const date = new Date();
    const msTime = date.getTime();
    setItemToLocalStorage('lastGetTimeMs', msTime);
  };

  useEffect(() => {
    const lastGetTime = getItemFromLocalStorage('lastGetTimeMs');
    const date = new Date();
    const currentTime = date.getTime();
    if (!lastGetTime) {
      // this should be triggered only for first time (because lastGetTime still doesn't exist in local storage)
      setLastGetTimeInMsToStorage();
      setItemToLocalStorage('currenciesList', data);
      console.log('only for first time');
      return;
    }
    if (currentTime - lastGetTime > timeToReFetchInMs) {
      // this should be triggered only if time from previous fetch is less then 5 minutes
      setLastGetTimeInMsToStorage();
      setItemToLocalStorage('currenciesList', data);
      console.log('after 5 minutes');
    }
  }, []);

  useEffect(() => {
    const listOfCurrencies = getItemFromLocalStorage('currenciesList');
    setList(listOfCurrencies);
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
