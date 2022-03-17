import {useScrollTrigger, AppBar, Toolbar, Container} from '@material-ui/core'
import useStyles from './Header.styles'

const Header = () => {
    const isScrolling = false
    // const isScrolling = useScrollTrigger({
    //     disableHysteresis: true,
    //     threshold: 160
    // })

    const isLightHeader = !isScrolling

    const classes = useStyles()

    const withSmallStyles = className => {
        const smallClass = isScrolling ? ' small' : ''
        return `${className}${smallClass}`
    }

    return (
        <AppBar elevation={0} className={`${classes.appBar} ${isLightHeader ? ' light' : ''}`}>
            <Container maxWidth="xl">
                <Toolbar className={withSmallStyles(classes.toolbar)}></Toolbar>
            </Container>
        </AppBar>
    )
}

export default Header
