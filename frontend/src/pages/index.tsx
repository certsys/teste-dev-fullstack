import { Flex, Button, Stack, Text } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import Link from "next/link";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Input } from "../components/Form/Input";
import { GetServerSidePropsContext } from "next";
import { useAuth } from "../hooks/useAuth";
import { withSSRGuest } from "../utils/withSSRGuest";
import { useCallback } from "react";
import { container, item, MotionBox, MotionFlex } from "../styles/animation";

type SignInFormData = {
  email: string;
  password: string;
};

const signInFormSchema = yup.object().shape({
  email: yup.string().required("E-mail é obrigatório").email("E-mail inválido"),
  password: yup
    .string()
    .required("Senha é obrigatório")
    .min(6, "No mínimo 6 caracteres"),
});

export default function SignIn() {
  const { register, handleSubmit, formState } = useForm({
    resolver: yupResolver(signInFormSchema),
  });

  const { signIn } = useAuth();

  const handleSignIn = useCallback(async (data: SignInFormData) => {
    try {
      await signIn(data);
    } catch (err) {
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
        variants={container}
        initial="hidden"
        animate="visible"
        borderRadius={8}
        flexDirection="column"
        onSubmit={handleSubmit(handleSignIn)}
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
            type="submit"
            marginTop="6"
            colorScheme="green"
            w="100%"
            size="lg"
            isLoading={formState.isSubmitting}
          >
            Entrar
          </Button>
        </MotionBox>

        <MotionBox variants={item}>
          <Link href="/register">
            <Button
              marginTop="6"
              bgGradient="linear(to-r, teal.500,green.500)"
              _hover={{ bgGradient: "linear(to-r, teal.600, green.600)" }}
              _active={{ bgGradient: "linear(to-r, teal.600, green.600)" }}
              size="lg"
              w="100%"
              isLoading={formState.isSubmitting}
            >
              <Text fontSize="16">Não tem usuário? Clique aqui! 😄</Text>
            </Button>
          </Link>
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
