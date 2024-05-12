// i18n
import '../locales/i18n';

// scroll bar
import 'simplebar/src/simplebar.css';

// lightbox
import 'react-image-lightbox/style.css';

// map
import 'mapbox-gl/dist/mapbox-gl.css';

// editor
import 'react-quill/dist/quill.snow.css';

// slick-carousel
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

// lazy image
import 'react-lazy-load-image-component/src/effects/blur.css';

// ----------------------------------------------------------------------
import { CacheProvider, EmotionCache } from '@emotion/react';
// next
import { NextPage } from 'next';
import Head from 'next/head';
import { AppProps } from 'next/app';
// redux
import { Provider as ReduxProvider } from 'react-redux';
// @mui
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
// redux
import { store } from '../redux/store';
// utils
import createEmotionCache from '../utils/createEmotionCache';
// theme
import ThemeProvider from '../theme';
// locales
import ThemeLocalization from '../locales';
// components
import { StyledChart } from '../components/chart';
import ProgressBar from '../components/progress-bar';
import SnackbarProvider from '../components/snackbar';
import { MotionLazyContainer } from '../components/animate';
import { SettingsProvider, ThemeSettings } from '../components/settings';

// Check our docs
// https://docs.minimals.cc/authentication/ts-version
import { AuthProvider } from '../auth/JwtContext';
// import { AuthProvider } from '../auth/Auth0Context';
// import { AuthProvider } from '../auth/FirebaseContext';
// import { AuthProvider } from '../auth/AwsCognitoContext';
import '@rainbow-me/rainbowkit/styles.css';
import {
  connectorsForWallets,
  RainbowKitProvider,
} from '@rainbow-me/rainbowkit';
import { chain, configureChains, createClient, WagmiConfig } from 'wagmi';
import { publicProvider } from 'wagmi/providers/public';
import {
  coinbaseWallet,
  metaMaskWallet,
  trustWallet,
} from '@rainbow-me/rainbowkit/wallets';
import { ezWallet } from '../utils/ezWalletExtension';

// ----------------------------------------------------------------------

const network =
  process.env.NEXT_PUBLIC_NODE_ENV === 'develop' ? chain.goerli : chain.mainnet;
const { chains, provider, webSocketProvider } = configureChains(
  [network],
  [publicProvider()],
);

const demoAppInfo = {
  appName: 'Admin Dashboard EZWallet',
};

const connectors = connectorsForWallets([
  {
    groupName: 'Recommended',
    wallets: [
      ezWallet({ chains }),
      metaMaskWallet({ chains }),
      trustWallet({ chains }),
      coinbaseWallet({ chains, appName: 'My RainbowKit App' }),
    ],
  },
]);

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
  webSocketProvider,
});

const clientSideEmotionCache = createEmotionCache();

type NextPageWithLayout = NextPage & {
  getLayout?: (page: React.ReactElement) => React.ReactNode;
};

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
  Component: NextPageWithLayout;
}

export default function MyApp(props: MyAppProps) {
  const { Component, pageProps, emotionCache = clientSideEmotionCache } = props;

  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider
        modalSize="compact"
        appInfo={demoAppInfo}
        chains={chains}
      >
        <CacheProvider value={emotionCache}>
          <Head>
            <meta
              name="viewport"
              content="initial-scale=1, width=device-width"
            />
          </Head>

          <AuthProvider>
            <ReduxProvider store={store}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <SettingsProvider>
                  <MotionLazyContainer>
                    <ThemeProvider>
                      <ThemeSettings>
                        <ThemeLocalization>
                          <SnackbarProvider>
                            <StyledChart />
                            <ProgressBar />
                            {getLayout(<Component {...pageProps} />)}
                          </SnackbarProvider>
                        </ThemeLocalization>
                      </ThemeSettings>
                    </ThemeProvider>
                  </MotionLazyContainer>
                </SettingsProvider>
              </LocalizationProvider>
            </ReduxProvider>
          </AuthProvider>
        </CacheProvider>
      </RainbowKitProvider>
    </WagmiConfig>
  );
}
