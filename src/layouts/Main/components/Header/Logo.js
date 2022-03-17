import { HOME_URL } from 'config/constants'
import { Link } from '@material-ui/core'

import useStyles from './Logo.styles'

const Logo = () => {
    const classes = useStyles()

    return (
        <Link href={`${HOME_URL}/`} className={classes.logoLink}>
            <img className={classes.logoImage} src="/images/logo.png" alt="Filler Art" />
        </Link>
    )
}

export default Logo
