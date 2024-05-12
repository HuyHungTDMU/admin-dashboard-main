import { ProviderContext } from 'notistack';
import Router from 'next/router';
import { Response } from 'src/@types';

const handleFormSuccess = async (
  path: string,
  snackBar: ProviderContext,
  message: string,
) => {
  snackBar.enqueueSnackbar(message, { variant: 'success' });
  Router.push(path, undefined, { shallow: false });
};

const handleFormError = (message: any, snackBar: ProviderContext): void => {
  const { enqueueSnackbar } = snackBar;
  enqueueSnackbar(message, { variant: 'error' });
};

const handleNewEditSuccess = async <T>(
  snackBar: ProviderContext,
  data: Response<T>,
) => {
  const { status, message } = data;
  if (status == 200) {
    snackBar.enqueueSnackbar(message, { variant: 'success' });
    Router.reload();
  } else {
    snackBar.enqueueSnackbar(message || 'Error', { variant: 'error' });
  }
};

export { handleFormError, handleFormSuccess, handleNewEditSuccess };
