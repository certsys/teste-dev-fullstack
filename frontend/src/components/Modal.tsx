import {
  Modal as ChakraModal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay
} from '@chakra-ui/react';
import { ReactNode } from 'react';
import { RiCheckboxCircleLine, RiCloseCircleLine } from 'react-icons/ri';
import { useModal } from '../hooks/useModal';

import { Button } from './Button';

type ModalProps = {
  title: string;
  children: ReactNode;
  actions?: boolean;
  size?: string;
  isLoading?: boolean;
  handle: () => void;
}

export function Modal({ title, children, actions = true, size = "md", isLoading = false, handle }: ModalProps) {
  const { isOpen, onClose } = useModal();

  return (
    <ChakraModal
      isCentered
      onClose={onClose}
      isOpen={isOpen}
      motionPreset="slideInRight"
      size={size}
    >
      <ModalOverlay />
      <ModalContent backgroundColor="gray.700">
        <ModalHeader>{title}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {children}
        </ModalBody>
        {actions && <ModalFooter>
          <Button
            title="Cancelar"
            color="red.500"
            icon={RiCloseCircleLine}
            handle={onClose}
            marginRight={4}
          />
          <Button
            title="Confirmar"
            color="green.500"
            isLoading={isLoading}
            loadingText="Carregando..."
            
            icon={RiCheckboxCircleLine}
            handle={handle}
          />
        </ModalFooter>}
      </ModalContent>
    </ChakraModal>
  );
}