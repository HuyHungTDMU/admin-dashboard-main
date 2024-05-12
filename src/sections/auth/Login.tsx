import { Stack, Typography } from '@mui/material';
import LoginLayout from '../../layouts/login';
import React from 'react';
import Image from '../../components/image';
import { LoginWithWalletAddress } from './LoginWithWalletAddress';

export default function Login() {
  return (
    <LoginLayout>
      <Stack spacing={2} style={{ alignItems: 'center' }}>
        <Image
          alt="mascot"
          src="/assets/images/mascot.png"
          style={{
            height: 200,
            width: 'auto',
          }}
        />

        <Image
          alt="mascot"
          src="/assets/images/logo.png"
          style={{
            height: 30,
            width: 'auto',
          }}
        />

        <Stack direction="row" spacing={0.5}>
          <Typography variant="body2">
            Connect your Metamask wallet, first!
          </Typography>
        </Stack>

        {/*<MyConnectButton/>*/}

        <LoginWithWalletAddress />
      </Stack>
    </LoginLayout>
  );
}
