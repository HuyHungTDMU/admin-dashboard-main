// @mui
import { Paper, IconButton } from '@mui/material';
import Iconify from 'src/components/iconify';
// components

// ----------------------------------------------------------------------

type ToolbarProps = {
  onRefresh: VoidFunction;
};

export default function Toolbar({ onRefresh, ...other }: ToolbarProps) {
  return (
    <Paper
      sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}
      {...other}
    >
      <IconButton onClick={onRefresh}>
        <Iconify icon="eva:refresh-fill" />
      </IconButton>
    </Paper>
  );
}
