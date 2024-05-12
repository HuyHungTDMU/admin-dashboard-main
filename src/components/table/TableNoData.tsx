// @mui
import { TableRow, TableCell } from '@mui/material';
import { useEffect, useState } from 'react';
//
import EmptyContent from '../empty-content';

// ----------------------------------------------------------------------

type Props = {
  isNotFound: boolean;
  isLoading?: boolean;
};

export default function TableNoData({ isNotFound, isLoading = false }: Props) {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(isLoading);
  }, [isLoading]);

  return (
    <TableRow>
      {isNotFound ? (
        <TableCell colSpan={12}>
          <EmptyContent
            title="No Data"
            sx={{
              '& span.MuiBox-root': { height: 160 },
            }}
            isLoading={loading}
          />
        </TableCell>
      ) : (
        <TableCell colSpan={12} sx={{ p: 0 }} />
      )}
    </TableRow>
  );
}
