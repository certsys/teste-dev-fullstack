import { Flex, Button, Stack, Text, useToast } from "@chakra-ui/react";
import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Input } from "../components/Form/Input";
import { GetServerSidePropsContext } from "next";
import { useAuth } from "../hooks/useAuth";
import { withSSRGuest } from "../utils/withSSRGuest";
import { useCallback } from "react";
import { container, item, MotionBox, MotionFlex } from "../styles/animation";
import { api } from "../services/apiClient";
import { useRouter } from "next/router";

type SignUpFormData = {
  name: string;
  email: string;
  password: string;
};

const signInFormSchema = yup.object().shape({
  name: yup.string().required("Nome é obrigatório"),
  email: yup.string().required("E-mail é obrigatório").email("E-mail inválido"),
  password: yup
    .string()
    .required("Senha é obrigatório")
    .min(6, "No mínimo 6 caracteres"),
});

export default function Register() {
  const { register, handleSubmit, formState } = useForm({
    resolver: yupResolver(signInFormSchema),
  });

  const toast = useToast();
  const router = useRouter();

  const handleSignUp = useCallback(async (data: SignUpFormData) => {
    try {
      await api.post('/users', data)

      toast({
        title: "Cadastro Efetuado! 🙏",
        description: "Cadastro Efetuado com Sucesso! 🙆",
        status: "success",
        position: "top-right" ,
        duration: 5000,
        isClosable: true,
      })

      router.push('/')

    } catch (err) {
      toast({
        title: "Erro ao cadastrar!",
        description: "Erro ao efetuar o cadastro de usuário! 😢",
        status: "success",
        position: "top-right" ,
        duration: 5000,
        isClosable: true,
      })
    }
  }, []);

  return (
    <Flex
      width="100vw"
      height="100vh"
      alignItems="center"
      justifyContent="center"
    >
      <MotionFlex
        as="form"
        width="100%"
        maxWidth={360}
        backgroundColor="gray.800"
        padding="8"
        borderRadius={8}
        flexDirection="column"
        variants={container}
        initial="hidden"
        animate="visible"
        onSubmit={handleSubmit(handleSignUp)}
      >
        <Stack spacing="4" textAlign="center">
          <Text
            bgGradient="linear(to-l, gray.400,#2F855A)"
            bgClip="text"
            fontSize="6xl"
            fontWeight="extrabold"
          >
            Imóveis
          </Text>

          <Input
            label="Nome"
            error={formState.errors.name}
            {...register("name")}
          />

          <Input
            type="email"
            label="E-mail"
            error={formState.errors.email}
            {...register("email")}
          />

          <Input
            type="password"
            label="Senha"
            error={formState.errors.password}
            {...register("password")}
          />
        </Stack>
        <MotionBox variants={item}>
          <Button
            bgGradient="linear(to-r, teal.500,green.500)"
            _hover={{ bgGradient: "linear(to-r, teal.600, green.600)" }}
            _active={{ bgGradient: "linear(to-r, teal.600, green.600)" }}
            type="submit"
            marginTop="6"
            w="100%"
            size="lg"
            isLoading={formState.isSubmitting}
          >
            Cadastrar 😎
          </Button>
        </MotionBox>
      </MotionFlex>
    </Flex>
  );
}

export const getServerSideProps = withSSRGuest(
  async (context: GetServerSidePropsContext) => {
    return {
      props: {},
    };
  }
);
