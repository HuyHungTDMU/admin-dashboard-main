import { Stack } from '@mui/material';
import Image from 'src/components/image';
import { StyledContent, StyledRoot } from './styles';
import React from 'react';

type Props = {
  title?: string;
  illustration?: string;
  children: React.ReactNode;
};

export default function LoginLayout({ children, illustration, title }: Props) {
  return (
    <div style={{ position: 'relative' }}>
      <Image
        style={{ height: '100vh', width: '100vw' }}
        alt="background"
        src="/assets/images/login/background.png"
      />
      <StyledRoot
        style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}
      >
        <StyledContent>
          <Stack sx={{ width: 1 }}> {children} </Stack>
        </StyledContent>
      </StyledRoot>
    </div>
  );
}
