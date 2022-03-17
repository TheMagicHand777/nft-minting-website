import {Box, Container, IconButton, Link, Typography} from '@material-ui/core'
import useStyles from './Footer.styles'

const Footer = () => {
    const classes = useStyles()

    return (
        <Box className={classes.root} textAlign="center">
            <Container maxWidth="xl"></Container>
        </Box>
    )
}

export default Footer
