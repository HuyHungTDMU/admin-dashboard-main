// @mui
import { Typography, Stack, StackProps, alpha, Box } from '@mui/material';
import { m } from 'framer-motion';
//
import Image from '../image';
import Loading from '../loading-screen/loading';

// ----------------------------------------------------------------------

interface EmptyContentProps extends StackProps {
  title: string;
  img?: string;
  description?: string;
  isLoading?: boolean;
}

export default function EmptyContent({
  title,
  description,
  img,
  isLoading = false,
  sx,
  ...other
}: EmptyContentProps) {
  return (
    <Stack
      alignItems="center"
      justifyContent="center"
      sx={{
        height: 1,
        textAlign: 'center',
        p: (theme) => theme.spacing(8, 2),
        ...sx,
      }}
      {...other}
    >
      {isLoading ? (
        <Loading />
      ) : (
        <Image
          disabledEffect
          alt="empty content"
          src={img || '/assets/illustrations/illustration_empty_content.svg'}
          sx={{ height: 240, mb: 3 }}
        />
      )}

      {!isLoading && (
        <Typography variant="h5" gutterBottom>
          {title}
        </Typography>
      )}

      {description && (
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          {description}
        </Typography>
      )}
    </Stack>
  );
}
