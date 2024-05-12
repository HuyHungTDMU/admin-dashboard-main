import { Box, Dialog, Typography } from '@mui/material';
import React from 'react';
import Iconify from '../../components/iconify';
import { ICourse } from '../../@types';
import { colors } from '../../assets/colors';
import { LoadingButton } from '@mui/lab';
import Image from '../../components/image';
import NextLink from 'next/link';
import { shortenWalletAddress } from '../../utils';
import { useSnackbar } from 'notistack';
import { useCourse } from '../../hooks/request';

type Props = {
  open: boolean;
  currentCourse: ICourse | undefined;
  onClose: VoidFunction;
  onReload: VoidFunction;
};
export const ModalApproveCourse = ({
  open,
  currentCourse,
  onClose,
  onReload,
}: Props) => {
  const snackbar = useSnackbar();

  const { approveCourse } = useCourse();

  const handleSubmit = async () => {
    const result = await approveCourse(currentCourse?.id || '');
    await onClose();
    if (result.message) {
      snackbar.enqueueSnackbar('Something was wrong, please try again.', {
        variant: 'error',
      });
    } else {
      snackbar.enqueueSnackbar('A course has been successfully approved!', {
        variant: 'success',
      });
      onReload();
    }
  };

  return (
    <Dialog fullWidth maxWidth="sm" open={open}>
      <Box
        padding="20px"
        display="block"
        justifyContent="left"
        alignItems="center"
      >
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="subtitle1">Approve Course</Typography>
          <button
            onClick={onClose}
            style={{
              borderRadius: '50%',
              width: '20px',
              height: '20px',
              border: 'none',
              paddingLeft: '2.5px',
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
        <Box paddingTop="10px">
          <Typography
            color={colors.black_02}
            fontSize={'13px'}
            variant="caption"
          >
            {`Approve the course requisition submitted by ${shortenWalletAddress(
              currentCourse?.author.walletAddress || '',
              4,
            )}?`}
          </Typography>
        </Box>
        <Box
          display="flex"
          marginTop="15px"
          borderRadius="10px"
          height="100px"
          padding="0px 20px 0px 20px"
          gap="20px"
          border={`1px solid ${colors.grey_02}`}
          alignItems="center"
        >
          <Image
            alt="banner"
            src={currentCourse?.imageUrl}
            borderRadius="50%"
            top="0px"
            sx={{ height: '60px', width: '60px' }}
          />
          <Box>
            <Typography variant="h5">{currentCourse?.title}</Typography>
            <NextLink href={currentCourse?.contentLink || '#'} passHref>
              <a target="_blank" style={{ color: colors.blue_01 }}>
                {(currentCourse?.contentLink || []).length > 45
                  ? `${currentCourse?.contentLink?.substring(0, 45)} ...`
                  : currentCourse?.contentLink}
              </a>
            </NextLink>
          </Box>
        </Box>
        <Box margin="20px 0px 0px 20px" display="flex" justifyContent="right">
          <LoadingButton
            variant="contained"
            sx={{
              width: '100px',
              borderRadius: '20px',
            }}
            color={'success'}
            onClick={handleSubmit}
          >
            <Typography
              variant="subtitle1"
              sx={{
                fontSize: '12px',
              }}
            >
              confirm
            </Typography>
          </LoadingButton>
        </Box>
      </Box>
    </Dialog>
  );
};
