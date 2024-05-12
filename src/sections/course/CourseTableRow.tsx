import React, { useState } from 'react';
// @mui
import {
  Avatar,
  Box,
  Button,
  IconButton,
  MenuItem,
  Stack,
  TableCell,
  TableRow,
  Typography,
} from '@mui/material';
// @types
import Iconify from 'src/components/iconify';
import MenuPopover from 'src/components/menu-popover';
import ConfirmDialog from 'src/components/confirm-dialog';
import Label from 'src/components/label';
import { colors } from '../../assets/colors';
import { LoadingButton } from '@mui/lab';
import { fDate, shortenWalletAddress } from '../../utils';
import { ICourse } from '../../@types';
import NextLink from 'next/link';
import { useAuthContext } from '../../auth/useAuthContext';
import { ModalRejectCourse } from './ModalRejectCourse';
import { ModalApproveCourse } from './ModalApproveCourse';
import { MessageIcon, MessageNotifIcon } from '../../assets/icons';
import Image from '../../components/image';
import { useCourse } from '../../hooks/request';

// ----------------------------------------------------------------------

export enum courseStatus {
  CREATING = 'CREATING',
  SUBMITTED = 'SUBMITTED',
  PRODUCTION = 'PRODUCTION',
  REJECTED = 'REJECTED',
}

type Props = {
  row: ICourse;
  selected: boolean;
  onEditRow: VoidFunction;
  onSelectRow: VoidFunction;
  onDeleteRow: VoidFunction;
  onPreviewRow: VoidFunction;
  onSubmit: VoidFunction;
  onCancelSubmit: VoidFunction;
  onReportAdmin: VoidFunction;
  onReload: VoidFunction;
};

