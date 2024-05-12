import { Box, Button, Dialog, Stack, Typography } from '@mui/material';
import React, { useCallback, useEffect } from 'react';
import NextLink from "next/link";
import { LoadingButton } from '@mui/lab';
import FormProvider, {
  RHFTextField,
  RHFUploadAvatar,
} from '../../components/hook-form';
import { useCourseForm } from '../../hooks/form';
import {
  copyToClipboard,
  handleFormError,
  handleFormSuccess,
} from '../../utils';
import { PATH_DASHBOARD } from '../../routes/paths';
import { useSnackbar } from '../../components/snackbar';
import Iconify from '../../components/iconify';
import { ICourse } from '../../@types';
import { colors } from '../../assets/colors';
import { ExportIcon } from '../../assets/icons';

type Props = {
  isEdit: boolean;
  open: boolean;
  currentCourse: ICourse | undefined;
  onClose: VoidFunction;

  reLoadData: VoidFunction;
};

const emailCopy = 'info@ezwallet.xyz';
const linkTemplate = 'https://airtable.com/shrmUOrNm3ODHYPoo';

export const ModalCreateUpdateCourse = ({
  open,
  isEdit,
  currentCourse,
  onClose,
  reLoadData,
}: Props) => {
  const snackBar = useSnackbar();
  const methods = useCourseForm(
    {
      onSuccess: async () => {
        reLoadData();
        reset();
        onClose();
        await handleFormSuccess(
          PATH_DASHBOARD.courseClient,
          snackBar,
          isEdit
            ? 'Update course success'
            : 'A new course has been successfully added!',
        );
      },
      onError: (message: any) => {
        handleFormError(message, snackBar);
      },
    },
    currentCourse,
    isEdit,
  );

  const {
    onSubmit,
    reset,
    setValue,
    resetField,
    formState: { isSubmitting },
  } = methods;

  useEffect(() => {
    if (!open) {
      resetField('id');
      resetField('title');
      resetField('contentLink');
      resetField('imageUrl');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

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

  const onCopyEmail = () => {
    copyToClipboard(
      emailCopy,
      () => {
        snackBar.enqueueSnackbar('Copied to clipboard', { variant: 'success' });
      },
      () => {
        snackBar.enqueueSnackbar('Something went wrong!', { variant: 'error' });
      },
    );
  };

  return (
    <Dialog fullWidth maxWidth="xs" open={open}>
      <FormProvider methods={methods} onSubmit={onSubmit}>
        <Box style={{ display: 'block', justifyContent: 'left', padding: 20 }}>
          <Box
            sx={{
              marginBottom: 2,
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <Typography variant="subtitle1">
              {isEdit ? 'Edit Course' : 'Add New Course'}
            </Typography>
            <button
              onClick={onClose}
              style={{
                borderRadius: '50%',
                width: '20px',
                height: '20px',
                border: 'none',
                paddingLeft: '3px',
                paddingTop: '2px',
                background: colors.black_01,
              }}
            >
              <Iconify
                style={{ height: '15px', width: '15px' }}
                color={colors.white_01}
                icon="eva:close-outline"
              />
            </button>
          </Box>
          <RHFUploadAvatar
            name="imageUrl"
            maxSize={3145728}
            onDrop={handleDrop}
            helperText={
              <Typography
                variant="caption"
                sx={{
                  mt: 2,
                  mx: 'auto',
                  display: 'block',
                  textAlign: 'center',
                  color: 'text.secondary',
                }}
              >
                Allowed *.jpeg, *.jpg, *.png, *.gif
                <br /> max size of 3.1 MB
              </Typography>
            }
          />
          <RHFTextField
            size={'small'}
            style={{ marginTop: 20 }}
            name="title"
            label="Title"
          />
          <RHFTextField
            size={'small'}
            style={{ marginTop: 20 }}
            name="contentLink"
            label="Link"
          />
          <Box
            marginTop="15px"
            display="flex"
            gap="10px"
            alignItems="center"
            color={colors.blue_01}
          >
              <NextLink href={linkTemplate} passHref>
                  <a target="_blank" style={{ color: colors.blue_01 }}>
                      <Typography variant="caption">Airtable Template</Typography>
                  </a>
              </NextLink>
            <ExportIcon marginTop="5px" />
          </Box>
          <Box marginTop="15px" color={colors.black_02}>
            <Typography variant="caption">
              Please make sure you have shared access with admin email
            </Typography>
          </Box>
          <Box
            display="flex"
            justifyContent="space-between"
            marginTop="5px"
            width="200px"
            color={colors.black_01}
            padding="6px 0px 6px 10px"
            alignItems="center"
            border={`1px solid ${colors.grey_02}`}
            borderRadius="8px"
          >
            <Typography variant="caption">{emailCopy}</Typography>
            <Button size="small" type="button" onClick={onCopyEmail}>
              <Iconify color={colors.black_02} icon="ph:copy" />
            </Button>
          </Box>
          <Stack style={{ marginTop: 20 }} alignItems="flex-end">
            <LoadingButton
              size={'small'}
              type="submit"
              variant="contained"
              loading={isSubmitting}
            >
              {!isEdit ? 'Add Course' : 'Save Change'}
            </LoadingButton>
          </Stack>
        </Box>
      </FormProvider>
    </Dialog>
  );
};
