import { Flex, FlexProps, Stack, StackProps, GridProps, Grid, Box, BoxProps, TextProps, Text } from "@chakra-ui/react";
import { motion } from 'framer-motion'
import { Button, ButtonProps } from '../components/Button';

export const container = {
  hidden: { opacity: 1, scale: 0 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      delayChildren: 0.3,
      staggerChildren: 0.2
    }
  }
};

export const item = {
  hidden: { y: -30, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1
  }
};

export const MotionFlex = motion<FlexProps>(Flex);
export const MotionText = motion<TextProps>(Text);
export const MotionBox = motion<BoxProps>(Box);
export const MotionGrid = motion<GridProps>(Grid)
export const MotionStack = motion<StackProps>(Stack);
export const MotionButton = motion<ButtonProps>(Button);