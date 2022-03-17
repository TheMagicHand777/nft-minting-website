import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
    logoLink: {
        transition: 'all 0.5s',
		height: '70%',
		display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    logoImage: {
        transition: 'all 0.5s',
        maxHeight: '100%',
        width: 'auto',
        maxWidth: '100%'
    },
}))

export default useStyles
