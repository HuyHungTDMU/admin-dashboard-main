import { useCallback, useEffect, useState } from 'react';
// next
import Head from 'next/head';
// @mui
import {
  Box,
  Button,
  Card,
  Container,
  Table,
  TableBody,
  TableContainer,
  Typography,
} from '@mui/material';
// routes
// @types
import { ICourse } from 'src/@types/course';
// layouts
import DashboardLayout from 'src/layouts/dashboard';
// components
import Scrollbar from 'src/components/scrollbar';
import { useSettingsContext } from 'src/components/settings';
import {
  getComparator,
  TableHeadCustom,
  TableNoData,
  TablePaginationCustom,
  useTable,
} from 'src/components/table';

import { useCourse } from 'src/hooks/request';
import { useSnackbar } from 'notistack';
import { PAGE_OPTIONS_DEFAULT } from 'src/config';
import { IPageMeta } from 'src/@types';
import LoadingAction from 'src/components/loading-screen/loadingAction';
import useSWR, { useSWRConfig } from 'swr';
import CourseTableRow from '../../sections/course/CourseTableRow';
import Iconify from '../../components/iconify';
import { ModalCreateUpdateCourse } from '../../sections/course/ModalCreateUpdateCourse';
import { ModalPreviewOnMobile } from '../../sections/course/ModalPreviewOnMobile';
import { ModalReportCourse } from '../../sections/course/ModalReportCourse';
import { colors } from '../../assets/colors';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'title', label: 'Title', align: 'left', width: 150 },
  { id: 'contentLink', label: 'Link', align: 'left', width: 250 },
  { id: 'createdAt', label: 'Date', align: 'left', width: 100 },
  { id: 'activeStatus', label: 'Status', align: 'left', width: 80 },
  { id: '1', label: '', align: 'left', width: 100 },
  { id: '2', label: '', align: 'left', width: 50 },
];

// ----------------------------------------------------------------------

UserListPage.getLayout = (page: React.ReactElement) => (
  <DashboardLayout>{page}</DashboardLayout>
);

// ----------------------------------------------------------------------

