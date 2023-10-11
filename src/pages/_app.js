import { ThemeProvider, createTheme } from "@mui/material/styles";
import { useState } from "react";
import { Hydrate, QueryClient, QueryClientProvider } from "react-query";
import "../styles/globals.css";

export default function App({ Component, pageProps: { dehydratedState, ...pageProps } }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            refetchOnWindowFocus: false,
            retry: 1,
          },
        },
      })
  );

  const theme = createTheme({
    palette: {
      primary: {
        main: "#3e3d55",
      },
      player: {
        striker: "#f6425f",
        midfielder: "#00d28b",
        defender: "#2b7def",
        goalKeeper: "#f2be57",
      },
    },
  });

  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={dehydratedState}>
        <ThemeProvider theme={theme}>
          <Component {...pageProps} />
        </ThemeProvider>
      </Hydrate>
    </QueryClientProvider>
  );
}
