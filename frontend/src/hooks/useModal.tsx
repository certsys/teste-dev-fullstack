import { useDisclosure, UseDisclosureReturn } from '@chakra-ui/react';
import { ReactNode, useContext, createContext } from 'react';

interface ModalProps {
  children: ReactNode;
}

type ModalContextData = UseDisclosureReturn;

const ModalContext = createContext({} as ModalContextData);

export function ModalProvider({ children }: ModalProps) {
  const disclosure = useDisclosure();

  return (
    <ModalContext.Provider value={disclosure}>
      {children}
    </ModalContext.Provider>
  );
}

export function useModal() {
  return useContext(ModalContext);
}