export default function UserListPage() {
  const {
    page,
    order,
    orderBy,
    rowsPerPage,
    setPage,
    setRowsPerPage,
    //
    selected,
    onSelectRow,
    //
    onSort,
    onChangePage,
    onChangeRowsPerPage,
  } = useTable();

  const [meta, setMeta] = useState<IPageMeta>();

  const [tableData, setTableData] = useState<ICourse[]>([]);

  const { themeStretch } = useSettingsContext();

  const { mutate } = useSWRConfig();

  const { getCourses, deleteCourse, submitCourse, cancelSubmitCourse } =
    useCourse();

  const snackbar = useSnackbar();

  const [isLoading, setIsLoading] = useState(false);

  const [isEdit, setEdit] = useState(false);

  const [isOpenUpdate, setOpenUpdate] = useState(false);

  const [isOpenPreview, setOpenPreview] = useState(false);

  const [isOpenReport, setOpenReport] = useState(false);

  const [currentCourse, setCurrentCourse] = useState<ICourse>();

  const { data: data_response, isLoading: isLoadingTable } = useSWR(
    {
      ...PAGE_OPTIONS_DEFAULT,
      take: rowsPerPage,
      page,
    },
    getCourses,
  );

  const dataFiltered = applyFilter({
    inputData: tableData,
    comparator: getComparator(order, orderBy),
  });

  useEffect(() => {
    setTableData([]);

    if (data_response) {
      const { data, meta } = data_response;
      setTableData(data);
      setMeta(meta);
      setPage(meta.page);
      setRowsPerPage(rowsPerPage);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data_response]);

  const isNotFound = !dataFiltered.length;

  const reLoadData = useCallback(() => {
    mutate({
      ...PAGE_OPTIONS_DEFAULT,
      take: rowsPerPage,
      page,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, rowsPerPage]);

  const handleDeleteRow = async (id: string) => {
    setIsLoading(true);
    try {
      await deleteCourse(id);
      await reLoadData();
      snackbar.enqueueSnackbar('Deleted success', { variant: 'success' });
    } catch (error) {
      snackbar.enqueueSnackbar('Something was wrong, please try again.', {
        variant: 'error',
      });
    }
    setIsLoading(false);
  };

  const handleEditRow = (row: ICourse) => {
    setCurrentCourse(row);
    setEdit(true);
    setOpenUpdate(true);
  };

  const handlePreviewRow = (row: ICourse) => {
    setCurrentCourse(row);
    setOpenPreview(true);
  };

  const handleReportAdmin = (row: ICourse) => {
    setCurrentCourse(row);
    setOpenReport(true);
  };

  const handleSubmit = async (id: string) => {
    setIsLoading(true);
    try {
      await submitCourse(id);
      await reLoadData();
      snackbar.enqueueSnackbar(
        'Your submission has been sent. Please wait for admin approval.',
        { variant: 'success' },
      );
    } catch (error) {
      snackbar.enqueueSnackbar('Something was wrong, please try again.', {
        variant: 'error',
      });
    }
    setIsLoading(false);
  };

  const handleCancelSubmit = async (id: string) => {
    setIsLoading(true);
    try {
      await cancelSubmitCourse(id);
      await reLoadData();
      snackbar.enqueueSnackbar('Canceled success!', { variant: 'success' });
    } catch (error) {
      snackbar.enqueueSnackbar('Something was wrong, please try again.', {
        variant: 'error',
      });
    }
    setIsLoading(false);
  };

  return (
    <>
      <Head>
        <title> Courses</title>
      </Head>

      <Container maxWidth={themeStretch ? false : 'lg'}>
        <Box
          sx={{
            marginBottom: 2,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Typography variant="h5" noWrap>
            Courses
          </Typography>

          <Button
            variant="contained"
            startIcon={<Iconify icon="eva:plus-fill" />}
            onClick={() => {
              setEdit(false);
              setOpenUpdate(true);
            }}
          >
            New Course
          </Button>
        </Box>
        <Card>
          <TableContainer sx={{ position: 'relative', overflow: 'unset' }}>
            <Scrollbar>
              <Table
                style={{
                  borderCollapse: 'separate',
                  borderSpacing: '0px 5px',
                  padding: '0px 4px 0px 4px',
                  background: colors.grey_07,
                }}
                size={'small'}
              >
                <TableHeadCustom
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={tableData.length}
                  numSelected={selected.length}
                  onSort={onSort}
                />
                <TableBody>
                  {dataFiltered.map((row, index) => (
                    <CourseTableRow
                      key={index}
                      row={row}
                      selected={selected.includes(row.id)}
                      onSelectRow={() => onSelectRow(row.id)}
                      onDeleteRow={() => handleDeleteRow(row.id)}
                      onEditRow={() => handleEditRow(row)}
                      onPreviewRow={() => handlePreviewRow(row)}
                      onSubmit={() => handleSubmit(row.id)}
                      onReportAdmin={() => handleReportAdmin(row)}
                      onReload={reLoadData}
                      onCancelSubmit={() => handleCancelSubmit(row.id)}
                    />
                  ))}
                  <TableNoData
                    isNotFound={isNotFound}
                    isLoading={isLoadingTable}
                  />
                </TableBody>
              </Table>
            </Scrollbar>
          </TableContainer>

          <TablePaginationCustom
            count={meta?.itemCount || 0}
            page={meta?.page || 0}
            rowsPerPage={rowsPerPage || 5}
            onPageChange={onChangePage}
            onRowsPerPageChange={onChangeRowsPerPage}
            dense={true}
          />
        </Card>
      </Container>

      {isLoading && <LoadingAction />}

      {isOpenUpdate && (
        <ModalCreateUpdateCourse
          open={isOpenUpdate}
          onClose={() => setOpenUpdate(false)}
          currentCourse={currentCourse}
          isEdit={isEdit}
          reLoadData={reLoadData}
        />
      )}
      {isOpenPreview && (
        <ModalPreviewOnMobile
          onSubmit={handleSubmit}
          open={isOpenPreview}
          onClose={() => setOpenPreview(false)}
          currentCourse={currentCourse}
        />
      )}
      {isOpenReport && (
        <ModalReportCourse
          id={currentCourse?.id || ''}
          open={isOpenReport}
          onClose={() => setOpenReport(false)}
        />
      )}
    </>
  );
}

// ----------------------------------------------------------------------

function applyFilter({
  inputData,
  comparator,
}: {
  inputData: ICourse[];
  comparator: (a: any, b: any) => number;
}) {
  const stabilizedThis = inputData.map((el, index) => [el, index] as const);

  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;

    return a[1] - b[1];
  });

  inputData = stabilizedThis.map((el) => el[0]);

  return inputData;
}
