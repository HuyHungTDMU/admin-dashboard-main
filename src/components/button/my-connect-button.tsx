import { ConnectButton } from '@rainbow-me/rainbowkit';
import { LoadingButton } from '@mui/lab';
import { colors } from '../../assets/colors';
import { useEffect } from 'react';

export const MyConnectButton = () => {
  return (
    <ConnectButton.Custom>
      {({
        account,
        chain,
        openAccountModal,
        openChainModal,
        openConnectModal,
        authenticationStatus,
        mounted,
      }) => {
        // Note: If your app doesn't use authentication, you
        // can remove all 'authenticationStatus' checks
        const ready = mounted && authenticationStatus !== 'loading';
        const connected =
          ready &&
          account &&
          chain &&
          (!authenticationStatus || authenticationStatus === 'authenticated');

        return (
          <div
            {...(!ready && {
              'aria-hidden': true,
              style: {
                opacity: 0,
                pointerEvents: 'none',
                userSelect: 'none',
              },
            })}
          >
            {(() => {
              if (!connected) {
                return (
                  <LoadingButton
                    type="button"
                    color="inherit"
                    size="large"
                    loading={false}
                    style={{
                      borderRadius: 20,
                      width: 200,
                      background: colors.yellow_02,
                      color: 'grey.800',
                    }}
                    onClick={async () => {
                      //@ts-ignore
                      console.log('tracking', window.dataLayer);
                      //@ts-ignore
                      // window &&
                      //   window?.dataLayer &&
                      //   window?.dataLayer.push({ event: 'connect_wallet' });
                      await openConnectModal();
                    }}
                  >
                    Connect Wallet
                  </LoadingButton>
                );
              }

              if (chain.unsupported) {
                return (
                  <LoadingButton
                    type="button"
                    color="inherit"
                    size="large"
                    loading={false}
                    style={{
                      borderRadius: 20,
                      width: 200,
                      background: colors.yellow_02,
                      color: 'grey.800',
                    }}
                    onClick={openChainModal}
                  >
                    Wrong network
                  </LoadingButton>
                );
              }

              return (
                <div style={{ display: 'flex', gap: 12 }}>
                  <LoadingButton
                    fullWidth
                    color="inherit"
                    size="large"
                    loading={false}
                    style={{
                      borderRadius: 20,
                      width: 200,
                      background: colors.yellow_02,
                      color: 'grey.800',
                    }}
                    onClick={openAccountModal}
                  >
                    {`${account.displayName} ${
                      account.displayBalance
                        ? ` (${account.displayBalance})`
                        : ''
                    }`}
                  </LoadingButton>
                </div>
              );
            })()}
          </div>
        );
      }}
    </ConnectButton.Custom>
  );
};
