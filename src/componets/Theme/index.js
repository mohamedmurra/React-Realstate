import * as React from 'react'
import { createTheme, ThemeProvider } from '@mui/material'

export const ColorModeContex = React.createContext({
  toggleColorMode: () => {},
})

export const ColorModeProdvider = ({ children }) => {
  const [mode, setmode] = React.useState('light')
  const ColorMode = React.useMemo(
    () => ({
      toggleColorMode: () => {
        setmode((pervmod) => (pervmod === 'light' ? 'dark' : 'light'))
      },
      mode,
    }),
    [mode]
  )
  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          primary: {
            main: 'rgb(185, 5, 59)',
            contrastText: '#fff',
          },
          secondary: {
            main: '#B00020',
          },
          typography: {
            h1: {
              fontSize: '3rem',
            },
            h2: {
              fontSize: '2rem',
            },
            h3: {
              fontSize: '1.64rem',
            },
            h4: {
              fontSize: '1.5rem',
            },
            h5: {
              fontSize: '1.285rem',
            },
            h6: {
              fontSize: '1.142rem',
            },
          },
        },
      }),
    [mode]
  )
  return (
    <ColorModeContex.Provider value={ColorMode}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </ColorModeContex.Provider>
  )
}
export const useColorMode = () => React.useContext(ColorModeContex)
