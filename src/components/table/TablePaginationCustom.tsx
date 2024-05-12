// @mui
import { Theme } from '@mui/material/styles';
import {
  Box,
  FormControlLabel,
  Switch,
  SxProps,
  TablePagination,
  TablePaginationProps,
} from '@mui/material';
import { colors } from '../../assets/colors';
//

// ----------------------------------------------------------------------

type Props = {
  dense?: boolean;
  onChangeDense?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  sx?: SxProps<Theme>;
};

export default function TablePaginationCustom({
  dense,
  onChangeDense,
  rowsPerPageOptions = [5, 10, 25],
  sx,
  ...other
}: Props & TablePaginationProps) {
  return (
    <Box
      sx={{ overflow: 'hidden', height: '50px', position: 'relative', ...sx }}
    >
      <TablePagination
        sx={{
          overflow: 'hidden',
          background: colors.white_01,
          border: '0px',
          boxShadow: '0px',
          position: 'absolute',
          right: '0px',
          height: '50px',
          width: '100%',
          top: '-8px',
        }}
        rowsPerPageOptions={rowsPerPageOptions}
        component="div"
        {...other}
      />

      {onChangeDense && (
        <FormControlLabel
          label="Dense"
          control={<Switch checked={dense} onChange={onChangeDense} />}
          sx={{
            pl: 2,
            py: 1.5,
            top: 0,
            position: {
              md: 'absolute',
            },
          }}
        />
      )}
    </Box>
  );
}
