import { Button as ChakraButton, ButtonProps as ChakraButtonProps, Icon, Text } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { ElementType } from 'react';

export interface ButtonProps extends ChakraButtonProps {
  title: string;
  color: string;
  icon: ElementType;
  handle?: () => void;
}

const MotionButton = motion(ChakraButton);

export function Button({ title, color, icon, handle, ...rest }: ButtonProps) {
  return (
    <MotionButton 
      background={color}
      fontSize="0.8rem" 
      fontWeight="medium"
      onClick={handle}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      _hover={{
        background: color,
        opacity: "0.8"
      }}
      {...rest}
    >
      <Icon as={icon} boxSize="1rem" marginRight="0.375rem" color="white" /> 
      <Text color="white" >{title}</Text>
    </MotionButton>
  );
}