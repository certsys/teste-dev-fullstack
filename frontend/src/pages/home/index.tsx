import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Box,
  Flex, Spinner,
  Stack,
  useBreakpointValue
} from "@chakra-ui/react";
import { GetServerSidePropsContext } from "next";
import dynamic from "next/dynamic";
import Head from "next/head";
import React, { useEffect, useState } from "react";
import { RiAddLine, RiFilterLine } from "react-icons/ri";
import { Header } from "../../components/Header";
import { Pagination } from "../../components/Pagination";
import { PropertyItem } from "../../components/PropertyItem";
import { getProperties } from "../../services/hooks/useProperty";
import {
  container,
  item,
  MotionButton,
  MotionFlex,
  MotionGrid,
  MotionText
} from "../../styles/animation";
import { withSSRAuth } from "../../utils/withSSRAuth";

const FormCreateProperty = dynamic(
  () =>
    import("../../components/Form/CreateProperty").then(
      (mod) => mod.FormCreateProperty
    ),
  // eslint-disable-next-line react/display-name
  { loading: () => <span>Carregando...</span> }
);

type Property = {
  id: string;
  title: string;
  value: number;
  city: string;
  uf: string;
};

type HomeProps = {
  properties: Property[];
  totalCount: number;
};

export default function Home({ properties, totalCount }: HomeProps) {
  const [page, setPage] = useState(1);
  const [data, setData] = useState<Property[]>([]);
  const [total, setTotal] = useState(0);
  const [registerCountPerPage, setRegisterCountPerPage] = useState(8);
  const [isLoading, setLoading] = useState(false);
  const [isModalCreate, setIsModalCreate] = useState(false);

  const gridBreakpoint = useBreakpointValue({
    base: "repeat(2, 1fr)",
    md: "repeat(3, 1fr)",
    lg: "repeat(4, 1fr)",
  });

  // const { data, isLoading, isFetching, error } = useProperties(page, {
  //   initialData: { properties, totalCount },
  // });

  // async function handlePrefetchProperty(page: number) {
  //   await queryClient.prefetchQuery(['properties', page], async () => {
  //     const { properties } = await getProperties(page)
  //   }, {
  //     staleTime: 1000 * 10 // 10 Minutos
  //   })
  // }

  useEffect(() => {
    setLoading(true);
    setData(properties);
    setTotal(totalCount);
    setLoading(false);
  }, []);

  useEffect(() => {
    setLoading(true);
    getProperties(page).then(({ properties }) => {
      setData(properties);
      setRegisterCountPerPage(properties.length);
      setLoading(false);
    });
  }, [page]);

  return (
    <>
      <Head>
        <title>CertImóveis | Home</title>
      </Head>
      <Flex flexDirection="column" height="100vh">
        <Header />

        <Box width="100%" maxWidth={1120} marginX="auto" marginY="10">
          <MotionFlex
            variants={container}
            initial="hidden"
            animate="visible"
            marginBottom={6}
            justifyContent={["space-around", "space-between"]}
            alignItems="center"
          >
            <MotionText variants={item} fontSize="1.5rem">
              Listagem dos imóveis
            </MotionText>

            <Stack spacing="4" mr={[10, 10, 0, 0]} direction={["column", "column", "row", "row"]}>
              {/* <MotionButton
                title="Filtrar os imóveis"
                color="orange.500"
                icon={RiFilterLine}
                handle={() => {}}
              /> */}
              <MotionButton
                title="Adicionar imóvel"
                color="blue.500"
                icon={RiAddLine}
                handle={() => setIsModalCreate(!isModalCreate)}
              />
            </Stack>
          </MotionFlex>

          {isModalCreate && <FormCreateProperty />}

          {isLoading ? (
            <Flex justify="center">
              <Spinner />
            </Flex>
          ) : (
            <>
              {data.length ? (
                <>
                  <MotionGrid
                    variants={container}
                    gridTemplateColumns={gridBreakpoint}
                    gap={4}
                    initial="hidden"
                    animate="visible"
                  >
                    {data &&
                      data.map((property) => (
                        <PropertyItem key={property.id} property={property} />
                      ))}
                  </MotionGrid>
                  <Pagination
                    currentPage={page}
                    onPageChange={setPage}
                    registerCountPerPage={registerCountPerPage}
                    totalCountOfRegisters={total}
                  />
                </>
              ) : (
                <Alert
                  status="info"
                  variant="subtle"
                  flexDirection="column"
                  alignItems="center"
                  justifyContent="center"
                  textAlign="center"
                  borderRadius="10"
                  height="200px"
                >
                  <AlertIcon boxSize="40px" mr={0} />
                  <AlertTitle mt={4} mb={1} fontSize="lg" color="#2C6DAB">
                    Sem imóveis!
                  </AlertTitle>
                  <AlertDescription maxWidth="sm" color="#2C6DAB">
                    Não existem imóveis cadastrados
                  </AlertDescription>
                </Alert>
              )}
            </>
          )}
        </Box>
      </Flex>
    </>
  );
}

export const getServerSideProps = withSSRAuth(async (context: GetServerSidePropsContext) => {
  const { properties, totalCount } = await getProperties(1);

  return {
    props: {
      properties,
      totalCount
    }
  }
});
