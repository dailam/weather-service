import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Stack, Card, CardContent, Paper } from '@mui/material';

import styles from './style.module.scss';

const Layout = ({ children }) => {
  return (
    <Stack
      direction={{ xs: 'column', sm: 'column', md: 'row', lg: 'row', xl: 'row' }}
      spacing={{ xs: 1, sm: 2, md: 2, lg: 3, xl: 4 }}
      m={{ xs: 1, sm: 2, md: 2, lg: 3, xl: 4 }}
    >
      <Stack
        direction={{ xs: 'column', sm: 'row', md: 'column', lg: 'column', xl: 'column' }}
        spacing={{ xs: 1, sm: 2, md: 2, lg: 3, xl: 4 }}
      >
        <Card className={classNames(styles.iCard, styles.purple)}>
          <CardContent>
            <h3>{__(`NAB Frontend Test`)}</h3>
            <div>Lam Nguyen</div>
            <div>Nov 2021</div>
          </CardContent>
        </Card>
        <Card className={classNames(styles.iCard, styles.blue)}>
          <CardContent>
            <h3>{__(`Technical Stacks`)}</h3>
            <div>create-react Proj Template</div>
            <div>Google Material MUI5</div>
            <div>React Hook/Context</div>
            <div>i18n/theme</div>
          </CardContent>
        </Card>
      </Stack>
      <Stack
        spacing={{ xs: 1, sm: 2, md: 2, lg: 3, xl: 4 }}
        sx={{ flex: 1 }}
        component={Paper}
      >
        {children}
      </Stack>
    </Stack>
  );
};

Layout.propTypes = {
  children: PropTypes.any,
}

export default Layout;