import { Flex, Box, Text, Avatar } from '@chakra-ui/react';
import { item, MotionBox, MotionFlex } from '../../styles/animation';

interface ProfileProps {
  showProfileData?: boolean;
}

export function Profile({ showProfileData = true }: ProfileProps) {
  return (
    <MotionFlex variants={item} alignItems="center">
      {showProfileData && <MotionBox variants={item} marginRight="4" textAlign="right">
        <Text>Josimar Junior</Text>
        <Text color="gray.300" fontSize="small">
          josimarjr479@gmail.com
        </Text>
      </MotionBox>}

      <Avatar
        size="md"
        name="Josimar Martins"
        src="https://avatars.githubusercontent.com/u/49077388?s=400&u=ec9520ac11646eea256440b5db57ede4af4bf6be&v=4"
      />
    </MotionFlex>
  );
}