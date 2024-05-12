import { Box, BoxProps } from '@mui/material';

function ExportIcon({ ...other }: BoxProps) {
  return (
    <Box {...other}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="17"
        fill="none"
      >
        <g
          stroke="#408DFF"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="1.5"
          opacity=".4"
        >
          <path d="m8.666 7.833 5.467-5.467M14.666 5.033v-3.2h-3.2" />
        </g>
        <path
          stroke="#408DFF"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="1.5"
          d="M7.333 1.833H6c-3.333 0-4.667 1.334-4.667 4.667v4c0 3.333 1.334 4.667 4.667 4.667h4c3.334 0 4.667-1.334 4.667-4.667V9.167"
        />
      </svg>
    </Box>
  );
}

export default ExportIcon;
