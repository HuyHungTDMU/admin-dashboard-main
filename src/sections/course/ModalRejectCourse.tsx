import { Box, Dialog, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import Iconify from '../../components/iconify';
import { ICourse } from '../../@types';
import { colors } from '../../assets/colors';
import { LoadingButton } from '@mui/lab';
import { useSnackbar } from 'notistack';
import { useCourse } from '../../hooks/request';

type Props = {
  open: boolean;
  currentCourse: ICourse | undefined;
  onClose: VoidFunction;
  onReload: VoidFunction;
};
export const ModalRejectCourse = ({
  open,
  currentCourse,
  onClose,
  onReload,
}: Props) => {
  const snackbar = useSnackbar();

  const { rejectCourse } = useCourse();

  const [reason, setReason] = useState('');

  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    const result = await rejectCourse(currentCourse?.id || '', reason);
    await onClose();
    if (result.message) {
      snackbar.enqueueSnackbar('Something was wrong, please try again.', {
        variant: 'error',
      });
    } else {
      snackbar.enqueueSnackbar('A course has been successfully rejected!', {
        variant: 'success',
      });
      onReload();
    }
    setLoading(false);
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
          <Typography variant="subtitle1">Reject Course</Typography>
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
            {`Are you sure want to reject this course? This action can't undo.`}
          </Typography>
        </Box>
        <Box marginTop="15px">
          <TextField
            fullWidth={true}
            rows={3}
            multiline={true}
            value={reason}
            label="Reason (optional)"
            onChange={(data) => setReason(data.target.value)}
          />
        </Box>
        <Box
          margin="20px 0px 0px 20px"
          display="flex"
          justifyContent="right"
          gap="10px"
        >
          <LoadingButton
            variant="contained"
            sx={{
              width: '100px',
              borderRadius: '20px',
            }}
            color={'error'}
            onClick={handleSubmit}
            disabled={!reason}
            loading={loading}
          >
            <Typography
              variant="subtitle1"
              sx={{
                fontSize: '12px',
              }}
            >
              Reject
            </Typography>
          </LoadingButton>
          <LoadingButton
            variant="contained"
            sx={{
              width: '100px',
              borderRadius: '20px',
              color: colors.black_01,
            }}
            onClick={onClose}
            color="inherit"
          >
            <Typography
              variant="subtitle1"
              sx={{
                fontSize: '12px',
              }}
            >
              Close
            </Typography>
          </LoadingButton>
        </Box>
      </Box>
    </Dialog>
  );
};
