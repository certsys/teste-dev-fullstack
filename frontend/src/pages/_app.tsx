import { ChakraProvider } from "@chakra-ui/react";
import { AppProps } from "next/app";
import { QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { ModalProvider } from "../hooks/useModal";
import { AuthProvider } from "../hooks/useAuth";
import { SidebarDrawerProvider } from "../hooks/useSidebarDrawer";
import { makeServer } from "../services/mirage";
import { queryClient } from "../services/queryClient";
import { theme } from "../styles/theme";

// if (process.env.NODE_ENV === 'development') {
//   makeServer();
// }

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <AuthProvider>
        <QueryClientProvider client={queryClient}>
          <ModalProvider>
            <Component {...pageProps} />
          </ModalProvider>
          <ReactQueryDevtools />
        </QueryClientProvider>
      </AuthProvider>
    </ChakraProvider>
  );
}

export default MyApp;
