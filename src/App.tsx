import { ThemeProvider } from '@emotion/react'
import './App.sass'
import WolleRoutes from './routes'
import theme from './theme';
import './fonts.sass';

const App = ()=> {
 

  return <ThemeProvider theme={theme}><WolleRoutes/></ThemeProvider>
}

export default App
