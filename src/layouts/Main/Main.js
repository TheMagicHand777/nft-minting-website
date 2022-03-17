import {Box} from '@material-ui/core'
import Header from './components/Header'
import useStyles from './Main.styles'
import Footer from './components/Footer'

const Main = props => {
    const {children} = props

    const classes = useStyles()

    return (
        <Box className={classes.root}>
            {/* <Header /> */}
            <Box className={classes.content}>{children}</Box>
            {/* <Footer /> */}
        </Box>
    )
}

export default Main
