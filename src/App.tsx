import {BrowserRouter as Router} from 'react-router-dom'

import {ThemeProvider} from '@material-ui/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import theme from './theme'

import {SnackbarProvider} from 'context'
import Snackbar from 'components/shared/Snackbar'

import AppRouter from 'router'

const App = () => {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <SnackbarProvider>
                <Router>
                    <AppRouter />
                </Router>
                <Snackbar />
            </SnackbarProvider>
        </ThemeProvider>
    )
}

export default App
