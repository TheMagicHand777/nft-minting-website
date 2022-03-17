import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
    root: {
        // paddingTop: theme.spacing(8),
        width: '100%',
        height: '100%',
        position: 'relative'
    },
    content: {
        width: '100%',
        height: '100%',
    }
}))

export default useStyles
