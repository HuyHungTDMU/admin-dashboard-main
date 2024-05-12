import { Box, Checkbox, Dialog, Typography } from '@mui/material';
import React, { useState } from 'react';
import Iconify from '../../components/iconify';
import { colors } from '../../assets/colors';
import { LoadingButton } from '@mui/lab';
import { useCourse } from '../../hooks/request';
import { useSnackbar } from '../../components/snackbar';

type Props = {
  id: string;
  open: boolean;
  onClose: VoidFunction;
};

const data = [
  {
    value: '1',
    label: 'I want to help',
  },
  {
    value: '2',
    label: "I can't access my account",
  },
  {
    value: '3',
    label: 'It has the wrong category',
  },
  {
    value: '4',
    label: 'Something else',
  },
];

export const ModalReportCourse = ({ id, open, onClose }: Props) => {
  const snackBar = useSnackbar();
  const { reportToAdmin } = useCourse();

  const [loading, setLoading] = useState(false);

  const [currentItem, setCurrentItem] = useState({
    value: '',
    label: '',
  });

  const handleSubmit = async () => {
    setLoading(true);
    const result = await reportToAdmin(id, currentItem.label);
    if (result) {
      snackBar.enqueueSnackbar('Thank you, we’re received your report', {
        variant: 'success',
      });
    } else {
      snackBar.enqueueSnackbar('Something was wrong, please try again.', {
        variant: 'error',
      });
    }
    setLoading(false);
    onClose();
  };

  return (
    <Dialog fullWidth maxWidth="xs" open={open}>
      <Box
        padding="20px"
        display="block"
        justifyContent="left"
        alignItems="center"
      >
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="subtitle1">Report</Typography>
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
            Download app to review detail course
          </Typography>
        </Box>
        <Box padding="10px 15px 10px 15px">
          {data.map((item) => (
            <Box key={item.value} display="flex" gap="10px" alignItems="center">
              <Checkbox
                size="small"
                checked={item.value === currentItem.value}
                onChange={() => setCurrentItem(item)}
              />
              <Typography
                color={colors.black_02}
                fontSize={'13px'}
                variant="caption"
              >
                {item.label}
              </Typography>
            </Box>
          ))}
        </Box>
        <Box
          padding="10px 20px 10px 20px"
          display="flex"
          justifyContent="right"
        >
          <LoadingButton
            variant="contained"
            sx={{
              width: '150px',
              borderRadius: '20px',
              color: colors.black_01,
            }}
            loading={loading}
            onClick={handleSubmit}
          >
            <Typography
              variant="subtitle1"
              sx={{
                fontSize: '12px',
              }}
            >
              Submit
            </Typography>
          </LoadingButton>
        </Box>
      </Box>
    </Dialog>
  );
};
