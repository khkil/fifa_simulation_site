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
        fw: "#f6425f",
        mf: "#00d28b",
        df: "#2b7def",
        gk: "#f2be57",
      },
      fw: {
        main: "#f6425f",
      },
      mf: {
        main: "#00d28b",
      },
      df: {
        main: "#2b7def",
      },
      gk: {
        main: "#f2be57",
      },

      overall: {
        over0: "#8f96a0",
        over10: "#8f96a0",
        over20: "#8f96a0",
        over30: "#8f96a0",
        over40: "#8f96a0",
        over50: "#8f96a0",
        over60: "#606972",
        over70: "#1f2d37",
        over80: "#2194d6",
        over90: "#175dde",
        over100: "#6e3bff",
        over110: "#b33bff",
        over120: "#cf13c0",
        over130: "#dc0000",
        over140: "#c99b00",
        over150: "#c99b00",
        over160: "#c99b00",
      },
    },
    typography: {
      //fontFamily: "font-family: 'Noto Sans KR', sans-serif",
      fontFamily: "font-family: 'IBM Plex Sans KR', sans-serif;",
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
