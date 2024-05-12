import {
  Chain,
  getWalletConnectConnector,
  Wallet,
} from '@rainbow-me/rainbowkit';

export interface EzWalletOptions {
  chains: Chain[];
}

const urlOrigin =
  typeof window !== 'undefined' && window.location.origin
    ? window.location.origin
    : '';

export const ezWallet = ({ chains }: EzWalletOptions): Wallet => ({
  id: 'EZWallet',
  name: 'EZWallet',
  iconUrl: `${urlOrigin}/assets/icons/icon.png`,
  iconBackground: '#fff',
  downloadUrls: {
    android: 'https://EZWallet/android',
    ios: 'https://EZWallet/ios',
    qrCode: 'https://EZWallet/qr',
  },
  createConnector: () => {
    const connector = getWalletConnectConnector({ chains });

    return {
      connector,
      mobile: {
        getUri: async () => {
          const { uri } = (await connector.getProvider()).connector;

          return uri;
        },
      },
      qrCode: {
        getUri: async () => (await connector.getProvider()).connector.uri,
        instructions: {
          learnMoreUrl: 'https://my-wallet/learn-more',
          steps: [
            {
              description:
                'We recommend putting My Wallet on your home screen for faster access to your wallet.',
              step: 'install',
              title: 'Open the My Wallet app',
            },
            {
              description:
                'After you scan, a connection prompt will appear for you to connect your wallet.',
              step: 'scan',
              title: 'Tap the scan button',
            },
          ],
        },
      },
    };
  },
});
