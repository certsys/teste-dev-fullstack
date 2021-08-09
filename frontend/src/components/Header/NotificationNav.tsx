import { HStack, Icon } from '@chakra-ui/react';
import { RiNotificationLine, RiUserAddLine } from 'react-icons/ri';
import { useModal } from '../../hooks/useModal';
import { item, MotionBox } from '../../styles/animation';

export function NotificationNav() {
  const { onOpen, onClose } = useModal();

  return (
    <MotionBox variants={item}>
      <HStack
        spacing={["6", "8"]}
        marginX={["6", "8"]}
        paddingRight={["6", "8"]}
        paddingY="1"
        color="gray.300"
        borderRightWidth={1}
        borderColor="gray.700"
      >
        <Icon
          as={RiNotificationLine}
          fontSize="20"
        />
        <Icon
          onClick={onOpen}
          as={RiUserAddLine}
          fontSize="20"
        />
      </HStack>
    </MotionBox>
  );
}