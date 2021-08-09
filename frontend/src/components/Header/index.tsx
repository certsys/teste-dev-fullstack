import { Box, Flex, Text, useBreakpointValue } from '@chakra-ui/react';
import { memo } from 'react';
import { container, MotionFlex } from '../../styles/animation';
import { ActiveLink } from '../ActiveLink';
import { Logo } from './Logo';
import { NotificationNav } from './NotificationNav';
import { Profile } from './Profile';

function HeaderComponent() {
  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true
  });

  return (
    <MotionFlex
      variants={container}
      initial="hidden"
      animate="visible"
      as="header"
      width="100%"
      maxWidth={1480}
      height="20"
      marginX="auto"
      marginTop="4"
      paddingX="6"
      alignItems="center"
    >
      <Logo />

      <Box
        height="100%"
        width="100%"
        as={Flex}
        alignItems="center"
        justifyContent="center"
        cursor="pointer"
      >
        <ActiveLink href="/home" shouldMatchExactHref={true} >
          <Text>Home</Text>
        </ActiveLink>
      </Box>

      <Flex alignItems="center" marginLeft="auto">
        <NotificationNav />

        <Profile showProfileData={isWideVersion} />
      </Flex>
    </MotionFlex>
  );
}

export const Header = memo(HeaderComponent);