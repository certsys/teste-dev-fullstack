import { Box, Flex, Text } from '@chakra-ui/react';
import Link, { LinkProps } from 'next/link';
import { useRouter } from 'next/router';
import { cloneElement, ReactElement } from 'react';
import { item, MotionBox } from '../styles/animation';

interface ActiveLinkProps extends LinkProps {
  children: ReactElement;
  shouldMatchExactHref?: boolean;
}

export function ActiveLink({
  children,
  shouldMatchExactHref = false,
  ...rest
}: ActiveLinkProps) {
  const { asPath } = useRouter();
  let isActive = false;

  if (shouldMatchExactHref && (asPath === rest.href || asPath === rest.as)) {
    isActive = true;
  }

  if (!shouldMatchExactHref &&
    (asPath.startsWith(String(rest.href)) ||
      asPath.startsWith(String(rest.as))
    )) {
    isActive = true;
  }

  if (isActive) {
    return (
      <MotionBox variants={item}>
        <a>
          <Box
            as={Flex}
            flexDirection="column"
            width="100%"
            height="8"
            justifyContent="space-between"
          >
            <Link {...rest}>
              {cloneElement(children, {
                _hover: { color: 'white', transition: 'color 0.2s' },
                color: 'white',
                fontWeight: 'bold',
              })}
            </Link>
            <Box height="3px" background="green.500" borderRadius="3px 3px 0 0" />
          </Box>
        </a>
      </MotionBox>
    );
  }

  return (
    <MotionBox variants={item}>
      <a>
        <Box
          as={Flex}
          flexDirection="column"
          width="100%"
          height="8"
          justifyContent="space-between"
        >
          <Link {...rest}>
            {cloneElement(children, {
              _hover: { color: 'white', transition: 'color 0.2s' },
              color: 'white',
              fontWeight: 'bold',
            })}
          </Link>
        </Box>
      </a>
    </MotionBox>
  );
}