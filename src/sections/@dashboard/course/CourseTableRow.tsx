import { useState } from 'react';
// @mui
import {
  Stack,
  Avatar,
  Button,
  Checkbox,
  TableRow,
  MenuItem,
  TableCell,
  IconButton,
  Typography,
  Link,
} from '@mui/material';
// @types
import { ICourse } from 'src/@types/course';
import Iconify from 'src/components/iconify';
import MenuPopover from 'src/components/menu-popover';
import ConfirmDialog from 'src/components/confirm-dialog';
import { PATH_DASHBOARD } from 'src/routes/paths';
import NextLink from 'next/link';
import { paramCase } from 'change-case';

// ----------------------------------------------------------------------

type Props = {
  row: ICourse;
  selected: boolean;
  onEditRow: VoidFunction;
  onSelectRow: VoidFunction;
  onDeleteRow: VoidFunction;
};

export default function CourseTableRow({
  row,
  selected,
  onEditRow,
  onSelectRow,
  onDeleteRow,
}: Props) {
  const [openConfirm, setOpenConfirm] = useState(false);

  const [openPopover, setOpenPopover] = useState<HTMLElement | null>(null);

  const handleOpenConfirm = () => {
    setOpenConfirm(true);
  };

  const handleCloseConfirm = () => {
    setOpenConfirm(false);
  };

  const handleOpenPopover = (event: React.MouseEvent<HTMLElement>) => {
    setOpenPopover(event.currentTarget);
  };

  const handleClosePopover = () => {
    setOpenPopover(null);
  };

  return (
    <>
      <TableRow hover selected={selected}>
        <TableCell padding="checkbox">
          <Checkbox checked={selected} onClick={onSelectRow} />
        </TableCell>

        <TableCell>
          <Stack direction="row" alignItems="center" spacing={2}>
            <Avatar alt={row.title} src={row.imageUrl} />
            <NextLink href={'#'} passHref>
              <Link
                noWrap
                color="inherit"
                variant="subtitle2"
                sx={{
                  mx: 'auto',
                  alignItems: 'center',
                  display: 'inline-flex',
                }}
              >
                {row.title}
              </Link>
            </NextLink>
          </Stack>
        </TableCell>

        <TableCell align="left">
          <Typography variant="subtitle2" noWrap>
            {row?.description?.length > 40
              ? `${row.description.substring(0, 40)} ...`
              : row.description}
          </Typography>
        </TableCell>

        <TableCell align="left" sx={{ textTransform: 'capitalize' }}>
          {row.type}
        </TableCell>

        <TableCell align="center">{row.authorName}</TableCell>

        <TableCell align="center">{row.difficult}</TableCell>

        <TableCell align="right">
          <IconButton
            color={openPopover ? 'inherit' : 'default'}
            onClick={handleOpenPopover}
          >
            <Iconify icon="eva:more-vertical-fill" />
          </IconButton>
        </TableCell>
      </TableRow>

      <MenuPopover
        open={openPopover}
        onClose={handleClosePopover}
        arrow="right-top"
        sx={{ width: 140 }}
      >
        <MenuItem
          onClick={() => {
            handleClosePopover();
            handleOpenConfirm();
          }}
          sx={{ color: 'error.main' }}
        >
          <Iconify icon="eva:trash-2-outline" />
          Delete
        </MenuItem>

        <MenuItem
          onClick={() => {
            handleClosePopover();
            onEditRow();
          }}
        >
          <Iconify icon="eva:edit-fill" />
          Edit
        </MenuItem>
      </MenuPopover>

      <ConfirmDialog
        open={openConfirm}
        onClose={handleCloseConfirm}
        title="Delete"
        content="Are you sure want to delete?"
        action={
          <Button
            variant="contained"
            color="error"
            onClick={() => {
              handleCloseConfirm();
              onDeleteRow();
            }}
          >
            Delete
          </Button>
        }
      />
    </>
  );
}
