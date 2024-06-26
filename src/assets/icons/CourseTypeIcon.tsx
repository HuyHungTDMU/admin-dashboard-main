import { Box, BoxProps } from '@mui/material';

function CourseTypeIcon({ ...other }: BoxProps) {
  return (
    <Box {...other}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="14"
        height="10"
        fill="none"
      >
        <path
          fill="#35353A"
          d="M4.074 5.379V1.855c0-.725.458-1.172 1.198-1.172H7.85c.713 0 1.176.453 1.177 1.151v1.837H11.926c.706 0 1.168.453 1.168 1.144v3.36c0 .63-.423 1.044-1.067 1.044H1.08c-.653 0-1.075-.412-1.075-1.05V6.502c.001-.664.47-1.123 1.148-1.124.917-.002 1.835 0 2.753 0h.167Zm4.075 2.98c.002-.04.005-.07.005-.1v-6.44c0-.208-.078-.282-.29-.282h-2.59c-.264 0-.327.062-.327.324V8.358h3.202Zm.894.007h2.966c.18 0 .213-.033.213-.211l.012-3.32c0-.246-.064-.31-.312-.31H9.042v3.842Zm-4.979 0V6.232H1.195c-.232 0-.303.067-.304.292V8.15c0 .186.032.216.222.216h2.951Z"
        />
      </svg>
    </Box>
  );
}

export default CourseTypeIcon;
