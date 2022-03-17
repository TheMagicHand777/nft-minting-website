// import { useState } from 'react'
import {Box} from '@material-ui/core'
import Mint from 'components/Mint'

import useStyles from './Home.styles'

const Home = () => {
    const classes = useStyles()

    return (
        <Box className={classes.root}>
            <Box id="mint">
                <Mint />
            </Box>
        </Box>
    )
}

export default Home
