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
  const [currentTime, setCurrentTime] = useState(null);
  const [lastGetTime, setLastGetTime] = useState(null);

  const setCurrentTimeInMsToStorage = () => {
    const date = new Date();
    const msTime = date.getTime();
    setItemToLocalStorage('currentTimeMs', msTime);
  };

  const setLastGetTimeInMsToStorage = () => {
    const date = new Date();
    const msTime = date.getTime();
    setItemToLocalStorage('lastGetTimeMs', msTime);
  };

  useEffect(() => {
    setCurrentTimeInMsToStorage();
    if (!lastGetTime) {
      // this should be triggered only for first time (because lastGetTime still doesn't exist in local storage)
      setItemToLocalStorage('currenciesList', data);
      console.log('only for first time');
      return;
    }
    if (currentTime - lastGetTime > timeToReFetchInMs) {
      // this should be triggered only if time from previous fetch is less then 5 minutes
      setItemToLocalStorage('currenciesList', data);
      console.log('after 5 minutes');
    }
  }, []);

  useEffect(() => {
    // get currentTimeMs from local storage
    let currentTimeMs = getItemFromLocalStorage('currentTimeMs');
    setCurrentTime(currentTimeMs);
    // get listOfCurrencies from local storage
    let listOfCurrencies = getItemFromLocalStorage('currenciesList');
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
