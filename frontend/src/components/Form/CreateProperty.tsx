import { Text, useToast } from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { RiAddLine } from "react-icons/ri";
import * as yup from 'yup';
import { useModal } from '../../hooks/useModal';
import { createProperty } from '../../services/hooks/useProperty';
import { container, item, MotionBox, MotionFlex, MotionGrid } from "../../styles/animation";
import { Button } from "../Button";
import { Modal } from '../Modal';
import { Input } from "./Input";


type PropertyFormData = {
  title: string;
  description: string;
  value: number;
  area: number;
  address: string;
  house_number: number;
  cep: number;
}

const propertyFormSchema = yup.object().shape({
  title: yup.string().required('O título é obrigatório'),
  description: yup.string().required('A descrição é obrigatória'),
  value: yup.number().required('O valor é obrigatório'),
  area: yup.number().required('A área é obrigatória'),
  address: yup.string().required('O endereço é obrigatório'),
  house_number: yup.number().required('O número residêncial é obrigatório'),
  cep: yup.number()
    .required('O CEP é obrigatório')
    .min(8, 'O CEP deve conter 8 dígitos'),
});

export function FormCreateProperty() {
  const [isValid, setIsValid] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [dataForm, setDataForm] = useState<PropertyFormData>();
  const { onClose, onOpen } = useModal();
  const toast = useToast();

  const { register, handleSubmit, formState } = useForm({
    resolver: yupResolver(propertyFormSchema)
  });

  const handleCreateProperty: SubmitHandler<PropertyFormData> = async (data) => {
    if (!isValid) {
      setDataForm(data);
      onOpen();
    }
  }

  function handleSetValid() {
    setIsLoading(true);
    setIsValid(true);
  }

  async function handleUseCreateProperty() {    
    try {      
      const { property } = await createProperty(dataForm);
      
      toast({
        title: "Imóvel cadastrado! 🥳",
        description: `Cadastro do imóvel "${property.title}" foi realizado com sucesso! 🥳 `,
        position: "top-right",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      window.location.reload()
    } catch (error) {
      toast({
        title: "Falha ao cadastrar o imóvel! 😢",
        description: `${error} 😢`,
        position: "top-right",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  }

  useEffect(() => {
    if (isValid) {
      handleUseCreateProperty();
      onClose();
      setIsValid(false);
      setIsLoading(false);
    }
  }, [isValid]);

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
        onSubmit={handleSubmit(handleCreateProperty)}
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
            name="house_number"
            type="number"
            label="Número residêncial"
            error={formState.errors.house_number}
            {...register('house_number')}
          />

          <Input
            name="cep"
            type="number"
            label="CEP"
            error={formState.errors.cep}
            {...register('cep')}
          />
        </MotionGrid>
        <MotionFlex variants={item} justifyContent="space-between" alignItems="center">
          <Text color="red.400">Todos os campos são obrigatórios!</Text>
          <Button
            title="Cadastrar um novo imóvel"
            color="green.500"
            icon={RiAddLine}
            type="submit"
            isLoading={isLoading}
          />
        </MotionFlex>
      </MotionBox>
      <Modal
        title="Confirmação"
        actions={true}
        handle={handleSetValid}
        isLoading={isLoading}
      >
        <Text>
          Deseja mesmo criar esse novo imóvel?
        </Text>
      </Modal>
    </>
  );
}