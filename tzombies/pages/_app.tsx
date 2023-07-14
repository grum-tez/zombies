import useMediaQuery from '@mui/material/useMediaQuery'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import Container from '@mui/material/Container'
import { useMemo } from 'react'
import NavBar from '../components/NavBar'
import type { AppProps } from 'next/app'
import { AdapterLuxon } from '@mui/x-date-pickers/AdapterLuxon'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { WalletProvider } from '../components/providers/WalletProvider'
import { MetadataProvider } from 'components/providers/MetadataProvider'
import { TzombiesProvider } from 'components/providers/TzombiesProvider'
import { MarketProvider } from 'components/providers/MarketProvider'
import { WertProvider } from 'components/providers/WertProvider'

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
        <MetadataProvider>
          <TzombiesProvider>
            <MarketProvider>
              <WertProvider>
                <LocalizationProvider dateAdapter={AdapterLuxon}>
                  <NavBar />
                  <Container sx={{ mt: 12 }}>
                    <Component {...pageProps} />
                  </Container>
                </LocalizationProvider>
              </WertProvider>
            </MarketProvider>
          </TzombiesProvider>
        </MetadataProvider>
      </WalletProvider>
    </ThemeProvider>
  )
}