export default function CourseTableRow({
  row,
  selected,
  onEditRow,
  onDeleteRow,
  onPreviewRow,
  onSubmit,
  onCancelSubmit,
  onReportAdmin,
  onReload,
}: Props) {
  const [openConfirm, setOpenConfirm] = useState(false);
  const [openApprove, setOpenApprove] = useState(false);
  const [openReject, setOpenReject] = useState(false);
  const [isDelete, setDelete] = useState(false);

  const { markAsRead } = useCourse();

  const { user } = useAuthContext();

  const isAdmin =
    user?.roles?.filter((item) => item.toString() === 'ADMIN').length === 1;

  const [openPopoverAction, setOpenPopoverAction] =
    useState<HTMLElement | null>(null);
  const [openPopoverMessage, setOpenPopoverMessage] =
    useState<HTMLElement | null>(null);

  const handleOpenConfirm = () => {
    setOpenConfirm(true);
  };

  const handleCloseConfirm = () => {
    setOpenConfirm(false);
  };

  const handleOpenPopoverAction = async (
    event: React.MouseEvent<HTMLElement>,
  ) => {
    setOpenPopoverAction(event.currentTarget);
  };

  const handleClosePopoverAction = () => {
    setOpenPopoverAction(null);
  };

  const handleOpenPopoverMessage = (event: React.MouseEvent<HTMLElement>) => {
    setOpenPopoverMessage(event.currentTarget);
    if (row.isUnreadReport) {
      markAsRead(row.id).then();
    }
  };

  const handleClosePopoverMessage = () => {
    setOpenPopoverMessage(null);
  };

  return (
    <>
      <TableRow style={{ background: '#fff' }} hover selected={selected}>
        <TableCell
          style={{ borderTopLeftRadius: 10, borderBottomLeftRadius: 10 }}
        >
          <Stack direction="row" alignItems="center" spacing={2}>
            <Avatar alt={row.title} src={row.imageUrl} />
            <Typography variant="inherit" noWrap>
              {row?.title?.length > 30
                ? `${row.title.substring(0, 30)} ...`
                : row.title}
            </Typography>
          </Stack>
        </TableCell>

        <TableCell align="left">
          <NextLink href={row?.contentLink || '#'} passHref>
            <a target="_blank" style={{ color: colors.blue_01 }}>
              {row?.contentLink?.length > 45
                ? `${row?.contentLink?.substring(0, 45)} ...`
                : row?.contentLink}
            </a>
          </NextLink>
        </TableCell>

        <TableCell align="left" sx={{ textTransform: 'capitalize' }}>
          <Typography variant="inherit" noWrap>
            {fDate(row.createdAt)}
          </Typography>
        </TableCell>

        <TableCell align="left">
          <Label
            variant="soft"
            color={
              (row.activeStatus?.toUpperCase() === courseStatus.CREATING &&
                'warning') ||
              (row.activeStatus?.toUpperCase() === courseStatus.REJECTED &&
                'error') ||
              (row.activeStatus?.toUpperCase() === courseStatus.PRODUCTION &&
                'secondary') ||
              'success'
            }
          >
            {row.activeStatus?.charAt(0).toUpperCase() +
              row.activeStatus?.slice(1).toLowerCase()}
          </Label>
        </TableCell>

        <TableCell align="center">
          {row.activeStatus.toUpperCase() === courseStatus.CREATING && (
            <LoadingButton
              type="button"
              color="inherit"
              size="small"
              loading={false}
              style={{
                borderRadius: 20,
                width: 100,
                background: colors.yellow_02,
                fontSize: '12px',
                color: colors.black_01,
              }}
              onClick={() => {
                onSubmit();
              }}
            >
              Submit
            </LoadingButton>
          )}
          {row.activeStatus.toUpperCase() === courseStatus.REJECTED &&
            row.reports.length > 0 &&
            (row.isUnreadReport ? (
              <IconButton
                color={openPopoverMessage ? 'inherit' : 'default'}
                onClick={handleOpenPopoverMessage}
              >
                <MessageNotifIcon />
              </IconButton>
            ) : (
              <IconButton
                color={openPopoverMessage ? 'inherit' : 'default'}
                onClick={handleOpenPopoverMessage}
              >
                <MessageIcon />
              </IconButton>
            ))}
        </TableCell>

        <TableCell
          align="right"
          style={{ borderTopRightRadius: 10, borderBottomRightRadius: 10 }}
        >
          {(row.activeStatus?.toUpperCase() !== courseStatus.PRODUCTION ||
            (isAdmin &&
              (row.activeStatus?.toUpperCase() === courseStatus.SUBMITTED ||
                row.activeStatus?.toUpperCase() ===
                  courseStatus.REJECTED))) && (
            <IconButton
              color={openPopoverAction ? 'inherit' : 'default'}
              onClick={(event) => handleOpenPopoverAction(event)}
            >
              <Iconify icon="eva:more-vertical-fill" />
            </IconButton>
          )}
        </TableCell>
      </TableRow>

      <MenuPopover
        open={openPopoverMessage}
        onClose={handleClosePopoverMessage}
        arrow="right-top"
        sx={{ width: '300px' }}
      >
        <Box overflow="scroll" maxHeight="250px">
          {row.reports.map((item, index) => (
            <Box
              key={index}
              padding="10px"
              borderTop={index !== 0 ? `1px solid ${colors.grey_02}` : 'none'}
            >
              <Box display="flex" gap="10px" alignItems="center">
                <Image
                  alt="banner"
                  src={row.imageUrl}
                  borderRadius="50%"
                  top="0px"
                  sx={{ height: '40px', width: '40px' }}
                />
                <Box>
                  <Typography variant="subtitle1">
                    {shortenWalletAddress(item.userId, 4)}
                  </Typography>
                  <Typography variant="caption">
                    {fDate(item.createdAt)}
                  </Typography>
                </Box>
              </Box>
              <Typography variant="body2">{item.body}</Typography>
            </Box>
          ))}
        </Box>
      </MenuPopover>

      <MenuPopover
        open={openPopoverAction}
        onClose={handleClosePopoverAction}
        arrow="right-top"
        sx={{ width: 200 }}
      >
        {(row.activeStatus?.toUpperCase() === courseStatus.CREATING ||
          row.activeStatus?.toUpperCase() === courseStatus.SUBMITTED) && (
          <MenuItem
            onClick={() => {
              handleClosePopoverAction();
              onPreviewRow();
            }}
          >
            <Iconify color={colors.grey_01} icon="eva:eye-fill" />
            Preview on mobile
          </MenuItem>
        )}

        {row.activeStatus?.toUpperCase() === courseStatus.REJECTED && (
          <MenuItem
            onClick={() => {
              handleClosePopoverAction();
              onReportAdmin();
            }}
          >
            <Iconify color={colors.grey_01} icon="mdi:flag" />
            Report admin
          </MenuItem>
        )}

        {(row.activeStatus?.toUpperCase() === courseStatus.CREATING ||
          row.activeStatus?.toUpperCase() === courseStatus.REJECTED) && (
          <MenuItem
            onClick={() => {
              handleClosePopoverAction();
              onEditRow();
            }}
          >
            <Iconify color={colors.grey_01} icon="eva:edit-fill" />
            Edit
          </MenuItem>
        )}

        {(row.activeStatus?.toUpperCase() === courseStatus.CREATING ||
          row.activeStatus?.toUpperCase() === courseStatus.REJECTED) && (
          <MenuItem
            sx={{ color: 'error.main' }}
            onClick={() => {
              setDelete(true);
              handleClosePopoverAction();
              handleOpenConfirm();
            }}
          >
            <Iconify icon="eva:trash-2-outline" />
            Delete
          </MenuItem>
        )}

        {row.activeStatus?.toUpperCase() === courseStatus.SUBMITTED && (
          <MenuItem
            sx={{ color: 'error.main' }}
            onClick={() => {
              handleClosePopoverAction();
              handleOpenConfirm();
            }}
          >
            <Iconify icon="eva:trash-2-outline" />
            Cancel submit
          </MenuItem>
        )}

        {isAdmin &&
          (row.activeStatus?.toUpperCase() === courseStatus.SUBMITTED ||
            row.activeStatus?.toUpperCase() === courseStatus.REJECTED) && (
            <MenuItem
              onClick={() => {
                handleClosePopoverAction();
                setOpenApprove(true);
              }}
            >
              <Iconify color={colors.grey_01} icon="mdi:tick-circle" />
              Approve
            </MenuItem>
          )}

        {isAdmin &&
          row.activeStatus?.toUpperCase() === courseStatus.SUBMITTED && (
            <MenuItem
              onClick={() => {
                handleClosePopoverAction();
                setOpenReject(true);
              }}
            >
              <Iconify
                color={colors.grey_01}
                icon="mdi:clipboard-remove-outline"
              />
              Reject
            </MenuItem>
          )}
      </MenuPopover>

      <ConfirmDialog
        open={openConfirm}
        onClose={handleCloseConfirm}
        title={isDelete ? 'Delete' : 'Cancel Submit'}
        content={
          isDelete
            ? 'Are you sure want to delete?'
            : "Are you sure want to cancel? This action can't undo."
        }
        action={
          <Button
            variant="contained"
            color="error"
            onClick={async () => {
              await handleCloseConfirm();
              if (isDelete) {
                await onDeleteRow();
              } else {
                await onCancelSubmit();
              }
            }}
          >
            {isDelete ? 'Delete' : 'Cancel Submit'}
          </Button>
        }
      />

      <ModalRejectCourse
        open={openReject}
        onReload={onReload}
        onClose={() => setOpenReject(false)}
        currentCourse={row}
      />

      <ModalApproveCourse
        open={openApprove}
        onReload={onReload}
        onClose={() => setOpenApprove(false)}
        currentCourse={row}
      />
    </>
  );
}
