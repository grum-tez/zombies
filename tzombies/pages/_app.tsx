import useMediaQuery from '@mui/material/useMediaQuery'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import Container from '@mui/material/Container'
import { useMemo } from 'react'
import NavBar from '../components/NavBar'
import type { AppProps } from 'next/app'
import { WalletProvider } from '../components/providers/WalletProvider'

export default function App({ Component, pageProps }: AppProps) {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)')

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: prefersDarkMode ? 'dark' : 'light',
        },
      }),
    [prefersDarkMode]
  )

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <WalletProvider>
        <NavBar />
        <Container sx={{ mt: 12 }}>
          <Component {...pageProps} />
        </Container>
      </WalletProvider>
    </ThemeProvider>
  )
}