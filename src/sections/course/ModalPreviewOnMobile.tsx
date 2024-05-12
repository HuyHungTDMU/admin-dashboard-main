import { Box, Dialog, Typography } from '@mui/material';
import React from 'react';
import { LoadingButton } from '@mui/lab';
import Iconify from '../../components/iconify';
import { ICourse } from '../../@types';
import { colors } from '../../assets/colors';
import {
  CoinIcon,
  CourseTypeIcon,
  DownloadAppStoreIcon,
  DownloadGooglePlayIcon,
  PreviewOnMobileIcon,
  TotalQuestionIcon,
} from '../../assets/icons';
import Image from '../../components/image';
import NextLink from 'next/link';
import { courseStatus } from './CourseTableRow';
import { useCourse } from 'src/hooks/request';
import useSWR from 'swr';
import {useAuthContext} from "../../auth/useAuthContext";
import {CustomAvatar} from "../../components/custom-avatar";

type Props = {
  open: boolean;
  currentCourse: ICourse | undefined;
  onClose: VoidFunction;
  onSubmit: (id: string) => void;
};
export const ModalPreviewOnMobile = ({
  open,
  currentCourse,
  onClose,
  onSubmit,
}: Props) => {
  const { user } = useAuthContext();

  const { getCourse } = useCourse();

  const { data } = useSWR(currentCourse?.id, getCourse);

  const handleSubmit = () => {
    onClose();
    onSubmit(currentCourse?.id || '');
  };

  return (
    <Dialog fullWidth maxWidth="xs" open={open}>
      <Box display="block" justifyContent="left" alignItems="center">
        <Box
          padding="20px 20px 10px 20px"
          boxShadow="0px 4px 16px rgba(170, 170, 204, 0.12)"
          display="flex"
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography variant="subtitle1">Course Preview</Typography>
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

        <Box
          padding="30px 0px 20px 0px"
          display="flex"
          justifyContent="center"
          position="relative"
        >
          <PreviewOnMobileIcon />
          <Box position="absolute" left="105px" top="110px">
            <Typography variant="h5">{currentCourse?.title}</Typography>
            <Box sx={{ background: colors.white_01, borderRadius: '10px' }}>
              <Box>
                <Image
                  alt="banner"
                  src={currentCourse?.imageUrl}
                  borderRadius="10px 10px 0px 0px"
                  top="0px"
                  sx={{ height: '117.22px', width:'236px' }}
                />
              </Box>
              <Box
                display="grid"
                gridTemplateColumns={{ xs: 'repeat(2, 1fr)' }}
                gap={2}
                padding="10px"
              >
                <Box display="flex" gap="5px" alignItems="center">
                  <Box
                    height="25px"
                    width="25px"
                    borderRadius="50%"
                    display="flex"
                    justifyContent="center"
                    sx={{ background: colors.blue_01 }}
                  >
                    <CourseTypeIcon />
                  </Box>
                  <Typography fontSize={'10px'} variant="caption">
                    {currentCourse?.type}
                  </Typography>
                </Box>

                <Box display="flex" gap="5px" alignItems="center">
                  <Box
                    height="25px"
                    width="25px"
                    borderRadius="50%"
                    display="flex"
                    justifyContent="center"
                    paddingTop="1px"
                    sx={{
                      background: colors.yellow_02,
                    }}
                  >
                    <TotalQuestionIcon />
                  </Box>
                  <Typography fontSize={'10px'} variant="caption">
                    {data?.totalQuestion || 0} Question
                  </Typography>
                </Box>

                <Box display="flex" gap="5px" alignItems="center">
                  <Box
                    height="25px"
                    width="25px"
                    borderRadius="50%"
                    color={colors.black_01}
                    display="flex"
                    justifyContent="center"
                    sx={{ background: colors.green_02 }}
                  >
                    <CoinIcon />
                  </Box>
                  <Typography fontSize={'10px'} variant="caption">
                    {data?.totalReward || 0} EZ
                  </Typography>
                </Box>
              </Box>
              <Box padding="0px 15px 15px 15px">
                <LoadingButton
                  variant="contained"
                  sx={{
                    width: '100%',
                    borderRadius: '20px',
                    color: colors.black_01,
                  }}
                  endIcon={<Iconify icon="eva:chevron-right-fill" />}
                >
                  <Typography
                    variant="subtitle1"
                    sx={{
                      fontSize: '12px',
                    }}
                  >
                    Do quiz now
                  </Typography>
                </LoadingButton>
              </Box>
            </Box>

            <Box display="grid">
              <Box marginTop="30px" display="flex" gap="5px">
                <CustomAvatar sx={{ height: '40px', width: '40px' }} src={user?.imageUrl} alt={user?.name} name={user?.name} />
                <Box alignContent='center' display="grid">
                  <Typography variant="overline">
                    {currentCourse?.author?.name.substring(0, 7)}
                  </Typography>
                  <Typography fontSize={'9px'} variant="caption">
                    {currentCourse?.author?.title}
                  </Typography>
                </Box>
              </Box>
              <Typography variant="overline" marginTop="5px">
                {`${currentCourse?.title?.substring(0, 32)}`}
              </Typography>
              <Typography fontSize={'9px'} variant="caption" marginTop="7px">
                {currentCourse?.description.substring(0, 55)}
              </Typography>
            </Box>
          </Box>
        </Box>

        <Box
          boxShadow="0px -4px 16px rgba(170, 170, 204, 0.16)"
          display="grid"
          gap="10px"
        >
          {currentCourse?.activeStatus?.toUpperCase() ===
            courseStatus.CREATING && (
            <Box marginTop="20px" display="flex" justifyContent="center">
              <LoadingButton
                variant="contained"
                style={{
                  borderRadius: 20,
                  width: 300,
                  background: colors.yellow_02,
                  color: colors.black_01,
                }}
                onClick={handleSubmit}
              >
                <Typography fontSize={'14px'} variant="subtitle1">
                  Submit to review
                </Typography>
              </LoadingButton>
            </Box>
          )}

          <Box display="flex" justifyContent="center">
            <Box marginLeft="50px" marginRight="50px" position="relative">
              <Typography
                color={colors.grey_01}
                fontSize={'11px'}
                variant="caption"
              >
                Download app to review detail course
              </Typography>
            </Box>
          </Box>

          <Box
            marginBottom="10px"
            display="flex"
            justifyContent="center"
            gap="10px"
          >
            <NextLink href={'#'} passHref>
              <DownloadAppStoreIcon />
            </NextLink>
            <NextLink href={'#'} passHref>
              <DownloadGooglePlayIcon />
            </NextLink>
          </Box>
        </Box>
      </Box>
    </Dialog>
  );
};
