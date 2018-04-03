import React, { Fragment } from 'react';
import { Header } from 'semantic-ui-react';
import CoinForm from './CoinForm'; 
import CoinList from './CoinList'; 

const Home = () => (
  <Fragment>
    <CoinForm /> 
    <CoinList />
  </Fragment>
)

export default Home;
