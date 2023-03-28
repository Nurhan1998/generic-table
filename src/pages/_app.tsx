import { useEffect } from 'react';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { AppPropsType } from 'next/dist/shared/lib/utils';
import { useSelector } from 'react-redux';
import ReactNotification from 'react-notifications-component';
import { TSToken } from '@typescript-eslint/typescript-estree';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';
import { CssBaseline } from '@mui/material';

import { HOME_PAGE, SIGN_IN } from 'configuration/urls';
import { EStorageKeys } from 'configuration/types/storageKeys';

import Layout from 'components/Layout';

import { wrapper } from 'store/index';
import { makeSelectAccessToken } from 'store/auth/selectors';

import 'react-notifications-component/dist/theme.css';
import { getStorageData } from 'utils/storageHelpers';

import 'assets/styles/style.css';


export const muiCache = createCache({
  key: 'mui',
  prepend: true,
});

export const theme = createTheme();

/**
 * withRedux HOC
 * NextJS wrapper for Redux
 */
const App: NextPage<AppPropsType> = props => {
  const { Component, pageProps } = props;
  const token = useSelector(makeSelectAccessToken);
  const localToken = getStorageData(EStorageKeys.TOKEN) as TSToken;
  const router = useRouter();

  useEffect(
    () => {
      if (token || localToken) {
        if (router.pathname === SIGN_IN) {
          router.push(HOME_PAGE);
        }
      } else {
        router.push(SIGN_IN);
      }
    },
    // Need to call this effect only once at render
    // eslint-disable-next-line
    [],
  );

  const getContent = () => {
    if([SIGN_IN].includes(props.router.pathname))
      return <Component {...pageProps} />;

    return (
      <Layout>
        <Component {...pageProps} />
      </Layout>
    );
  };

  return (
    <CacheProvider value={muiCache}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {getContent()}
        <ReactNotification/>
      </ThemeProvider>
    </CacheProvider>
  );

};

export default wrapper.withRedux(App);
