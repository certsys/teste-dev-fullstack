import { Box, Button as ChakraButton, Flex, Grid, Icon, Text, useToast } from "@chakra-ui/react";
import { GetServerSidePropsContext } from "next";
import Head from 'next/head';
import Link from 'next/link';
import Router from 'next/router';
import { useState } from "react";
import { FiTrash2 } from "react-icons/fi";
import { MdChevronLeft } from 'react-icons/md';
import { RiEditLine } from "react-icons/ri";
import { Button } from "../../components/Button";
import { FormProperty } from "../../components/Form/UpdateProperty";
import { Header } from "../../components/Header";
import { Modal } from "../../components/Modal";
import { useModal } from "../../hooks/useModal";
import { deletePropertyById, getPropertyById } from "../../services/hooks/useProperty";
import { container, item, MotionFlex, MotionStack, MotionText } from "../../styles/animation";
import { withSSRAuth } from "../../utils/withSSRAuth";


type Property = {
  id: string;
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
  created_at: Date;
};

interface PropertyProps {
  property: Property;
}

export default function DetailsProperty({ property }: PropertyProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [isModalEdit, setIsModalEdit] = useState(false);
  const { onClose, onOpen } = useModal();
  const toast = useToast();

  async function handleDeleteById() {
    setIsLoading(true);
    try {
      await deletePropertyById(property.id);
      setIsLoading(false);
      onClose();
      toast({
        title: "Imóvel removido! 🥳",
        description: `Remoção do imóvel "${property.title}" foi realizado com sucesso! 🥳 `,
        position: "top-right",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      Router.push('/home');
    } catch (error) {

      toast({
        title: "Falha ao remover o imóvel! 😢",
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
      <Head>
        <title>CertImóveis | {property.title}</title>
      </Head>
      <Flex
        flexDirection="column"
        height="100vh"
      >
        <Header />

        <Box width="100%" maxWidth={1120} marginX="auto" marginY="10">
          <Flex flexDirection="column" flex="1">
            <MotionFlex
              as={Flex}
              justifyContent={["space-around", "space-between"]}
              alignItems="center"
              marginBottom={4}
              variants={container}
              initial="hidden"
              animate="visible"
            >
              <MotionFlex variants={item} alignItems="center">
                <Link href="/home">
                  <a>
                    <ChakraButton
                      variant="ghost"
                      colorScheme="blue"
                      _hover={{ background: 'transparent' }}
                      _focus={{ background: 'transparent', outline: 0 }}
                      _focusVisible={{ background: 'transparent', outline: 0 }}
                      _active={{ background: 'transparent', outline: 0 }}
                    >
                      <Icon as={MdChevronLeft} boxSize={6} /> Voltar
                    </ChakraButton>
                  </a>
                </Link>
                <MotionText fontSize="20" >
                  Imóvel: {property.title}
                </MotionText>
              </MotionFlex>

              <MotionStack direction={["column", "column", "row", "row"]} spacing={4} variants={item}>
                <Button
                  title="Editar imóvel"
                  color="orange.400"
                  icon={RiEditLine}
                  handle={() => setIsModalEdit(!isModalEdit)}
                />
                <Button
                  title="Remover imóvel"
                  color="red.400"
                  icon={FiTrash2}
                  handle={onOpen}
                />
              </MotionStack>
            </MotionFlex>

            {isModalEdit && <FormProperty data={property} />}

            <MotionFlex
              variants={container}
              initial="hidden"
              animate="visible"
              flexDirection={['column', 'column', 'column', 'row', 'row']}
              justifyContent="space-around"
            >
              <MotionFlex
                backgroundColor="gray.700"
                borderRadius={8}
                marginRight={[0, 0, 0, 4, 4]}
                padding={6}
                flexDirection="column"
                lineHeight={8}
                width={["100%", "100%", "100%", "40vh"]}
                variants={item}
              >

                <MotionFlex
                  variants={item}
                  justifyContent="space-between"
                  alignItems="center"
                  flexDirection="column"
                >
                  <Text fontSize="1.25rem" mb={4}>Dados do imóvel</Text>
                  <Flex justifyContent="space-between" alignItems="center" width="100%">
                    <Text color="white">
                      Valor do imóvel
                      <Text color="gray.300">
                        {property.value}
                      </Text>
                    </Text>
                    <Text color="white">
                      Área do imóvel
                      <Text color="gray.300">
                        {property.area} (m2)
                      </Text>
                    </Text>
                  </Flex>
                  <Text color="white" w="100%" marginY={4}>
                    Data de publicação:
                    <Text color="gray.300">{property.created_at}</Text>
                  </Text>
                </MotionFlex>
                <Text>
                  <Text color="white">Descrição</Text>
                  <Text color="gray.300">{property.description}</Text>
                </Text>
              </MotionFlex>

              <MotionFlex
                flex={1}
                backgroundColor="gray.700"
                borderRadius={8}
                marginTop={[10, 10, 10, 0, 0]}
                padding={6}
                flexDirection="column"
                lineHeight={8}
                variants={item}
                // border="2px"
                shadow="3xl"
              >
                <Text fontSize="1.25rem" textAlign="center" mb={4}>Localização do imóvel</Text>
                <Grid templateColumns="repeat(3, 1fr)" gap={4}>
                  <Text color="white" w="100%">
                    CEP:
                    <Text color="gray.300">{property.cep}</Text>
                  </Text>
                  <Text color="white" w="100%">
                    Estado:
                    <Text color="gray.300">{property.uf}</Text>
                  </Text>
                  <Text color="white" w="100%">
                    Cidade:
                    <Text color="gray.300">{property.city}</Text>
                  </Text>
                  <Text color="white" w="100%">
                    Logradouro:
                    <Text color="gray.300">{property.public_place}</Text>
                  </Text>
                  <Text color="white" w="100%">
                    Número da casa:
                    <Text color="gray.300">{property.house_number}</Text>
                  </Text>
                  <Text color="white" w="100%">
                    Complemento:
                    <Text color="gray.300">{property.complement}</Text>
                  </Text>
                  <Text color="white" w="100%">
                    Bairro:
                    <Text color="gray.300">{property.district}</Text>
                  </Text>
                  <Text color="white" w="100%">
                    Endereço:
                    <Text color="gray.300">{property.address}</Text>
                  </Text>
                </Grid>
              </MotionFlex>
            </MotionFlex>
          </Flex>
        </Box>
      </Flex>
      <Modal
        title="Confirmação"
        actions={true}
        handle={handleDeleteById}
        isLoading={isLoading}
      >
        <Text>
          Deseja mesmo remover o imóvel "{property.title}"?
        </Text>
      </Modal>
    </>
  );
}

export const getServerSideProps = withSSRAuth(async (context: GetServerSidePropsContext) => {
  const property = await getPropertyById(String(context.params.property_id));

  return {
    props: {
      property,
    }
  }
});