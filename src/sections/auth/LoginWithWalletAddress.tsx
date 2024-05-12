import { LoadingButton } from '@mui/lab';
import { colors } from '../../assets/colors';
import { ethers } from 'ethers';
import axios from '../../utils/axios';
import { useAuthContext } from '../../auth/useAuthContext';
import { Box, Dialog, DialogTitle } from '@mui/material';
import React, { useState } from 'react';
import { useSnackbar } from 'notistack';
import Image from 'next/image';

declare let window: any;
export const LoginWithWalletAddress = () => {
  const { login } = useAuthContext();
  const [loading, setLoading] = useState(false);
  const snackbar = useSnackbar();

  const handleLogin = async () => {
    try {
      setLoading(true);
      //client side code
      if (!window.ethereum) return;
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();

      // Step 1: Get the user's account
      const [account] = await window.ethereum.request({
        method: 'eth_requestAccounts',
        params: [
          {
            eth_accounts: {},
          },
        ],
      });
      // Step 2: Get nonce for signing
      const response = await axios.get(
        `/auth-admin/wallet-address-nonce-message?walletAddress=${account}`,
      );
      // Step 3: Sign the transaction
      const signature = await signer.signMessage(
        response.data.message as string,
      );
      // Step 4: Login
      await login(account, signature);
      setLoading(false);
    } catch (error) {
      snackbar.enqueueSnackbar(
        error?.message || 'Something was wrong, please try again.',
        { variant: 'error' },
      );
      setLoading(false);
    }
  };

  return (
    <>
      <LoadingButton
        type="button"
        color="inherit"
        size="large"
        loading={loading}
        style={{
          borderRadius: 20,
          width: 150,
          background: colors.yellow_02,
          color: 'grey.800',
        }}
        onClick={handleLogin}
      >
        Connect Wallet
      </LoadingButton>

      <Dialog fullWidth maxWidth="xs" open={loading}>
        <Box style={{ display: 'grid', justifyContent: 'center' }}>
          <Image
            alt="mascot"
            src="/assets/loading.gif"
            height={150}
            width={200}
          />
          <DialogTitle textAlign="center" sx={{ pb: 2 }}>
            Connecting to Metamask...
          </DialogTitle>
        </Box>
      </Dialog>
    </>
  );
};
