import { ModalOverlay, Text, useDisclosure, useToast, Modal, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter } from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { RiCheckboxCircleLine, RiCloseCircleLine, RiEditLine } from "react-icons/ri";
import * as yup from 'yup';
import { updatePropertyById } from '../../services/hooks/useProperty';
import { container, item, MotionBox, MotionFlex, MotionGrid } from "../../styles/animation";
import { Button } from "../Button";
import { Input } from "./Input";


type PropertyFormData = {
  id?: string;
  title: string;
  description: string;
  value: number;
  area: number;
  address: string;
  public_place: string;
  house_number: number;
  complement: string;
  district: string;
  cep: number;
  city: string;
  uf: string;
}

const propertyFormSchema = yup.object().shape({
  title: yup.string(),
  description: yup.string(),
  value: yup.number(),
  area: yup.number(),
  address: yup.string(),
  public_place: yup.string(),
  house_number: yup.number(),
  complement: yup.string(),
  district: yup.string(),
  cep: yup.number().integer(),
  city: yup.string(),
  uf: yup.string(),
});

interface FormPropertyProps {
  data?: PropertyFormData;
}

export function FormProperty({ data }: FormPropertyProps) {
  const [isValid, setIsValid] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [dataForm, setDataForm] = useState<PropertyFormData>();
  const { onClose, onOpen, isOpen } = useDisclosure();
  const toast = useToast();

  const { register, handleSubmit, formState, setValue } = useForm({
    resolver: yupResolver(propertyFormSchema)
  });

  const handleFormProperty: SubmitHandler<PropertyFormData> = async (data) => {
    if (!isValid) {
      setDataForm(data);
      onOpen();
    }
  }

  function handleSetValid() {
    setIsLoading(true);
    setIsValid(true);
  }

  useEffect(() => {
    if (isValid) {
      handleUseUpdateProperty();
      onClose();
      setIsValid(false);
      setIsLoading(false);
    }
  }, [isValid]);

  useEffect(() => {
    
    
    if (data) {
      const amount = String(data.value).substring(3);
      const value = amount.split(',');
      const valueFormatted = value[0].split('.');

      setValue('title', data.title);
      setValue('description', data.description);
      setValue('value', Number(valueFormatted[0] + valueFormatted[1]));
      setValue('area', data.area);
      setValue('address', data.address);
      setValue('public_place', data.public_place);
      setValue('house_number', data.house_number);
      setValue('complement', data.complement);
      setValue('district', data.district);
      setValue('cep', data.cep);
      setValue('city', data.city);
      setValue('uf', data.uf);
    }
  }, [data])

  async function handleUseUpdateProperty() {
    try {
      const { property } = await updatePropertyById({...dataForm, id: data.id});

      toast({
        title: "Imóvel atualizado! 🥳",
        description: `Atualização do imóvel "${property.title}" foi realizado com sucesso! 🥳 `,
        position: "top-right",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: "Falha ao atualizar o imóvel! 😢",
        description: `${error} 😢`,
        position: "top-right",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  }

  return (
    <>
      <MotionBox
        as="form"
        background="gray.800"
        variants={container}
        initial="hidden"
        animate="visible"
        padding={6}
        marginBottom={6}
        borderRadius={8}
        onSubmit={handleSubmit(handleFormProperty)}
      >
        <MotionGrid
          variants={item}
          gridTemplateColumns="repeat(4, 1fr)"
          gap={4}
          mb={6}
        >
          <Input
            name="title"
            label="Nome do imóvel"
            error={formState.errors.title}
            {...register('title')}
          />

          <Input
            name="description"
            label="Descrição"
            error={formState.errors.description}
            {...register('description')}
          />

          <Input
            name="value"
            type="number"
            label="Valor do imóvel"
            error={formState.errors.value}
            {...register('value')}
          />

          <Input
            name="area"
            type="number"
            label="Área total"
            error={formState.errors.area}
            {...register('area')}
          />

          <Input
            name="address"
            label="Endereço"
            error={formState.errors.address}
            {...register('address')}
          />

          <Input
            name="public_place"
            label="Logradouro"
            error={formState.errors.public_place}
            {...register('public_place')}
          />

          <Input
            name="house_number"
            type="number"
            label="Número residêncial"
            error={formState.errors.house_number}
            {...register('house_number')}
          />

          <Input
            name="complement"
            label="Complemento"
            error={formState.errors.complement}
            {...register('complement')}
          />

          <Input
            name="district"
            label="Bairro"
            error={formState.errors.district}
            {...register('district')}
          />

          <Input
            name="cep"
            type="number"
            label="CEP"
            error={formState.errors.cep}
            {...register('cep')}
          />

          <Input
            name="city"
            label="Cidade"
            error={formState.errors.city}
            {...register('city')}
          />

          <Input
            name="uf"
            label="Estado"
            error={formState.errors.uf}
            {...register('uf')}
          />
        </MotionGrid>
        <MotionFlex variants={item} justifyContent="space-between" alignItems="center">
          <Text color="red.400">Todos os campos são obrigatórios!</Text>
          <Button
            title="Atualizar o imóvel"
            color="green.500"
            icon={RiEditLine}
            type="submit"
            isLoading={isLoading}
          />
        </MotionFlex>
      </MotionBox>

      <Modal
        isCentered
        onClose={onClose}
        isOpen={isOpen}
        motionPreset="slideInRight"
        size="md"
      >
        <ModalOverlay />
        <ModalContent backgroundColor="gray.700">
          <ModalHeader>Confirmação</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            Deseja mesmo atualizar esse imóvel?
          </ModalBody>
          <ModalFooter>
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
              handle={handleSetValid}
            />
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}