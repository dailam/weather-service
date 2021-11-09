import React, { useState, useEffect, useMemo, Fragment } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Stack, Box, Chip, TextField } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import { withWeatherContextProvider, useWeatherContext } from '../../context/weather';
import Layout from '../layout';

import useDebounce from '../../service/useDebounce';

import styles from './style.module.scss';

const CityWeatherPage = () => {
  const {
    onSearchLocation,
    onSearchWeather,
    locations,
    weather,
  } = useWeatherContext();

  const { consolidatedWeather = [] } = weather;

  const [query, setQuery] = useState('');
  const [option, setOption] = useState();

  const debouncedQuery = useDebounce(query);

  useEffect(() => {
    onSearchLocation(query);
    return () => { };
  }, [debouncedQuery]);

  const onChange = (event) => setQuery(event?.target.value);

  const getOptionLabel = lo => lo.title;
  const renderOption = (props, lo) => <li {...props}>{lo.title} <Chip label={lo.locationType} variant="outlined" /></li>;
  const renderInput = (params) => (
    <TextField
      {...params}
      label={__(`Search...`)}
      onChange={onChange}
    />
  )

  const askWeather = (event, info) => {
    if (typeof info === 'object') {
      setOption(info);
    }
  }

  useEffect(() => {
    const woeid = option?.woeid;
    if (woeid) {
      onSearchWeather(woeid);
    }
  }, [option]);

  const dateInWeek = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];

  const weatherItems = useMemo(
    () => consolidatedWeather.map(item => (
      <Box key={item.id} className={styles.weatherBox} m={1}>
        <strong>{dateInWeek[new Date(item.applicableDate)?.getDay()]}</strong>
        <br />
        <img
          className={styles.abbr}
          src={`https://www.metaweather.com/static/img/weather/${item.weatherStateAbbr}.svg`}
        />
        {item.weatherStateName}
        <br />
        <br />
        temp. {item.minTemp?.toFixed(1)} / {item.maxTemp?.toFixed(1)}
      </Box>
    )), [weather]);

  return (
    <Layout>
      <Stack m={{ xs: 1, sm: 2, md: 2, lg: 3, xl: 4 }}>
        <Box>
          <Autocomplete
            value={option}
            onChange={askWeather}
            selectOnFocus
            clearOnBlur
            handleHomeEndKeys
            options={locations}
            filterOptions={options => options}
            getOptionLabel={getOptionLabel}
            renderOption={renderOption}
            renderInput={renderInput}
          />
        </Box>
        <Stack
          direction={{ xs: 'column', sm: 'row', md: 'row', lg: 'row', xl: 'row' }}
          m={{ xs: 1, sm: 2, md: 2, lg: 3, xl: 4 }}
          className={styles.weatherList}
        >
          {weatherItems}
        </Stack>
      </Stack>
    </Layout>
  );
};

CityWeatherPage.propTypes = {
}

export default withWeatherContextProvider(CityWeatherPage, { isCached: true });