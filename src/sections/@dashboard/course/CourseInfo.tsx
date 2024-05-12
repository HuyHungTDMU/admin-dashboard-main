// @mui
import { styled } from '@mui/material/styles';
import { Box, Typography } from '@mui/material';
import { ICourse } from 'src/@types';
import Image from 'src/components/image';

// ----------------------------------------------------------------------

const StyledRoot = styled('div')(() => ({
  '&:before': {
    top: 0,
    zIndex: 9,
    content: "''",
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
}));

interface CourseInfoProps {
  course: ICourse;
}

// ----------------------------------------------------------------------

export default function LessonInfo({ course }: CourseInfoProps) {
  return (
    <StyledRoot>
      <Box
        sx={{
          padding: 2,
          alignItems: 'left',
          gap: 2,
        }}
      >
        <Typography variant="h4">{course.title}</Typography>

        <Typography sx={{ opacity: 0.72 }}>{course.description}</Typography>

        <Image
          alt={course.title}
          src={course.imageUrl}
          disabledEffect
          sx={{
            borderRadius: 1,
            mt: 1,
            width: { xs: 80, md: 128 },
            height: { xs: 80, md: 128 },
          }}
        />
      </Box>
    </StyledRoot>
  );
}
