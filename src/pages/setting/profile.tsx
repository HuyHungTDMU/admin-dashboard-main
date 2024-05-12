import { Box, Container, Card, Stack, Typography } from '@mui/material';
import React, { useCallback } from 'react';
import FormProvider, {
  RHFTextField,
  RHFUploadAvatar,
} from '../../components/hook-form';
import { useSnackbar } from '../../components/snackbar';
import { LoadingButton } from '@mui/lab';
import Head from 'next/head';
import DashboardLayout from 'src/layouts/dashboard';
import { useSettingsContext } from 'src/components/settings';
import { useProfileForm } from 'src/hooks/form/useProfileForm';
import { useRouter } from 'next/router';
import { useAuthContext } from 'src/auth/useAuthContext';

// ----------------------------------------------------------------------

UserProfilePage.getLayout = (page: React.ReactElement) => (
  <DashboardLayout>{page}</DashboardLayout>
);

// ----------------------------------------------------------------------

export default function UserProfilePage() {
  const snackbar = useSnackbar();

  const { themeStretch } = useSettingsContext();

  const { user } = useAuthContext();

  const router = useRouter();

  const methods = useProfileForm(
    {
      onSuccess: async () => {
        snackbar.enqueueSnackbar('Updated success', { variant: 'success' });
        router.reload();
      },
      onError: (message: any) => {
        snackbar.enqueueSnackbar('Something was wrong, please try again.', {
          variant: 'error',
        });
      },
    },
    {
      title: user?.title || '',
      name: user?.name || '',
      imageUrl: user?.imageUrl || '',
    },
  );

  const {
    onSubmit,
    setValue,
    formState: { isSubmitting },
  } = methods;

  const handleDrop = useCallback(
    (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];

      const newFile = Object.assign(file, {
        preview: URL.createObjectURL(file),
      });

      if (file) {
        setValue('imageUrl', newFile);
      }
    },
    [setValue],
  );

  return (
    <>
      <Head>
        <title>Profile</title>
      </Head>

      <Container maxWidth={themeStretch ? false : 'lg'}>
        <FormProvider methods={methods} onSubmit={onSubmit}>
          <Box
            sx={{
              marginBottom: 2,
              display: 'flex',
              justifyContent: 'left',
              alignItems: 'center',
            }}
          >
            <Typography variant="h5" noWrap>
              Profile 1
            </Typography>
          </Box>
          <Card>
            <Box style={{ justifyContent: 'left', padding: 20 }}>
              <Box>
                <RHFUploadAvatar
                  name="imageUrl"
                  maxSize={3145728}
                  onDrop={handleDrop}
                />
              </Box>
              <Box width="full" display="grid" gap="10px">
                <RHFTextField
                  size={'small'}
                  style={{ marginTop: 20 }}
                  name="title"
                  disabled
                  label="Title"
                />
                <RHFTextField
                  size={'small'}
                  style={{ marginTop: 20 }}
                  name="name"
                  label="Name"
                />
              </Box>
              <Stack style={{ marginTop: 20 }} alignItems="flex-end">
                <LoadingButton
                  size={'small'}
                  type="submit"
                  variant="contained"
                  loading={isSubmitting}
                >
                  Save Change
                </LoadingButton>
              </Stack>
            </Box>
          </Card>
        </FormProvider>
      </Container>
    </>
  );
}
