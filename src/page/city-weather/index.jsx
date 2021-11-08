import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Stack, Paper, Card, CardContent } from '@mui/material';
import { withWeatherContextProvider, useWeatherContext } from '../../context/weather';
import Layout from '../layout';

import styles from './style.module.scss';

const CityWeatherPage = () => {
  const { } = useWeatherContext();
  return (
    <Layout>
      <Stack m={{ xs: 1, sm: 2, md: 2, lg: 3, xl: 4 }}>
      </Stack>
    </Layout>
  );
};

CityWeatherPage.propTypes = {
}

export default withWeatherContextProvider(CityWeatherPage, { isCached: true });